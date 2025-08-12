import { StoreApi } from "zustand";

// 🔁 Anteriormente llamado "CheckboxState"
export interface RadioGroupState {
  [key: string]: string | null;
}

export type RadioInputsState = {
  radioSeleccionados: RadioGroupState;
  setRadioSeleccionado: (grupo: keyof RadioGroupState, value: string | null) => void;
};

// 🔁 Anteriormente llamado withRadioInputs
export const createRadioInputsStore = <T extends object>(
  set: StoreApi<T & RadioInputsState>["setState"],
  initial?: Partial<RadioGroupState>
): RadioInputsState => ({
  radioSeleccionados: {
    grupo1: "",
    grupo2: "",
    grupo3: "",
    grupo4: "",
    ...initial,
  },
  setRadioSeleccionado: (grupo, value) =>
    set((state) =>
      ({
        radioSeleccionados: {
          ...state.radioSeleccionados,
          [grupo]: value,
        },
      } as Partial<T & RadioInputsState>)),
});
