// /views/app/Proveedores/Data/adapters/proveedor.mappers.ts
import type { ProveedorDtoIn, ProveedorDtoOut } from "../dto";
import type { ProveedorDomain } from "../domain";

/**
 * Dominio/UI: mismas claves que el backend, pero:
 * - Flags (0/1) son booleanos reales.
 * - Fechas backend ("YYYY-MM-DD HH:mm:ss" | null) se representan como ISO string | undefined.
 *
 * No renombramos ninguna propiedad.
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

const BOOL01_KEYS: readonly Bool01Keys[] = [
  "exretbru",
  "exretgan",
  "exretiva",
  "f_dolares",
  "f_pesos",
  "inha",
] as const;

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

/** 0/1 (o null/undefined) -> boolean */
const bool01ToBool = (v: 0 | 1 | null | undefined): boolean => v === 1;

/** boolean (o null/undef) -> 0/1 */
const boolTo01 = (b: boolean | null | undefined): 0 | 1 => (b ? 1 : 0);

/** "YYYY-MM-DD HH:mm:ss" | null/undef -> ISO string | undefined  */
const backendToIso = (s: string | null | undefined): string | undefined => {
  if (!s) return undefined;
  const m = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/.exec(s);
  if (!m) return undefined;
  return `${m[1]}T${m[2]}`; // "YYYY-MM-DDTHH:mm:ss"
};

/** ISO string | undefined -> "YYYY-MM-DD HH:mm:ss" | null */
const isoToBackend = (iso: string | undefined): string | null => {
  if (!iso) return null;

  // Caso simple "YYYY-MM-DDTHH:mm:ss"
  const simple = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})$/.exec(iso);
  if (simple) return `${simple[1]} ${simple[2]}`;

  // ISO completo con ms/Z → lo normalizamos
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
 * Backend DTO -> Domain/UI
 * - Convierte flags 0/1 -> boolean
 * - Convierte fechas backend -> ISO-like (o undefined)
 * - Resto de campos, tal cual
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
 * Domain/UI -> Backend DTO OUT
 * - Convierte boolean -> 0/1
 * - Convierte ISO-like/undefined -> "YYYY-MM-DD HH:mm:ss" | null
 * - Resto de campos, tal cual
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
