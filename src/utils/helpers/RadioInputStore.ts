import { StoreApi } from "zustand";
import { CheckboxState } from "@/frontend-resourses/components/types";

export type RadioInputsState = {
  checkboxSeleccionados: CheckboxState;
  setCheckboxSeleccionados: (grupo: keyof CheckboxState, value: string | null) => void;
};

export const withRadioInputs = <T extends object>(
  set: StoreApi<T & RadioInputsState>["setState"],
  initial?: Partial<CheckboxState>
): RadioInputsState => ({
  checkboxSeleccionados: {
    grupo1: "",
    grupo2: "",
    grupo3: "",
    grupo4: "",
    ...initial, // Sobrescribís los valores default con los que se pasen
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
