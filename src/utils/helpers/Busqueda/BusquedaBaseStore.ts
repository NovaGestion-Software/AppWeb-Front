import { BusquedaState } from "@/frontend-resourses/components/Tables/Busqueda/types";
import { createNavegacionBusquedaStore } from "./NavegacionBusquedaStore";
import { createResultadosBusquedaStore } from "./ResultadosBusquedaStore";



export const createBusquedaBaseStore = (set: (partial: Partial<BusquedaState> | ((state: BusquedaState) => Partial<BusquedaState>)) => void): BusquedaState => ({
  ...createNavegacionBusquedaStore(set),
  ...createResultadosBusquedaStore(set),
  withBusqueda: true,
  textoBusqueda: "",
  codigoBusqueda: "",
  setTextoBusqueda: (valor) => set({ textoBusqueda: valor }),
  setCodigoBusqueda: (valor) => set({ codigoBusqueda: valor }),
});
