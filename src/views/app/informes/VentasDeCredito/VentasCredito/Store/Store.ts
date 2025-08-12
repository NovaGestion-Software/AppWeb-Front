import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export type VentasEnCredito = BaseStore 
export const useVentasEnCredito = create<VentasEnCredito>()(
  persist(
    (set, get) => ({
      ...createBaseStore(set, get),
    }),
    {
      name: "ventas-credito-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
