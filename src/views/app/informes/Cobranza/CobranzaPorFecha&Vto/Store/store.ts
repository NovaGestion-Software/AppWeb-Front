import { CheckboxState } from "@/frontend-resourses/components/types";
import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CobranzasPorFechaYVto = BaseStore & {
  // radio inputs
  checkboxSeleccionados: CheckboxState;
  setCheckboxSeleccionados: (grupo: keyof CheckboxState, value: string | null) => void;
};
export const useCobranzasPorFechaYVto = create<CobranzasPorFechaYVto>()(
  persist(
    (set, get) => ({
      ...createBaseStore(set, get),
        // Radio Inputs
      checkboxSeleccionados: {
        grupo1: "Todos",
        grupo2: "Articulo",
        grupo3: "CONTADO",
        grupo4: "Codigo",
      },
      setCheckboxSeleccionados: (grupo, value) =>
        set((state) => ({
          checkboxSeleccionados: {
            ...state.checkboxSeleccionados,
            [grupo]: value,
          },
        })),
    }),
    {
      name: "cobranzas-fecha-vto-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
