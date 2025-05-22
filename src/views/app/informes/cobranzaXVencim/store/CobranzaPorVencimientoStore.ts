import { Status } from '@/frontend-resourses/components/types';
import { FechasRango, SucursalesModal } from '@/types';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DatosMora } from '../ts/data';

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
  cobranzaPorVencimiento: DatosMora[];
  setCobranzaPorVencimiento: (data: DatosMora[]) => void;
  clearCobranzaPorVencimiento: () => void;

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
      cobranzaPorVencimiento: [],
      setCobranzaPorVencimiento: (data) => set({ cobranzaPorVencimiento: data }),
      clearCobranzaPorVencimiento: () => set({ cobranzaPorVencimiento: [] }),

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
