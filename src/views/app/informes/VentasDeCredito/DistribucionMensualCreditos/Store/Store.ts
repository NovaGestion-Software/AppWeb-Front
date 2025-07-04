import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type DistribucionMensualClientes = BaseStore 
export const useDistribucionMensualClientes = create<DistribucionMensualClientes>()(
  persist(
    (set) => ({
      ...createBaseStore(set),
    }),
    {
      name: "distribucion-mensual-creditos-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
