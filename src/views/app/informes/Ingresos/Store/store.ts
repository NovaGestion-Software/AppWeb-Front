import { Status } from '@/frontend-resourses/components/types';
import { FechasRango, SucursalesModal } from '@/types';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const defaultDate = {
  from: dayjs().startOf('month'),
  to: dayjs(),
};

type IngresosProps = {
  // parametros range picker
  fechas: FechasRango;
  clearFechas: () => void;
  setFechas: (data: FechasRango) => void;
    // parametros date picker
  fecha: FechasRango;
  clearFecha: () => void;
  setFecha: (data: FechasRango) => void;
  // status
  status: Status;
  setStatus: (status: Status) => void;
  // estado del proceso
  estaProcesado: boolean;
  setEstaProcesado: (value: boolean) => void;
  //data
//   cobranzaPorVencimiento: DatosMora[];
//   setCobranzaPorVencimiento: (data: DatosMora[]) => void;
//   clearCobranzaPorVencimiento: () => void;

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

export const useIngresosStore = create<IngresosProps>()(
  persist(
    (set) => ({
      //parametros range picker
      fechas: { from: defaultDate.from, to: defaultDate.to },
      setFechas: (data) => set({ fechas: data }),
      clearFechas: () => set({ fechas: { from: '', to: '' } }),
        //parametros date picker
      fecha: { from: defaultDate.from, to: defaultDate.to },
      setFecha: (data) => set({ fecha: data }),
      clearFecha: () => set({ fecha: { from: '', to: '' } }),
      // status
      status: 'idle',
      setStatus: (status) => set({ status }),
      // estado proceso
      estaProcesado: false,
      setEstaProcesado: (value) => set({estaProcesado: value}),
      //data
    //   cobranzaPorVencimiento: [],
    //   setCobranzaPorVencimiento: (data) => set({ cobranzaPorVencimiento: data }),
    //   clearCobranzaPorVencimiento: () => set({ cobranzaPorVencimiento: [] }),

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
      name: 'ingresos-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
