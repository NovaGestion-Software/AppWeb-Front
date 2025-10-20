/**
 * @module DomainProveedores
 *
 * Define el modelo **Domain/UI** para la entidad **Proveedor**.
 *
 * Este módulo representa la estructura interna utilizada por la aplicación (UI o store),
 * ya normalizada respecto al backend. Su propósito es proporcionar un contrato seguro
 * y validado para todos los datos que se manipulan en el frontend.
 *
 * Características del modelo:
 * - Mantiene los mismos nombres de campos que el backend.
 * - Convierte flags 0/1 → boolean.
 * - Convierte fechas backend (`"YYYY-MM-DD HH:mm:ss"`) → ISO-like (`"YYYY-MM-DDTHH:mm:ss"`).
 * - Permite validación estricta mediante **Zod** (`z.strictObject`).
 *
 * Este esquema sirve como referencia para validar, construir y transformar
 * los datos entre las distintas capas del sistema (`Adapters`, `Repo`, `API`).
 *
 * @see ../adapters/proveedores.adapters.ts
 * @see ../service/proveedores.repository.ts
 * @see ../service/proveedores.api.ts
 */

import { z } from "zod";

/**
 * Define el orden de prioridad de los campos requeridos al validar un proveedor.
 * Se utiliza para guiar procesos de completitud o generación de mensajes de error.
 */
export const REQUIRED_ORDER: Array<keyof ProveedorDomain> = [
  "nombre",
  "nfantasia",
  "domicilio1",
  "localidad",
  "cpostal",
  "idcodprov",
  "idctrib",
  "idtdoc",
  "cuit",
  "ibruto",
];

/**
 * Representa un string ISO-like sin zona horaria (TZ), validado con el formato:
 * `"YYYY-MM-DDTHH:mm:ss"`.
 *
 * @example
 * ```ts
 * const fechaValida = "2024-03-15T10:30:00";
 * DomainIso.parse(fechaValida); // ✅ Pasa validación
 * ```
 */
export const DomainIso = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, "Formato ISO esperado: YYYY-MM-DDTHH:mm:ss");

/**
 * Esquema Zod del modelo **ProveedorDomain**.
 *
 * Representa la estructura tipada y validada del proveedor dentro del dominio/UI.
 * Cada campo sigue la convención del backend, pero normalizado para uso interno:
 *
 * - **Flags (0/1)** → booleanos reales.
 * - **Fechas** `"YYYY-MM-DD HH:mm:ss" | null` → `"YYYY-MM-DDTHH:mm:ss" | undefined`.
 * - **Campos numéricos** permanecen como `number`.
 * - **Cadenas de texto** permanecen como `string` (vacías o con contenido).
 */
export const ProveedorDomainSchema = z.strictObject({
  /* -------------------------------- Identificación -------------------------------- */
  idprovee: z.number(),
  idnodo: z.number(),

  /* ------------------------------ Datos requeridos ------------------------------- */
  nombre: z.string().min(1, "Campo requerido"),
  nfantasia: z.string().min(1, "Campo requerido"),

  /* ------------------------------- Datos fiscales -------------------------------- */
  idctrib: z.number().nonnegative("Campo requerido"), // condición tributaria
  idtdoc: z.number().nonnegative("Campo requerido"),  // tipo de documento
  cuit: z.string().min(1, "Campo requerido"),
  ibruto: z.string().min(1, "Campo requerido"),

  /* ------------------------------- Ubicación física ------------------------------- */
  domicilio1: z.string().min(1, "Campo requerido"),
  domicilio2: z.string(),
  localidad: z.string().min(1, "Campo requerido"),
  cpostal: z.string().min(1, "Campo requerido"),
  calle1: z.string(),
  calle2: z.string(),

  latitud: z.string(),
  longitud: z.string(),

  idcodprov: z.number().nonnegative("Campo requerido"), // código de provincia

  /* ------------------------------ Contacto y comunicación ------------------------- */
  codarea: z.string(),
  telefono: z.string(),
  codarea1: z.string(),
  telefono1: z.string(),
  codarea2: z.string(),
  telefono2: z.string(),

  email: z.string(),

  /* ------------------------------- Forma de pago ---------------------------------- */
  fpago: z.string(),

  /* ------------------------------- Monedas y flags ------------------------------- */
  f_pesos: z.boolean(),
  f_dolares: z.boolean(),

  /* --------------------------------- Plazos -------------------------------------- */
  dias_p: z.number(), // plazo promedio
  dias_v: z.number(), // vencimiento
  dias_e: z.number(), // entrega

  obs: z.string(),

  /* ------------------------- Retenciones / Regímenes fiscales -------------------- */
  idregbru: z.number(),
  idregiva: z.number(),
  idreggan: z.number(),

  exretbru: z.boolean(),
  exretiva: z.boolean(),
  exretgan: z.boolean(),

  nexretbru: z.string(),
  nexretiva: z.string(),
  nexretgan: z.string(),

  /* ----------------------------- Fechas de vigencia ------------------------------ */
  fecbru: DomainIso.optional(),
  feciva: DomainIso.optional(),
  fecgan: DomainIso.optional(),
  vtobru: DomainIso.optional(),
  vtoiva: DomainIso.optional(),
  vtogan: DomainIso.optional(),

  /* ------------------------------- Estado e inhabilitado ------------------------- */
  inha: z.boolean(), // true = inhabilitado

  /* ------------------------------- Auditoría ------------------------------------- */
  usuario_a: z.number(), // usuario de alta
  usuario_m: z.number(), // usuario de modificación
  usuario_b: z.number(), // usuario de baja

  f_alta: DomainIso.optional(),
  f_modi: DomainIso.optional(),
  f_baja: DomainIso.optional(),

  icambio: z.number(),
  ncambio: z.number(),
});

/**
 * Tipo inferido a partir del esquema `ProveedorDomainSchema`.
 * Representa la estructura de un proveedor dentro del dominio/UI.
 */
export type ProveedorDomain = z.infer<typeof ProveedorDomainSchema>;
