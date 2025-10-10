// /src/Api/schemas/proveedores.esquema.ts
import { z } from "zod";
import { IdentificacionEsquema } from "./identificacion.schema";
import { MetadatosEsquema } from "./metadatos.schema";
import { UbicacionEsquema } from "./ubicacion.schema";
import { ContactoEsquema } from "./contacto.schema";
import { RetencionesEsquema } from "./retenciones.schema";
import { DatosImpositivosEsquema } from "./datosImpositivos.schema";
import { FormaPagoEsquema } from "./formaPago.schema";

export const ProovedoresEsquema = IdentificacionEsquema
  .extend(MetadatosEsquema.shape)
  .extend(UbicacionEsquema.shape)
  .extend(ContactoEsquema.shape)
  .extend(RetencionesEsquema.shape)
  .extend(DatosImpositivosEsquema.shape)
    .extend(FormaPagoEsquema.shape)
  .loose(); 

export type ProovedorParcial = z.infer<typeof ProovedoresEsquema>;
