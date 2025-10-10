// /src/Api/schemas/metadatos.schema.ts
import { z } from "zod";
import { Bool01, DateStrNullToUndef } from "./primitives";

/**
 * Esquema de metadatos (nombres BE).
 * - inha: 0/1 -> boolean
 * - idnodo: number
 * - icambio: number
 * - ncambio: number
 * - usuario_a / usuario_m / usuario_b: number
 * - f_alta / f_modi / f_baja: string|null -> string|undefined (sin reformatear)
 */
export const MetadatosEsquema = z.object({
  inha: Bool01,            // 0/1 ⇢ boolean
  idnodo: z.number(),
  icambio: z.number(),
  ncambio: z.number(),

  usuario_a: z.number(),   // ID usuario alta
  usuario_m: z.number(),   // ID usuario modificación
  usuario_b: z.number(),   // ID usuario baja

  f_alta: DateStrNullToUndef,  // "2016-07-11 00:00:00" -> "2016-07-11 00:00:00"
  f_modi: DateStrNullToUndef,  // "2010-07-06 00:00:00" -> "2010-07-06 00:00:00"
  f_baja: DateStrNullToUndef,  // null -> undefined
});

export type Metadatos = z.infer<typeof MetadatosEsquema>;
