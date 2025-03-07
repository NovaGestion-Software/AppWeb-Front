import { FechasRango, Sucursal } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type VentasHoraProps = {
  fechas: FechasRango;
  ventasPorHora: Sucursal[] | null;
  sucursalesSeleccionadas: string[];
  sucursalesDisponibles: string[];
  status: 'error' | 'idle' | 'pending' | 'success' | null;
  setVentasPorHora: (data: Sucursal[]) => void;
  setFechas: (data: FechasRango) => void;
  setSucursalesSeleccionadas: (sucursales: string[]) => void;
  setSucursalesDisponibles: (sucursales: string[]) => void;
  setStatus: (status: 'error' | 'idle' | 'pending' | 'success' | null) => void;
  clearVentasPorHora: () => void;
  clearSucursalesSeleccionadas: () => void;
  clearSucursalesDisponibles: () => void;
  clearFechas: () => void;
};

export const useVentasHoraStore = create<VentasHoraProps>()(
  persist(
    (set) => ({
      fechas: { from: '', to: '' },
      ventasPorHora: null,
      sucursalesSeleccionadas: [],
      sucursalesDisponibles: [],
      status: 'idle',
      setVentasPorHora: (data) => set({ ventasPorHora: data }),
      setFechas: (data) => set({ fechas: data }),
      setSucursalesSeleccionadas: (sucursales) => set({ sucursalesSeleccionadas: sucursales }),
      setSucursalesDisponibles: (sucursales) => set({ sucursalesDisponibles: sucursales }),
      setStatus: (status) => set({ status }),
      clearVentasPorHora: () => set({ ventasPorHora: null }),
      clearSucursalesSeleccionadas: () => set({ sucursalesSeleccionadas: [] }),
      clearSucursalesDisponibles: () => set({ sucursalesDisponibles: [] }),
      clearFechas: () => set({ fechas: { from: '', to: '' } }),
    }),
    {
      name: 'ventas-hora-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ sucursalesSeleccionadas: state.sucursalesSeleccionadas }),
    }
  )
);
