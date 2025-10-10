// /src/Api/schemas/primitives.ts
import { z } from "zod";



/** string|null -> string|undefined (trim; vacío o null => undefined) */
export const NullableTrimToUndef =
  z
    .string()                                // primero string...
    .nullable()                              // ...o null
    .transform(s => (s?.trim() ? s.trim() : undefined));
    // null -> undefined ; "   " -> undefined ; " valor " -> "valor"



/** email opcional: "" -> undefined; si hay valor, valida formato básico */
export const EmailEmptyToUndef =
  z
    .string()                                // exige string
    .transform(s => s.trim())                // recorta espacios
    .transform(s => (s === "" ? undefined : s))
    .optional()
    .refine(
      v => v === undefined                   // undefined es válido
        || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), // si hay valor, valida patrón
      "Email inválido"
    );

/** fecha opcional: string|null -> string|undefined (sin re-formatear) */
export const DateStrNullToUndef =
  z
    .string()                                // exige string...
    .nullable()                              // ...o null
    .optional()                              // ...o null
    .transform(s => (s?.trim() ? s.trim() : undefined));
    // No convierte a ISO ni usa Date; solo limpia y homologa null/"" a undefined

/** idtdoc: 0=CUIT, 1=CUIL, 2=DNI */
export const IdTipoDoc =
  z.union([z.literal(0), z.literal(1), z.literal(2)]); // mantiene número BE

/** idctrib: 1=Responsable Inscripto, 2=Exento, 3/4 reservados para futuras categorías */
export const IdCondTrib =
  z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);
  // admitimos 3 y 4 para no romper cuando el BE empiece a usarlos

/** Helper: label legible para idtdoc (para UI, no para validación) */
export function tipoDocLabel(id: z.infer<typeof IdTipoDoc> | number): "CUIT" | "CUIL" | "DNI" | "DESCONOCIDO" {
  if (id === 0) return "CUIT";
  if (id === 1) return "CUIL";
  if (id === 2) return "DNI";
  return "DESCONOCIDO";
}

/** Helper: label legible para idctrib (para UI, no para validación) */
export function condTribLabel(id: z.infer<typeof IdCondTrib> | number): "RI" | "EXENTO" | "CAT_3" | "CAT_4" | "DESCONOCIDO" {
  if (id === 1) return "RI";        // Responsable Inscripto
  if (id === 2) return "EXENTO";    // Exento
  if (id === 3) return "CAT_3";     // placeholder hasta definir
  if (id === 4) return "CAT_4";     // placeholder hasta definir
  return "DESCONOCIDO";
}


/** string -> string.trim(); si no es string => "" */
export const TrimmedStr = z.string().transform(s => s.trim()).catch("");

/** "", "  ", null, undefined -> undefined; string no vacío -> string.trim() */
export const EmptyTrimToUndef = z
  .union([z.string(), z.null(), z.undefined()])
  .transform(v => {
    if (v == null) return undefined;
    const t = String(v).trim();
    return t === "" ? undefined : t;
  })
  .optional();

/** 0/1/"0"/"1"/boolean -> boolean */
export const Bool01 = z
  .union([
    z.boolean(),
    z.literal(0),
    z.literal(1),
    z.literal("0"),
    z.literal("1"),
  ])
  .transform(v => (typeof v === "boolean" ? v : Number(v) === 1))
  .catch(false);

/** number estricto + coerce seguro */
export const NumCoerce = z.coerce.number().catch(0);