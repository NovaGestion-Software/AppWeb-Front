import { useEditarActuales } from "./useEditarActuales";
import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProveedoresStore } from "../../../Store/Store";

import type { FormaPagoSlice } from "../../../Store/Form/Slices/formaPago.slice";

import { z } from "zod";
import { ProovedoresEsquema } from "@/schemas/Proovedores/proovedores.esquema";
import { ProveedorDomain } from "../../../Data/domain";
type ProveedoresData = z.infer<typeof ProovedoresEsquema>;

// Intersección de claves válidas entre el slice y el payload BE
type FPKey = keyof FormaPagoSlice & keyof ProveedoresData;

/**
 * Hook genérico para campos de Forma de Pago.
 * - `key`: clave BE del campo (fpago, dias_p, dias_v, dias_e, obs, f_pesos, f_dolares)
 * - `sliceValue`: valor actual del slice
 * - `setSliceField`: setter del slice
 * - `parse`: opcional; convierte strings de inputs (select/number) al tipo final del slice
 */
export function useCampoFormaPago<K extends FPKey>(
  key: K,
  sliceValue: FormaPagoSlice[K],
  setSliceField: (k: K, v: FormaPagoSlice[K]) => void,
  parse?: (raw: string) => FormaPagoSlice[K]
) {
  const { canEditCampos } = usePermisosCampos();
  const { isEditable, updateActuales } = useEditarActuales();
  const actuales = useProveedoresStore((s) => s.datosActuales) as ProveedoresData | null;

  const value: FormaPagoSlice[K] =
    isEditable && actuales
      ? ((actuales[key] as FormaPagoSlice[K]) ?? sliceValue)
      : sliceValue;

  const onChange = (v: string | FormaPagoSlice[K]) => {
    const next: FormaPagoSlice[K] =
      typeof v === "string" && parse ? parse(v) : (v as FormaPagoSlice[K]);

    // 1) actualizar slice visual
    setSliceField(key, next);

    // 2) sincronizar snapshot actuales (modo edición)
    if (isEditable) {
    updateActuales({ [key]: next } as Partial<ProveedorDomain>);
    }
  };

  return { value, onChange, disabled: !canEditCampos };
}
