// /views/app/Proveedores/Data/domain/proveedor.domain.schema.ts
import { z } from "zod";


export const REQUIRED_ORDER: Array<keyof ProveedorDomain> = ["nombre", "nfantasia", "domicilio1", "localidad", "cpostal", "idcodprov", "idctrib", "idtdoc", "cuit", "ibruto"];

/** ISO-like sin TZ: "YYYY-MM-DDTHH:mm:ss" */
export const DomainIso = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, "Formato ISO esperado: YYYY-MM-DDTHH:mm:ss");

/**
 * Modelo Domain/UI:
 * - Mantiene los mismos nombres que el backend.
 * - Flags 0/1 → boolean.
 * - Fechas "YYYY-MM-DD HH:mm:ss"|null → "YYYY-MM-DDTHH:mm:ss"|undefined.
 * - Resto de campos: mismo tipo lógico (string/number).
 */
export const ProveedorDomainSchema = z.strictObject({
  idprovee: z.number(),
  idnodo: z.number(),

  // Requeridos
  nombre: z.string().min(1, "Campo requerido"),
  nfantasia: z.string().min(1, "Campo requerido"),

  // selects numéricos (requeridos)
  idctrib: z.number().nonnegative("Campo requerido"),
  idtdoc: z.number().nonnegative("Campo requerido"),

  cuit: z.string().min(1, "Campo requerido"),
  ibruto: z.string().min(1, "Campo requerido"),

  domicilio1: z.string().min(1, "Campo requerido"),
  domicilio2: z.string(),
  localidad: z.string().min(1, "Campo requerido"),
  cpostal: z.string().min(1, "Campo requerido"),
  calle1: z.string(),
  calle2: z.string(),

  latitud: z.string(),
  longitud: z.string(),

  idcodprov: z.number().nonnegative("Campo requerido"),

  codarea: z.string(),
  telefono: z.string(),
  codarea1: z.string(),
  telefono1: z.string(),
  codarea2: z.string(),
  telefono2: z.string(),

  email: z.string(),

  fpago: z.string(),

  // Flags ya en boolean
  f_pesos: z.boolean(),
  f_dolares: z.boolean(),

  // Plazos
  dias_p: z.number(),
  dias_v: z.number(),
  dias_e: z.number(),

  obs: z.string(),

  // Retenciones / registros: boolean en domain
  idregbru: z.number(),
  idregiva: z.number(),
  idreggan: z.number(),

  exretbru: z.boolean(),
  exretiva: z.boolean(),
  exretgan: z.boolean(),

  nexretbru: z.string(),
  nexretiva: z.string(),
  nexretgan: z.string(),

  // Fechas ISO-like o undefined
  fecbru: DomainIso.optional(),
  feciva: DomainIso.optional(),
  fecgan: DomainIso.optional(),
  vtobru: DomainIso.optional(),
  vtoiva: DomainIso.optional(),
  vtogan: DomainIso.optional(),

  // Inhabilitado (flag)
  inha: z.boolean(),

  // Auditoría: números incrementales (no 0/1)
  usuario_a: z.number(),
  usuario_m: z.number(),
  usuario_b: z.number(),

  f_alta: DomainIso.optional(),
  f_modi: DomainIso.optional(),
  f_baja: DomainIso.optional(),

  icambio: z.number(),
  ncambio: z.number(),
});

export type ProveedorDomain = z.infer<typeof ProveedorDomainSchema>;


