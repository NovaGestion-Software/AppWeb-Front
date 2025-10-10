// /src/Api/schemas/retenciones.schema.ts
import { z } from "zod";
import { Bool01, EmptyTrimToUndef, DateStrNullToUndef } from "./primitives";

/**
 * Retención de Ingresos Brutos (nombres BE).
 * - idregbru: number
 * - exretbru: 0/1 -> boolean
 * - nexretbru: string | undefined (""->undefined)
 * - fecbru, vtobru: string | undefined (null/""->undefined) (sin re-formatear)
 */
export const RetencionIngresosBrutosEsquema = z.object({
  idregbru:Bool01,
  exretbru: Bool01,
  nexretbru: EmptyTrimToUndef,
  fecbru: DateStrNullToUndef,
  vtobru: DateStrNullToUndef,
});

/**
 * Retención de Ganancias (nombres BE).
 */
export const RetencionGananciasEsquema = z.object({
  idreggan:Bool01,
  exretgan: Bool01,
  nexretgan: EmptyTrimToUndef,
  fecgan: DateStrNullToUndef,
  vtogan: DateStrNullToUndef,
});

/**
 * Retención de IVA (nombres BE).
 */
export const RetencionIVAEsquema = z.object({
  idregiva: Bool01,
  exretiva: Bool01,
  nexretiva: EmptyTrimToUndef,
  feciva: DateStrNullToUndef,
  vtoiva: DateStrNullToUndef,
});

/**
 * Esquema plano que agrupa todas las claves de retenciones
 * tal como vienen del backend (objeto "flat", sin anidar).
 * Útil para componer dentro de ProovedoresEsquema.
 */
export const RetencionesEsquema = RetencionIngresosBrutosEsquema
  .extend(RetencionGananciasEsquema.shape)
  .extend(RetencionIVAEsquema.shape);

export type RetencionIngresosBrutos = z.infer<typeof RetencionIngresosBrutosEsquema>;
export type RetencionGanancias = z.infer<typeof RetencionGananciasEsquema>;
export type RetencionIVA = z.infer<typeof RetencionIVAEsquema>;
export type Retenciones = z.infer<typeof RetencionesEsquema>;
