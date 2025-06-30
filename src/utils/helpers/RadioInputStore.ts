import { StoreApi } from "zustand";
import { CheckboxState } from "@/frontend-resourses/components/types";

export type RadioInputsState = {
  checkboxSeleccionados: CheckboxState;
  setCheckboxSeleccionados: (grupo: keyof CheckboxState, value: string | null) => void;
};

export const withRadioInputs = <T extends object>(
  set: StoreApi<T & RadioInputsState>["setState"]
): RadioInputsState => ({
  checkboxSeleccionados: {
    grupo1: "",
    grupo2: "",
    grupo3: "",
    grupo4: "",
  },
  setCheckboxSeleccionados: (grupo, value) =>
    set((state) =>
      ({
        checkboxSeleccionados: {
          ...state.checkboxSeleccionados,
          [grupo]: value,
        },
      } as Partial<T & RadioInputsState>) 
    ),
});
