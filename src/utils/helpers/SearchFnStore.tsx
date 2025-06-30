import { StoreApi } from "zustand";

export type BusquedaState = {
  buscado: boolean;
  setBuscado: (v: boolean) => void;

  navegandoCoincidentes: boolean;
  setNavegandoCoincidentes: (v: boolean) => void;

  modoNavegacion: "normal" | "busqueda";
  setModoNavegacion: (m: "normal" | "busqueda") => void;

  ultimoIndiceBusqueda: number | null;
  setUltimoIndiceBusqueda: (i: number | null) => void;

  indiceBusqueda: number;
  indiceGlobal: number;
  setIndiceBusqueda: (i: number) => void;
  setIndiceGlobal: (i: number) => void;

  indiceSeleccionado: number | null;
  setIndiceSeleccionado: (i: number | null) => void;

  idsCoincidentes: (string | number)[];
  setIdsCoincidentes: (ids: (string | number)[]) => void;
};

export const withBusqueda = <T extends object>(
  set: StoreApi<T & BusquedaState>["setState"]
): BusquedaState => ({
  buscado: false,
  setBuscado: (v) => set({ buscado: v } as Partial<T & BusquedaState>),

  navegandoCoincidentes: false,
  setNavegandoCoincidentes: (v) =>
    set({
      navegandoCoincidentes: v,
      modoNavegacion: v ? "busqueda" : "normal",
    } as Partial<T & BusquedaState>),

  modoNavegacion: "normal",
  setModoNavegacion: (m) => set({ modoNavegacion: m } as Partial<T & BusquedaState>),

  ultimoIndiceBusqueda: null,
  setUltimoIndiceBusqueda: (i) =>
    set({ ultimoIndiceBusqueda: i } as Partial<T & BusquedaState>),

  indiceBusqueda: 0,
  setIndiceBusqueda: (i) => set({ indiceBusqueda: i } as Partial<T & BusquedaState>),

  indiceGlobal: 0,
  setIndiceGlobal: (i) => set({ indiceGlobal: i } as Partial<T & BusquedaState>),

  indiceSeleccionado: null,
  setIndiceSeleccionado: (i) => set({ indiceSeleccionado: i } as Partial<T & BusquedaState>),

  idsCoincidentes: [],
  setIdsCoincidentes: (ids) => set({ idsCoincidentes: ids } as Partial<T & BusquedaState>),
});
