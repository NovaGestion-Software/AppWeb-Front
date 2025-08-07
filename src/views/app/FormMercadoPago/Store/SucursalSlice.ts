import { StateCreator } from "zustand";

export interface Sucursal {
  id: string;
  name: string;
  external_id: string;
  location: {
    address_line: string;
    latitude: number;
    longitude: number;
    reference: string;
  };
}

export interface SucursalesSlice {
  sucursales: Sucursal[] | null;
  ultimaSucursalCreada: Sucursal | null;
  sucursalSeleccionada: Sucursal | null;
  isLoadingSucursales: boolean;
  setSucursales: (sucursales: Sucursal[]) => void;
  setUltimaSucursalCreada: (sucursal: Sucursal) => void;
  setSucursalSeleccionada: (sucursal: Sucursal) => void;
  setLoadingSucursales: (loading: boolean) => void;
}

export const sucursalesInitialState = {
  sucursales: null,
  ultimaSucursalCreada: null,
  sucursalSeleccionada: null,
  isLoadingSucursales: false,
};

export const createSucursalesSlice: StateCreator<SucursalesSlice, [], [], SucursalesSlice> = (set) => ({
  ...sucursalesInitialState,

  setSucursales: (sucursales) => set({ sucursales, isLoadingSucursales: false }),
  setUltimaSucursalCreada: (sucursal) => set({ ultimaSucursalCreada: sucursal }),
  setSucursalSeleccionada: (sucursal) => set({ sucursalSeleccionada: sucursal }),
  setLoadingSucursales: (loading) => set({ isLoadingSucursales: loading }),
});
