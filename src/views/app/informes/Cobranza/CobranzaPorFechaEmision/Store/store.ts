import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { FechaUnicaState, withFechaUnica } from "@/utils/helpers/FechaUnica";
import { BusquedaState, withBusqueda } from "@/utils/helpers/SearchFnStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CobranzasPorFechaEmision = BaseStore & BusquedaState & FechaUnicaState;
export const useCobranzasPorFechaEmision = create<CobranzasPorFechaEmision>()(
  persist(
    (set) => ({
      ...createBaseStore(set),
      ...withBusqueda(set),
      ...withFechaUnica(set),

    }),
    {
      name: "cobranzas-feche-emision-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
