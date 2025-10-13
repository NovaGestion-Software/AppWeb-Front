/**
 * Tipos base para los mensajes y notificaciones de UI.
 * Incluyen toasts, modales, confirmaciones y otros mensajes globales.
 */

/** Tipo general de mensaje mostrado en UI */
export type UiMessageKind =
  | "success"
  | "info"
  | "warning"
  | "error"
  | "confirm";

/** Acción asociada a un mensaje (usada en confirmaciones u opciones múltiples) */
export interface UiAction {
  /** Identificador único de la acción (confirm, cancel, etc.) */
  id: string;
  /** Texto visible en el botón */
  label: string;
  /** Si es la acción principal (para estilo o foco) */
  primary?: boolean;
}

/**
 * Representa un mensaje visual en la aplicación.
 * Puede autocerrarse o esperar interacción del usuario.
 */
export interface UiMessage {
  /** Identificador único (usualmente UUID) */
  id: string;
  /** Tipo de mensaje (define color/icono en la UI) */
  kind: UiMessageKind;
  /** Título opcional */
  title?: string;
  /** Texto principal del mensaje */
  text: string;
  /** Tiempo de cierre automático en ms (si no hay acciones) */
  autoCloseMs?: number;
  /** Lista de acciones si se requiere interacción del usuario */
  actions?: UiAction[];
  /** Datos opcionales relacionados con el mensaje */
  payload?: Record<string, unknown>;
}
