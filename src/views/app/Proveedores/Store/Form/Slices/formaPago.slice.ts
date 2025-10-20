import type { StateCreator } from "zustand";
import { z } from "zod";
import { ProveedorDomainSchema } from "@/views/app/Proveedores/Data/domain/proveedor.domain.schema";

export type FPKey = keyof FormaPagoData;

/**
 * Esquema del slice derivado del Domain.
 * Nota: en Domain `obs` es string (UI controlada). Envío a BE hará ""→null.
 */
const FormaPagoSchema = ProveedorDomainSchema.pick({
  fpago: true,
  dias_p: true,
  dias_v: true,
  dias_e: true,
  obs: true,
  f_pesos: true,
  f_dolares: true,
});

export type FormaPagoData = z.infer<typeof FormaPagoSchema>;

export type FormaPagoSlice = FormaPagoData & {
  setFormaPagoField: <K extends keyof FormaPagoData>(key: K, value: FormaPagoData[K]) => void;
  setFormaPagoAll: (partial: Partial<FormaPagoData>) => void;
  resetFormaPago: () => void;
};

/** Defaults coherentes con inputs controlados */
const INITIAL_FORMA_PAGO = (): FormaPagoData => ({
  fpago: "",
  dias_p: 0,
  dias_v: 0,
  dias_e: 0,
  obs: "",          // en UI vacío; dtoOut lo mapeará a null si corresponde
  f_pesos: false,
  f_dolares: false,
});

export const createFormaPagoSlice: StateCreator<FormaPagoSlice> = (set) => ({
  ...INITIAL_FORMA_PAGO(),

  setFormaPagoField: (key, value) =>
    set(() => ({ [key]: value } as Partial<FormaPagoData>)),

  setFormaPagoAll: (partial) =>
    set(() => ({
      ...INITIAL_FORMA_PAGO(),
      ...partial,
    })),

  resetFormaPago: () => set(INITIAL_FORMA_PAGO()),
});
