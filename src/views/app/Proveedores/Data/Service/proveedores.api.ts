/**
 * @module APIProveedores
 *
 * Capa de comunicación directa con el backend PHP para la entidad **Proveedor**.
 *
 * Este módulo define las operaciones HTTP de bajo nivel que interactúan con el endpoint
 * `grabarDatos.php` y otros relacionados (`obtenerProveedor.php`).
 *
 * Responsabilidades principales:
 * - Ejecutar peticiones HTTP utilizando `axiosPhp`.
 * - Validar las estructuras de entrada y salida mediante Zod (`ProveedorDtoIn` / `ProveedorDtoOut`).
 * - Mantener el contrato exacto del backend, respetando nombres de campos (`proovedor`, `topera`, etc.).
 * - Proveer funciones CRUD (`apiAltaProveedor`, `apiModificarProveedor`, `apiEliminarProveedor`, `apiObtenerProveedor`).
 *
 * Esta capa **no debe contener lógica de negocio ni transformaciones**.
 * Dicha lógica pertenece al módulo `RepositorioProveedores`.
 *
 * @see ../repo/proveedores.repo.ts
 * @see ../dto
 * @see ../domain
 */

import apiPhp from "@/lib/axiosPhp";
import { ProveedorDtoInResponseSchema, type ProveedorDtoIn, ProveedorDtoOutSchema, type ProveedorDtoOut } from "../dto";
import { baseUrl, buildIParam, manejarErrorAxios } from "@/services/utils/helpers";

/* ----------------------------------------------------------------------------
 * Tipos de respuesta "envoltorio" PHP (genéricos)
 * ------------------------------------------------------------------------- */

/**
 * Representa la estructura genérica de las respuestas enviadas por los endpoints PHP.
 * @template T Tipo de datos contenido en la propiedad `data`.
 */
interface ApiPhpResponse<T = unknown> {
  /** Indicador genérico de éxito del backend (puede ser `true` o `false`). */
  ok?: boolean;
  /** Mensaje informativo o de error retornado por PHP. */
  message?: string;
  /** Datos específicos de la respuesta. */
  data?: T;
  /** Código numérico adicional o personalizado del backend. */
  code?: number;
  /** Estado textual devuelto por PHP (ej. "success" o "error"). */
  status?: string;
}

/* ----------------------------------------------------------------------------
 * GET: obtenerProveedor
 * ------------------------------------------------------------------------- */

/**
 * Obtiene los datos completos de un proveedor por su ID.
 *
 * @async
 * @function apiObtenerProveedor
 * @param {number} idprovee - ID del proveedor a obtener.
 * @returns {Promise<ProveedorDtoIn | null>} Promesa que resuelve con el proveedor si existe, o `null` si no se encontró.
 * @throws {ZodError | AxiosError} Si la validación de esquema o la solicitud HTTP fallan.
 */
export async function apiObtenerProveedor(idprovee: number): Promise<ProveedorDtoIn | null> {
  const url = baseUrl(`/comunes/obtenerProveedor.php?_i=${buildIParam({ _id: idprovee })}`);

  try {
    const { data } = await apiPhp.get<ApiPhpResponse>(url);
    const parsed = ProveedorDtoInResponseSchema.parse(data);
    const row = parsed.data?.[0] ?? null;
    return row;
  } catch (err) {
    manejarErrorAxios(err, "Error al obtener proveedor por ID");
    throw err;
  }
}

/* ----------------------------------------------------------------------------
 * POST: grabarDatos (Alta / Modificación / Eliminación)
 * ------------------------------------------------------------------------- */

/**
 * Tipos válidos para el campo `topera` del body.
 * - `"A"`: Alta (insertar)
 * - `"M"`: Modificar (update)
 * - `"E"`: Eliminar (delete)
 */
type Topera = "A" | "M" | "E";

/**
 * Cuerpo del request esperado por el endpoint `grabarDatos.php`.
 * Representa la estructura exacta del contrato PHP.
 */
interface GrabarDatosBody {
  /** Tipo de operación (A=Alta, M=Modificación, E=Eliminación). */
  topera: Topera;
  /** Nombre de la tabla objetivo (mantiene la convención exacta del backend). */
  tabla: "proovedor";
  /** Tipo de tabla, definido por el backend (en este caso fijo en `"1"`). */
  tipotabla: "1";
  /** Datos principales del proveedor (original o nuevos). */
  proovedor: ProveedorDtoOut | null;
  /** Datos modificados del proveedor o `null` si no aplica. */
  proovedorori: ProveedorDtoOut | null;
}

