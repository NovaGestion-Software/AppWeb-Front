import dayjs from "dayjs";

export type FechaUnicaStore = {
  fecha: dayjs.Dayjs;
  setFecha: (date: dayjs.Dayjs) => void;
  clearFecha: () => void;
  resetFechaUnica: () => void;
};

export const createFechaUnicaStore = (set: (fn: (state: any) => any) => void): FechaUnicaStore => ({
  fecha: dayjs(),
  setFecha: (date) => set(() => ({ fecha: date })),
  clearFecha: () => set(() => ({ fecha: dayjs() })),
  resetFechaUnica: () => set(() => ({ fecha: dayjs() })),
});
