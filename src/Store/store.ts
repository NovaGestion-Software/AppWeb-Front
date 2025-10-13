/**
 * store.ts
 * Store raíz para estado global de la app (slices transversales).
 * - Combina ErrorSlice y UiMessagesSlice.
 * - Mantiene tipos exportados para reutilización.
 * - Preparado para agregar middlewares si se requiere (devtools/persist).
 */

import { create } from "zustand";
import type { StoreApi } from "zustand";
import type { ErrorSlice } from "./Slices/error.slice";
import { createErrorSlice } from "./Slices/error.slice";
import type { UiMessagesSlice } from "./Slices/ui-messages.slice";
import { createUiMessagesSlice } from "./Slices/ui-messages.slice";

// Tipo del estado global del store raíz (composición de slices)
export type AppRootState = ErrorSlice & UiMessagesSlice;

// Factory del store raíz (sin middlewares por simplicidad)
export const useAppStore = create<AppRootState>((...a) => ({
  ...createErrorSlice(...a),
  ...createUiMessagesSlice(...a),
}));

// (Opcional) export de la API cruda si se desea acceso sin hook (patrón avanzado)
export type AppStoreApi = StoreApi<AppRootState>;

// Helpers de acceso directo (imperativo) cuando no se está dentro de un componente React
export const appStoreGet = () => useAppStore.getState();
export const appStoreSet = (partial: Partial<AppRootState>) => useAppStore.setState(partial);

// Ejemplo de integración con middlewares (dejar comentado para activación futura):
/*
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export const useAppStore = create<AppRootState>()(
  devtools(
    persist(
      (...a) => ({
        ...createErrorSlice(...a),
        ...createUiMessagesSlice(...a),
      }),
      {
        name: "app-root", // clave de storage
        storage: createJSONStorage(() => sessionStorage), // o localStorage
        // partialize: (s) => ({ queue: s.queue }) // opcional: qué persistir
      }
    )
  )
);
*/
