import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { FechaUnicaState, withFechaUnica } from "@/utils/helpers/FechaUnica";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CobranzasPorFechaEmision = BaseStore &  FechaUnicaState;
export const useCobranzasPorFechaEmision = create<CobranzasPorFechaEmision>()(
  persist(
    (set) => ({
      ...createBaseStore(set),
      ...withFechaUnica(set),
    }),
    {
      name: "cobranzas-fecha-emision-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
