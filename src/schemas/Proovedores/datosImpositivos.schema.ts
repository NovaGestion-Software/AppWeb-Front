// /src/Api/schemas/datosImpositivos.schema.ts
import { z } from "zod";
import { TrimmedStr,  } from "./primitives";

/**
 * Datos Impositivos (nombres BE)
 * - ibruto: string con trim (se conserva tal cual, incluyendo dígitos)
 * - idctrib: 1 (RI), 2 (EXENTO), 3/4 reservados (se admiten para no romper)
 * - idtdoc: 0 (CUIT), 1 (CUIL), 2 (DNI)
 * - cuit: string con trim (si más adelante querés validar sólo dígitos/longitud, lo agregamos)
 */
export const DatosImpositivosEsquema = z.object({
  ibruto: TrimmedStr, // "250221606  " -> "250221606"
  idctrib: z.number(),
  idtdoc: z.number(),
  cuit: TrimmedStr,   // "20924399725" -> "20924399725"
});

export type DatosImpositivos = z.infer<typeof DatosImpositivosEsquema>;
