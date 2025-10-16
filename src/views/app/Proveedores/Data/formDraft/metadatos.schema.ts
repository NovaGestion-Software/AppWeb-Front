import { z } from "zod";

/**
 * Metadatos (FormDraft - UI)
 * Campos de control del registro.
 * En la mayoría de los casos no son editables por el usuario final.
 *
 * DB (resumen):
 * - inha: smallint (booleano 0/1)
 * - idnodo, icambio, ncambio: integer >= 0
 * - usuario_a/m/b: integer >= 0
 * - f_alta/f_modi/f_baja: timestamp, pueden ser null
 */
export const MetadatosFormDraft = z
  .object({
    inha: z.boolean().optional().catch(false), // en UI podría ser checkbox “inhabilitado”

    idnodo: z.coerce.number().int().nonnegative().optional().catch(0),

    icambio: z.coerce.number().int().nonnegative().optional().catch(0),
    ncambio: z.coerce.number().int().nonnegative().optional().catch(0),

    usuario_a: z.coerce.number().int().nonnegative().optional().catch(0),
    usuario_m: z.coerce.number().int().nonnegative().optional().catch(0),
    usuario_b: z.coerce.number().int().nonnegative().optional().catch(0),

    f_alta: z.string().trim().optional(),
    f_modi: z.string().trim().optional(),
    f_baja: z.string().trim().optional(),
  })
  .strip();

export type MetadatosDraft = z.infer<typeof MetadatosFormDraft>;


const yyyyMmDd = /^\d{4}-\d{2}-\d{2}/;

export const MetadatosFieldSchemas = {
  inha: z.union([z.boolean(), z.string(), z.number()]).transform((v) => {
    if (v === true || v === "true" || v === 1 || v === "1") return true;
    if (v === false || v === "false" || v === 0 || v === "0") return false;
    return Boolean(v);
  }),

  f_alta: z
    .string()
    .trim()
    .refine((s) => s === "" || yyyyMmDd.test(s), "Formato de fecha inválido"),
  f_modi: z
    .string()
    .trim()
    .refine((s) => s === "" || yyyyMmDd.test(s), "Formato de fecha inválido"),
  f_baja: z
    .string()
    .trim()
    .refine((s) => s === "" || yyyyMmDd.test(s), "Formato de fecha inválido"),
} as const;
