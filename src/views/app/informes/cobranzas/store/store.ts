import { CheckboxState, Status } from "@/frontend-resourses/components/types";
import { FechasRango, SucursalesModal } from "@/types";
import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DatosTablaCobranza } from "../ts/data";

const defaultDate = {
  from: dayjs().startOf("month"),
  to: dayjs(),
};

type CobranzasProps = {
  // parametros
  fechas: FechasRango;
  clearFechas: () => void;
  setFechas: (data: FechasRango) => void;
  // status
  status: Status;
  setStatus: (status: Status) => void;
  //data
    cobranzas: DatosTablaCobranza[] ;
    setCobranzas: (data: DatosTablaCobranza[]) => void;
    clearCobranzas: () => void;

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

export const useCobranzasStore = create<CobranzasProps>()(
  persist(
    (set) => ({
      //parametros
      fechas: { from: defaultDate.from, to: defaultDate.to },
      setFechas: (data) => set({ fechas: data }),
      clearFechas: () => set({ fechas: { from: "", to: "" } }),
      // status
      status: "idle",
      setStatus: (status) => set({ status }),
      //data
        cobranzas: [],
        setCobranzas: (data) => set({ cobranzas: data }),
        clearCobranzas: () => set({ cobranzas: []}),

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
      name: "cobranzas-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
