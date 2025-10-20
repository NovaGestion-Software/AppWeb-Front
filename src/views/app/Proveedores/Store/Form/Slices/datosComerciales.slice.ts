import type { StateCreator } from "zustand";
import { z } from "zod";
import { ProveedorDomainSchema } from "@/views/app/Proveedores/Data/domain/proveedor.domain.schema";

/**
 * Esquema del slice derivado del Domain (Ubicación + Contacto).
 * NOTA: en Domain todos estos campos son string (controlados) excepto idcodprov (number).
 */
const DatosComercialesSchema = ProveedorDomainSchema.pick({
  // Ubicación
  domicilio1: true,
  domicilio2: true,
  localidad: true,
  cpostal: true,
  calle1: true,
  calle2: true,
  latitud: true,
  longitud: true,
  idcodprov: true,
  // Contacto
  codarea: true,
  telefono: true,
  codarea1: true,
  telefono1: true,
  codarea2: true,
  telefono2: true,
  email: true,
});

export type DatosComercialesData = z.infer<typeof DatosComercialesSchema>;

export type DatosComercialesSlice = DatosComercialesData & {
  /** Set genérico por clave del slice */
  setDatosComercialesField: <K extends keyof DatosComercialesData>(
    key: K,
    value: DatosComercialesData[K]
  ) => void;

  /** Reemplazo total del sub-estado (merge con defaults) */
  setDatosComercialesAll: (p: Partial<DatosComercialesData>) => void;

  /** Reset del sub-estado a defaults */
  resetDatosComerciales: () => void;
};

/** Defaults coherentes con inputs controlados (strings vacíos) */
const initialCom = (): DatosComercialesData => ({
  // Ubicación
  domicilio1: "",
  domicilio2: "",   
  localidad: "",
  cpostal: "",
  calle1: "",
  calle2: "",
  latitud: "",      
  longitud: "",
  idcodprov: 500,

  // Contacto (digits-only se limpia en capa de validación/commit, no acá)
  codarea: "",
  telefono: "",
  codarea1: "",
  telefono1: "",
  codarea2: "",
  telefono2: "",
  email: "",       
});

export const createDatosComercialesSlice: StateCreator<DatosComercialesSlice> = (set) => ({
  ...initialCom(),

  setDatosComercialesField: (key, value) =>
    set(() => ({ [key]: value } as Partial<DatosComercialesData>)),

  setDatosComercialesAll: (p) =>
    set(() => ({
      ...initialCom(),
      ...p,
    })),

  resetDatosComerciales: () => set(initialCom()),
});
