import { z } from "zod";

export const RetencionesFormDraft = z
  .object({
    // Selects
    idregbru: z.number().optional(),
    idregiva: z.number().optional(),
    idreggan: z.number().optional(),

    // Flags
    exretbru: z.boolean().optional().catch(false),
    exretiva: z.boolean().optional().catch(false),
    exretgan: z.boolean().optional().catch(false),
    // Si quisieras blindar aun más: z.coerce.boolean().optional().catch(false)

    // Números de exención (opcionales)
    nexretbru: z.string().trim().max(10, "Máximo 10 caracteres").optional(),
    nexretiva: z.string().trim().max(10, "Máximo 10 caracteres").optional(),
    nexretgan: z.string().trim().max(10, "Máximo 10 caracteres").optional(),

    // Fechas (opcionales)
    fecbru: z.string().trim().optional(),
    feciva: z.string().trim().optional(),
    fecgan: z.string().trim().optional(),

    vtobru: z.string().trim().optional(),
    vtoiva: z.string().trim().optional(),
    vtoGan: z.string().trim().optional(), // 👈 si en tu DB es "vtogan", dejalo exactamente igual
  })
  .strip();

export type RetencionesDraft = z.infer<typeof RetencionesFormDraft>;

/** Validación por CAMPO (onChange/onBlur) */
const yyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;

export const RetencionesFieldSchemas = {
  // Selects (feedback básico)
  idregbru: z
    .union([ z.number()])
    .refine((s) => Number.isFinite(Number(s)) && Number(s) >= 0, "Seleccione un régimen de Brutos"),

  idregiva: z
    .union([z.number()])
    .refine((s) => Number.isFinite(Number(s)) && Number(s) >= 0, "Seleccione un régimen de IVA"),

  idreggan: z
    .union([z.number() ])
    .refine((s) => Number.isFinite(Number(s)) && Number(s) >= 0, "Seleccione un régimen de Ganancias"),

  // Flags: para checkbox no hace falta más, pero dejamos esquema por consistencia
  exretbru: z.union([z.boolean(), z.string(), z.number()]).transform((v) => {
    if (v === true || v === "true" || v === 1 || v === "1") return true;
    if (v === false || v === "false" || v === 0 || v === "0") return false;
    return Boolean(v);
  }),

  exretiva: z.union([z.boolean(), z.string(), z.number()]).transform((v) => {
    if (v === true || v === "true" || v === 1 || v === "1") return true;
    if (v === false || v === "false" || v === 0 || v === "0") return false;
    return Boolean(v);
  }),

  exretgan: z.union([z.boolean(), z.string(), z.number()]).transform((v) => {
    if (v === true || v === "true" || v === 1 || v === "1") return true;
    if (v === false || v === "false" || v === 0 || v === "0") return false;
    return Boolean(v);
  }),

  // Números de exención
  nexretbru: z.string().trim().max(10, "Máximo 10"),
  nexretiva: z.string().trim().max(10, "Máximo 10"),
  nexretgan: z.string().trim().max(10, "Máximo 10"),

  // Fechas (permitir vacío o YYYY-MM-DD)
  fecbru: z.string().trim().refine((s) => s === "" || yyyyMmDd.test(s), "Fecha inválida (YYYY-MM-DD)"),
  feciva: z.string().trim().refine((s) => s === "" || yyyyMmDd.test(s), "Fecha inválida (YYYY-MM-DD)"),
  fecgan: z.string().trim().refine((s) => s === "" || yyyyMmDd.test(s), "Fecha inválida (YYYY-MM-DD)"),

  vtobru: z.string().trim().refine((s) => s === "" || yyyyMmDd.test(s), "Fecha inválida (YYYY-MM-DD)"),
  vtoiva: z.string().trim().refine((s) => s === "" || yyyyMmDd.test(s), "Fecha inválida (YYYY-MM-DD)"),
  vtogan: z.string().trim().refine((s) => s === "" || yyyyMmDd.test(s), "Fecha inválida (YYYY-MM-DD)"),
} as const;
