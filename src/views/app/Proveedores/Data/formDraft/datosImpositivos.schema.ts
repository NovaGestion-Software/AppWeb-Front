// /src/Api/schemas/datosImpositivos.schema.ts
import { z } from "zod";

/**
 * Datos Impositivos (FormDraft - UI)
 * Permite edición parcial y tipado flexible para inputs/selects.
 * Se ajusta a límites de la DB pero sin bloquear tipeo.
 */
export const DatosImpositivosFormDraft = z
  .object({
    idctrib: z.coerce.number().int().nonnegative().optional().catch(0), // select
    idtdoc: z.coerce.number().int().nonnegative().optional().catch(0),  // select
    cuit: z.string().trim().max(11, "Máximo 11 dígitos").optional(),
    ibruto: z.string().trim().max(11, "Máximo 11 caracteres").optional(),
  })
  .strip();

export type DatosImpositivosDraft = z.infer<typeof DatosImpositivosFormDraft>;


/**
 * Validación por CAMPO (onChange/onBlur)
 * Da feedback inmediato sobre formato o longitud.
 */
const onlyDigits = /^\d*$/;

export const DatosImpositivosFieldSchemas = {
  idctrib: z
    .union([z.string(), z.number()])
    .transform((v) => String(v ?? "").replace(/\D+/g, ""))
    .transform((s) => (s === "" ? "0" : s))
    .refine((s) => Number.isFinite(Number(s)) && Number(s) >= 0, "Seleccione condición tributaria válida"),

  idtdoc: z
    .union([z.string(), z.number()])
    .transform((v) => String(v ?? "").replace(/\D+/g, ""))
    .transform((s) => (s === "" ? "0" : s))
    .refine((s) => Number.isFinite(Number(s)) && Number(s) >= 0, "Seleccione tipo de documento válido"),

  cuit: z
    .string()
    .trim()
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .max(11, "Máximo 11 dígitos"),

  ibruto: z
    .string()
    .trim()
    .refine((s) => s === "" || /^[A-Za-z0-9]+$/.test(s), "Solo letras o números")
    .max(11, "Máximo 11 caracteres"),
} as const;
