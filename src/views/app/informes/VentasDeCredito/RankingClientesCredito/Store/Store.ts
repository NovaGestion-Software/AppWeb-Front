import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { createFechaUnicaStore, FechaUnicaStore } from "@/utils/helpers/Fechas/FechaUnicaStore";
import { RadioInputsState, withRadioInputs } from "@/utils/helpers/RadioInputStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type RankingClientesCredito = BaseStore & RadioInputsState & FechaUnicaStore;
export const useRankingClientesCredito = create<RankingClientesCredito>()(
  persist(
    (set,get) => ({
      ...createBaseStore(set,get),
      ...withRadioInputs(set),
      ...createFechaUnicaStore(set),
    }),
    {
      name: "ranking-cliente-creditos-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
