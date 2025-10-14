import { apiVercel } from "../Utils/apiVercel";
import { useMercadoPagoStore } from "../Store/MercadoPagoStore";
import { getEmpresa, getHomologacion } from "@/services/utils/helpers";

// 🔧 Utilidad para construir los headers con token y userId
function buildAuthHeaders(token?: string, userId?: string) {
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token.replace(/^Bearer\s+/i, "")}`;
  }

  if (userId) {
    headers["x-user-id"] = userId;
  }

  return headers;
}

export const MercadoPagoService = {
  // Obtener token automático por homologación
  async obtenerToken() {
    const homologacion = getHomologacion();
    const empresa = getEmpresa();

    const res = await apiVercel.get(`/auth/token`, {
      params: {
        _e: empresa,
        _m: homologacion,
      },
    });

    return res.data;
  },

  // Obtener sucursales
  async obtenerSucursales(userIdParam?: string, tokenParam?: string) {
    const store = useMercadoPagoStore.getState();
    const userId = userIdParam || store.userId;
    const token = tokenParam || store.token;

    if (!userId) throw new Error("userId no disponible");

    const headers = buildAuthHeaders(token ?? undefined, userId ?? undefined);

    const res = await apiVercel.get(`/sucursales/${userId}`, { headers });

    return res.data;
  },

  // Crear sucursal
  async crearSucursal(payload: any, tokenParam?: string, userIdParam?: string) {
    const store = useMercadoPagoStore.getState();
    const token = tokenParam || store.token;
    const userId = userIdParam || store.userId;

    const headers = buildAuthHeaders(token ?? undefined, userId ?? undefined);

    const res = await apiVercel.post("/sucursales", payload, { headers });

    return res.data;
  },

  // Obtener cajas (POS)
  async obtenerCajas(userIdParam?: string, tokenParam?: string) {
    const store = useMercadoPagoStore.getState();
    const userId = userIdParam || store.userId;
    const token = tokenParam || store.token;

    if (!userId) throw new Error("userId no disponible");

    const headers = buildAuthHeaders(token ?? undefined, userId ?? undefined);

    const res = await apiVercel.get("/cajas", {
      params: { user_id: userId },
      headers,
    });

    console.log("Cajas obtenidas:", res.data);
    return res.data;
  },

  // Crear caja (POS)
  async crearCaja(payload: any, tokenParam?: string, userIdParam?: string) {
    const store = useMercadoPagoStore.getState();
    const token = tokenParam || store.token;
    const userId = userIdParam || store.userId;

    const headers = buildAuthHeaders(token ?? undefined, userId ?? undefined);

    const res = await apiVercel.post("/cajas", payload, { headers });

    return res.data;
  },

  // Crear orden
  async crearOrden(payload: any, tokenParam?: string, userIdParam?: string) {
    const store = useMercadoPagoStore.getState();
    const token = tokenParam || store.token;
    const userId = userIdParam || store.userId;

    if (!token) throw new Error("Token no disponible para crear orden");

    const headers = buildAuthHeaders(token ?? undefined, userId ?? undefined);

    const res = await apiVercel.post("/ordenes", payload, { headers });
    return res.data;
  },

  // Obtener orden por ID
  async obtenerOrden(orderId: string, tokenParam?: string, userIdParam?: string) {
    const store = useMercadoPagoStore.getState();
    const token = tokenParam || store.token;
    const userId = userIdParam || store.userId;

    const headers = buildAuthHeaders(token ?? undefined, userId ?? undefined);

    const res = await apiVercel.get(`/ordenes/${orderId}`, { headers });
    console.log("obtenido", res.data);

    return res.data;
  },
};
