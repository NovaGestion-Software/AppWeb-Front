/**
 * error-registry.ts
 * Registro modular de mappers AppError -> UiMessage.
 * - Permite múltiples mappers por namespace (prioridad por orden de registro).
 * - Soporta mapper global (fallback) para errores sin ns o no mapeados por el dominio.
 * - Incluye helpers para registrar catálogos y componer funciones.
 */

import type { AppError, ErrorNamespace } from "@/types/errors";
import type { UiMessage } from "@/types/ui-messages";
import type { ErrorToUiMapper, ErrorCatalog } from "@/types/error-mapper";
import { createCatalogMapper, composeMappers } from "@/types/error-mapper";

/** Estructura interna por namespace */
type NsKey = Uppercase<string>;
type MapperList = ErrorToUiMapper[];

const registry = new Map<NsKey, MapperList>();
const GLOBAL_NS: NsKey = "GLOBAL";

/**
 * Normaliza el namespace a mayúsculas para la clave interna.
 */
function normalizeNs(ns?: ErrorNamespace): NsKey {
  return (ns ?? "GLOBAL").toString().toUpperCase() as NsKey;
}

/**
 * Registra un mapper para un namespace.
 * - El último registrado tiene mayor prioridad (queda al inicio de la lista).
 * - Si no existe la entrada del ns, se crea.
 */
export function registerErrorMapper(ns: ErrorNamespace, mapper: ErrorToUiMapper): void {
  const key = normalizeNs(ns);
  const list = registry.get(key) ?? [];
  registry.set(key, [mapper, ...list]);
}

/**
 * Registra un catálogo declarativo para un namespace.
 * - Azúcar sintáctico sobre registerErrorMapper usando createCatalogMapper().
 */
export function registerErrorCatalog(
  ns: ErrorNamespace,
  catalog: ErrorCatalog,
  options?: Parameters<typeof createCatalogMapper>[1]
): void {
  registerErrorMapper(ns, createCatalogMapper(catalog, options));
}

/**
 * Desregistrar un mapper concreto de un namespace.
 * - Si no se encuentra, no hace nada.
 */
export function unregisterErrorMapper(ns: ErrorNamespace, mapper: ErrorToUiMapper): void {
  const key = normalizeNs(ns);
  const list = registry.get(key);
  if (!list) return;
  const next = list.filter((m) => m !== mapper);
  if (next.length) registry.set(key, next);
  else registry.delete(key);
}

/**
 * Limpia todos los mappers de un namespace.
 */
export function clearNamespaceMappers(ns: ErrorNamespace): void {
  const key = normalizeNs(ns);
  registry.delete(key);
}

/**
 * Limpia todo el registro (incluye GLOBAL).
 */
export function clearAllMappers(): void {
  registry.clear();
}

/**
 * Obtiene el mapper compuesto para un namespace (si existe).
 * - Orden de resolución: mappers del ns (en orden de prioridad) → mappers GLOBAL.
 * - Si no hay mappers, devuelve undefined.
 */
export function getComposedMapper(ns?: ErrorNamespace): ErrorToUiMapper | undefined {
  const key = normalizeNs(ns);
  const domain = registry.get(key) ?? [];
  const global = key === GLOBAL_NS ? [] : (registry.get(GLOBAL_NS) ?? []);

  if (domain.length === 0 && global.length === 0) return undefined;
  return composeMappers(...domain, ...global);
}

/**
 * Convierte un AppError a UiMessage según el registro actual.
 * - Usa el mapper del ns del error si existe, con fallback al GLOBAL.
 * - Devuelve null si no hay mapper aplicable.
 */
export function resolveErrorToUi(err: AppError): UiMessage | null {
  const mapper = getComposedMapper(err.ns);
  return mapper ? mapper(err) : null;
}

/**
 * Estado del registro (para debugging u observabilidad).
 */
export function listNamespaces(): string[] {
  return Array.from(registry.keys());
}

export function countMappers(ns?: ErrorNamespace): number {
  const key = normalizeNs(ns);
  return (registry.get(key) ?? []).length;
}

/**
 * Inicialización recomendada:
 * - Registrar un mapper GLOBAL como fallback.
 * - Registrar mappers por dominio (PROV, VENTAS, etc.) donde se definan.
 *
 * Ejemplo (fuera de este archivo):
 *   import { createHttpCatalog, createNetworkCatalog } from "@/types/error-mapper";
 *   registerErrorCatalog("GLOBAL", {
 *     ...createHttpCatalog(),
 *     ...createNetworkCatalog(),
 *     ...createNoChangeCatalog(),
 *   });
 */
