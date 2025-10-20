/**
 * @module AdaptersProveedores
 *
 * Capa de adaptación entre el modelo **Domain/UI** y los **DTOs del backend**.
 *
 * Este módulo define las reglas de conversión y normalización para la entidad **Proveedor**:
 * - Convierte valores booleanos reales ↔ flags numéricos (0/1).
 * - Convierte fechas backend (`"YYYY-MM-DD HH:mm:ss"`) ↔ formato ISO (`"YYYY-MM-DDTHH:mm:ss"`).
 * - Mantiene la correspondencia exacta de claves con la base de datos (sin renombrar propiedades).
 *
 * Forma parte del flujo de datos:
 * **Domain/UI ↔ Adapters ↔ API ↔ Backend**
 *
 * @see ../repo/proveedores.repo.ts
 * @see ../api/proveedores.api.ts
 * @see ../domain
 * @see ../dto
 */

import type { ProveedorDtoIn, ProveedorDtoOut } from "../dto";
import type { ProveedorDomain } from "../domain";

/**
 * Define las claves del dominio que representan flags 0/1 en el backend.
 * En el modelo de dominio, estos campos son booleanos reales (`true`/`false`).
 */
type Bool01Keys =
  | "exretbru"
  | "exretgan"
  | "exretiva"
  | "f_dolares"
  | "f_pesos"
  | "idregbru"
  | "idreggan"
  | "idregiva"
  | "inha";

/**
 * Define las claves del dominio que representan fechas en formato backend.
 * En el modelo de dominio, se expresan como ISO string o `undefined`.
 */
type DateKeys =
  | "fecbru"
  | "feciva"
  | "fecgan"
  | "vtobru"
  | "vtoiva"
  | "vtogan"
  | "f_alta"
  | "f_modi"
  | "f_baja";

/* --------------------------------- Helpers --------------------------------- */

/**
 * Listado de claves booleanas (0/1 ↔ boolean).
 * Estas propiedades son las que deben convertirse entre el formato backend y el formato de dominio.
 */
const BOOL01_KEYS: readonly Bool01Keys[] = [
  "exretbru",
  "exretgan",
  "exretiva",
  "f_dolares",
  "f_pesos",
  "inha",
] as const;

/**
 * Listado de claves de fecha que requieren conversión de formato.
 * El backend usa `"YYYY-MM-DD HH:mm:ss"`, mientras que el dominio usa ISO-like (`"YYYY-MM-DDTHH:mm:ss"`).
 */
const DATE_KEYS: readonly DateKeys[] = [
  "fecbru",
  "feciva",
  "fecgan",
  "vtobru",
  "vtoiva",
  "vtogan",
  "f_alta",
  "f_modi",
  "f_baja",
] as const;

/**
 * Convierte un flag numérico (0/1 o nulo) a un valor booleano.
 *
 * @param {0 | 1 | null | undefined} v - Valor numérico proveniente del backend.
 * @returns {boolean} `true` si el valor es 1, de lo contrario `false`.
 */
const bool01ToBool = (v: 0 | 1 | null | undefined): boolean => v === 1;

/**
 * Convierte un valor booleano (o nulo) al flag 0/1 esperado por el backend.
 *
 * @param {boolean | null | undefined} b - Valor booleano del dominio.
 * @returns {0 | 1} `1` si es verdadero, `0` si es falso o indefinido.
 */
const boolTo01 = (b: boolean | null | undefined): 0 | 1 => (b ? 1 : 0);

/**
 * Convierte una fecha del backend (`"YYYY-MM-DD HH:mm:ss"`) a formato ISO (`"YYYY-MM-DDTHH:mm:ss"`).
 *
 * @param {string | null | undefined} s - Fecha proveniente del backend.
 * @returns {string | undefined} Fecha en formato ISO o `undefined` si no es válida.
 */
const backendToIso = (s: string | null | undefined): string | undefined => {
  if (!s) return undefined;
  const m = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/.exec(s);
  if (!m) return undefined;
  return `${m[1]}T${m[2]}`; // "YYYY-MM-DDTHH:mm:ss"
};

/**
 * Convierte una fecha ISO (`"YYYY-MM-DDTHH:mm:ss"`) a formato backend (`"YYYY-MM-DD HH:mm:ss"`).
 *
 * @param {string | undefined} iso - Fecha ISO desde el dominio.
 * @returns {string | null} Fecha en formato backend o `null` si no es válida.
 */
const isoToBackend = (iso: string | undefined): string | null => {
  if (!iso) return null;

  // Caso simple "YYYY-MM-DDTHH:mm:ss"
  const simple = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})$/.exec(iso);
  if (simple) return `${simple[1]} ${simple[2]}`;

  // ISO completo con ms/Z → se normaliza a formato backend
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const YYYY = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const DD = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());

  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};

/* ------------------------------- Mapper IN -> UI ---------------------------- */

/**
 * Transforma un DTO recibido del backend en un objeto de dominio listo para la UI.
 *
 * **Transformaciones aplicadas:**
 * - `0/1 → boolean`
 * - `"YYYY-MM-DD HH:mm:ss" → "YYYY-MM-DDTHH:mm:ss"`
 *
 * @function mapDtoToDomain
 * @param {ProveedorDtoIn} dto - Objeto DTO recibido del backend.
 * @returns {ProveedorDomain} Objeto de dominio normalizado para uso en la aplicación.
 */
export function mapDtoToDomain(dto: ProveedorDtoIn): ProveedorDomain {
  const out: Record<string, unknown> = { ...dto };

  for (const k of BOOL01_KEYS) {
    out[k] = bool01ToBool((dto as any)[k]);
  }

  for (const k of DATE_KEYS) {
    out[k] = backendToIso((dto as any)[k]);
  }

  return out as ProveedorDomain;
}

/* ------------------------------- Mapper UI -> OUT --------------------------- */

/**
 * Transforma un objeto de dominio (UI) en un DTO listo para envío al backend.
 *
 * **Transformaciones aplicadas:**
 * - `boolean → 0/1`
 * - `"YYYY-MM-DDTHH:mm:ss" → "YYYY-MM-DD HH:mm:ss"`
 *
 * @function mapDomainToDto
 * @param {ProveedorDomain} domain - Objeto del dominio a convertir.
 * @returns {ProveedorDtoOut} DTO adaptado al formato requerido por el backend PHP.
 */
export function mapDomainToDto(domain: ProveedorDomain): ProveedorDtoOut {
  const out: Record<string, unknown> = { ...domain };

  for (const k of BOOL01_KEYS) {
    out[k] = boolTo01((domain as any)[k]);
  }

  for (const k of DATE_KEYS) {
    out[k] = isoToBackend((domain as any)[k]);
  }

  return out as ProveedorDtoOut;
}
