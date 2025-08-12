import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { RadioInputsState, withRadioInputs } from "@/utils/helpers/RadioInputStore";
import { BusquedaState, withBusqueda } from "@/utils/helpers/SearchFnStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export type VentasPorVendedor = BaseStore & RadioInputsState & BusquedaState
export const useVentasPorVendedor = create<VentasPorVendedor>()(
  persist(
    (set, get) => ({
      ...createBaseStore(set, get),
      ...withRadioInputs(set),
      ...withBusqueda(set),
    }),
    {
      name: "ventas-vendedor-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
