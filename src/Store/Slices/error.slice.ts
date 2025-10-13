/**
 * error.slice.ts
 * Slice global para manejo de errores normalizados (AppError).
 * - Almacena el último error y un buffer acotado para trazabilidad.
 * - No depende de axios ni de UI. Solo estado + acciones.
 */

import type { AppError } from "@/types/errors";
import type { StateCreator } from "zustand";

/** Estado + acciones del slice de errores */
export interface ErrorSlice {
  /** último error ocurrido (útil para reacciones en vistas) */
  lastError: AppError | null;
  /** buffer de errores recientes (para logs/diagnóstico) */
  errors: AppError[];

  /** agrega un error al estado (con trimming del buffer) */
  pushError: (err: AppError) => void;
  /** limpia únicamente lastError */
  clearError: () => void;
  /** limpia lastError y el buffer completo */
  clearAllErrors: () => void;
}

/**
 * Factory del slice.
 * - Se define como StateCreator<any,…> para no acoplar al tipo raíz del store.
 * - Se puede combinar con otros slices en el store principal.
 */
export const createErrorSlice: StateCreator<
  any,                         // tipo raíz del store (desacoplado)
  [],                          // middlewares (agregar aquí si usás devtools/persist)
  [],                          // más middlewares
  ErrorSlice
> = (set, get) => {
  const MAX_BUFFER = 50;       // ajustar si se requiere más historial

  return {
    lastError: null,
    errors: [],

    pushError: (err) => {
      const next = [...get().errors, err];
      const trimmed =
        next.length > MAX_BUFFER ? next.slice(next.length - MAX_BUFFER) : next;

      set({ lastError: err, errors: trimmed });

      if (import.meta.env.DEV) {
        // importante: logging solo en desarrollo
        // se deja como console.error para destacar en consola
        // detalle técnico adicional queda en err.detail/context
        // no imprimir payloads sensibles
        // eslint-disable-next-line no-console
        console.error("🟥 AppError:", err);
      }
    },

    clearError: () => set({ lastError: null }),
    clearAllErrors: () => set({ lastError: null, errors: [] }),
  };
};
