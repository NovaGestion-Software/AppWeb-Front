// /src/api/proovedores.services.ts
import apiPhp from "@/lib/axiosPhp";
import { ProovedoresEsquema } from "@/schemas/Proovedores/proovedores.esquema";
import {
  getBaseSeleccionada,
  getEmpresa,
  getHomologacion,
  manejarErrorAxios,
} from "@/services/ApiPhpService";
import type { z } from "zod";

/** Tipado inferido desde el esquema Zod (una fila normalizada de proveedor) */
export type ProveedorData = z.infer<typeof ProovedoresEsquema>;

/** Respuesta PHP “envoltorio” típica */
interface ApiPhpResponse<T = unknown> {
  ok?: boolean;
  message?: string;
  data?: T;
}

/** Utilidad: arma el parámetro `_i` con empresa (_e) y homologación (_m) y extras opcionales */
function buildIParam(extra?: Record<string, unknown>) {
  const _e = getEmpresa();        // p.ej. "12"
  const _m = getHomologacion();   // p.ej. "homo"
  return encodeURIComponent(JSON.stringify({ _e, _m, ...(extra ?? {}) }));
}

/** Utilidad: arma la URL base con la “base seleccionada” */
function baseUrl(path: string) {
  const base = getBaseSeleccionada(); // p.ej. "apinovades"
  return `/${base}${path}`;
}

/**
 * 🔎 Busca un proveedor por su ID (idprovee)
 * Ejemplo final:
 *   /{base}/comunes/obtenerProveedor.php?_i={"_e":"12","_m":"homo","_id":21}
 */
// /src/api/proovedores.services.ts
export async function getProveedorById(id: number) {
  const url = baseUrl(`/comunes/obtenerProveedor.php?_i=${buildIParam({ _id: id })}`);

  try {
    const { data } = await apiPhp.get(url);
    console.log("🟢 Respuesta cruda obtenerProveedor:", data);

    const row = data?.data?.[0] ?? null;
    // ✅ devolver CRUDO para hidratar la store dinámicamente 1:1 con sus claves
    return row;
  } catch (err) {
    manejarErrorAxios(err, "Error al obtener proveedor por ID");
    throw err;
  }
}


/** ----------------------------- POST: Alta / Modificar ----------------------------- */

/** Body esperado por PHP para alta */
export interface AltaProveedorBody<Obj1 = unknown> {
  _a: "A";
  objt1: Obj1;   // objeto principal
  objt2: null;   // explícitamente null
}

/** Body esperado por PHP para modificar */
export interface ModificarProveedorBody<Obj1 = unknown, Obj2 = unknown> {
  _a: "M";
  objt1: Obj1;   // objeto principal
  objt2: Obj2;   // objeto secundario (cambios, detalle, etc.)
}

/** Respuesta tipificada para grabado (ajustar si PHP devuelve algo más específico) */
export interface GrabarProveedorResponse {
  ok: boolean;
  message?: string;
  // opcionalmente: id generado, conteos, etc.
  id?: number;
}

/** Endpoint común para “grabarProovedores” (misma URL, varía el body) */
function urlGrabarProveedores() {
  // Mismo formato en la URL: _i={"_e":"12","_m":"homo"}
  return baseUrl(`/comunes/grabarProovedores.php?_i=${buildIParam()}`);
}

/**
 * 🟢 Alta de proveedor
 * URL: /{base}/comunes/grabarProovedores.php?_i={"_e":"12","_m":"homo"}
 * Body:
 *  {
 *    "_a": "A",
 *    "objt1": objeto1,
 *    "objt2": null
 *  }
 */
export async function altaProveedor<Obj1 = unknown>(
  objeto1: Obj1
): Promise<GrabarProveedorResponse> {
  const url = urlGrabarProveedores();
  const body: AltaProveedorBody<Obj1> = {
    _a: "A",
    objt1: objeto1,
    objt2: null,
  };

  try {
    const { data } = await apiPhp.post<ApiPhpResponse<GrabarProveedorResponse>>(
      url,
      body
    );

    console.log("🟢 Respuesta cruda altaProveedor:", data);

    // Normalización mínima del envoltorio
    const ok = Boolean(data?.ok ?? true); // muchos PHP no envían ok, se asume true si no hay error HTTP
    return { ok, ...(data?.data ?? {}), message: data?.message };
  } catch (err) {
    manejarErrorAxios(err, "Error al dar de alta al proveedor");
    throw err;
  }
}

/**
 * 🟠 Modificar proveedor
 * URL: /{base}/comunes/grabarProovedores.php?_i={"_e":"12","_m":"homo"}
 * Body:
 *  {
 *    "_a": "M",
 *    "objt1": objeto1,
 *    "objt2": objeto2
 *  }
 */
export async function modificarProveedor<Obj1 = unknown, Obj2 = unknown>(
  objeto1: Obj1,
  objeto2: Obj2
): Promise<GrabarProveedorResponse> {
  const url = urlGrabarProveedores();
  const body: ModificarProveedorBody<Obj1, Obj2> = {
    _a: "M",
    objt1: objeto1,
    objt2: objeto2,
  };

  try {
    const { data } = await apiPhp.post<ApiPhpResponse<GrabarProveedorResponse>>(
      url,
      body
    );

    console.log("🟢 Respuesta cruda modificarProveedor:", data);

    const ok = Boolean(data?.ok ?? true);
    return { ok, ...(data?.data ?? {}), message: data?.message };
  } catch (err) {
    manejarErrorAxios(err, "Error al modificar proveedor");
    throw err;
  }
}
    