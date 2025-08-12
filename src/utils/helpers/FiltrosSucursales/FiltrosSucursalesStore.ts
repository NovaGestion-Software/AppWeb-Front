import { SucursalesModal } from "@/types";

export type FiltrosSucursalesStore = {
  sucursalesSeleccionadas: SucursalesModal[];
  sucursalesDisponibles: SucursalesModal[];
  setSucursalesSeleccionadas: (sucs: SucursalesModal[]) => void;
  setSucursalesDisponibles: (sucs: SucursalesModal[]) => void;
  clearSucursalesSeleccionadas: () => void;
  clearSucursalesDisponibles: () => void;
  resetFiltrosSucursal: () => void;

  showSucursales: boolean;
  setShowSucursales: (value: boolean) => void;
};

export const createFiltrosSucursalesStore = (set: (fn: (state: any) => any) => void): FiltrosSucursalesStore => ({
  sucursalesSeleccionadas: [],
  sucursalesDisponibles: [],
  setSucursalesSeleccionadas: (sucs) => set(() => ({ sucursalesSeleccionadas: sucs })),
  setSucursalesDisponibles: (sucs) => set(() => ({ sucursalesDisponibles: sucs })),
  clearSucursalesSeleccionadas: () => set(() => ({ sucursalesSeleccionadas: [] })),
  clearSucursalesDisponibles: () => set(() => ({ sucursalesDisponibles: [] })),
  showSucursales: false,
  setShowSucursales: (value) => set(() => ({ showSucursales: value })),
  resetFiltrosSucursal: () =>
    set(() => ({
      sucursalesSeleccionadas: [],
      sucursalesDisponibles: [],
      showSucursales: false,
    })),
});
