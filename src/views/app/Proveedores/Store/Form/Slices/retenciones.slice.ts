import type { StateCreator } from "zustand";
import { z } from "zod";
import { RetencionesEsquema } from "@/schemas/Proovedores/retenciones.schema";

/**
 * Store con nombres BE (flat) tal como vienen en la respuesta.
 * Incluye:
 *  - idregbru, exretbru, nexretbru, fecbru, vtobru
 *  - idreggan, exretgan, nexretgan, fecgan, vtogan
 *  - idregiva, exretiva, nexretiva, feciva, vtoiva
 */
export type RetencionesData = z.infer<typeof RetencionesEsquema>;

export type RetencionesSlice = RetencionesData & {
  setRetencionesField: <K extends keyof RetencionesData>(
    key: K,
    value: RetencionesData[K]
  ) => void;

  setRetencionesAll: (p: Partial<RetencionesData>) => void;
  resetRetenciones: () => void;

  /** Hidrata/actualiza desde row crudo (valida con Zod) */
  hydrateFromRow: (row: unknown) => void;

  /** Selector derivado (opcional): vista “array” para tablas genéricas */
  asArrayForTable: () => Array<{
    id: "IB" | "GAN" | "IVA";
    tipo: string;
    regimen: boolean;
    exento: boolean;
    certificado?: string;
    vigenciaDesde?: string;
    vigenciaHasta?: string;
  }>;
};

const INITIAL_RET: RetencionesData = {
  // Ingresos Brutos
  idregbru: false,
  exretbru: false,
  nexretbru: undefined,
  fecbru: undefined,
  vtobru: undefined,

  // Ganancias
  idreggan: false,
  exretgan: false,
  nexretgan: undefined,
  fecgan: undefined,
  vtogan: undefined,

  // IVA
  idregiva: false,
  exretiva: false,
  nexretiva: undefined,
  feciva: undefined,
  vtoiva: undefined,
};

export const createRetencionesSlice: StateCreator<RetencionesSlice> = (set, get) => ({
  ...INITIAL_RET,

  setRetencionesField: (key, value) =>
    set((s) => ({ ...s, [key]: value })),

  setRetencionesAll: (p) =>
    set((s) => ({ ...s, ...p })),

  resetRetenciones: () => set(INITIAL_RET),

  hydrateFromRow: (row) => {
    const parsed = RetencionesEsquema.parse(row);
    set((s) => ({ ...s, ...parsed }));
  },

  // Vista derivada tipo array (si necesitás una tabla común)
  asArrayForTable: () => {
    const s = get();
    return [
      {
        id: "IB" as const,
        tipo: "Ingresos Brutos",
        regimen: s.idregbru,
        exento: s.exretbru,
        certificado: s.nexretbru,
        vigenciaDesde: s.fecbru,
        vigenciaHasta: s.vtobru,
      },
      {
        id: "GAN" as const,
        tipo: "Ganancias",
        regimen: s.idreggan,
        exento: s.exretgan,
        certificado: s.nexretgan,
        vigenciaDesde: s.fecgan,
        vigenciaHasta: s.vtogan,
      },
      {
        id: "IVA" as const,
        tipo: "IVA",
        regimen: s.idregiva,
        exento: s.exretiva,
        certificado: s.nexretiva,
        vigenciaDesde: s.feciva,
        vigenciaHasta: s.vtoiva,
      },
    ];
  },
});
