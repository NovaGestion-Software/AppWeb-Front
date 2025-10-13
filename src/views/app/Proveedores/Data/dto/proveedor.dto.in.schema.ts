// /views/app/Proveedores/Data/dto/proveedor.dto.in.schema.ts
import { z } from "zod";

/** 0/1 numéricos que representan booleanos en el backend */
export const Bool01In = z.union([z.literal(0), z.literal(1)]);

/** Fechas backend: "YYYY-MM-DD HH:mm:ss" (sin TZ) */
export const BackendDateTime = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, "Formato de fecha/hora inválido (YYYY-MM-DD HH:mm:ss)");

/**
 * Schema de un proveedor tal como VIENE del backend (DTO de entrada).
 * Mantiene nombres y tipos del backend (sin renombrar).
 */
export const ProveedorDtoInSchema = z
  .object({
    idprovee: z.number(),
    idnodo: z.number(),

    nombre: z.string(),          // puede venir vacío
    nfantasia: z.string(),

    idctrib: z.number(),         // select numérico
    idtdoc: z.number(),          // select numérico

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

    idcodprov: z.number(),       // select numérico

    codarea: z.string(),
    telefono: z.string(),
    codarea1: z.string(),
    telefono1: z.string(),
    codarea2: z.string(),
    telefono2: z.string(),

    email: z.string(),

    fpago: z.string(),

    // Flags 0/1
    f_pesos: Bool01In,
    f_dolares: Bool01In,

    // Plazos
    dias_p: z.number(),
    dias_v: z.number(),
    dias_e: z.number(),

    obs: z.string(),

    // Según tu indicación, estos idreg* son tratados como flags 0/1
    idregbru: Bool01In,
    idregiva: Bool01In,
    idreggan: Bool01In,

    exretbru: Bool01In,
    exretiva: Bool01In,
    exretgan: Bool01In,

    nexretbru: z.string(),
    nexretiva: z.string(),
    nexretgan: z.string(),

    // Fechas (o null)
    fecbru: BackendDateTime.nullable(),
    feciva: BackendDateTime.nullable(),
    fecgan: BackendDateTime.nullable(),
    vtobru: BackendDateTime.nullable(),
    vtoiva: BackendDateTime.nullable(),
    vtogan: BackendDateTime.nullable(),

    inha: Bool01In,

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
 * Envelope completo tal como lo devuelve el backend:
 * {
 *   "status": "success",
 *   "data": [ { ...ProveedorDtoIn } ],
 *   "code": 200,
 *   "message": "..."
 * }
 */
export const ProveedorDtoInResponseSchema = z.object({
  status: z.string(),
  data: z.array(ProveedorDtoInSchema),
  code: z.number(),
  message: z.string(),
});

export type ProveedorDtoIn = z.infer<typeof ProveedorDtoInSchema>;
export type ProveedorDtoInResponse = z.infer<typeof ProveedorDtoInResponseSchema>;
