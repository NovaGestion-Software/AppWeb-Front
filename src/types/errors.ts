/**
 * Tipos base para el manejo de errores en la aplicación.
 * Representan tanto errores técnicos (network, server)
 * como de negocio o validación dentro de los módulos.
 */

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

/**
 * Origen o categoría general del error.
 * Sirve para filtrar y tomar decisiones (p.ej. errores de red vs de validación).
 */
export type ErrorSource =
  | "network"
  | "validation"
  | "business"
  | "unexpected";

/**
 * Namespace o dominio donde ocurrió el error (opcional).
 * Permite que cada vista o módulo tenga sus propios códigos o mensajes.
 */
export type ErrorNamespace =
  | "GLOBAL"
  | "PROV"
  | "VENTAS"
  | "STOCK"
  | "COMUN"
  | string;

/**
 * Estructura común para todos los errores de la aplicación.
 * Se almacena en el ErrorSlice y se utiliza también en Result<T>.
 */
export interface AppError {
  /** Código legible y estable, ej: "HTTP.404" o "PROV.VALIDATION.CUIT_DUPLICADO" */
  code: string;
  /** Mensaje principal, visible al usuario (breve) */
  message: string;
  /** Información adicional útil para debugging o logs */
  detail?: string;
  /** Código HTTP si aplica */
  httpStatus?: number;
  /** Origen del error (network, business, etc.) */
  source: ErrorSource;
  /** Severidad del error */
  severity: ErrorSeverity;
  /** Marca de tiempo (Date.now()) */
  timestamp: number;
  /** Namespace o dominio asociado (opcional) */
  ns?: ErrorNamespace;
  /** Si es posible reintentar la operación */
  retryable?: boolean;
  /** Contexto adicional (endpoint, payload, etc.) */
  context?: Record<string, unknown>;
}
