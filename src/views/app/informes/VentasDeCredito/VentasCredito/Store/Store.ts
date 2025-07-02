import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export type VentasEnCredito = BaseStore 
export const useVentasEnCredito = create<VentasEnCredito>()(
  persist(
    (set) => ({
      ...createBaseStore(set),
    }),
    {
      name: "ventas-credito-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
