import { CheckboxState, Status } from "@/frontend-resourses/components/types";
import { FechasRango, SucursalesModal } from "@/types";
import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const defaultDate = {
  from: dayjs().startOf("month"),
  to: dayjs(),
};

type MovCajaTotalesProps = {
  id: string;
  setId: (id: string) => void;
  // parametros range picker
  fechas: FechasRango;
  clearFechas: () => void;
  setFechas: (data: FechasRango) => void;

  // status
  status: Status;
  setStatus: (status: Status) => void;
  // estado del proceso
  estaProcesado: boolean;
  setEstaProcesado: (value: boolean) => void;

  // filtros
  sucursalesSeleccionadas: SucursalesModal[];
  sucursalesDisponibles: SucursalesModal[];
  setSucursalesSeleccionadas: (sucursales: SucursalesModal[]) => void;
  setSucursalesDisponibles: (sucursales: SucursalesModal[]) => void;
  clearSucursalesSeleccionadas: () => void;
  clearSucursalesDisponibles: () => void;


  // radio inputs
  checkboxSeleccionados: CheckboxState;
  setCheckboxSeleccionados: (grupo: keyof CheckboxState, value: string | null) => void;
};

export const useMovCajaTotalesStore = create<MovCajaTotalesProps>()(
  persist(
    (set) => ({
      id: "",
      setId: (id) => set({ id }),
      //parametros range picker
      fechas: { from: defaultDate.from, to: defaultDate.to },
      setFechas: (data) => set({ fechas: data }),
      clearFechas: () => set({ fechas: { from: "", to: "" } }),

      // status
      status: "idle",
      setStatus: (status) => set({ status }),
      // estado proceso
      estaProcesado: false,
      setEstaProcesado: (value) => set({ estaProcesado: value }),
      //data
      //   cobranzaPorVencimiento: [],
      //   setCobranzaPorVencimiento: (data) => set({ cobranzaPorVencimiento: data }),
      //   clearCobranzaPorVencimiento: () => set({ cobranzaPorVencimiento: [] }),

      // filtros
      sucursalesSeleccionadas: [],
      sucursalesDisponibles: [],
      setSucursalesSeleccionadas: (sucursales) => set({ sucursalesSeleccionadas: sucursales }),
      setSucursalesDisponibles: (sucursales) => set({ sucursalesDisponibles: sucursales }),
      clearSucursalesSeleccionadas: () => set({ sucursalesSeleccionadas: [] }),
      clearSucursalesDisponibles: () => set({ sucursalesDisponibles: [] }),



      // Radio Inputs
      checkboxSeleccionados: {
        grupo1: "Todos",
        grupo2: "Articulo",
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
    }),

    {
      name: "mov-caja-totales-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
