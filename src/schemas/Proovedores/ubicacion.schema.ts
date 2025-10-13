// /src/Api/schemas/ubicacion.schema.ts
import { z } from "zod";
import { TrimmedStr, EmptyTrimToUndef } from "./primitives";

/**
 * Esquema de ubicación del proveedor (nombres BE).
 * Normalización mínima:
 * - Strings: trim.
 * - Vacíos ("") -> undefined donde corresponde (domicilio2, calle1, calle2).
 * - cpostal se guarda como string (por ahora).
 * - latitud/longitud se mantienen como string (formato BE) por ahora.
 */
export const UbicacionEsquema = z.object({
  domicilio1: TrimmedStr,
  domicilio2: EmptyTrimToUndef,   // puede venir vacío
  localidad: TrimmedStr,
  cpostal: TrimmedStr,            // si preferís número, lo cambiamos luego
  calle1: EmptyTrimToUndef,       // puede venir vacío
  calle2: EmptyTrimToUndef,       // puede venir vacío

  latitud: TrimmedStr,            // "0.0000000000" (string) — mantenemos string
  longitud: TrimmedStr,           // idem

  idcodprov: z.number(),          // número (provincia/código)
});

export type Ubicacion = z.infer<typeof UbicacionEsquema>;
