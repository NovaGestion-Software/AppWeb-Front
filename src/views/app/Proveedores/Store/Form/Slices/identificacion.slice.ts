import type { StateCreator } from "zustand";
import { z } from "zod";
import { ProveedorDomainSchema } from "@/views/app/Proveedores/Data/domain";

/**
 * Esquema del slice derivado del Domain.
 * Se usa .pick(...) para mantener alineación con la fuente de verdad.
 */
const IdentificacionSchema = ProveedorDomainSchema.pick({
  idprovee: true,
  nombre: true,
  nfantasia: true,
});

export type IdentificacionData = z.infer<typeof IdentificacionSchema>;

/** Valores iniciales coherentes con inputs controlados */
const INITIAL_IDENT: IdentificacionData = {
  idprovee: 0,           // 0 indica "no asignado" en esta vista
  nombre: "",            // string vacío para inputs controlados
  nfantasia: "",  // sin valor asignado
};

/**
 * Slice de Identificación
 * Mantiene sólo estado y setters. La hidratación global se realiza en la Store
 * a partir de un objeto Domain validado (hydrateAllSlicesFromDomain).
 */
export type IdentificacionSlice = IdentificacionData & {
  // Setters unitarios
  setIdprovee: (v: number) => void;
  setNombre: (v: string) => void;
  setNfantasia: (v: string | undefined) => void;

  // Set masivo y reset
  setIdentificacionAll: (p: Partial<IdentificacionData>) => void;
  resetIdentificacion: () => void;
};

export const createIdentificacionSlice: StateCreator<IdentificacionSlice> = (set) => ({
  ...INITIAL_IDENT,

  // Setters unitarios
  setIdprovee: (v) => set({ idprovee: v }),
  setNombre: (v) => set({ nombre: v }),
  setNfantasia: (v) => set({ nfantasia: v }),

  // Set masivo parcial (no pisa valores no provistos)
  setIdentificacionAll: (p) =>
    set((s) => ({
      idprovee: p.idprovee ?? s.idprovee,
      nombre: p.nombre ?? s.nombre,
      nfantasia: p.nfantasia ?? s.nfantasia,
    })),

  // Reset de la sección
  resetIdentificacion: () => set(INITIAL_IDENT),
});