/**
 * Tipo genérico para datos adicionales retornados por el backend al grabar datos.
 */
type GrabarDatosResponseData = Record<string, unknown>;

/**
 * Estructura de la respuesta tipificada del endpoint `grabarDatos.php`.
 */
export type GrabarDatosResponse = {
  /** Indica si la operación fue exitosa. */
  ok: boolean;
  /** Código de estado HTTP. */
  status: number;
  /** Mensaje opcional del backend. */
  message?: string;
} & GrabarDatosResponseData;

/**
 * Genera la URL base para el endpoint `grabarDatos.php`, incluyendo el parámetro `_i` con `_id` si corresponde.
 *
 * @param {number} [id] - ID del proveedor (opcional, no requerido para altas).
 * @returns {string} URL completa del endpoint PHP con parámetros.
 */
function urlGrabarDatos(id?: number): string {
  const iParam = typeof id === "number" ? buildIParam({ _id: `${id}` }) : buildIParam(); // alta podría no requerir _id
  return baseUrl(`/comunes/grabarDatos.php?_i=${iParam}`);
}

/* ----------------------------------------------------------------------------
 * Helpers de validación (Zod)
 * ------------------------------------------------------------------------- */

/**
 * Verifica que el DTO de salida (`ProveedorDtoOut`) cumpla con el esquema
 * definido para las operaciones de envío al backend.
 *
 * @param {ProveedorDtoOut | null} dto - Objeto DTO a validar o `null`.
 * @returns {ProveedorDtoOut | null} El mismo DTO validado o `null`.
 * @throws {ZodError} Si el DTO no cumple con el esquema.
 */
function ensureDtoOut(dto: ProveedorDtoOut | null): ProveedorDtoOut | null {
  if (dto === null) return null;
  return ProveedorDtoOutSchema.parse(dto);
}

/* ----------------------------------------------------------------------------
 * Operaciones CRUD sobre `grabarDatos`
 * ------------------------------------------------------------------------- */

/**
 * 🟢 Crea un nuevo proveedor.
 *
 * - `topera = "A"`
 * - `proovedor`: datos nuevos a insertar
 * - `proovedorori`: `null`
 * - No requiere `_id` en la URL
 *
 * @async
 * @function apiAltaProveedor
 * @param {ProveedorDtoOut} nuevo - Datos del proveedor a crear.
 * @returns {Promise<GrabarDatosResponse>} Resultado de la operación.
 * @throws {AxiosError | ZodError} Si la validación o la solicitud fallan.
 */
export async function apiAltaProveedor(nuevo: ProveedorDtoOut): Promise<GrabarDatosResponse> {
  const url = urlGrabarDatos();
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
 * 🟠 Modifica un proveedor existente.
 *
 * - `topera = "M"`
 * - `proovedor`: datos originales (antes del cambio)
 * - `proovedorori`: datos modificados (después del cambio)
 * - Requiere `_id` en la URL
 *
 * @async
 * @function apiModificarProveedor
 * @param {number} idprovee - ID del proveedor a modificar.
 * @param {ProveedorDtoOut} original - Datos originales del proveedor.
 * @param {ProveedorDtoOut} modificado - Datos actualizados del proveedor.
 * @returns {Promise<GrabarDatosResponse>} Resultado de la operación.
 * @throws {AxiosError | ZodError} Si ocurre un error en la solicitud o validación.
 */
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
      status,
      ...(payload?.data ?? {}),
      message: payload?.message,
    };
  } catch (err) {
    manejarErrorAxios(err, "Error al modificar el proveedor");
    throw err;
  }
}

/**
 * 🔴 Elimina un proveedor existente.
 *
 * - `topera = "E"`
 * - `proovedor`: datos originales del registro a eliminar
 * - `proovedorori`: `null`
 * - Requiere `_id` en la URL
 *
 * @async
 * @function apiEliminarProveedor
 * @param {number} idprovee - ID del proveedor a eliminar.
 * @param {ProveedorDtoOut} original - Datos originales del proveedor.
 * @returns {Promise<GrabarDatosResponse>} Resultado de la operación.
 * @throws {AxiosError | ZodError} Si ocurre un error en la solicitud o validación.
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
