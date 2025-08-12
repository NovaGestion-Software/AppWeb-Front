import { createNavegacionBusquedaStore, NavegacionBusquedaStore } from "./NavegacionBusquedaStore";
import { createResultadosBusquedaStore, ResultadosBusquedaStore } from "./ResultadosBusquedaStore";

export type BusquedaState = NavegacionBusquedaStore &
  ResultadosBusquedaStore & {
    withBusqueda: true;
    textoBusqueda: string;
    codigoBusqueda: string;
    setTextoBusqueda: (valor: string) => void;
    setCodigoBusqueda: (valor: string) => void;
  };

export const createBusquedaBaseStore = (set: (partial: Partial<BusquedaState> | ((state: BusquedaState) => Partial<BusquedaState>)) => void): BusquedaState => ({
  ...createNavegacionBusquedaStore(set),
  ...createResultadosBusquedaStore(set),
  withBusqueda: true,
  textoBusqueda: "",
  codigoBusqueda: "",
  setTextoBusqueda: (valor) => set({ textoBusqueda: valor }),
  setCodigoBusqueda: (valor) => set({ codigoBusqueda: valor }),
});
