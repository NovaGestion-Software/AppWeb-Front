// src/services/MercadoPagoService.ts

import { getEmpresa, getHomologacion } from "@/services/ApiPhpService";
import { apiVercel } from "../Utils/apiVercel";
import { useMercadoPagoStore } from "../Store/MercadoPagoStore";

export const MercadoPagoService = {
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
  async obtenerSucursales(userId: string, token?: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const res = await apiVercel.get(`/sucursales/${userId}`, {
      headers,
    });
    return res.data;
  },

  // Crear sucursal
  async crearSucursal(payload: any, token?: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const res = await apiVercel.post("/sucursales", payload, {
      headers,
    });
    return res.data;
  },

  // Obtener cajas (POS)
  async obtenerCajas(userId: string, token?: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const res = await apiVercel.get(`/cajas`, {
      params: { user_id: userId },
      headers,
    });
    console.log("Cajas obtenidas:", res.data);

    return res.data;
  },
  // Crear caja (POS)
  async crearCaja(payload: any, token?: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const res = await apiVercel.post("/cajas", payload, { headers });
    return res.data;
  },

  // Crear orden
  crearOrden(payload: any) {
    const token = useMercadoPagoStore.getState().token;

    return apiVercel.post("/ordenes", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // Obtener orden por ID
  async obtenerOrden(orderId: string, token: string) {
    const res = await apiVercel.get(`/ordenes/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
