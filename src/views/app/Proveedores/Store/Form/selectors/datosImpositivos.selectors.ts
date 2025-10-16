import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useProveedoresStore } from "../../Store";
import { condTribLabel, tipoDocLabel } from "../../../Data/adapters";

/** Valores de Datos Impositivos — sólo primitivos/refs estables */
export const useDatosImpositivosValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      idctrib: s.idctrib,   // number (select)
      idtdoc:  s.idtdoc,    // number (select)
      cuit:    s.cuit,      // string (digits-only fuera del selector)
      ibruto:  s.ibruto,    // string

      // Labels derivados (si existen helpers)
      idctribLabel: condTribLabel?.(s.idctrib),
      idtdocLabel:  tipoDocLabel?.(s.idtdoc),
    }))
  );

/** Acciones agrupadas de Datos Impositivos + Retenciones */
export const useDatosImpositivosActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      // Datos Impositivos
      setImpositivosField: s.setDatosImpositivosField,
      setImpositivosAll:   s.setDatosImpositivosAll,
      resetImpositivos:    s.resetDatosImpositivos,

      // Retenciones
      setRetencionesField: s.setRetencionesField,
      setRetencionesAll:   s.setRetencionesAll,
      resetRetenciones:    s.resetRetenciones,
    }))
  );

/** Solo “situación fiscal”: idctrib, idtdoc, cuit, ibruto */
export const useSituacionFiscalValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      idctrib: s.idctrib,
      idtdoc:  s.idtdoc,
      cuit:    s.cuit,
      ibruto:  s.ibruto,
      idctribLabel: condTribLabel?.(s.idctrib),
      idtdocLabel:  tipoDocLabel?.(s.idtdoc),
    }))
  );

/** Setters agrupados para situación fiscal */
export const useSituacionFiscalActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setIdctrib: (v: number) => s.setDatosImpositivosField("idctrib", v),
      setIdtdoc:  (v: number) => s.setDatosImpositivosField("idtdoc",  v),
      setCuit:    (v: string) => s.setDatosImpositivosField("cuit",    v),
      setIbruto:  (v: string) => s.setDatosImpositivosField("ibruto",  v),
      setSituacionFiscalAll: s.setDatosImpositivosAll,
      resetSituacionFiscal:  s.resetDatosImpositivos,
    }))
  );

/** Retenciones — valores “flat” */
export const useRetencionesValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      // Ingresos Brutos
      idregbru: s.idregbru, exretbru: s.exretbru, nexretbru: s.nexretbru, fecbru: s.fecbru, vtobru: s.vtobru,
      // Ganancias
      idreggan: s.idreggan, exretgan: s.exretgan, nexretgan: s.nexretgan, fecgan: s.fecgan, vtogan: s.vtogan,
      // IVA
      idregiva: s.idregiva, exretiva: s.exretiva, nexretiva: s.nexretiva, feciva: s.feciva, vtoiva: s.vtoiva,
    }))
  );

/**
 * Retenciones — vista en array para tablas
 * idreg* ahora es number (0 = sin régimen). Usamos >0 como boolean derivado.
 */
type RetencionRow = {
  id: "IB" | "GAN" | "IVA";
  regimen: boolean;                    // derivado: idreg* > 0
  exento: boolean;
  certificado?: string;
  vigenciaDesde?: string;
  vigenciaHasta?: string;
};

const EMPTY: ReadonlyArray<RetencionRow> = Object.freeze([]);

export const useRetencionesArray = (): ReadonlyArray<RetencionRow> => {
  const {
    // IB
    idregbru, exretbru, nexretbru, fecbru, vtobru,
    // GAN
    idreggan, exretgan, nexretgan, fecgan, vtogan,
    // IVA
    idregiva, exretiva, nexretiva, feciva, vtoiva,
  } = useRetencionesValues();

  return useMemo(() => {
    const arr: RetencionRow[] = [];

    if (idregbru != null || exretbru != null || nexretbru != null || fecbru || vtobru) {
      arr.push({
        id: "IB",
        regimen: (idregbru ?? 0) > 0,
        exento: exretbru,
        certificado: nexretbru || undefined,
        vigenciaDesde: fecbru || undefined,
        vigenciaHasta: vtobru || undefined,
      });
    }

    if (idreggan != null || exretgan != null || nexretgan != null || fecgan || vtogan) {
      arr.push({
        id: "GAN",
        regimen: (idreggan ?? 0) > 0,
        exento: exretgan,
        certificado: nexretgan || undefined,
        vigenciaDesde: fecgan || undefined,
        vigenciaHasta: vtogan || undefined,
      });
    }

    if (idregiva != null || exretiva != null || nexretiva != null || feciva || vtoiva) {
      arr.push({
        id: "IVA",
        regimen: (idregiva ?? 0) > 0,
        exento: exretiva,
        certificado: nexretiva || undefined,
        vigenciaDesde: feciva || undefined,
        vigenciaHasta: vtoiva || undefined,
      });
    }

    return arr.length ? arr : EMPTY;
  }, [
    idregbru, exretbru, nexretbru, fecbru, vtobru,
    idreggan, exretgan, nexretgan, fecgan, vtogan,
    idregiva, exretiva, nexretiva, feciva, vtoiva,
  ]);
};

/** Acciones específicas de retenciones */
export const useRetencionesActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setField: s.setRetencionesField,
      setAll:   s.setRetencionesAll,
      reset:    s.resetRetenciones,
    }))
  );
