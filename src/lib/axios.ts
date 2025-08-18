import { obtenerNuevoTokenAcceso } from '@/services/AppService';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'x-client': 'web',
  },
});

// ===== Helpers de logging =====
const LOG_HTTP = true;
let REQ_COUNTER = 0;

const mask = (v?: string) => {
  if (!v) return v;
  const str = String(v);
  if (str.length <= 12) return '***';
  return `${str.slice(0, 6)}…${str.slice(-4)}`;
};

const redactHeaders = (headers: any) => {
  if (!headers) return headers;
  const h = { ...headers };
  if (h.Authorization) h.Authorization = mask(h.Authorization);
  if (h.authorization) h.authorization = mask(h.authorization);
  if (h['x-idempotency-key']) h['x-idempotency-key'] = mask(h['x-idempotency-key']);
  return h;
};

const safeData = (data: any) => {
  try {
    const s = typeof data === 'string' ? data : JSON.stringify(data);
    return s.length > 1000 ? `${s.slice(0, 1000)}…[truncated]` : s;
  } catch {
    return '[unserializable]';
  }
};

const log = (...args: any[]) => LOG_HTTP && console.log(...args);
const warn = (...args: any[]) => LOG_HTTP && console.warn(...args);
const error = (...args: any[]) => LOG_HTTP && console.error(...args);

// ===== Control de refresh y cola =====
let isRefreshing = false;
let failedRequestQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
  originalRequest: any;
}> = [];

// ===== Interceptor de REQUEST =====
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { metadata?: any }) => {
    const accessToken = Cookies.get('token_acceso');

    // Metadata para correlación y timing
    config.metadata = {
      id: ++REQ_COUNTER,
      start: Date.now(),
    };

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    log(
      `➡️  [${config.metadata.id}] ${config.method?.toUpperCase()} ${config.baseURL ?? ''}${config.url}`,
      '\nHeaders:', redactHeaders(config.headers),
      '\nParams:', config.params ?? {},
      '\nBody:', safeData((config as AxiosRequestConfig).data)
    );

    return config;
  },
  (err) => {
    error('❌ Error preparando request:', err?.message ?? err);
    return Promise.reject(err);
  }
);

// ===== Interceptor de RESPONSE =====
api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest: any = err?.config || {};
    const status = err?.response?.status;
    const data = err?.response?.data;

    // ⚠️ NO intentar refrescar contra el propio endpoint de refresh
    const isRefreshCall = originalRequest?.url?.includes('/refresh_token');

    // Detectar 401 o 403 por token inválido/ausente
    const looksLikeTokenError =
      status === 401 ||
      (status === 403 && (
        // heurística por mensaje común del backend
        typeof data?.error === 'string' && data.error.toLowerCase().includes('token')
      ));

    // Evitar loops
    if (looksLikeTokenError && !originalRequest._retry && !isRefreshCall) {
      if (isRefreshing) {
        // Encolar mientras se refresca
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            resolve: (token: string) => {
              try {
                originalRequest._retry = true;
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              } catch (e) {
                reject(e);
              }
            },
            reject,
            originalRequest,
          });
        });
      }

      // Iniciar refresh
      isRefreshing = true;
      try {
        const newAccessToken = await obtenerNuevoTokenAcceso();
        // Resolver encolados
        failedRequestQueue.forEach(({ resolve }) => resolve(newAccessToken));
        failedRequestQueue = [];

        // Reintentar request original
        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Falló el refresh → rechazar encolados y mandar a login
        failedRequestQueue.forEach(({ reject }) => reject(refreshError));
        failedRequestQueue = [];
        window.location.href = '/';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Otros 403 (no relacionados a token) → comportamiento actual
    if (status === 403 && !isRefreshCall) {
      window.location.href = '/';
    }

    return Promise.reject(err);
  }
);


export default api;
