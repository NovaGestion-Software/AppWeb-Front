// /Store/Form/selectors/formaPago.selectors.ts
import { useShallow } from "zustand/react/shallow";
import { useProveedoresStore } from "../../Store";

/** 🔎 Valores agrupados (usa shallow para evitar renders innecesarios) */
export const useFormaPagoValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      fpago: s.fpago,          // string (ej: "EFECTIVO")
      dias_p: s.dias_p,        // número: plazo de pago
      dias_v: s.dias_v,        // número: frecuencia de visita
      dias_e: s.dias_e,        // número: demora de entrega
      obs: s.obs,              // string | undefined
      f_pesos: s.f_pesos,      // boolean
      f_dolares: s.f_dolares,  // boolean
    }))
  );

/** 🛠️ Acciones agrupadas */
export const useFormaPagoActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setField: s.setFormaPagoField,
      setAll: s.setFormaPagoAll,
      reset: s.resetFormaPago,
      hydrateFromRow: s.hydrateFromRow, // si la expusiste en el slice
    }))
  );
