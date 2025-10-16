// /src/Api/schemas/contacto.schema.ts
import { z } from "zod";

/**
 * Contacto (FormDraft - UI)
 * DB (resumen):
 * - codarea, codarea1, codarea2: solo dígitos, exactLength=5 (requeridos en DB)
 * - telefono, telefono1, telefono2: solo dígitos, exactLength=11 (requeridos en DB)
 * - email: opcional, si existe debe ser email válido
 * - fax: opcional (único campo de fax)
 *
 * FormDraft:
 * - Permite vacío/parcial mientras el usuario escribe
 * - Recorta espacios con .trim()
 * - Limita longitudes máximas para UX; el “exactLength” se cierra en Domain
 */
export const ContactoFormDraft = z
  .object({
    codarea:  z.string().trim().max(5,  "Máximo 5 dígitos").optional(),
    telefono: z.string().trim().max(11, "Máximo 11 dígitos").optional(),

    codarea1:  z.string().trim().max(5,  "Máximo 5 dígitos").optional(),
    telefono1: z.string().trim().max(11, "Máximo 11 dígitos").optional(),

    codarea2:  z.string().trim().max(5,  "Máximo 5 dígitos").optional(),
    telefono2: z.string().trim().max(11, "Máximo 11 dígitos").optional(),

    email: z.string().trim().max(60, "Máximo 60 caracteres").optional(),
    fax:   z.string().trim().max(60, "Máximo 60 caracteres").optional(),
  })
  .strip();

export type ContactoDraft = z.infer<typeof ContactoFormDraft>;

/**
 * Validación por CAMPO (onChange/onBlur)
 * - Solo dígitos para códigos y teléfonos
 * - Feedback inmediato de longitudes
 * - Email válido si no está vacío
 * Nota: la obligatoriedad “requerido + longitud exacta”
 * se cierra finalmente en el Domain al confirmar.
 */
const onlyDigits = /^\d*$/;

export const ContactoFieldSchemas = {
  codarea: z
    .string()
    .trim()
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .max(5, "Máximo 5 dígitos"),

  telefono: z
    .string()
    .trim()
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .max(11, "Máximo 11 dígitos"),

  codarea1: z
    .string()
    .trim()
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .max(5, "Máximo 5 dígitos"),

  telefono1: z
    .string()
    .trim()
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .max(11, "Máximo 11 dígitos"),

  codarea2: z
    .string()
    .trim()
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .max(5, "Máximo 5 dígitos"),

  telefono2: z
    .string()
    .trim()
    .refine((s) => s === "" || onlyDigits.test(s), "Solo dígitos")
    .max(11, "Máximo 11 dígitos"),

  email: z
    .string()
    .trim()
    .max(60, "Máximo 60")
    .refine(
      (s) => s === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
      "Email inválido"
    ),

  fax: z.string().trim().max(60, "Máximo 60"),
} as const;
