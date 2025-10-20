/**
 * @module DtoProveedoresOut
 *
 * Define el **DTO de salida** (front → backend) para la entidad **Proveedor**.
 *
 * Este módulo representa el formato de datos que el frontend envía al backend PHP
 * durante operaciones de **alta, modificación o eliminación**.
 *
 * Características:
 * - Los **flags booleanos** se expresan como `0` o `1` (`Bool01Out`).
 * - Las **fechas** se envían como strings con formato `"YYYY-MM-DD HH:mm:ss"` o `null`.
 * - Los **nombres de campos** y tipos se mantienen idénticos a los del backend.
 *
 * Este esquema garantiza la compatibilidad total con PHP, que normalmente
 * espera objetos completos con todos los `keys` definidos.
 *
 * @see ../domain/proveedor.domain.ts
 * @see ../adapters/proveedores.adapters.ts
 * @see ../service/proveedores.repository.ts
 * @see ../service/proveedores.api.ts
 */

import { z } from "zod";

/**
 * Representa los valores válidos para flags numéricos que codifican booleanos
 * en el backend (`0` = false, `1` = true).
 *
 * @example
 * ```ts
 * Bool01Out.parse(1); // ✅ true
 * Bool01Out.parse(0); // ✅ false
 * Bool01Out.parse(2); // ❌ error
 * ```
 */
export const Bool01Out = z.union([z.literal(0), z.literal(1)]);

/**
 * Representa el formato de fecha/hora esperado por el backend PHP:
 * `"YYYY-MM-DD HH:mm:ss"`, o `null` si no aplica.
 *
 * @example
 * ```ts
 * BackendDateTimeOut.parse("2025-02-15 13:45:00"); // ✅ válido
 * BackendDateTimeOut.parse("2025-02-15T13:45:00"); // ❌ formato inválido
 * ```
 */
export const BackendDateTimeOut = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
    "Formato de fecha/hora inválido (YYYY-MM-DD HH:mm:ss)"
  );

/**
 * Esquema Zod para el **DTO de salida** (`ProveedorDtoOut`),
 * utilizado cuando el frontend envía datos al backend (crear, modificar o eliminar).
 *
 * Este objeto refleja exactamente el contrato esperado por el backend PHP:
 * - Flags booleanos → `0` o `1`
 * - Fechas → `"YYYY-MM-DD HH:mm:ss"` o `null`
 * - Strings y números se mantienen sin transformación
 *
 * ⚙️ Si en el futuro se utilizan endpoints que acepten payloads parciales (PATCH),
 * se pueden volver opcionales algunos campos, pero este esquema define el formato
 * **completo** para máxima compatibilidad con PHP.
 */
export const ProveedorDtoOutSchema = z.strictObject({
  /* -------------------------------- Identificación -------------------------------- */
  idprovee: z.number(),
  idnodo: z.number(),

  /* ------------------------------- Datos generales ------------------------------- */
  nombre: z.string(),
  nfantasia: z.string(),

  /* ------------------------------- Datos fiscales -------------------------------- */
  idctrib: z.number(),
  idtdoc: z.number(),
  cuit: z.string(),
  ibruto: z.string(),

  /* ------------------------------- Ubicación ------------------------------------- */
  domicilio1: z.string(),
  domicilio2: z.string(),
  localidad: z.string(),
  cpostal: z.string(),
  calle1: z.string(),
  calle2: z.string(),
  latitud: z.string(),
  longitud: z.string(),
  idcodprov: z.number(),

  /* ------------------------------- Contacto -------------------------------------- */
  codarea: z.string(),
  telefono: z.string(),
  telefono1: z.string().optional().nullable().default(""),
  codarea1: z.string().optional().nullable().default(""),
  telefono2: z.string().optional().nullable().default(""),
  codarea2: z.string().optional().nullable().default(""),

  email: z.string(),

  /* ------------------------------- Forma de pago -------------------------------- */
  fpago: z.string(),

  /* ------------------------------- Monedas y flags ------------------------------- */
  f_pesos: Bool01Out,
  f_dolares: Bool01Out,

  /* ---------------------------------- Plazos ------------------------------------- */
  dias_p: z.number(),
  dias_v: z.number(),
  dias_e: z.number(),

  obs: z.string(),

  /* ------------------------- Regímenes / Retenciones ----------------------------- */
  idregbru: z.number(),
  idregiva: z.number(),
  idreggan: z.number(),

  exretbru: Bool01Out,
  exretiva: Bool01Out,
  exretgan: Bool01Out,

  nexretbru: z.string(),
  nexretiva: z.string(),
  nexretgan: z.string(),

  /* ---------------------------------- Fechas ------------------------------------- */
  fecbru: BackendDateTimeOut.nullable(),
  feciva: BackendDateTimeOut.nullable(),
  fecgan: BackendDateTimeOut.nullable(),
  vtobru: BackendDateTimeOut.nullable(),
  vtoiva: BackendDateTimeOut.nullable(),
  vtogan: BackendDateTimeOut.nullable(),

  /* ----------------------------- Estado e inhabilitado ---------------------------- */
  inha: Bool01Out,

  /* --------------------------------- Auditoría ----------------------------------- */
  usuario_a: z.number(),
  usuario_m: z.number(),
  usuario_b: z.number(),

  f_alta: BackendDateTimeOut.nullable(),
  f_modi: BackendDateTimeOut.nullable(),
  f_baja: BackendDateTimeOut.nullable(),

  icambio: z.number(),
  ncambio: z.number(),
});

/**
 * Tipo TypeScript inferido del esquema `ProveedorDtoOutSchema`.
 * Representa la estructura exacta que se envía al backend.
 */
export type ProveedorDtoOut = z.infer<typeof ProveedorDtoOutSchema>;
