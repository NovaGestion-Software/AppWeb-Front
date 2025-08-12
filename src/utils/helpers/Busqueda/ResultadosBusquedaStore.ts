import { ResultadosBusquedaStore } from "@/frontend-resourses/components/Tables/Busqueda/types";

export const createResultadosBusquedaStore = (set: (partial: Partial<any> | ((state: any) => Partial<any>)) => void): ResultadosBusquedaStore => ({
  ultimoIndiceBusqueda: null,
  setUltimoIndiceBusqueda: (i) => set({ ultimoIndiceBusqueda: i }),

  indiceBusqueda: 0,
  setIndiceBusqueda: (i) => set({ indiceBusqueda: i }),

  indiceGlobal: 0,
  setIndiceGlobal: (i) => set({ indiceGlobal: i }),

  indiceSeleccionado: null,
  setIndiceSeleccionado: (i) => set({ indiceSeleccionado: i }),

  idsCoincidentes: [],
  setIdsCoincidentes: (ids) => set({ idsCoincidentes: ids }),


});

