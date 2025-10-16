// /views/app/Proveedores/Data/services/proveedores.api.ts
import apiPhp from "@/lib/axiosPhp";

import { ProveedorDtoInResponseSchema, type ProveedorDtoIn, ProveedorDtoOutSchema, type ProveedorDtoOut } from "../dto";
import { baseUrl, buildIParam, manejarErrorAxios } from "@/services/utils/helpers";

/* ----------------------------------------------------------------------------
 * Tipos de respuesta "envoltorio" PHP (genéricos)
 * ------------------------------------------------------------------------- */

interface ApiPhpResponse<T = unknown> {
  ok?: boolean;
  message?: string;
  data?: T;
  code?: number;
  status?: string;
}

/* ----------------------------------------------------------------------------
 * GET: obtenerProveedor (SIN cambios de endpoint)
 * ------------------------------------------------------------------------- */

export async function apiObtenerProveedor(idprovee: number): Promise<ProveedorDtoIn | null> {
  const url = baseUrl(`/comunes/obtenerProveedor.php?_i=${buildIParam({ _id: idprovee })}`);

  try {
    const { data } = await apiPhp.get<ApiPhpResponse>(url);
    console.log("data", data);
    const parsed = ProveedorDtoInResponseSchema.parse(data);
    console.log("parsed", parsed);

    const row = parsed.data?.[0] ?? null;
    return row;
  } catch (err) {
    manejarErrorAxios(err, "Error al obtener proveedor por ID");
    throw err;
  }
}

/* ----------------------------------------------------------------------------
 * POST: grabarDatos (NUEVO esquema)
 * Endpoint:
 *   https://apiphp.novagestion.com.ar/apinovades/comunes/grabarDatos.php
 *   ?_i={"_e":"12","_m":"homo","_id":21}
 *
 * Body:
 * {
 *   "topera": "<A|M|E>",
 *   "tabla": "proovedor",
 *   "tipotabla": "1",
 *   "proovedor": { ... },        // data original
 *   "proovedorori": { ... }      // data modificada: null en ELIMINAR o null en ALTA
 * }
 * ------------------------------------------------------------------------- */

type Topera = "A" | "M" | "E";

/** Por consistencia, dejamos el tipo fuerte del body esperado por PHP */
interface GrabarDatosBody {
  topera: Topera;
  tabla: "proovedor"; // ⚠️ respetamos el nombre exacto que nos diste
  tipotabla: "1";
  proovedor: ProveedorDtoOut | null;
  proovedorori: ProveedorDtoOut | null;
}

/** Respuesta tipificada mínima (ajustable si PHP devuelve más) */
type GrabarDatosResponseData = Record<string, unknown>; // payload extra del backend (si hay)
export type GrabarDatosResponse = {
  ok: boolean;
  status: number; // ← clave para distinguir 200/204
  message?: string;
} & GrabarDatosResponseData;

/** Utilidad interna: arma la URL base de grabarDatos con _id en _i cuando aplique */
function urlGrabarDatos(id?: number) {
  const iParam = typeof id === "number" ? buildIParam({ _id: `${id}` }) : buildIParam(); // alta podría no requerir _id
  return baseUrl(`/comunes/grabarDatos.php?_i=${iParam}`);
}

/* ----------------------------------------------------------------------------
 * Helpers de envío (centralizan validación Zod del DTO OUT)
 * ------------------------------------------------------------------------- */

/** Asegura que el DTO que enviamos respete exactamente el contrato del backend */
function ensureDtoOut(dto: ProveedorDtoOut | null): ProveedorDtoOut | null {
  if (dto === null) return null;
  return ProveedorDtoOutSchema.parse(dto);
}

/* ----------------------------------------------------------------------------
 * Operaciones CRUD de alto nivel sobre grabarDatos
 * ------------------------------------------------------------------------- */

/**
 * 🟢 Alta
 * - `topera = "A"`
 * - `proovedor`: datos NUEVOS a insertar
 * - `proovedorori`: null
 * - URL _i sin `_id` (salvo que el backend lo exija)
 */
export async function apiAltaProveedor(nuevo: ProveedorDtoOut): Promise<GrabarDatosResponse> {
  const url = urlGrabarDatos(); // sin _id (alta)
  const body: GrabarDatosBody = {
    topera: "A",
    tabla: "proovedor",
    tipotabla: "1",
    proovedor: ensureDtoOut(nuevo),
    proovedorori: null,
  };

  try {
    const resp = await apiPhp.post<ApiPhpResponse<unknown>>(url, body);
    const { status } = resp;
    const payload = resp.data;

    const ok = Boolean(payload?.ok ?? (status >= 200 && status < 300));

    return {
      ok,
      status,
      ...(payload?.data ?? {}),
      message: payload?.message,
    };
  } catch (err) {
    manejarErrorAxios(err, "Error al dar de alta el proveedor");
    throw err;
  }
}
/**
 * 🟠 Modificar
 * - `topera = "M"`
 * - `proovedor`: datos ORIGINALES (antes del cambio)
 * - `proovedorori`: datos MODIFICADOS (después del cambio)
 * - URL _i con `_id` (id del registro a modificar)
 */

// api/proveedores.api.ts (o donde esté)
export async function apiModificarProveedor(idprovee: number, original: ProveedorDtoOut, modificado: ProveedorDtoOut): Promise<GrabarDatosResponse> {
  const url = urlGrabarDatos(idprovee);

  const body: GrabarDatosBody = {
    topera: "M",
    tabla: "proovedor",
    tipotabla: "1",
    proovedor: ensureDtoOut(original),
    proovedorori: ensureDtoOut(modificado),
  };

  try {
    const resp = await apiPhp.post<ApiPhpResponse<GrabarDatosResponseData>>(url, body);
    const { status } = resp;
    const payload = resp.data;

    const ok = Boolean(payload?.ok ?? (status >= 200 && status < 300));

    return {
      ok,
      status, // ← devolvemos status
      ...(payload?.data ?? {}),
      message: payload?.message,
    };
  } catch (err) {
    manejarErrorAxios(err, "Error al modificar el proveedor");
    throw err;
  }
}

/**
 * 🔴 Eliminar
 * - `topera = "E"`
 * - `proovedor`: datos ORIGINALES (el registro a eliminar)
 * - `proovedorori`: null
 * - URL _i con `_id`
 */
export async function apiEliminarProveedor(idprovee: number, original: ProveedorDtoOut): Promise<GrabarDatosResponse> {
  const url = urlGrabarDatos(idprovee);
  const body: GrabarDatosBody = {
    topera: "E",
    tabla: "proovedor",
    tipotabla: "1",
    proovedor: ensureDtoOut(original),
    proovedorori: null,
  };

  try {
    const resp = await apiPhp.post<ApiPhpResponse<unknown>>(url, body);
    const { status } = resp;
    const payload = resp.data;

    const ok = Boolean(payload?.ok ?? (status >= 200 && status < 300));

    return {
      ok,
      status,
      ...(payload?.data ?? {}),
      message: payload?.message,
    };
  } catch (err) {
    manejarErrorAxios(err, "Error al eliminar el proveedor");
    throw err;
  }
}
