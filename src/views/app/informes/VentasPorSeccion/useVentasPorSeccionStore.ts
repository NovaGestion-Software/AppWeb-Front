import { FechasRango, ResVentasPorSeccion, Status, Sucursal, SucursalesModal } from '@/types';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const defaultDate = {
  from: dayjs().startOf('month'),
  to: dayjs(),
};

type VentasPorSeccionProps = {
  // parametros
  fechas: FechasRango;
  clearFechas: () => void;
  setFechas: (data: FechasRango) => void;
  // status
  status: Status;
  setStatus: (status: Status) => void;
  //data
  ventasPorSeccion: ResVentasPorSeccion[] | null;
  setVentasPorSeccion: (data: ResVentasPorSeccion[]) => void;
  // HACER TIPO Y EXTENDERLO DE FILTROMODAL
  //   sucursalesSeleccionadas: SucursalesModal[];
  //   sucursalesDisponibles: SucursalesModal[];
  //   setSucursalesSeleccionadas: (sucursales: SucursalesModal[]) => void;
  //   setSucursalesDisponibles: (sucursales: SucursalesModal[]) => void;

  // filtros
  sucursalesSeleccionadas: SucursalesModal[];
  sucursalesDisponibles: SucursalesModal[];
  setSucursalesSeleccionadas: (sucursales: SucursalesModal[]) => void;
  setSucursalesDisponibles: (sucursales: SucursalesModal[]) => void;
  clearSucursalesSeleccionadas: () => void;
  clearSucursalesDisponibles: () => void;

  clearVentasPorSeccion: () => void;
};

export const useVentasPorSeccionStore = create<VentasPorSeccionProps>()(
  persist(
    (set) => ({
      //parametros
      fechas: { from: defaultDate.from, to: defaultDate.to },
      setFechas: (data) => set({ fechas: data }),
      clearFechas: () => set({ fechas: { from: '', to: '' } }),
      // status
      status: 'idle',
      setStatus: (status) => set({ status }),
      //data
      ventasPorSeccion: null,
      setVentasPorSeccion: (data) => set({ ventasPorSeccion: data }),
      clearVentasPorSeccion: () => set({ ventasPorSeccion: null }),

      // filtros
      sucursalesSeleccionadas: [],
      sucursalesDisponibles: [],
      setSucursalesSeleccionadas: (sucursales) => set({ sucursalesSeleccionadas: sucursales }),
      setSucursalesDisponibles: (sucursales) => set({ sucursalesDisponibles: sucursales }),
      clearSucursalesSeleccionadas: () => set({ sucursalesSeleccionadas: [] }),
      clearSucursalesDisponibles: () => set({ sucursalesDisponibles: [] }),

    }),
    {
      name: 'ventas-seccion-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
