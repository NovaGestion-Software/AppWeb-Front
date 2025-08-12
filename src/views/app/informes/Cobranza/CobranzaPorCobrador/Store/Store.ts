import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { createBusquedaBaseStore } from "@/utils/helpers/Busqueda/BusquedaBaseStore";
import { BusquedaState } from "@/frontend-resourses/components/Tables/Busqueda/types";

export type CobranzasPorCobrador = BaseStore & BusquedaState;

export const useCobranzasPorCobrador = create<CobranzasPorCobrador>()(
  persist(
    (set, get) => ({
      ...createBaseStore(set, get),
      ...createBusquedaBaseStore(get),
    }),
    {
      name: "cobranzas-cobrador-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
