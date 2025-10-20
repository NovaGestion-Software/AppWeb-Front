/**
 * @module RepositorioProveedores
 *
 * Capa de repositorio para la entidad **Proveedor**.
 *
 * Este módulo actúa como intermediario entre:
 * - La capa **Domain** (modelos internos con tipos nativos y normalizados).
 * - La capa **API** (métodos HTTP que comunican con el backend PHP).
 *
 * Su responsabilidad es:
 * - Mapear objetos Domain ↔ DTO utilizando los adaptadores (`mapDtoToDomain`, `mapDomainToDto`).
 * - Garantizar la validación tipada mediante Zod.
 * - Proveer una API de alto nivel (`repoAltaProveedor`, `repoModificarProveedor`, etc.)
 *   para ser utilizada directamente desde la store o la UI sin exponer la lógica HTTP.
 *
 * @see ./proveedores.api.ts
 * @see ../adapters
 * @see ../domain
 */
import { apiObtenerProveedor, apiAltaProveedor, apiModificarProveedor, apiEliminarProveedor } from "./proveedores.api";
import type { ProveedorDtoIn, ProveedorDtoOut } from "../dto";
import { mapDtoToDomain, mapDomainToDto } from "../adapters";
import type { ProveedorDomain } from "../domain";

/* ----------------------------------------------------------------------------
 * Repositorio de Proveedores
 * Encapsula la lógica de traducción entre capa Domain y capa DTO/Backend.
 * ------------------------------------------------------------------------- */

/**
 * 🔎 Obtiene un proveedor por su ID desde la API y lo mapea al dominio de la aplicación.
 *
 * **Flujo interno:**
 * 1. Invoca `apiObtenerProveedor` (GET) y valida la respuesta con Zod.
 * 2. Mapea el DTO recibido (`ProveedorDtoIn`) al objeto de dominio (`ProveedorDomain`),
 *    aplicando normalizaciones (booleanos reales, fechas ISO, etc.).
 *
 * @async
 * @function repoGetProveedor
 * @param {number} idprovee - ID del proveedor a consultar.
 * @returns {Promise<ProveedorDomain | null>} Promesa que resuelve con el proveedor mapeado o `null` si no existe.
 * @throws {AxiosError | ZodError} Si falla la validación o la solicitud HTTP.
 */
export async function repoGetProveedor(idprovee: number): Promise<ProveedorDomain | null> {
  const dtoIn: ProveedorDtoIn | null = await apiObtenerProveedor(idprovee);
  if (!dtoIn) return null;
  return mapDtoToDomain(dtoIn);
}

/**
 * 🟢 Crea un nuevo proveedor.
 *
 * **Flujo interno:**
 * 1. Recibe un objeto de dominio (`ProveedorDomain`) desde la UI o store.
 * 2. Lo mapea a DTO de salida (`ProveedorDtoOut`) transformando:
 *    - Booleanos → `0/1`
 *    - Fechas ISO → `"YYYY-MM-DD HH:mm:ss"`
 * 3. Envía la solicitud POST mediante `apiAltaProveedor`, validando el DTO con Zod.
 *
 * @async
 * @function repoAltaProveedor
 * @param {ProveedorDomain} nuevo - Proveedor a registrar.
 * @returns {Promise<GrabarDatosResponse>} Resultado de la operación de alta.
 * @throws {AxiosError | ZodError} Si ocurre un error de validación o red.
 */
export async function repoAltaProveedor(nuevo: ProveedorDomain) {
  const dtoOut: ProveedorDtoOut = mapDomainToDto(nuevo);
  return apiAltaProveedor(dtoOut);
}

/**
 * 🟠 Modifica un proveedor existente.
 *
 * **Flujo interno:**
 * 1. Recibe el objeto de dominio original y el modificado.
 * 2. Ambos se mapean a DTO de salida (`ProveedorDtoOut`).
 * 3. Llama a `apiModificarProveedor`, enviando `_id` y los dos DTO.
 *
 * @async
 * @function repoModificarProveedor
 * @param {number} idprovee - ID del proveedor a modificar.
 * @param {ProveedorDomain} original - Estado original del proveedor.
 * @param {ProveedorDomain} modificado - Estado actualizado del proveedor.
 * @returns {Promise<GrabarDatosResponse>} Resultado de la operación de modificación.
 * @throws {AxiosError | ZodError} Si ocurre un error de validación o red.
 */
export async function repoModificarProveedor(idprovee: number, original: ProveedorDomain, modificado: ProveedorDomain) {
  const dtoOriginal: ProveedorDtoOut = mapDomainToDto(original);
  const dtoModificado: ProveedorDtoOut = mapDomainToDto(modificado);
  return apiModificarProveedor(idprovee, dtoOriginal, dtoModificado);
}

/**
 * 🔴 Elimina un proveedor existente.
 *
 * **Flujo interno:**
 * 1. Recibe el objeto de dominio original.
 * 2. Lo mapea a DTO de salida (`ProveedorDtoOut`).
 * 3. Llama a `apiEliminarProveedor` con el `_id` correspondiente.
 *
 * @async
 * @function repoEliminarProveedor
 * @param {number} idprovee - ID del proveedor a eliminar.
 * @param {ProveedorDomain} original - Proveedor original (antes de eliminarlo).
 * @returns {Promise<GrabarDatosResponse>} Resultado de la operación de eliminación.
 * @throws {AxiosError | ZodError} Si ocurre un error de validación o red.
 */
export async function repoEliminarProveedor(idprovee: number, original: ProveedorDomain) {
  const dtoOriginal: ProveedorDtoOut = mapDomainToDto(original);
  return apiEliminarProveedor(idprovee, dtoOriginal);
}

// /* ----------------------------------------------------------------------------
//  * Helpers de conveniencia
//  * ------------------------------------------------------------------------- */

// /**
//  * Obtiene simultáneamente el DTO crudo y su equivalente en el dominio.
//  *
//  * **Uso común:** depuración o sincronización entre store y backend.
//  *
//  * @async
//  * @function repoFetchPair
//  * @param {number} idprovee - ID del proveedor a obtener.
//  * @returns {Promise<{ domain: ProveedorDomain | null; dtoIn: ProveedorDtoIn | null }>}
//  * Objeto con ambas representaciones (`domain` y `dtoIn`).
//  */
// export async function repoFetchPair(idprovee: number): Promise<{
//   domain: ProveedorDomain | null;
//   dtoIn: ProveedorDtoIn | null;
// }> {
//   const dtoIn = await apiObtenerProveedor(idprovee);
//   const domain = dtoIn ? mapDtoToDomain(dtoIn) : null;
//   return { domain, dtoIn };
// }

// /**
//  * Construye un par de DTOs de salida (`originalOut`, `modificadoOut`)
//  * a partir de dos objetos de dominio.
//  *
//  * **Uso común:** preparar payloads para `apiModificarProveedor`.
//  *
//  * @function repoBuildOutPair
//  * @param {ProveedorDomain} original - Proveedor original antes de la modificación.
//  * @param {ProveedorDomain} modificado - Proveedor modificado después del cambio.
//  * @returns {{ originalOut: ProveedorDtoOut; modificadoOut: ProveedorDtoOut }}
//  * Objeto con ambos DTO mapeados listos para enviar al backend.
//  */
// export function repoBuildOutPair(
//   original: ProveedorDomain,
//   modificado: ProveedorDomain
// ): { originalOut: ProveedorDtoOut; modificadoOut: ProveedorDtoOut } {
//   return {
//     originalOut: mapDomainToDto(original),
//     modificadoOut: mapDomainToDto(modificado),
//   };
// }
