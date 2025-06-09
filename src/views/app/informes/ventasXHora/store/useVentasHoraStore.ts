import { Status } from "@/frontend-resourses/components/types";
import { FechasRango, Sucursal, SucursalesModal } from "@/types";
import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const defaultDate = {
  from: dayjs().startOf("month"),
  to: dayjs(),
};

type VentasHoraProps = {
  id: string;
  setId: (id: string) => void;
  fechas: FechasRango;
  ventasPorHora: Sucursal[] | null;
  // HACER TIPO Y EXTENDERLO DE FILTROMODAL
  sucursalesSeleccionadas: SucursalesModal[];
  sucursalesDisponibles: SucursalesModal[];
  setSucursalesSeleccionadas: (sucursales: SucursalesModal[]) => void;
  setSucursalesDisponibles: (sucursales: SucursalesModal[]) => void;
  status: Status;
  // estado del proceso
  estaProcesado: boolean;
  setEstaProcesado: (value: boolean) => void;
  setVentasPorHora: (data: Sucursal[]) => void;
  setFechas: (data: FechasRango) => void;
  setStatus: (status: Status) => void;
  clearVentasPorHora: () => void;
  clearSucursalesSeleccionadas: () => void;
  clearSucursalesDisponibles: () => void;
  clearFechas: () => void;
};

export const useVentasHoraStore = create<VentasHoraProps>()(
  persist(
    (set) => ({
      id: "",
      setId: (id) => set({ id }),
      fechas: { from: defaultDate.from, to: defaultDate.to },
      ventasPorHora: null,
      sucursalesSeleccionadas: [],
      sucursalesDisponibles: [],
      status: "idle",
      // estado proceso
      estaProcesado: false,
      setEstaProcesado: (value) => set({ estaProcesado: value }),
      setVentasPorHora: (data) => set({ ventasPorHora: data }),
      setFechas: (data) => set({ fechas: data }),
      setSucursalesSeleccionadas: (sucursales) => set({ sucursalesSeleccionadas: sucursales }),
      setSucursalesDisponibles: (sucursales) => set({ sucursalesDisponibles: sucursales }),
      setStatus: (status) => set({ status }),
      clearVentasPorHora: () => set({ ventasPorHora: null }),
      clearSucursalesSeleccionadas: () => set({ sucursalesSeleccionadas: [] }),
      clearSucursalesDisponibles: () => set({ sucursalesDisponibles: [] }),
      clearFechas: () => set({ fechas: { from: "", to: "" } }),
    }),
    {
      name: "ventas-hora-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ sucursalesSeleccionadas: state.sucursalesSeleccionadas, sucursalesDisponibles: state.sucursalesDisponibles }),
    }
  )
);
