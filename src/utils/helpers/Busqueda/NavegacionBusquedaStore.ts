export type NavegacionBusquedaStore = {
  buscado: boolean;
  setBuscado: (v: boolean) => void;

  navegandoCoincidentes: boolean;
  setNavegandoCoincidentes: (v: boolean) => void;

  modoNavegacion: "normal" | "busqueda";
  setModoNavegacion: (m: "normal" | "busqueda") => void;


};

export const createNavegacionBusquedaStore = (
  set: (partial: Partial<any> | ((state: any) => Partial<any>)) => void
): NavegacionBusquedaStore => ({
  buscado: false,
  setBuscado: (v) => set({ buscado: v }),

  navegandoCoincidentes: false,
  setNavegandoCoincidentes: (v) =>
    set({
      navegandoCoincidentes: v,
      modoNavegacion: v ? "busqueda" : "normal",
    }),

  modoNavegacion: "normal",
  setModoNavegacion: (m) => set({ modoNavegacion: m }),


});
