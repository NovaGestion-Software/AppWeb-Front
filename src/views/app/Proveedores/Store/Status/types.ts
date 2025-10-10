// Define el conjunto de estados IMAC.
export enum EstadoIMAC {
  INICIAL = "INICIAL",
  MODIFICACION = "MODIFICACION",
  ALTA = "ALTA",
  CONSULTA = "CONSULTA",
}

// Eventos estándar que disparan cambios de estado.
// Se documentan para mantener claridad en el flujo.
export type EventoEstado =
  | "RESET"          // vuelve a INICIAL
  | "EDITAR"         // va a MODIFICACION
  | "CREAR"          // va a ALTA
  | "VER"            // va a CONSULTA
  | "CONFIRMAR"      // confirma acción en curso (ALTA/MODIFICACION → CONSULTA o INICIAL según caso)
  | "CANCELAR";      // cancela acción en curso (→ CONSULTA o INICIAL)

// Estado de la máquina y banderas auxiliares específicas de UI.
export interface EstadoSliceState {
  estado: EstadoIMAC;

  /** Indica si hay cambios sin guardar en el formulario actual. */
  hayCambiosPendientes: boolean;

  /** Bandera para procesos en curso (ej. guardado, fetch, validación async). */
  isProcessing: boolean;
}
