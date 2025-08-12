import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { BusquedaState, withBusqueda } from "@/utils/helpers/SearchFnStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type VentasClientesOtrosMedios = BaseStore & BusquedaState;
export const useVentasClientesOtrosMedios = create<VentasClientesOtrosMedios>()(
  persist(
    (set,get) => ({
      ...createBaseStore(set,get),
      ...withBusqueda(set),
    }),
    {
      name: "ventas-clientes-otros-medios-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
