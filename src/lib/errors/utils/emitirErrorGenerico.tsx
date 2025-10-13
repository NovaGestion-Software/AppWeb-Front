/**
 * Crea y emite un AppError tipado y su UiMessage correspondiente.
 * Puede usarse como plantilla para helpers específicos de dominio.
 *
 * @template NS  - Namespace del dominio (ej. "PROV" | "VENTAS" | "GLOBAL")
 * @param ns     - Namespace al que pertenece el error.
 * @param code   - Código interno del error (ej. "BUSINESS.SIN_DATOS").
 * @param message - Mensaje fallback visible si el mapper no tiene texto registrado.
 * @param source - Origen del error ("network" | "business" | "validation" | "unexpected").
 * @param severity - Severidad general ("low" | "medium" | "high" | "critical").
 * @param context - Información adicional útil para logs o debugging.
 */
import { resolveErrorToUi } from "@/lib/errors/error-registry";
import { appStoreGet } from "@/Store/store";
import type { AppError, ErrorNamespace, ErrorSource, ErrorSeverity } from "@/types/errors";

export function emitirErrorGenerico<NS extends ErrorNamespace>(
  ns: NS,
  code: string,
  message: string,
  source: ErrorSource = "business",
  severity: ErrorSeverity = "low",
  context?: Record<string, unknown>
) {
  const { pushError, pushMessage } = appStoreGet();

  const err: AppError = {
    ns,
    code,
    message,
    source,
    severity,
    timestamp: Date.now(),
    ...(context ? { context } : {}),
  };

  pushError(err);
  const ui = resolveErrorToUi(err);
  pushMessage(
    ui ?? { id: crypto.randomUUID(), kind: "error", text: err.message, autoCloseMs: 3000 }
  );
}
