import type { StateCreator } from "zustand";
import { z } from "zod";
import { MetadatosEsquema } from "@/schemas/Proovedores/metadatos.schema";

export type MetadatosData = z.infer<typeof MetadatosEsquema>;
// Equivalente a:
// {
//   inha: boolean;
//   idnodo: number;
//   icambio: number;
//   ncambio: number;
//   usuario_a: number;
//   usuario_m: number;
//   usuario_b: number;
//   f_alta?: string; // null/"" -> undefined (normalizado)
//   f_modi?: string;
//   f_baja?: string;
// }

export type MetadatosSlice = MetadatosData & {
  setMetadatosField: <K extends keyof MetadatosData>(
    key: K,
    value: MetadatosData[K]
  ) => void;

  setMetadatosAll: (p: Partial<MetadatosData>) => void;
  resetMetadatos: () => void;

  /** Hidrata/actualiza desde un row crudo del backend (valida con Zod) */
  hydrateFromRow: (row: unknown) => void;
};

const INITIAL_META: MetadatosData = {
  inha: false,
  idnodo: 0,
  icambio: 0,
  ncambio: 0,
  usuario_a: 0,
  usuario_m: 0,
  usuario_b: 0,
  f_alta: undefined,
  f_modi: undefined,
  f_baja: undefined,
};

export const createMetadatosSlice: StateCreator<MetadatosSlice> = (set) => ({
  ...INITIAL_META,

  setMetadatosField: (key, value) =>
    set((s) => ({ ...s, [key]: value })),

  setMetadatosAll: (p) =>
    set((s) => ({ ...s, ...p })),

  resetMetadatos: () => set(INITIAL_META),

  hydrateFromRow: (row) => {
    const parsed = MetadatosEsquema.parse(row);
    set((s) => ({ ...s, ...parsed }));
  },
});
