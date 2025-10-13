// 🧩 Helpers compartidos

import { isAxiosError } from "axios";

export function getUser() {
  return JSON.parse(localStorage.getItem("_u") || "{}");
}

export function getEmpresa(): string {
  const user = getUser();
  return user.empresa?.toString().slice(-2);
}

export function getBaseSeleccionada(): string {
  const entorno = localStorage.getItem("_ce") || "development";
  return entorno === "development" ? "apinovades" : "apinova";
}

export function getHomologacion(clave = "_m"): string {
  return localStorage.getItem(clave) || "homo";
}

export function manejarErrorAxios(error: unknown, mensajeDefault: string) {
  if (isAxiosError(error)) {
    console.error("🔴 Axios error");
    console.error("👉 Mensaje:", error.message);
    if (error.response) {
      console.error("👉 Status:", error.response.status);
      console.error("👉 Data:", error.response.data);
      throw new Error(error.response.data?.error || mensajeDefault);
    } else if (error.request) {
      console.error("👉 Request enviada pero sin respuesta");
    }
  } else {
    console.error("🟠 Error desconocido:", error);
  }
  throw new Error(mensajeDefault);
}

export function buildIParam(extra?: Record<string, unknown>) {
  const _e = getEmpresa();
  const _m = getHomologacion();
  return encodeURIComponent(JSON.stringify({ _e, _m, ...(extra ?? {}) }));
}

export function baseUrl(path: string) {
  const base = getBaseSeleccionada();
  return `/${base}${path}`;
}