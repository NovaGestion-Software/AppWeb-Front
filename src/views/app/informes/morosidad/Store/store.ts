import { CheckboxState, Status } from "@/frontend-resourses/components/types";
import { FechasRango, SucursalesModal } from "@/types";
import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const defaultDate = {
  from: dayjs().startOf("month"),
  to: dayjs(),
};
type TablaState = {
  data: any[];
  id: string;
};

type TablasState = {
  localidad: TablaState;
  categoria: TablaState;
  actividad: TablaState;
  rango: TablaState;
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

  // tabla actividad
  actividad: any[];
  setActividad: (data: any[]) => void;
  idActividad: string;
  setIdActividad: (id: string) => void;
  tablas: TablasState;
  setTablaData: (tabla: keyof TablasState, data: any[]) => void;
  setTablaId: (tabla: keyof TablasState, id: string) => void;

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
      clearFechas: () => set({ fechas: { from: "", to: "" } }),
      //parametros date picker
      fecha: { from: defaultDate.from, to: defaultDate.to },
      setFecha: (data) => set({ fecha: data }),
      clearFecha: () => set({ fecha: { from: "", to: "" } }),
      // status
      status: "idle",
      setStatus: (status) => set({ status }),
      //data
      //   cobranzaPorVencimiento: [],
      //   setCobranzaPorVencimiento: (data) => set({ cobranzaPorVencimiento: data }),
      //   clearCobranzaPorVencimiento: () => set({ cobranzaPorVencimiento: [] }),

      // actividad
      actividad: [] as any[],
      setActividad: (data: any[]) => set({ actividad: data }),
      idActividad: "",
      setIdActividad: (id: string) => set({ idActividad: id }),

      // filtros
      sucursalesSeleccionadas: [],
      sucursalesDisponibles: [],
      setSucursalesSeleccionadas: (sucursales) => set({ sucursalesSeleccionadas: sucursales }),
      setSucursalesDisponibles: (sucursales) => set({ sucursalesDisponibles: sucursales }),
      clearSucursalesSeleccionadas: () => set({ sucursalesSeleccionadas: [] }),
      clearSucursalesDisponibles: () => set({ sucursalesDisponibles: [] }),

      // Inputs Radio Filtros
      checkboxSeleccionados: {
        grupo1: "Todos",
        grupo2: "Todos",
        grupo3: "CONTADO",
        grupo4: "Codigo",
      },
      setCheckboxSeleccionados: (grupo, value) =>
        set((state) => ({
          checkboxSeleccionados: {
            ...state.checkboxSeleccionados,
            [grupo]: value,
          },
        })),

      tablas: {
        localidad: { data: [], id: "" },
        categoria: { data: [], id: "" },
        actividad: { data: [], id: "" },
        rango: { data: [], id: "" },
      },
      setTablaData: (tabla, data) =>
        set((state) => ({
          tablas: {
            ...state.tablas,
            [tabla]: {
              ...state.tablas[tabla],
              data,
            },
          },
        })),
      setTablaId: (tabla, id) =>
        set((state) => ({
          tablas: {
            ...state.tablas,
            [tabla]: {
              ...state.tablas[tabla],
              id,
            },
          },
        })),
    }),
    {
      name: "morosidad-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
