import { StateCreator } from "zustand";

export interface UiSlice {
  showPayForm: boolean;
  setShowPayForm: (show: boolean) => void;
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  showPayForm: false,
  setShowPayForm: (show: boolean) => set({ showPayForm: show }),
});
