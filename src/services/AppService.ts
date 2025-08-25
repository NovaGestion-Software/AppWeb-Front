import { isAxiosError } from "axios";
import api from "../lib/axios";
import Cookies from "js-cookie";

export async function obtenerDashboardCards() {
  try {
    const { data } = await api("/obtener_dashboardcards");

    console.log("obtener_dashboardcards", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}

export async function obtenerDashboardGrafico() {
  try {
    const { data } = await api("/obtener_dashboardgrafico");
    console.log("/obtener_dashboardgrafico", data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}

export async function obtenerTortaCobranzasR() {
  try {
    const { data } = await api("/obtener_cobranzafon");
    console.log("/obtener_cobranzafon", data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}

export async function obtenerCajasSecciones() {
  try {
    const { data } = await api("/obtener_cajasseccion");

    console.log("obtener_cajasseccion", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.log(error);
      throw new Error("Error desconocido al obtener  secciones de cajas");
    }
  }
}

export async function obtenerCajasImportes() {
  try {
    const { data } = await api("/obtener_cajaimportes");
    console.log("obtener_cajaimportes", data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.log(error);
      throw new Error("Error desconocido al obtener las cajas");
    }
  }
}

// Función para obtener un nuevo token de acceso
export async function obtenerNuevoTokenAcceso() {
  const refreshToken = Cookies.get("token_refresh");
  if (!refreshToken) throw new Error("No hay refresh token disponible");
  console.log('pasasdo por funcion obtener nuevo token ')

  try {
    const response = await api.post("/refresh_token", { token_refresh: refreshToken });
    const { nuevo_token_acceso } = response.data;
    console.log("refresh", response);
    // Almacenar el nuevo token de acceso
    Cookies.set("token_acceso", nuevo_token_acceso, { expires: 1 });
    return nuevo_token_acceso;
  } catch (error) {
    console.error("Error al obtener el nuevo token de acceso:", error);
    throw error;
  }
}
