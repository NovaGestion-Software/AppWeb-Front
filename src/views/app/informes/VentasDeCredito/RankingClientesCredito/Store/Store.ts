import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { FechaUnicaState, withFechaUnica } from "@/utils/helpers/FechaUnica";
import { RadioInputsState, withRadioInputs } from "@/utils/helpers/RadioInputStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type RankingClientesCredito = BaseStore & RadioInputsState & FechaUnicaState;
export const useRankingClientesCredito = create<RankingClientesCredito>()(
  persist(
    (set) => ({
      ...createBaseStore(set),
      ...withRadioInputs(set),
      ...withFechaUnica(set),
    }),
    {
      name: "ranking-cliente-creditos-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
