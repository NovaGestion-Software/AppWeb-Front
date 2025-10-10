// /src/Api/schemas/contacto.schema.ts
import { z } from "zod";
import {  EmptyTrimToUndef, EmailEmptyToUndef } from "./primitives";

/**
 * Esquema de contacto del proveedor (nombres BE).
 * - codarea*, telefono*: trim; si están vacíos quedan undefined.
 * - email: "" -> undefined; si hay valor, valida formato básico.
 * - fax: opcional; "" -> undefined.
 */
export const ContactoEsquema = z.object({
  codarea: EmptyTrimToUndef,
  telefono: EmptyTrimToUndef,

  codarea1: EmptyTrimToUndef,
  telefono1: EmptyTrimToUndef,

  codarea2: EmptyTrimToUndef,
  telefono2: EmptyTrimToUndef,

  email: EmailEmptyToUndef,

  // Campos de fax opcionales (el backend puede mandar uno u otro)
  fax: EmptyTrimToUndef.optional(),

});

export type Contacto = z.infer<typeof ContactoEsquema>;
