import type { StateCreator } from "zustand";
import { z } from "zod";
import { ProveedorDomainSchema } from "@/views/app/Proveedores/Data/domain/proveedor.domain.schema";

/**
 * Esquema del slice derivado del Domain.
 * - En Domain, f_alta/f_modi/f_baja son timestamps ISO-like (YYYY-MM-DDTHH:mm:ss) opcionales (según tu patch).
 * - En la UI no se editan normalmente; las dejamos como string|undefined.
 */
const MetadatosBase = ProveedorDomainSchema.pick({
  inha: true,
  idnodo: true,
  icambio: true,
  ncambio: true,
  usuario_a: true,
  usuario_m: true,
  usuario_b: true,
  f_alta: true,
  f_modi: true,
  f_baja: true,
});

// Relajamos fechas a string|undefined para no forzar formato de Domain en el slice
const MetadatosSchema = MetadatosBase.extend({
  f_alta: z.string().optional(),
  f_modi: z.string().optional(),
  f_baja: z.string().optional(),
});

export type MetadatosData = z.infer<typeof MetadatosSchema>;

export type MetadatosSlice = MetadatosData & {
  setMetadatosField: <K extends keyof MetadatosData>(key: K, value: MetadatosData[K]) => void;
  setMetadatosAll: (p: Partial<MetadatosData>) => void;
  resetMetadatos: () => void;
};

/** Defaults: flags/números en 0; timestamps no seteados */
const INITIAL_META = (): MetadatosData => ({
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
});

export const createMetadatosSlice: StateCreator<MetadatosSlice> = (set) => ({
  ...INITIAL_META(),

  setMetadatosField: (key, value) =>
    set(() => ({ [key]: value } as Partial<MetadatosData>)),

  setMetadatosAll: (p) =>
    set(() => ({
      ...INITIAL_META(),
      ...p,
    })),

  resetMetadatos: () => set(INITIAL_META()),
});
