/**
 * @module DtoProveedoresIn
 *
 * Define el **DTO de entrada** (backend → front) para la entidad **Proveedor**.
 *
 * Este módulo describe el formato exacto en que el backend PHP devuelve
 * los datos de un proveedor al frontend.  
 *
 * Características:
 * - Los **flags booleanos** vienen como números (`0` o `1`).
 * - Las **fechas** vienen como strings con formato `"YYYY-MM-DD HH:mm:ss"` o `null`.
 * - Los **nombres de propiedades** y tipos se mantienen idénticos al backend (sin renombrar).
 *
 * Este esquema garantiza una validación estricta de la respuesta, evitando
 * errores de formato o de estructura antes de mapear los datos al dominio.
 *
 * @see ../domain/proveedor.domain.ts
 * @see ../adapters/proveedores.adapters.ts
 * @see ../service/proveedores.repository.ts
 * @see ../service/proveedores.api.ts
 */

import { z } from "zod";

/**
 * Representa los valores numéricos que el backend utiliza
 * para codificar booleanos (`0` = false, `1` = true).
 *
 * @example
 * ```ts
 * Bool01In.parse(0); // ✅ válido
 * Bool01In.parse(1); // ✅ válido
 * Bool01In.parse(2); // ❌ error de validación
 * ```
 */
export const Bool01In = z.union([z.literal(0), z.literal(1)]);

/**
 * Representa el formato de fecha y hora que el backend devuelve
 * (`"YYYY-MM-DD HH:mm:ss"`), sin zona horaria (TZ).
 *
 * @example
 * ```ts
 * BackendDateTime.parse("2025-02-17 14:30:00"); // ✅ válido
 * BackendDateTime.parse("2025-02-17T14:30:00"); // ❌ formato inválido
 * ```
 */
export const BackendDateTime = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
    "Formato de fecha/hora inválido (YYYY-MM-DD HH:mm:ss)"
  );

/**
 * Esquema Zod para el **DTO de entrada** (`ProveedorDtoIn`),
 * que representa un proveedor tal como lo devuelve el backend PHP.
 *
 * Este esquema se usa para validar la estructura del objeto recibido antes de
 * mapearlo al modelo `Domain`.  
 *
 * - Flags → `0/1`
 * - Fechas → `"YYYY-MM-DD HH:mm:ss"` o `null`
 * - Campos string/number → sin transformación
 */
export const ProveedorDtoInSchema = z
  .object({
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
    codarea1: z.string(),
    telefono1: z.string(),
    codarea2: z.string(),
    telefono2: z.string(),

    email: z.string(),

    /* ------------------------------- Forma de pago -------------------------------- */
    fpago: z.string(),

    /* ------------------------------- Monedas y flags ------------------------------- */
    f_pesos: Bool01In,
    f_dolares: Bool01In,

    /* ---------------------------------- Plazos ------------------------------------- */
    dias_p: z.number(),
    dias_v: z.number(),
    dias_e: z.number(),

    obs: z.string(),

    /* ------------------------- Regímenes / Retenciones ----------------------------- */
    idregbru: z.number(),
    idregiva: z.number(),
    idreggan: z.number(),

    exretbru: Bool01In,
    exretiva: Bool01In,
    exretgan: Bool01In,

    nexretbru: z.string(),
    nexretiva: z.string(),
    nexretgan: z.string(),

    /* ---------------------------------- Fechas ------------------------------------- */
    fecbru: BackendDateTime.nullable(),
    feciva: BackendDateTime.nullable(),
    fecgan: BackendDateTime.nullable(),
    vtobru: BackendDateTime.nullable(),
    vtoiva: BackendDateTime.nullable(),
    vtogan: BackendDateTime.nullable(),

    /* ----------------------------- Estado e inhabilitado ---------------------------- */
    inha: Bool01In,

    /* --------------------------------- Auditoría ----------------------------------- */
    usuario_a: z.number(),
    usuario_m: z.number(),
    usuario_b: z.number(),

    f_alta: BackendDateTime,
    f_modi: BackendDateTime,
    f_baja: BackendDateTime.nullable(),

    icambio: z.number(),
    ncambio: z.number(),
  })
  .strict();

/**
 * Esquema que representa la **respuesta completa** del backend
 * al consultar un proveedor.  
 *
 * Estructura típica:
 * ```json
 * {
 *   "status": "success",
 *   "data": [ { ...ProveedorDtoIn } ],
 *   "code": 200,
 *   "message": "Operación exitosa"
 * }
 * ```
 *
 * Se valida con Zod para asegurar que el `data` contenga un array
 * de objetos válidos según `ProveedorDtoInSchema`.
 */
export const ProveedorDtoInResponseSchema = z.object({
  status: z.string(),
  data: z.array(ProveedorDtoInSchema),
  code: z.number(),
  message: z.string(),
});

/**
 * Tipo TypeScript inferido del esquema `ProveedorDtoInSchema`.
 * Representa la estructura individual de un proveedor recibido del backend.
 */
export type ProveedorDtoIn = z.infer<typeof ProveedorDtoInSchema>;

/**
 * Tipo TypeScript inferido del esquema `ProveedorDtoInResponseSchema`.
 * Representa la estructura completa de la respuesta del backend al consultar proveedores.
 */
export type ProveedorDtoInResponse = z.infer<typeof ProveedorDtoInResponseSchema>;
