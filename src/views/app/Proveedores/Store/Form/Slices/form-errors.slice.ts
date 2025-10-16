// /views/app/Proveedores/Store/Form/form-erros.slice.ts
import type { StateCreator } from "zustand";
import type { ZodError } from "zod";
import type { ProveedorDomain } from "@/views/app/Proveedores/Data/domain/proveedor.domain.schema";
import { Proveedores } from "../../Store";

/** Clave de campo alineada al dominio del formulario de Proveedores */
export type FieldKey = keyof ProveedorDomain;

/** Mapa de errores por campo */
export type ErrorsMap = Partial<Record<FieldKey, string>>;

/**
 * Slice para gestionar errores de formulario (scoped a Proveedores).
 * - Mantiene un mapa de errores por campo.
 * - Permite setear/limpiar por campo, reemplazar o mergear lotes.
 * - Expone utilidades para recuperar la primera clave con error (con orden preferido).
 */
export interface FormErrorsSlice {
  /** Errores actuales por campo */
  errors: ErrorsMap;

  /** Orden preferente para resolver el "primer error" (opcional) */
  preferredOrder?: FieldKey[];

  /** Acciones */
  setFieldError: (key: FieldKey, msg: string) => void;
  clearFieldError: (key: FieldKey) => void;
  setErrors: (errs: ErrorsMap) => void;
  mergeErrors: (errs: ErrorsMap) => void;
  clearAllErrors: () => void;
  setPreferredOrder: (order: FieldKey[] | undefined) => void;

  /**
   * Devuelve la primera clave con error según:
   * 1) preferredOrder (si existe)
   * 2) orden natural de las keys en `errors`
   */
  firstErrorKey: () => FieldKey | null;
}

/**
 * Creador del slice. Se integra en la store de Proveedores junto con otros slices.
 */
export const createFormErrorsSlice: StateCreator<
  Proveedores,
  [],
  [],
  FormErrorsSlice
> = (set, get) => ({
  errors: {},
  preferredOrder: undefined,

  setFieldError: (key, msg) =>
    set((s) => ({ errors: { ...s.errors, [key]: msg } })),

  clearFieldError: (key) =>
    set((s) => {
      const { [key]: _omit, ...rest } = s.errors;
      return { errors: rest };
    }),

  setErrors: (errs) => set(() => ({ errors: { ...errs } })),

  mergeErrors: (errs) =>
    set((s) => ({ errors: { ...s.errors, ...errs } })),

  clearAllErrors: () => set(() => ({ errors: {} })),

  setPreferredOrder: (order) => set(() => ({ preferredOrder: order })),

  firstErrorKey: () => {
    const { errors, preferredOrder } = get();
    const keys = Object.keys(errors) as FieldKey[];

    if (!keys.length) return null;

    if (preferredOrder?.length) {
      for (const k of preferredOrder) {
        if (errors[k]) return k;
      }
    }

    return keys[0] ?? null;
  },
});

/* ===========================
   Utilidades opcionales
   =========================== */

/**
 * Transforma un ZodError en un ErrorsMap simple: { campo: "mensaje" }.
 * - Se toma el primer mensaje por campo.
 * - El casting de la key a FieldKey asume paths planos del domain.
 */
export function mapZodToErrors(error: ZodError<any>): ErrorsMap {
  const flattened = error.flatten();
  const out: ErrorsMap = {};

  // Errores de campos directos
  for (const [path, msgs] of Object.entries(flattened.fieldErrors)) {
    if (!msgs || !msgs.length) continue;
    out[path as FieldKey] = msgs[0]!;
  }

  // (Opcional) Mensajes formErrors → se puede mapear a un campo genérico si hiciera falta
  // if (flattened.formErrors?.length) {
  //   out["obs" as FieldKey] = flattened.formErrors[0]; // ejemplo si se quisiera mostrar algo global
  // }

  return out;
}
