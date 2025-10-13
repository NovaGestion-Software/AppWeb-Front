/**
 * proveedores.mapper.ts
 * Catálogo/mappers del dominio PROV (Proveedores).
 * Cubre:
 *  - BUSINESS.SIN_DATOS   (200 OK sin data – detectado por el front)
 *  - NO CHANGES (HTTP.204 o PROV.BUSINESS.NO_CHANGES)
 *
 * Listo para extender con validaciones de negocio (CUIT duplicado, etc.).
 */

import { registerErrorCatalog } from "@/lib/errors/error-registry";
import type { ErrorCatalog } from "@/types/error-mapper";

/** Catálogo de PROV inicial (fácil de ampliar) */
const catalogProv: ErrorCatalog = {
  // 200 OK pero sin data (lo detecta el front y emite este AppError)
  "PROV.BUSINESS.SIN_DATOS": {
    kind: "info",
    title: "Sin resultados",
    text: "No se encontraron proveedores para el criterio seleccionado.",
    autoCloseMs: 2500,
  },

  // Modificación sin cambios (si armás AppError con este código)
  "PROV.BUSINESS.NO_CHANGES": {
    kind: "info",
    text: "No hubo cambios para guardar en este proveedor.",
    autoCloseMs: 2500,
  },

  // Override local del 204 para PROV (por si tu AppError llega como HTTP.204)
  "HTTP.204": {
    kind: "info",
    text: "No hubo cambios para guardar en este proveedor.",
    autoCloseMs: 2500,
  },
};

/** Registrar catálogo PROV (llamar una sola vez al boot del módulo Proveedores) */
export function registerProveedorErrorMappers() {
  registerErrorCatalog("PROV", catalogProv, {
    defaults: { kind: "info", autoCloseMs: 2500 },
  });
}
