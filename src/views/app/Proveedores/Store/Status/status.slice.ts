// status.slice.ts
import { StateCreator } from "zustand";
import { EstadoIMAC, EstadoSliceState, EventoEstado } from "./types";

const TRANSICIONES_VALIDAS: Record<EstadoIMAC, EventoEstado[]> = {
  [EstadoIMAC.INICIAL]: ["CREAR", "VER"],
  [EstadoIMAC.ALTA]: ["CONFIRMAR", "CANCELAR"],
  [EstadoIMAC.MODIFICACION]: ["CONFIRMAR", "CANCELAR"],
  [EstadoIMAC.CONSULTA]: ["EDITAR", "CREAR", "RESET"],
};

export interface EstadoSlice extends EstadoSliceState {
  // Acciones directas
  setEstado: (estado: EstadoIMAC) => void;
  setCambiosPendientes: (flag: boolean) => void;
  setProcessing: (flag: boolean) => void;

  // 🚀 NUEVO: epoch de formulario para re-montar UI livianamente
  formEpoch: number;
  bumpFormEpoch: () => void;

  // Máquina de estados
  dispatch: (evento: EventoEstado) => void;

  // Predicados (si ya los tenías aquí, mantenelos)
  canCrear: () => boolean;
  canEditar: () => boolean;
  canEliminar: () => boolean;
  canConfirmar: () => boolean;
  canCancelar: () => boolean;
}

// ⚠️ Ajustá create function a tu patrón real
export const createEstadoSlice: StateCreator<any, [], [], EstadoSlice> = (set, get) => ({
  estado: EstadoIMAC.INICIAL,
  hayCambiosPendientes: false,
  isProcessing: false,

  // 🚀 NUEVO
  formEpoch: 0,
  bumpFormEpoch: () => set((s: any) => ({ formEpoch: (s.formEpoch ?? 0) + 1 })),

  setEstado: (estado) => set({ estado }),
  setCambiosPendientes: (flag) => set({ hayCambiosPendientes: flag }),
  setProcessing: (flag) => set({ isProcessing: flag }),

  dispatch: (evento) => {
    const estadoActual = get().estado as EstadoIMAC;
    const validos = TRANSICIONES_VALIDAS[estadoActual] || [];
    if (!validos.includes(evento)) {
      console.warn(`Evento inválido "${evento}" desde estado ${estadoActual}`);
      return;
    }

    if (estadoActual === EstadoIMAC.INICIAL && evento === "CREAR") {
      set({ estado: EstadoIMAC.ALTA });
      return;
    }
    if (estadoActual === EstadoIMAC.INICIAL && evento === "VER") {
      set({ estado: EstadoIMAC.CONSULTA });
      return;
    }

    if (estadoActual === EstadoIMAC.CONSULTA && evento === "EDITAR") {
      set({ estado: EstadoIMAC.MODIFICACION });
      return;
    }
    if (estadoActual === EstadoIMAC.CONSULTA && evento === "CREAR") {
      set({ estado: EstadoIMAC.ALTA });
      return;
    }
    if (estadoActual === EstadoIMAC.CONSULTA && evento === "RESET") {
      // si lo usás
      set({ estado: EstadoIMAC.INICIAL });
      return;
    }

    if (estadoActual === EstadoIMAC.ALTA && evento === "CANCELAR") {
      set({ estado: EstadoIMAC.CONSULTA });
      get().bumpFormEpoch(); // 👈 re-montar UI
      return;
    }
    if (estadoActual === EstadoIMAC.MODIFICACION && evento === "CANCELAR") {
      set({ estado: EstadoIMAC.CONSULTA });
      get().bumpFormEpoch(); // 👈 re-montar UI
      return;
    }

    if (estadoActual === EstadoIMAC.ALTA && evento === "CONFIRMAR") {
      set({ estado: EstadoIMAC.CONSULTA });
      get().bumpFormEpoch(); // 👈 re-montar UI
      return;
    }
    if (estadoActual === EstadoIMAC.MODIFICACION && evento === "CONFIRMAR") {
      set({ estado: EstadoIMAC.CONSULTA });
      get().bumpFormEpoch(); // 👈 re-montar UI
      return;
    }
  },

    // Atajos
  toInicial: () => get().setEstado(EstadoIMAC.INICIAL),
  toAlta: () => get().setEstado(EstadoIMAC.ALTA),
  toModificacion: () => get().setEstado(EstadoIMAC.MODIFICACION),
  toConsulta: () => get().setEstado(EstadoIMAC.CONSULTA),

  // Predicados (minimal)
  canCrear: () => {
    const s = get().estado;
    return s === EstadoIMAC.INICIAL || s === EstadoIMAC.CONSULTA;
  },
  canEditar: () => get().estado === EstadoIMAC.CONSULTA,
  canEliminar: () => get().estado === EstadoIMAC.CONSULTA,
  canConfirmar: () => {
    const s = get().estado;
    return s === EstadoIMAC.ALTA || s === EstadoIMAC.MODIFICACION;
  },
  canCancelar: () => {
    const s = get().estado;
    return s === EstadoIMAC.ALTA || s === EstadoIMAC.MODIFICACION;
  },
});
