import {  StoreApi } from "zustand";

import dayjs from "dayjs";
import { Status } from "@/frontend-resourses/components/types";
import { FechasRango, SucursalesModal } from "@/types";

const defaultDate = {
  from: dayjs().startOf("month"),
  to: dayjs(),
};
export type BaseStore = {
  id: string;
  setId: (id: string) => void;

  fechas: FechasRango;
  setFechas: (data: FechasRango) => void;
  clearFechas: () => void;

  fecha: FechasRango;
  setFecha: (data: FechasRango) => void;
  clearFecha: () => void;

  status: Status;
  setStatus: (status: Status) => void;

  estaProcesado: boolean;
  setEstaProcesado: (v: boolean) => void;

  sucursalesSeleccionadas: SucursalesModal[];
  sucursalesDisponibles: SucursalesModal[];
  setSucursalesSeleccionadas: (sucs: SucursalesModal[]) => void;
  setSucursalesDisponibles: (sucs: SucursalesModal[]) => void;
  clearSucursalesSeleccionadas: () => void;
  clearSucursalesDisponibles: () => void;
};



export const createBaseStore = <T extends object>(
  set: StoreApi<BaseStore & T>["setState"]
): BaseStore => ({
  id: "",
  setId: (id) => set({ id } as Partial<BaseStore & T>),

  fechas: { from: defaultDate.from, to: defaultDate.to },
  setFechas: (data) => set({ fechas: data } as Partial<BaseStore & T>),
  clearFechas: () => set({ fechas: { from: "", to: "" } } as Partial<BaseStore & T>),

  fecha: { from: defaultDate.from, to: defaultDate.to },
  setFecha: (data) => set({ fecha: data } as Partial<BaseStore & T>),
  clearFecha: () => set({ fecha: { from: "", to: "" } } as Partial<BaseStore & T>),

  status: "idle",
  setStatus: (status) => set({ status } as Partial<BaseStore & T>),

  estaProcesado: false,
  setEstaProcesado: (v) => set({ estaProcesado: v } as Partial<BaseStore & T>),

  sucursalesSeleccionadas: [],
  sucursalesDisponibles: [],
  setSucursalesSeleccionadas: (sucs) => set({ sucursalesSeleccionadas: sucs } as Partial<BaseStore & T>),
  setSucursalesDisponibles: (sucs) => set({ sucursalesDisponibles: sucs } as Partial<BaseStore & T>),
  clearSucursalesSeleccionadas: () => set({ sucursalesSeleccionadas: [] } as Partial<BaseStore & T>),
  clearSucursalesDisponibles: () => set({ sucursalesDisponibles: [] } as Partial<BaseStore & T>),
});
