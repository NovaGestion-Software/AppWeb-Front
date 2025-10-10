// /src/Api/schemas/identificacion.schema.ts
import { z } from "zod";
import { TrimmedStr, NullableTrimToUndef } from "./primitives";

/**
 * Esquema de identificación del proveedor (nombres de claves BE).
 * - idprovee: number
 * - nombre: string (trim)
 * - nfantasia: string|undefined (trim + null a undefined)
 */
export const IdentificacionEsquema = z.object({
  idprovee: z.number(),
  nombre: TrimmedStr,
  nfantasia: NullableTrimToUndef,
});

export type Identificacion = z.infer<typeof IdentificacionEsquema>;
