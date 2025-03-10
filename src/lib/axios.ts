import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'x-client': 'web',
  },
});

let isRefreshing = false; // Bandera para evitar bucles infinitos
let failedRequestQueue: any[] = [];

api.interceptors.response.use(
  (response) => response, // Respuesta exitosa
  async (error) => {
    const originalRequest = error.config;

    // 401: Token expirado, usar refresh token
    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        const newAccessToken = await obtenerNuevoTokenAcceso();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Reintentar solicitud original con el nuevo token
      } catch (refreshError) {
        console.error('Error al obtener nuevo token:', refreshError);
        // Si el refresh token también ha caducado, redirigir a login
        window.location.href = '/';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        failedRequestQueue.forEach((callback) => callback());
        failedRequestQueue = []; // Limpiar la cola
      }
    }

    // 403: No hay access token
    if (error.response && error.response.status === 403) {
      console.log('Token inválido o no disponible');
      // Redirigir al login si no hay un token válido
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('token_acceso');
    // console.log('Token acceso: ', accessToken)
    if (accessToken) {
      // console.log('Token enviado:', accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para obtener un nuevo token de acceso
const obtenerNuevoTokenAcceso = async () => {
  const refreshToken = Cookies.get('token_refresh');
  if (!refreshToken) throw new Error('No hay refresh token disponible');

  try {
    const response = await api.post('/refresh_token', { token_refresh: refreshToken });
    const { nuevo_token_acceso } = response.data;

    // Almacenar el nuevo token de acceso
    Cookies.set('token_acceso', nuevo_token_acceso, { expires: 1 });
    return nuevo_token_acceso;
  } catch (error) {
    console.error('Error al obtener el nuevo token de acceso:', error);
    throw error;
  }
};

export default api;
