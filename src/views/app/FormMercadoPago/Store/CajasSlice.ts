import { StateCreator } from "zustand";

export interface Caja {
  id: string;
  name: string;
  external_id: string;
  store_id: string; // este sería el `external_store_id`
}

export interface CajasSlice {
  cajas: Caja[] | null;
  isLoadingCajas: boolean;
  ultimaCajaCreada: Caja | null;
  cajaSeleccionada: Caja | null;
  setUltimaCajaCreada: (caja: Caja) => void;
  setCajaSeleccionada: (caja: Caja) => void;
  setCajas: (cajas: Caja[]) => void;
  setLoadingCajas: (loading: boolean) => void;
}

export const createCajasSlice: StateCreator<CajasSlice, [], [], CajasSlice> = (set) => ({
  cajas: null,
  isLoadingCajas: false,
  ultimaCajaCreada: null,
  cajaSeleccionada: null,
  setCajaSeleccionada: (caja) => set({ cajaSeleccionada: caja }),
  setCajas: (cajas) => set({ cajas, isLoadingCajas: false }),
  setLoadingCajas: (loading) => set({ isLoadingCajas: loading }),
  setUltimaCajaCreada: (caja) => set({ ultimaCajaCreada: caja }),
});
