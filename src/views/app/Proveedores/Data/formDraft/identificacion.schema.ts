import { z } from "zod";

/**
 * Identificación (FormDraft - UI)
 * - Permite escritura parcial
 * - Coerciona tipos comunes de inputs
 * - Aplica límites de longitud según la DB
 * - Se recomienda .strip() para descartar claves extra
 */
/** Draft UI (permite parcial) */
export const IdentificacionFormDraft = z
  .object({
    // DB: integer ≥ 0 | UI: aceptar string/number y coaccionar
    idprovee: z.coerce.number().int().nonnegative().optional().catch(0),

    // DB: requerido 1..50 | UI draft: permitir vacío pero recortar y limitar
    nombre: z.string().trim().max(50, "Máximo 50 caracteres").optional(),

    // DB: requerido 1..50 | UI draft: permitir vacío pero recortar y limitar
    nfantasia: z.string().trim().max(50, "Máximo 50 caracteres").optional(),
  })
  .strip();

export type IdentificacionDraft = z.infer<typeof IdentificacionFormDraft>;

/** Validación por campo (para onChange/onBlur) */
export const IdentificacionFieldSchemas = {
  idprovee: z
    .union([z.string(), z.number()])
    .transform((v) => String(v ?? "").replace(/\D+/g, ""))
    .transform((s) => (s === "" ? "0" : s))
    .refine((s) => Number(s) >= 0, "Debe ser un número ≥ 0"),

  nombre: z.string().trim().min(1, "Nombre requerido").max(50, "Máximo 50 caracteres"),

  nfantasia: z.string().trim().min(1, "Nombre de fantasía requerido").max(50, "Máximo 50 caracteres"),
} as const;

/**
 * Nota de integración:
 * - En la UI: usar IdentificacionFieldSchemas.campo para validar cada input.
 * - Al confirmar: parsear todo el bloque con IdentificacionFormDraft y luego
 *   pasar al Domain global (que es estricto y obligatorio).
 *
 * Razón de diseño:
 * - Draft permite escribir parcial (no frena al usuario).
 * - FieldSchemas muestra errores “en vivo” según reglas de DB.
 * - Domain (paso siguiente) asegura obligatoriedad final y shape estricto.
 */
