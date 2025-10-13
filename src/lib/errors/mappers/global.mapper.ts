/**
 * global.mapper.ts
 * Mapper GLOBAL por defecto: HTTP + Network + NoChange(204).
 * Registra catálogos en el registry con una sola función que se llama una vez al boot.
 */

import { registerErrorCatalog } from "@/lib/errors/error-registry";
import {
  createHttpCatalog,
  createNetworkCatalog,
  createNoChangeCatalog,
} from "@/types/error-mapper";

// Llamar una sola vez (p. ej., en main.tsx)
export function registerGlobalErrorMappers() {
  // Catálogo HTTP estándar
  registerErrorCatalog("GLOBAL", createHttpCatalog({
    // Podés sobreescribir textos si querés:
    textOverrides: {
      401: "No autorizado. Iniciá sesión nuevamente.",
      403: "No tenés permisos para esta acción.",
      404: "No encontramos lo que buscás.",
      422: "Revisá los datos: hay campos inválidos.",
      500: "El servidor tuvo un problema. Probá más tarde.",
    },
    kind: "error",
    autoCloseMs: 3500,
  }));

  // Catálogo de estados de red comunes
  registerErrorCatalog("GLOBAL", createNetworkCatalog({
    offlineText: "Sin conexión. Verificá tu internet.",
    timeoutText: "Se agotó el tiempo de espera.",
    unknownText: "Ocurrió un problema de red.",
    infoKind: "info",
    errorKind: "error",
    autoCloseMs: 3000,
  }));

  // Catálogo para 204 “sin cambios”
  registerErrorCatalog("GLOBAL", createNoChangeCatalog(
    "La solicitud se procesó, pero no hubo cambios (204).",
    2500
  ));
}
