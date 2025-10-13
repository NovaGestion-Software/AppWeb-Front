/**
 * error-mapper.ts
 * Utilidades y contratos para mapear AppError -> UiMessage según dominio (modelo híbrido).
 * - Soporta catálogos por código (de dominio y global).
 * - Permite componer múltiples mappers (p. ej., global + PROV + VENTAS).
 * - No depende de Zustand ni de axios.
 */

import type { AppError, ErrorNamespace } from "./errors";
import type { UiMessage, UiMessageKind } from "./ui-messages";

/** Firma de un mapper: convierte un AppError en UiMessage (o null si no aplica). */
export type ErrorToUiMapper = (err: AppError) => UiMessage | null;

/**
 * Entrada de catálogo: define cómo renderizar un UiMessage para un error.
 * - Puede usar funciones para construir título/texto a partir del AppError.
 */
export interface CatalogEntry {
  kind: UiMessageKind;                              // "warning", "error", etc.
  title?: string | ((e: AppError) => string);       // opcional
  text: string | ((e: AppError) => string);         // requerido
  autoCloseMs?: number;                             // opcional (si no hay acciones)
  // payload adicional opcional. No se incluye actions acá para mantenerlo simple a nivel catálogo.
}

/** Catálogo: clave → entrada. La clave suele ser "NS.CODIGO" o "CODIGO". */
export type ErrorCatalog = Record<string, CatalogEntry>;

/** Normaliza claves candidatas para buscar en los catálogos. */
function candidateKeys(err: AppError): string[] {
  const keys: string[] = [];
  const ns: ErrorNamespace | undefined = err.ns;
  if (ns) keys.push(`${ns}.${err.code}`);       // preferente: "PROV.VALIDATION.CUIT_DUPLICADO"
  keys.push(err.code);                          // fallback:   "VALIDATION.CUIT_DUPLICADO" o "HTTP.404"
  return keys;
}

/** Generador de ids por defecto (evita dependencia de uuid). */
function defaultIdFactory(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Crea un mapper a partir de un catálogo declarativo.
 * - Busca por "NS.CODE" y luego por "CODE".
 * - Permite override de valores por defecto (kind, autoClose, etc.) y una fábrica de ids.
 */
export function createCatalogMapper(
  catalog: ErrorCatalog,
  options?: {
    defaults?: Partial<Pick<CatalogEntry, "kind" | "autoCloseMs">>;
    idFactory?: () => string;
  }
): ErrorToUiMapper {
  const idFactory = options?.idFactory ?? defaultIdFactory;
  const defaults = options?.defaults ?? {};

  return (err: AppError): UiMessage | null => {
    for (const key of candidateKeys(err)) {
      const entry = catalog[key];
      if (!entry) continue;

      const kind: UiMessageKind = (entry.kind ?? defaults.kind)!;
      const title = typeof entry.title === "function" ? entry.title(err) : entry.title;
      const text = typeof entry.text === "function" ? entry.text(err) : entry.text;
      const autoCloseMs = entry.autoCloseMs ?? defaults.autoCloseMs;

      // Si faltan mínimos (kind/text), se ignora.
      if (!kind || !text) return null;

      const msg: UiMessage = {
        id: idFactory(),
        kind,
        title,
        text,
        ...(autoCloseMs ? { autoCloseMs } : {}),
      };
      return msg;
    }
    return null;
  };
}

/**
 * Compone múltiples mappers: retorna el primer UiMessage no-nulo.
 * Útil para ordenar prioridad: composeMappers(domMapper, globalMapper).
 */
export function composeMappers(...mappers: ErrorToUiMapper[]): ErrorToUiMapper {
  return (err: AppError) => {
    for (const map of mappers) {
      const res = map(err);
      if (res) return res;
    }
    return null;
  };
}

/**
 * Helper: crea un catálogo simple para códigos HTTP estándar.
 * Se puede usar como global fallback (ej.: mapperGlobal).
 */
export function createHttpCatalog(options?: {
  textOverrides?: Partial<Record<number, string>>;
  kind?: UiMessageKind;         // por defecto "error"
  autoCloseMs?: number;         // por defecto 3500
}): ErrorCatalog {
  const {
    textOverrides = {},
    kind = "error",
    autoCloseMs = 3500,
  } = options ?? {};

  const base = (_status: number, text: string): CatalogEntry => ({
    kind,
    text,
    autoCloseMs,
  });

  return {
    "HTTP.400": base(400, textOverrides[400] ?? "Solicitud inválida (400)."),
    "HTTP.401": base(401, textOverrides[401] ?? "Sesión no autorizada (401)."),
    "HTTP.403": base(403, textOverrides[403] ?? "Permisos insuficientes (403)."),
    "HTTP.404": base(404, textOverrides[404] ?? "Recurso no encontrado (404)."),
    "HTTP.409": base(409, textOverrides[409] ?? "Conflicto en la operación (409)."),
    "HTTP.422": { kind: "warning", text: textOverrides[422] ?? "Datos inválidos (422).", autoCloseMs },
    "HTTP.500": base(500, textOverrides[500] ?? "Error del servidor (500)."),
    "HTTP.503": base(503, textOverrides[503] ?? "Servicio no disponible (503)."),
  };
}

/**
 * Helper: catálogo mínimo para eventos de red comunes (no estrictamente HTTP).
 */
export function createNetworkCatalog(options?: {
  offlineText?: string;
  timeoutText?: string;
  unknownText?: string;
  infoKind?: UiMessageKind;   // por defecto "info" para offline
  errorKind?: UiMessageKind;  // por defecto "error" para timeout/unknown
  autoCloseMs?: number;       // por defecto 3000
}): ErrorCatalog {
  const {
    offlineText = "Sin conexión al servidor.",
    timeoutText = "Tiempo de espera agotado.",
    unknownText = "Error de red desconocido.",
    infoKind = "info",
    errorKind = "error",
    autoCloseMs = 3000,
  } = options ?? {};

  return {
    "NET.OFFLINE": { kind: infoKind, text: offlineText, autoCloseMs },
    "NET.TIMEOUT": { kind: errorKind, text: timeoutText, autoCloseMs },
    "NET.UNKNOWN": { kind: errorKind, text: unknownText, autoCloseMs },
  };
}

/**
 * Helper: catálogo sencillo para el caso 204 “sin cambios” al modificar.
 * Suele manejarse globalmente (interceptor), pero se deja disponible acá.
 */
export function createNoChangeCatalog(text = "La solicitud se procesó correctamente, pero no hubo cambios (204).", autoCloseMs = 2500): ErrorCatalog {
  return {
    "HTTP.204": { kind: "info", text, autoCloseMs },
    // También puede modelarse como negocio:
    "GLOBAL.BUSINESS.NO_CHANGES": { kind: "info", text, autoCloseMs },
  };
}
