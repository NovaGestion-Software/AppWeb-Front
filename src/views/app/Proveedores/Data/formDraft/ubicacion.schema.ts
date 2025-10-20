// /src/Api/schemas/ubicacion.schema.ts
import { z } from "zod";

/**
 * Ubicación (FormDraft - UI)
 * DB (resumen):
 * - domicilio1: string req 1..50
 * - domicilio2: string opt ..50
 * - localidad:  string req 1..20
 * - cpostal:    string req 1..8
 * - calle1:     string req 1..40
 * - calle2:     string opt ..40
 * - latitud:    decimal [-90, 90] (10 decimales)
 * - longitud:   decimal [-180, 180] (10 decimales)
 * - idcodprov:  integer >= 0
 *
 * FormDraft:
 * - Permite vacío/parcial mientras el usuario escribe
 * - Recorta espacios con .trim()
 * - Limita longitudes según DB
 * - Números: se coaccionan (coerce) sólo donde tiene sentido
 */
export const UbicacionFormDraft = z
  .object({
    domicilio1: z.string().trim().max(50, "Máximo 50 caracteres").optional(),
    domicilio2: z.string().trim().max(50, "Máximo 50 caracteres").optional(),
    localidad:  z.string().trim().max(20, "Máximo 20 caracteres").optional(),
    cpostal:    z.string().trim().max(8,  "Máximo 8 caracteres").optional(),

    calle1: z.string().trim().max(40, "Máximo 40 caracteres").optional(),
    calle2: z.string().trim().max(40, "Máximo 40 caracteres").optional(),

    /**
     * Lat/Lon en Draft: mantener como string para inputs.
     * Se validan con precisión y rango en FieldSchemas.
     * (El cierre fuerte y tipo final lo hará Domain.)
     */
    latitud:  z.union([z.string(), z.number()]).transform(v => String(v ?? "").trim()).optional(),
    longitud: z.union([z.string(), z.number()]).transform(v => String(v ?? "").trim()).optional(),

    /** Provincia (select numérico) */
    idcodprov: z.coerce.number().int().nonnegative().optional().catch(0),
  })
  .strip();

export type UbicacionDraft = z.infer<typeof UbicacionFormDraft>;

/**
 * Validación por CAMPO (onChange/onBlur)
 * - Aplica reglas “exigentes” según DB para feedback inmediato
 * - Sugerimos mensajes claros para el usuario
 */
const decRegex10 = /^-?\d{1,3}(?:\.\d{0,10})?$/;

export const UbicacionFieldSchemas = {
  domicilio1: z.string().trim().min(1, "Requerido").max(50, "Máximo 50"),
  domicilio2: z.string().trim().max(50, "Máximo 50"),
  localidad:  z.string().trim().min(1, "Requerido").max(20, "Máximo 20"),
  cpostal:    z.string().trim().min(1, "Requerido").max(8,  "Máximo 8"),

  calle1: z.string().trim().min(1, "Requerido").max(40, "Máximo 40"),
  calle2: z.string().trim().max(40, "Máximo 40"),

  /** Latitud: número con hasta 10 decimales y en rango [-90, 90] */
  latitud: z
    .string()
    .trim()
    .refine((s) => s === "" || decRegex10.test(s), "Formato inválido (hasta 10 decimales)")
    .refine((s) => {
      if (s === "") return true;
      const n = Number(s);
      return Number.isFinite(n) && n >= -90 && n <= 90;
    }, "Rango permitido: -90 a 90"),

  /** Longitud: número con hasta 10 decimales y en rango [-180, 180] */
  longitud: z
    .string()
    .trim()
    .refine((s) => s === "" || decRegex10.test(s), "Formato inválido (hasta 10 decimales)")
    .refine((s) => {
      if (s === "") return true;
      const n = Number(s);
      return Number.isFinite(n) && n >= -180 && n <= 180;
    }, "Rango permitido: -180 a 180"),

  /** Provincia: entero >= 0 */
  idcodprov: z
    .union([z.string(), z.number()])
    .transform((v) => String(v ?? "").replace(/\D+/g, ""))
    .transform((s) => (s === "" ? "0" : s))
    .refine((s) => Number.isFinite(Number(s)) && Number(s) >= 0, "Seleccione una provincia válida"),
} as const;
