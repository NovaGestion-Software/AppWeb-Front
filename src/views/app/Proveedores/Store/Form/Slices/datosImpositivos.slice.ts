import type { StateCreator } from "zustand";
import { z } from "zod";
import { ProveedorDomainSchema } from "@/views/app/Proveedores/Data/domain/proveedor.domain.schema";

/**
 * Esquema del slice derivado del Domain.
 * idctrib/idtdoc son selects numéricos.
 * cuit/ibruto se editan como string (digits-only se limpia fuera del slice).
 */
const DatosImpositivosSchema = ProveedorDomainSchema.pick({
  ibruto: true,
  idctrib: true,
  idtdoc: true,
  cuit: true,
});

export type DatosImpositivosData = z.infer<typeof DatosImpositivosSchema>;

export type DatosImpositivosSlice = DatosImpositivosData & {
  setDatosImpositivosField: <K extends keyof DatosImpositivosData>(
    key: K,
    value: DatosImpositivosData[K]
  ) => void;

  setDatosImpositivosAll: (p: Partial<DatosImpositivosData>) => void;
  resetDatosImpositivos: () => void;
};

/** Defaults coherentes con UI; selects en 0 si no hay valor */
const INITIAL_DI = (): DatosImpositivosData => ({
  ibruto: "",   
  idctrib: 0,  
  idtdoc: 0, 
  cuit: "",     
});

export const createDatosImpositivosSlice: StateCreator<DatosImpositivosSlice> = (set) => ({
  ...INITIAL_DI(),

  setDatosImpositivosField: (key, value) =>
    set(() => ({ [key]: value } as Partial<DatosImpositivosData>)),

  setDatosImpositivosAll: (p) =>
    set(() => ({
      ...INITIAL_DI(),
      ...p,
    })),

  resetDatosImpositivos: () => set(INITIAL_DI()),
});
