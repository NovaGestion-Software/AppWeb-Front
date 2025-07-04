import { FechasRango } from "@/types";
import dayjs from "dayjs";

export interface FechaUnicaState {
  fecha: FechasRango;
  setFecha: (data: FechasRango) => void;
  clearFecha: () => void;
}

export const withFechaUnica = (
  set: (fn: (state: FechaUnicaState) => Partial<FechaUnicaState>) => void
): FechaUnicaState => ({
  fecha: {
    from: dayjs().startOf("month"),
    to: dayjs(),
  },
  setFecha: (data) => set(() => ({ fecha: data })),
  clearFecha: () => set(() => ({ fecha: { from: "", to: "" } })),
});
