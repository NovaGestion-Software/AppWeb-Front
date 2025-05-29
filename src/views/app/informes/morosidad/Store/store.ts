import { CheckboxState, Status } from '@/frontend-resourses/components/types';
import { FechasRango, SucursalesModal } from '@/types';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const defaultDate = {
  from: dayjs().startOf('month'),
  to: dayjs(),
};

type MorosidadProps = {
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

    // Inputs Radio Filtros
  checkboxSeleccionados: CheckboxState;
  setCheckboxSeleccionados: (grupo: keyof CheckboxState, value: string | null) => void;

};

export const useMorosidadStore = create<MorosidadProps>()(
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

       // Inputs Radio Filtros
      checkboxSeleccionados: {
        grupo1: 'Todos',
        grupo2: 'Todos',
        grupo3: 'CONTADO',
        grupo4: 'Codigo',
      },
      setCheckboxSeleccionados: (grupo, value) =>
        set((state) => ({
          checkboxSeleccionados: {
            ...state.checkboxSeleccionados,
            [grupo]: value,
          },
        })),
    }),

    {
      name: 'morosidad-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
