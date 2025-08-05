import { create } from "zustand";
import { createSucursalesSlice, SucursalesSlice } from "./SucursalSlice";
import { AuthSlice, createAuthSlice } from "./AuthSlice";
import { CajasSlice, createCajasSlice } from "./CajasSlice";
import { createOrdenesSlice, OrdenesSlice } from "./OrdenesSlice";
import { createUiSlice, UiSlice } from "./UiSlice";

type MercadoPagoStore = AuthSlice & SucursalesSlice & CajasSlice & OrdenesSlice & UiSlice; //

export const useMercadoPagoStore = create<MercadoPagoStore>()((...a) => ({
  ...createAuthSlice(...a),
  ...createSucursalesSlice(...a),
  ...createCajasSlice(...a),
  ...createOrdenesSlice(...a),
  ...createUiSlice(...a),
}));
