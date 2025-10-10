// /views/app/Proveedores/Data/services/proveedores.api.ts
import apiPhp from "@/lib/axiosPhp";
import {
  getBaseSeleccionada,
  getEmpresa,
  getHomologacion,
  manejarErrorAxios,
} from "@/services/ApiPhpService";
import {
  ProveedorDtoInResponseSchema,
  type ProveedorDtoIn,
  ProveedorDtoOutSchema,
  type ProveedorDtoOut,
} from "../dto";

/* ----------------------------------------------------------------------------
 * Utilidades reusadas del servicio anterior
 * ------------------------------------------------------------------------- */

function buildIParam(extra?: Record<string, unknown>) {
  const _e = getEmpresa();        // p.ej. "12"
  const _m = getHomologacion();   // p.ej. "homo"
  return encodeURIComponent(JSON.stringify({ _e, _m, ...(extra ?? {}) }));
}

function baseUrl(path: string) {
  const base = getBaseSeleccionada(); // p.ej. "apinovades"
  return `/${base}${path}`;
}

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

/**
 * 🔎 Obtiene UN proveedor por id (devuelve la fila cruda tipada y validada como DTO IN).
 * Mantiene 1:1 los nombres del backend.
 */
export async function apiObtenerProveedor(idprovee: number): Promise<ProveedorDtoIn | null> {
  const url = baseUrl(`/comunes/obtenerProveedor.php?_i=${buildIParam({ _id: idprovee })}`);

  try {
    const { data } = await apiPhp.get<ApiPhpResponse>(url);
    // Validamos el "envelope" y cada fila del array con Zod:
    const parsed = ProveedorDtoInResponseSchema.parse(data);
    const row = parsed.data?.[0] ?? null;
    // row ya está validado con ProveedorDtoInSchema dentro del response schema
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
  tabla: "proovedor";   // ⚠️ respetamos el nombre exacto que nos diste
  tipotabla: "1";
  proovedor: ProveedorDtoOut | null;
  proovedorori: ProveedorDtoOut | null;
}

/** Respuesta tipificada mínima (ajustable si PHP devuelve más) */
export interface GrabarDatosResponse {
  ok: boolean;
  message?: string;
  id?: number;
}

/** Utilidad interna: arma la URL base de grabarDatos con _id en _i cuando aplique */
function urlGrabarDatos(id?: number) {
  const iParam = (typeof id === "number")
    ? buildIParam({ _id: id })
    : buildIParam(); // alta podría no requerir _id
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
  const url = urlGrabarDatos(); // sin _id
  const body: GrabarDatosBody = {
    topera: "A",
    tabla: "proovedor",
    tipotabla: "1",
    proovedor: ensureDtoOut(nuevo),
    proovedorori: null,
  };

  console.log('datos nuevo',body.proovedor)
  try {
    const { data } = await apiPhp.post<ApiPhpResponse<GrabarDatosResponse>>(url, body);
    const ok = Boolean(data?.ok ?? true);
    return { ok, ...(data?.data ?? {}), message: data?.message };
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
export async function apiModificarProveedor(
  idprovee: number,
  original: ProveedorDtoOut,
  modificado: ProveedorDtoOut
): Promise<GrabarDatosResponse> {
  const url = urlGrabarDatos(idprovee);
  console.log('datos modificados')
  const body: GrabarDatosBody = {
    topera: "M",
    tabla: "proovedor",
    tipotabla: "1",
    proovedor: ensureDtoOut(original),
    proovedorori: ensureDtoOut(modificado),
  };
  console.log('datos modificados',body.proovedorori)

  try {
    const { data } = await apiPhp.post<ApiPhpResponse<GrabarDatosResponse>>(url, body);
    const ok = Boolean(data?.ok ?? true);
    return { ok, ...(data?.data ?? {}), message: data?.message };
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
export async function apiEliminarProveedor(
  idprovee: number,
  original: ProveedorDtoOut
): Promise<GrabarDatosResponse> {
  const url = urlGrabarDatos(idprovee);
  const body: GrabarDatosBody = {
    topera: "E",
    tabla: "proovedor",
    tipotabla: "1",
    proovedor: ensureDtoOut(original),
    proovedorori: null,
  };

  try {
    const { data } = await apiPhp.post<ApiPhpResponse<GrabarDatosResponse>>(url, body);
    const ok = Boolean(data?.ok ?? true);
    return { ok, ...(data?.data ?? {}), message: data?.message };
  } catch (err) {
    manejarErrorAxios(err, "Error al eliminar el proveedor");
    throw err;
  }
}
