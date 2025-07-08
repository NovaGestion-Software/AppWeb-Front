import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { RadioInputsState, withRadioInputs } from "@/utils/helpers/RadioInputStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CobranzasPorFechaYVto = BaseStore &  RadioInputsState
export const useCobranzasPorFechaYVto = create<CobranzasPorFechaYVto>()(
  persist(
    (set) => ({
      ...createBaseStore(set),
      ...withRadioInputs(set, {
        grupo1: "Todos",
        grupo2: "Diario",
        grupo3: "Con Anticipo"
      }),
    }),
    {
      name: "cobranzas-fecha-vto-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

