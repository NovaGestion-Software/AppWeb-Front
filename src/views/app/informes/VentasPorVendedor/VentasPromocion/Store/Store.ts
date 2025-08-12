import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { RadioInputsState, withRadioInputs } from "@/utils/helpers/RadioInputStore";
import { BusquedaState, withBusqueda } from "@/utils/helpers/SearchFnStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export type VentasEnPromocion = BaseStore & RadioInputsState & BusquedaState
export const useVentasEnPromocion = create<VentasEnPromocion>()(
  persist(
    (set,get) => ({
      ...createBaseStore(set,get),
      ...withRadioInputs(set),
      ...withBusqueda(set),
    }),
    {
      name: "ventas-promocion-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
