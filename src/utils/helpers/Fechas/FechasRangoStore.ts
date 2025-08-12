import dayjs from "dayjs";
import { FechasRango } from "@/types";

const defaultFechasRango: FechasRango = {
  from: dayjs().startOf("month"),
  to: dayjs(),
};

export type FechasRangoStore = {
  fechas: FechasRango;
  setFechas: (data: FechasRango) => void;
  clearFechas: () => void;
  resetFechasRango: () => void;
};

export const createFechasRangoStore = (
  set: (fn: (state: any) => any) => void
): FechasRangoStore => ({
  fechas: defaultFechasRango,
  setFechas: (data) => set(() => ({ fechas: data })),
  clearFechas: () => set(() => ({ fechas: defaultFechasRango })),
  resetFechasRango: () => set(() => ({ fechas: defaultFechasRango })),
});
