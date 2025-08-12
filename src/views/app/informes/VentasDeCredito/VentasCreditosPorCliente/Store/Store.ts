import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { RadioInputsState, withRadioInputs } from "@/utils/helpers/RadioInputStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type VentasCreditoPorCliente = BaseStore & RadioInputsState;
export const useVentasCreditoPorCliente = create<VentasCreditoPorCliente>()(
  persist(
    (set, get) => ({
      ...createBaseStore(set, get),
      ...withRadioInputs(set),
    }),
    {
      name: "ventas-credito-cliente-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
