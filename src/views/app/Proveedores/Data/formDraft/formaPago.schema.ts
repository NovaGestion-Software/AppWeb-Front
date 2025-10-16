// /schemas/Proovedores/formaPago.schema.ts
import { z } from "zod";

/**
 * Forma de Pago (FormDraft - UI)
 * - Permite edición parcial (strings vacíos, números como texto, etc.)
 * - Recorta espacios en strings y limita longitudes según DB
 * - Coacciona selects/inputs numéricos a number (con defaults suaves)
 */
export const FormaPagoFormDraft = z
  .object({
    fpago: z.string().trim().max(40, "Máximo 40 caracteres").optional(),

    // días: permitir string/number en UI; asegurar enteros >= 0
    dias_p: z.coerce.number().int().min(0, "Debe ser ≥ 0").optional().catch(0),
    dias_v: z.coerce.number().int().min(0, "Debe ser ≥ 0").optional().catch(0),
    dias_e: z.coerce.number().int().min(0, "Debe ser ≥ 0").optional().catch(0),

    obs: z.string().trim().max(200, "Máximo 200 caracteres").optional(),

    // flags de moneda (checkbox en UI)
    f_pesos: z.boolean().optional().catch(false),
    f_dolares: z.boolean().optional().catch(false),
  })
  .strip();

export type FormaPagoDraft = z.infer<typeof FormaPagoFormDraft>;

/**
 * Validación por CAMPO (onChange/onBlur)
 * - Feedback inmediato sin bloquear tipeo
 */
const onlyDigits = /^\d*$/;

export const FormaPagoFieldSchemas = {
  fpago: z.string().trim().max(40, "Máximo 40 caracteres"),

  dias_p: z
    .union([z.string(), z.number()])
    .transform((v) => String(v ?? "").trim())
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .refine((s) => s === "" || Number(s) >= 0, "Debe ser ≥ 0"),

  dias_v: z
    .union([z.string(), z.number()])
    .transform((v) => String(v ?? "").trim())
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .refine((s) => s === "" || Number(s) >= 0, "Debe ser ≥ 0"),

  dias_e: z
    .union([z.string(), z.number()])
    .transform((v) => String(v ?? "").trim())
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .refine((s) => s === "" || Number(s) >= 0, "Debe ser ≥ 0"),

  obs: z.string().trim().max(200, "Máximo 200 caracteres"),

  // Para checkboxes basta boolean, pero dejamos esquema por consistencia
  f_pesos: z.union([z.boolean(), z.string(), z.number()]).transform((v) => {
    if (v === true || v === "true" || v === 1 || v === "1") return true;
    if (v === false || v === "false" || v === 0 || v === "0") return false;
    return Boolean(v);
  }),
  f_dolares: z.union([z.boolean(), z.string(), z.number()]).transform((v) => {
    if (v === true || v === "true" || v === 1 || v === "1") return true;
    if (v === false || v === "false" || v === 0 || v === "0") return false;
    return Boolean(v);
  }),
} as const;
