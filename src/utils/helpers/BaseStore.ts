import { createFechaUnicaStore, FechaUnicaStore } from "./Fechas/FechaUnicaStore";
import { createFechasRangoStore, FechasRangoStore } from "./Fechas/FechasRangoStore";
import { createUIStatusStore, UIStatusStore } from "./UIStatusStore/UIStatusStore";

export type BaseStore = FechaUnicaStore &
  FechasRangoStore &
  UIStatusStore & {
    resetBaseStore: () => void;
  };

export const createBaseStore = (set: (fn: (state: any) => any) => void, get: () => any): BaseStore => ({
  ...createFechaUnicaStore(set),
  ...createFechasRangoStore(set),
  ...createUIStatusStore(set),

  resetBaseStore: () => {
    get().resetFechaUnica();
    get().resetFechasRango();
    get().resetUIStatus();
  },
});
