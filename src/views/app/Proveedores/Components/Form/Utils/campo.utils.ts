// Utils de orquestación para hooks de campos (responsabilidad única por función)

import { ZodSchema } from "zod";
import { composeGuards, globalGuard, Guard, guardFromMeta } from "./guards";


/** Resuelve el valor efectivo que se muestra en el input */
export function computeCurrentValue<K extends keyof TRecord, TRecord extends Record<string, any>>(
  key: K,
  sliceValue: TRecord[K],
  actuales: Partial<TRecord> | null, // <- antes era TRecord | null
  isEditable: boolean
) {
  const actual = isEditable && actuales ? ((actuales[key] as TRecord[K]) ?? sliceValue) : sliceValue;
  const isBoolean = typeof sliceValue === "boolean";
  const valueStr = isBoolean ? String(actual as boolean) : (actual == null ? "" : String(actual));
  return { actual, isBoolean, valueStr };
}

/** Resuelve el guard activo a partir de meta por clave y/o override */
export function resolveActiveGuard(key: string, override?: Guard): Guard {
  // Orden intencional: el global corre primero, luego el específico (override o meta por clave)
  return composeGuards(globalGuard(), override ?? guardFromMeta(String(key)));
}
/** Normaliza un valor de onChange (evento o string) a string */
export function normalizeIncoming(v: any): string {
  return (typeof v === "string" ? v : v?.target?.value ?? String(v ?? "")) as string;
}

/** Ejecuta guard en modo "sticky", devolviendo estado de bloqueo/corrección y mensaje */
export function runGuardSticky(
  guard: Guard | undefined,
  incoming: string,
  prevStr: string
): { nextStr: string; blocked: boolean; corrected: boolean; guardError?: string } {
  if (!guard) return { nextStr: incoming, blocked: false, corrected: false };
  const { value: guarded, error } = guard(incoming, prevStr);

  const blocked = guarded === prevStr && incoming !== prevStr; // intento exceder → no avanza
  const corrected = guarded !== incoming;                       // guard recortó/sanitizó

  return { nextStr: guarded, blocked, corrected, guardError: error };
}

/** Castea el string normalizado al tipo de dominio, manteniendo compatibilidad con el slice */
export function castToDomainType<T>(
  nextStr: string,
  sample: T,
  parse?: (raw: string) => T
): T {
  if (parse) return parse(nextStr);
  if (typeof sample === "number") {
    const trimmed = nextStr.trim();
    return (trimmed === "" ? (0 as unknown as T) : (Number(trimmed) as unknown as T));
  }
  if (typeof sample === "boolean") {
    // En los casos booleanos el flujo del hook debería cortarse antes; se deja por seguridad.
    return (nextStr === "true") as unknown as T;
  }
  return nextStr as unknown as T;
}

/** Sincroniza valor con slice y datosActuales */
export function syncState<
  TRecord extends Record<string, any>,
  K extends string
>(
  setSliceField: (k: any, v: any) => void,
  key: K,
  nextTyped: TRecord[keyof TRecord],
  isEditable: boolean,
  updateActuales: (patch: Partial<TRecord>) => void
) {
  setSliceField(key, nextTyped as any);
  if (isEditable) {
    const patch = { [key]: nextTyped } as unknown as Partial<TRecord>;
    updateActuales(patch);
  }
}

/** Valida respetando precedencia del guard (guard > Zod) y evitando parpadeo */
export function validateWithZodRespectingGuard(
  validator: ZodSchema<any> | undefined,
  nextStr: string,
  blocked: boolean,
  corrected: boolean,
  guardError?: string
): string | undefined {
  // Si el guard bloqueó o corrigió, se prioriza su error (sticky en este tick).
  if (blocked || (corrected && guardError)) return guardError;

  if (!validator) return undefined;

  const result = validator.safeParse(nextStr);
  return result.success ? undefined : result.error.issues[0]?.message;
}
