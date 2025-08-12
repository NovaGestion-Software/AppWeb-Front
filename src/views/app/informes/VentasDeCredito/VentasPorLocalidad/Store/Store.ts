import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export type VentasLocalidad = BaseStore 
export const useVentasLocalidad = create<VentasLocalidad>()(
  persist(
    (set, get) => ({
      ...createBaseStore(set, get),
    }),
    {
      name: "ventas-localidad-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
