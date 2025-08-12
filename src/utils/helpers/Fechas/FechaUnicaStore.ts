import dayjs, { Dayjs } from "dayjs";

export type FechasRango = {
  from: string | Dayjs;
  to: string | Dayjs;
};

export type FechaUnicaStore = {
  fecha: FechasRango;
  setFecha: (date: FechasRango) => void;
  clearFecha: () => void;
  resetFechaUnica: () => void;
};

export const createFechaUnicaStore = (
  set: (fn: (state: any) => any) => void
): FechaUnicaStore => ({
  fecha: {
    from: dayjs(),
    to: dayjs(),
  },

  setFecha: (date) => set(() => ({ fecha: date })),

  clearFecha: () =>
    set(() => ({
      fecha: { from: dayjs(), to: dayjs() },
    })),

  resetFechaUnica: () =>
    set(() => ({
      fecha: { from: dayjs(), to: dayjs() },
    })),
});
