// /views/app/Proveedores/Data/dto/proveedor.dto.out.schema.ts
import { z } from "zod";

/** 0/1 numéricos que representan booleanos al ENVIAR al backend */
export const Bool01Out = z.union([z.literal(0), z.literal(1)]);

/** Fechas backend: "YYYY-MM-DD HH:mm:ss" (o null) al ENVIAR */
export const BackendDateTimeOut = z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, "Formato de fecha/hora inválido (YYYY-MM-DD HH:mm:ss)");

/**
 * DTO de SALIDA (front -> backend).
 * Mantenemos nombres y tipos según backend:
 * - Flags como 0/1 (Bool01Out)
 * - Fechas "YYYY-MM-DD HH:mm:ss" o null
 * - Strings/números tal cual
 *
 * Nota: Si tu endpoint acepta payloads "parciales" (PATCH),
 * podés volver opcionales algunos campos. Aquí lo dejamos "completo"
 * para máxima compatibilidad con PHP que suele esperar todos los keys.
 */
export const ProveedorDtoOutSchema = z.strictObject({
  idprovee: z.number(),
  idnodo: z.number(),

  nombre: z.string(),
  nfantasia: z.string(),

  idctrib: z.number(),
  idtdoc: z.number(),

  cuit: z.string(),
  ibruto: z.string(),

  domicilio1: z.string(),
  domicilio2: z.string(),
  localidad: z.string(),
  cpostal: z.string(),
  calle1: z.string(),
  calle2: z.string(),

  latitud: z.string(),
  longitud: z.string(),

  idcodprov: z.number(),

  codarea: z.string(),
  telefono: z.string(),
  telefono1: z.string().optional().nullable().default(""),
  codarea1: z.string().optional().nullable().default(""),
  telefono2: z.string().optional().nullable().default(""),
  codarea2: z.string().optional().nullable().default(""),

  email: z.string(),

  fpago: z.string(),

  // Flags 0/1
  f_pesos: Bool01Out,
  f_dolares: Bool01Out,

  // Plazos
  dias_p: z.number(),
  dias_v: z.number(),
  dias_e: z.number(),

  obs: z.string(),

  // idreg* se tratan como flags 0/1
idregbru: z.number(),
idregiva: z.number(),
idreggan: z.number(),

  exretbru: Bool01Out,
  exretiva: Bool01Out,
  exretgan: Bool01Out,

  nexretbru: z.string(),
  nexretiva: z.string(),
  nexretgan: z.string(),

  // Fechas (o null)
  fecbru: BackendDateTimeOut.nullable(),
  feciva: BackendDateTimeOut.nullable(),
  fecgan: BackendDateTimeOut.nullable(),
  vtobru: BackendDateTimeOut.nullable(),
  vtoiva: BackendDateTimeOut.nullable(),
  vtogan: BackendDateTimeOut.nullable(),

  inha: Bool01Out,

  // Usuarios: números incrementales (no 0/1)
  usuario_a: z.number(),
  usuario_m: z.number(),
  usuario_b: z.number(),

  f_alta: BackendDateTimeOut.nullable(),
  f_modi: BackendDateTimeOut.nullable(),
  f_baja: BackendDateTimeOut.nullable(),

  icambio: z.number(),
  ncambio: z.number(),
});

export type ProveedorDtoOut = z.infer<typeof ProveedorDtoOutSchema>;
