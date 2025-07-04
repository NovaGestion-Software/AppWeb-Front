import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { BusquedaState, withBusqueda } from "@/utils/helpers/SearchFnStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ClientesSinOperaciones = BaseStore & BusquedaState;
export const useClientesSinOperaciones = create<ClientesSinOperaciones>()(
  persist(
    (set) => ({
      ...createBaseStore(set),
      ...withBusqueda(set),
    }),
    {
      name: "clientes-sin-operaciones-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
