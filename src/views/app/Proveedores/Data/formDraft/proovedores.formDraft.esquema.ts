// /src/Api/schemas/proovedores.formDraft.esquema
import { z } from "zod";

import { IdentificacionFormDraft }   from "./identificacion.schema";
import { MetadatosFormDraft }        from "./metadatos.schema";
import { UbicacionFormDraft }        from "./ubicacion.schema";
import { ContactoFormDraft }         from "./contacto.schema";
import { RetencionesFormDraft }      from "./retenciones.schema";
import { DatosImpositivosFormDraft } from "./datosImpositivos.schema";
import { FormaPagoFormDraft }        from "./formaPago.schema";

/**
 * Construimos un objeto base "vacío" con strip,
 * y vamos extendiendo con los shapes de cada sección.
 * Ventaja: sin warnings deprecados y control explícito del unknownKeys=strip.
 */
export const ProveedorFormDraft = z
  .object({})
  .strip()
  .extend(IdentificacionFormDraft.shape)
  .extend(MetadatosFormDraft.shape)
  .extend(UbicacionFormDraft.shape)
  .extend(ContactoFormDraft.shape)
  .extend(RetencionesFormDraft.shape)
  .extend(DatosImpositivosFormDraft.shape)
  .extend(FormaPagoFormDraft.shape);

/** Alias para compatibilidad con tu código existente */
export const ProovedoresEsquema = ProveedorFormDraft;

/** Tipos */
export type ProveedorForm = z.infer<typeof ProveedorFormDraft>;
export type ProovedorParcial = ProveedorForm;
