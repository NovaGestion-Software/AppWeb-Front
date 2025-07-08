import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { BusquedaState, withBusqueda } from "@/utils/helpers/SearchFnStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CobranzasPorCobrador = BaseStore & BusquedaState;
export const useCobranzasPorCobrador = create<CobranzasPorCobrador>()(
  persist(
    (set) => ({
      ...createBaseStore(set),
      ...withBusqueda(set),

    }),
    {
      name: "cobranzas-cobrador-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
