import { useShallow } from "zustand/react/shallow";
import { useProveedoresStore } from "../../Store";

/** Valores agrupados */
export const useFormaPagoValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      fpago: s.fpago,
      dias_p: s.dias_p,
      dias_v: s.dias_v,
      dias_e: s.dias_e,
      obs: s.obs,
      f_pesos: s.f_pesos,
      f_dolares: s.f_dolares,
    }))
  );

/** Acciones agrupadas */
export const useFormaPagoActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setField: s.setFormaPagoField,
      setAll: s.setFormaPagoAll,
      reset: s.resetFormaPago,
    }))
  );
