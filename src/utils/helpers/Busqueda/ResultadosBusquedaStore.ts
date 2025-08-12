export type ResultadosBusquedaStore = {
  ultimoIndiceBusqueda: number | null;
  setUltimoIndiceBusqueda: (i: number | null) => void;

  indiceBusqueda: number;
  setIndiceBusqueda: (i: number) => void;

  indiceGlobal: number;
  setIndiceGlobal: (i: number) => void;

  indiceSeleccionado: number | null;
  setIndiceSeleccionado: (i: number | null) => void;

  idsCoincidentes: (string | number)[];
  setIdsCoincidentes: (ids: (string | number)[]) => void;

};
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
