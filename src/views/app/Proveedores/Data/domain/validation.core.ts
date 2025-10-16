import type { ZodSchema, ZodError } from "zod";
import type { ProveedorDomain } from "./proveedor.domain.schema";

/** Clave de campo alineada al dominio */
export type FieldKey = keyof ProveedorDomain;

export type ValidationResult =
  | {
      ok: true;
      errors: {};
      firstKey: null;
    }
  | {
      ok: false;
      errors: Partial<Record<FieldKey, string>>;
      firstKey: FieldKey | null;
      zodError: ZodError;
    };

/** Mapea ZodError → { campo: "primer mensaje" } */
function mapZodToErrors(error: ZodError): Partial<Record<FieldKey, string>> {
  const out: Partial<Record<FieldKey, string>> = {};

  // `issues` es un array con cada error individual
  for (const issue of error.issues) {
    const path = issue.path?.[0]; // solo tomamos la primera clave (nivel 1)
    if (!path) continue;

    const key = path as FieldKey;

    // Evitamos sobrescribir si ya existe un mensaje para el mismo campo
    if (!out[key]) {
      out[key] = issue.message;
    }
  }

  return out;
}

/**
 * Núcleo puro de validación de dominio.
 * - No conoce store, tabs ni DOM.
 * - Recibe el schema, el objeto a validar y un orden preferido para resolver el primer error.
 */
export function validateProveedorDomain(data: ProveedorDomain, schema: ZodSchema<ProveedorDomain>, requiredOrder?: FieldKey[]): ValidationResult {
  const parsed = schema.safeParse(data);

  if (parsed.success) {
    return { ok: true, errors: {}, firstKey: null };
  }

  const errors = mapZodToErrors(parsed.error);

  // Resolver primer error segun prioridad → sino, primera key del objeto de errores
  let firstKey: FieldKey | null = null;

  if (requiredOrder?.length) {
    const hit = requiredOrder.find((k) => errors[k] != null);
    if (hit) firstKey = hit;
  }

  if (!firstKey) {
    const keys = Object.keys(errors) as FieldKey[];
    firstKey = keys.length ? keys[0] : null;
  }

  return { ok: false, errors, firstKey, zodError: parsed.error };
}
