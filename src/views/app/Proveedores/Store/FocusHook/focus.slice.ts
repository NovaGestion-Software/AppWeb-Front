import type { StateCreator } from "zustand";

type FocusOptions = {
  selectAll?: boolean;     // selecciona el texto si es input/textarea
  scrollIntoView?: boolean; // hace scroll suave al elemento
  retries?: number;         // intentos si el elemento aún no está listo
};

type FocusRequest = {
  id: string;
  opts?: FocusOptions;
  token: number;            // cambia en cada request para evitar stale
};

export interface FocusSlice {
  focusRequest: FocusRequest | null;
  requestFocus: (id: string, opts?: FocusOptions) => void;
  clearFocus: () => void;
}

export const createFocusSlice: StateCreator<FocusSlice, [], [], FocusSlice> = (set,) => ({
  focusRequest: null,
  requestFocus: (id, opts) =>
    set({ focusRequest: { id, opts, token: Date.now() } }),
  clearFocus: () => set({ focusRequest: null }),
});
