import type { StateCreator } from "zustand";
import { FormaPagoEsquema, type FormaPago } from "@/schemas/Proovedores/formaPago.schema";

export type FormaPagoSlice = FormaPago & {
  setFormaPagoField: <K extends keyof FormaPago>(key: K, value: FormaPago[K]) => void;
  setFormaPagoAll: (partial: Partial<FormaPago>) => void;
  resetFormaPago: () => void;
  hydrateFromRow: (row: unknown) => void;
};

const INITIAL_FORMA_PAGO: FormaPago = {
  fpago: "",
  dias_p: 0,
  dias_v: 0,
  dias_e: 0,
  obs: undefined,     // textarea opcional
  f_pesos: false,     // 0/1 -> boolean (schema ya lo coacciona)
  f_dolares: false,
};

export const createFormaPagoSlice: StateCreator<FormaPagoSlice> = (set) => ({
  ...INITIAL_FORMA_PAGO,

  setFormaPagoField: (key, value) => set((s) => ({ ...s, [key]: value })),

  setFormaPagoAll: (partial) => set((s) => ({ ...s, ...partial })),

  resetFormaPago: () => set(INITIAL_FORMA_PAGO),

  hydrateFromRow: (row) => {
    const r = FormaPagoEsquema.safeParse(row);
    if (!r.success) {
      console.error("❌ Zod (formaPago):", r.error.issues);
      // no rompas el flujo; hidrata con lo que se pueda por defecto
      return;
    }
    const p = r.data;
    set((s) => ({
      ...s,
      fpago:    p.fpago ?? s.fpago,
      dias_p:   p.dias_p ?? s.dias_p,
      dias_v:   p.dias_v ?? s.dias_v,
      dias_e:   p.dias_e ?? s.dias_e,
      obs:      p.obs,                // ya viene undefined si vacío
      f_pesos:  !!p.f_pesos,
      f_dolares: !!p.f_dolares,
    }));
  },
});
