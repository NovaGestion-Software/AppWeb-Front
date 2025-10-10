// /views/app/Proveedores/Data/services/proveedores.repository.ts

import {
  apiObtenerProveedor,
  apiAltaProveedor,
  apiModificarProveedor,
  apiEliminarProveedor,
} from "./proveedores.api";
import type { ProveedorDtoIn, ProveedorDtoOut } from "../dto";
import { mapDtoToDomain, mapDomainToDto } from "../adapters";
import type { ProveedorDomain } from "../domain";

/**
 * 🔎 Leer un proveedor por id:
 * 1) Llama a la API (GET), validando el envelope + DTO IN con Zod.
 * 2) Mapea a Domain (booleans reales, fechas ISO/undefined).
 */
export async function repoGetProveedor(idprovee: number): Promise<ProveedorDomain | null> {
  const dtoIn: ProveedorDtoIn | null = await apiObtenerProveedor(idprovee);
  if (!dtoIn) return null;
  return mapDtoToDomain(dtoIn);
}

/**
 * 🟢 Alta:
 * 1) Recibe Domain desde la UI/store.
 * 2) Mapea a DTO OUT (booleans → 0/1, ISO → "YYYY-MM-DD HH:mm:ss").
 * 3) Llama a la API de alta (valida DTO con Zod y hace POST).
 */
export async function repoAltaProveedor(nuevo: ProveedorDomain) {
  const dtoOut: ProveedorDtoOut = mapDomainToDto(nuevo);
  return apiAltaProveedor(dtoOut);
}

/**
 * 🟠 Modificar:
 * 1) Recibe Domain ORIGINAL y MODIFICADO.
 * 2) Mapea ambos a DTO OUT.
 * 3) Llama a la API de modificar con `_id` y el par (original, modificado).
 */
export async function repoModificarProveedor(
  idprovee: number,
  original: ProveedorDomain,
  modificado: ProveedorDomain
) {
  const dtoOriginal: ProveedorDtoOut = mapDomainToDto(original);
  const dtoModificado: ProveedorDtoOut = mapDomainToDto(modificado);
  return apiModificarProveedor(idprovee, dtoOriginal, dtoModificado);
}

/**
 * 🔴 Eliminar:
 * 1) Recibe Domain ORIGINAL.
 * 2) Mapea a DTO OUT.
 * 3) Llama a la API de eliminar con `_id`.
 */
export async function repoEliminarProveedor(idprovee: number, original: ProveedorDomain) {
  const dtoOriginal: ProveedorDtoOut = mapDomainToDto(original);
  return apiEliminarProveedor(idprovee, dtoOriginal);
}

/* ----------------------------------------------------------------------------
 * Helpers de conveniencia (opcionales)
 * ------------------------------------------------------------------------- */

/** Trae el DTO IN crudo y devuelve { domain, dtoIn } */
export async function repoFetchPair(idprovee: number): Promise<{
  domain: ProveedorDomain | null;
  dtoIn: ProveedorDtoIn | null;
}> {
  const dtoIn = await apiObtenerProveedor(idprovee);
  const domain = dtoIn ? mapDtoToDomain(dtoIn) : null;
  return { domain, dtoIn };
}

/** Genera el par (original, modificado) ya mapeado a DTO OUT */
export function repoBuildOutPair(
  original: ProveedorDomain,
  modificado: ProveedorDomain
): { originalOut: ProveedorDtoOut; modificadoOut: ProveedorDtoOut } {
  return {
    originalOut: mapDomainToDto(original),
    modificadoOut: mapDomainToDto(modificado),
  };
}
