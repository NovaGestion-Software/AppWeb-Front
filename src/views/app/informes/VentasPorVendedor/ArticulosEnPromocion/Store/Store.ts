import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { RadioInputsState, withRadioInputs } from "@/utils/helpers/RadioInputStore";
import { BusquedaState, withBusqueda } from "@/utils/helpers/SearchFnStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export type ArticulosEnPromocion = BaseStore & RadioInputsState & BusquedaState
export const useArticulosEnPromocion = create<ArticulosEnPromocion>()(
  persist(
    (set,get) => ({
      ...createBaseStore(set,get),
      ...withRadioInputs(set),
      ...withBusqueda(set),
    }),
    {
      name: "articulos-promocion-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
