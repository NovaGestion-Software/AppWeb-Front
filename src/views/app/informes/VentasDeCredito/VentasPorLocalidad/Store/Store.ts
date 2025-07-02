import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export type VentasLocalidad = BaseStore 
export const useVentasEnCredito = create<VentasLocalidad>()(
  persist(
    (set) => ({
      ...createBaseStore(set),
    }),
    {
      name: "ventas-localidad-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
