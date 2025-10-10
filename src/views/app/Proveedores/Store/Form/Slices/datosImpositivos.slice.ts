import type { StateCreator } from "zustand";
import { z } from "zod";
import { DatosImpositivosEsquema } from "@/schemas/Proovedores/datosImpositivos.schema";
// opcional: helpers para labels en UI

/**
 * Nombres BE en store:
 * - ibruto: string
 * - idctrib: 1|2|3|4 (admitimos 3/4 para futuro)
 * - idtdoc: 0|1|2
 * - cuit: string
 */
export type DatosImpositivosData = z.infer<typeof DatosImpositivosEsquema>;

export type DatosImpositivosSlice = DatosImpositivosData & {
  setDatosImpositivosField: <K extends keyof DatosImpositivosData>(
    key: K,
    value: DatosImpositivosData[K]
  ) => void;

  setDatosImpositivosAll: (p: Partial<DatosImpositivosData>) => void;
  resetDatosImpositivos: () => void;

  /** Hidrata/actualiza desde row crudo (valida con Zod) */
  hydrateFromRow: (row: unknown) => void;

  // /** Selectores auxiliares para UI (opcionales) */
  // getTipoDocLabel: () => ReturnType<typeof tipoDocLabel>;
  // getCondTribLabel: () => ReturnType<typeof condTribLabel>;
};

const INITIAL_DI: DatosImpositivosData = {
  ibruto: "",
  idctrib: 1, // por defecto RI; ajustá si preferís undefined/otro
  idtdoc: 0,  // por defecto CUIT
  cuit: "",
};

export const createDatosImpositivosSlice: StateCreator<DatosImpositivosSlice> = (set, ) => ({
  ...INITIAL_DI,

  setDatosImpositivosField: (key, value) =>
    set((s) => ({ ...s, [key]: value })),

  setDatosImpositivosAll: (p) =>
    set((s) => ({ ...s, ...p })),

  resetDatosImpositivos: () => set(INITIAL_DI),

  hydrateFromRow: (row) => {
    const parsed = DatosImpositivosEsquema.parse(row);
    set((s) => ({ ...s, ...parsed }));
  },

  // // Auxiliares de UI (labels legibles)
  // getTipoDocLabel: () => tipoDocLabel(get().idtdoc),
  // getCondTribLabel: () => condTribLabel(get().idctrib),
});
