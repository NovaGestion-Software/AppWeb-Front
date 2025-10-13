// /Store/Form/selectors/datosImpositivos.selectors.ts
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useProveedoresStore } from "../../Store";
import { condTribLabel, tipoDocLabel } from "@/schemas/Proovedores/primitives";

/** Valores de Datos Impositivos (BE) — sólo primitivos/refs estables */
export const useDatosImpositivosValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      // Situación fiscal (BE)
      idctrib: s.idctrib,   // 1|2|3|4
      idtdoc:  s.idtdoc,    // 0|1|2
      cuit:    s.cuit,      // string
      ibruto:  s.ibruto,    // string

      // Labels derivados (strings puras, no crean refs complejas)
      idctribLabel: condTribLabel(s.idctrib),
      idtdocLabel:  tipoDocLabel(s.idtdoc),
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

      // Retenciones (flat)
      setRetencionesField: s.setRetencionesField,
      setRetencionesAll:   s.setRetencionesAll,
      resetRetenciones:    s.resetRetenciones,

      // Hidratación por sección (si las usás)
      hydrateImpositivosFromRow: s.hydrateFromRow,
      hydrateRetencionesFromRow: s.hydrateFromRow,
    }))
  );

/** Solo “situación fiscal” (BE): idctrib, idtdoc, cuit, ibruto */
export const useSituacionFiscalValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      idctrib: s.idctrib,
      idtdoc:  s.idtdoc,
      cuit:    s.cuit,
      ibruto:  s.ibruto,
      idctribLabel: condTribLabel(s.idctrib),
      idtdocLabel:  tipoDocLabel(s.idtdoc),
    }))
  );

/** Setters agrupados para situación fiscal */
export const useSituacionFiscalActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setIdctrib: (v: number) => s.setDatosImpositivosField("idctrib", v as any),
      setIdtdoc:  (v: number) => s.setDatosImpositivosField("idtdoc",  v as any),
      setCuit:    (v: string) => s.setDatosImpositivosField("cuit",    v),
      setIbruto:  (v: string) => s.setDatosImpositivosField("ibruto",  v),
      setSituacionFiscalAll: s.setDatosImpositivosAll,
      resetSituacionFiscal:  s.resetDatosImpositivos,
    }))
  );

/** Retenciones — valores “flat” (BE) (todo primitivo/ref estable) */
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
 * Derivación local con useMemo (no desde la store) para evitar nuevas refs en getSnapshot.
 */
type RetencionRow = {
  id: "IB" | "GAN" | "IVA";
  tipo: boolean;                       // ← era number | string; ahora boolean
  regimen: boolean;                    // ← mismo que tipo (siempre fueron iguales)
  exento: boolean;
  certificado?: string;
  vigenciaDesde?: string | null;
  vigenciaHasta?: string | null;
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

    // IB
    if (idregbru != null || exretbru != null || nexretbru != null || fecbru || vtobru) {
      arr.push({
        id: "IB",
        tipo: idregbru,
        regimen: idregbru,
        exento: exretbru,
        certificado: nexretbru as any, // si es nro de cert o similar
        vigenciaDesde: fecbru,
        vigenciaHasta: vtobru,
      });
    }

    // GAN
    if (idreggan != null || exretgan != null || nexretgan != null || fecgan || vtogan) {
      arr.push({
        id: "GAN",
        tipo: idreggan,
        regimen: idreggan,
        exento: exretgan,
        certificado: nexretgan as any,
        vigenciaDesde: fecgan,
        vigenciaHasta: vtogan,
      });
    }

    // IVA
    if (idregiva != null || exretiva != null || nexretiva != null || feciva || vtoiva) {
      arr.push({
        id: "IVA",
        tipo: idregiva,
        regimen: idregiva,
        exento: exretiva,
        certificado: nexretiva as any,
        vigenciaDesde: feciva,
        vigenciaHasta: vtoiva,
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
