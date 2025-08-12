import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CobranzasPorFechaEmision = BaseStore;
export const useCobranzasPorFechaEmision = create<CobranzasPorFechaEmision>()(
  persist(
    (set,get) => ({
      ...createBaseStore(set, get),
    }),
    {
      name: "cobranzas-fecha-emision-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
