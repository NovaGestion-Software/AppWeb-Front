import { Status } from '@/frontend-resourses/components/types';
import { FechasRango, SucursalesModal } from '@/types';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const defaultDate = {
  from: dayjs().startOf('month'),
  to: dayjs(),
};

type CobranzasPorVencimientoProps = {
  // parametros
  fechas: FechasRango;
  clearFechas: () => void;
  setFechas: (data: FechasRango) => void;
  // status
  status: Status;
  setStatus: (status: Status) => void;
  //data
//   ventasPorVendedor: VentaPorVendedorColumns[] | null;
//   setVentasPorVendedor: (data: VentaPorVendedorColumns[]) => void;
//   clearVentasPorVendedor: () => void;

  //secciones:

  secciones: any[];
  setSecciones: (data: any[]) => void;

  // filtros
  sucursalesSeleccionadas: SucursalesModal[];
  sucursalesDisponibles: SucursalesModal[];
  setSucursalesSeleccionadas: (sucursales: SucursalesModal[]) => void;
  setSucursalesDisponibles: (sucursales: SucursalesModal[]) => void;
  clearSucursalesSeleccionadas: () => void;
  clearSucursalesDisponibles: () => void;

};

export const useCobranzaPorVencimientoStore = create<CobranzasPorVencimientoProps>()(
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
    //   ventasPorVendedor: null,
    //   setVentasPorVendedor: (data) => set({ ventasPorVendedor: data }),
    //   clearVentasPorVendedor: () => set({ ventasPorVendedor: null }),

      // secciones
      secciones: [] as any[],
      setSecciones: (data: any[]) => set({ secciones: data }),

      // filtros
      sucursalesSeleccionadas: [],
      sucursalesDisponibles: [],
      setSucursalesSeleccionadas: (sucursales) => set({ sucursalesSeleccionadas: sucursales }),
      setSucursalesDisponibles: (sucursales) => set({ sucursalesDisponibles: sucursales }),
      clearSucursalesSeleccionadas: () => set({ sucursalesSeleccionadas: [] }),
      clearSucursalesDisponibles: () => set({ sucursalesDisponibles: [] }),

    }),
    {
      name: 'cobranzas-vencimiento-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
