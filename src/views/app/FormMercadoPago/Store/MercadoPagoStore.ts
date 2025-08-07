import { create } from "zustand";
import { createSucursalesSlice, sucursalesInitialState, SucursalesSlice } from "./SucursalSlice";
import { authInitialState, AuthSlice, createAuthSlice } from "./AuthSlice";
import { cajasInitialState, CajasSlice, createCajasSlice } from "./CajasSlice";
import { createOrdenesSlice, ordenesInitialState, OrdenesSlice } from "./OrdenesSlice";
import { createUiSlice, uiInitialState, UiSlice } from "./UiSlice";

type MercadoPagoStore = AuthSlice &
  SucursalesSlice &
  CajasSlice &
  OrdenesSlice &
  UiSlice & {
    resetStore: () => void;
  };
const initialState = {
  ...authInitialState,
  ...sucursalesInitialState,
  ...cajasInitialState,
  ...ordenesInitialState,
  ...uiInitialState,
};

export const useMercadoPagoStore = create<MercadoPagoStore>()((set, get, store) => ({
  ...createAuthSlice(set, get, store),
  ...createSucursalesSlice(set, get, store),
  ...createCajasSlice(set, get, store),
  ...createOrdenesSlice(set, get, store),
  ...createUiSlice(set, get, store),
  resetStore: () => set(initialState),
}));
