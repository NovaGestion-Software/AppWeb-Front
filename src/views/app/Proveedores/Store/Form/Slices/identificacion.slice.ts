import type { StateCreator } from "zustand";
import type { z } from "zod";
import { IdentificacionEsquema } from "@/schemas/Proovedores/identificacion.schema";

// Tipos derivados del esquema Zod (nombres BE)
export type IdentificacionData = z.infer<typeof IdentificacionEsquema>;
// Queda equivalente a:
// interface IdentificacionData {
//   idprovee: number;
//   nombre: string;
//   nfantasia?: string;
// }

/** Defaults del slice (coherentes con la normalización actual) */
const INITIAL_IDENT: IdentificacionData = {
  idprovee: 0,       // 0 indica “no asignado” en esta vista (se puede ajustar si el flujo lo requiere)
  nombre: "",        // string vacío para inputs controlados
  nfantasia: undefined, // undefined cuando no hay valor
};

/** Slice: datos + acciones (nombres BE) */
export type IdentificacionSlice = IdentificacionData & {
  // Setters unitarios
  setIdprovee: (v: number) => void;
  setNombre: (v: string) => void;
  setNfantasia: (v: string | undefined) => void;

  // Set masivo y reset
  setIdentificacionAll: (p: Partial<IdentificacionData>) => void;
  resetIdentificacion: () => void;

  // Hidratar desde un row crudo (valida con Zod SOLO esta sección)
  hydrateFromRow: (row: unknown) => void;

};

export const createIdentificacionSlice: StateCreator<IdentificacionSlice> = (set) => ({
  ...INITIAL_IDENT,

  // Setters unitarios (claves BE)
  setIdprovee: (v) => set({ idprovee: v }),
  setNombre: (v) => set({ nombre: v }),
  setNfantasia: (v) => set({ nfantasia: v }),

  // Set masivo parcial
  setIdentificacionAll: (p) =>
    set((s) => ({
      idprovee: p.idprovee ?? s.idprovee,
      nombre: p.nombre ?? s.nombre,
      nfantasia: p.nfantasia ?? s.nfantasia,
    })),

  // Reset de la sección
  resetIdentificacion: () => set(INITIAL_IDENT),

  // Hidratar desde un “row” de backend (o desde el objeto ya normalizado)
  hydrateFromRow: (row) => {
    // Validación/normalización mínima de esta sección (no falla por extras)
    const parsed = IdentificacionEsquema.parse(row);
    set({
      idprovee: parsed.idprovee,
      nombre: parsed.nombre,
      nfantasia: parsed.nfantasia, // ya viene trim y null->undefined si usaste NullableTrimToUndef
    });
  },


});
