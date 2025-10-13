import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProveedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "./useEditarActuales";

import type { DatosComercialesData } from "../../../Store/Form/Slices/datosComerciales.slice";

// 👉 Tipo real del proveedor (derivado del esquema Zod)
import { z } from "zod";
import { ProovedoresEsquema } from "@/schemas/Proovedores/proovedores.esquema";
import { ProveedorDomain } from "../../../Data/domain";
type ProveedoresData = z.infer<typeof ProovedoresEsquema>;

/**
 * Hook para editar campos del slice de Datos Comerciales,
 * sincronizando opcionalmente con `datosActuales` (modo edición).
 *
 * Esta versión garantiza:
 * - `value` SIEMPRE string para inputs controlados (evita el warning uncontrolled→controlled)
 * - Al guardar: `""` se transforma a `undefined` (respeta contrato BE/esquema)
 */
export function useCampoComerciales<
  K extends keyof DatosComercialesData & keyof ProveedoresData
>(
  key: K,
  sliceValue: DatosComercialesData[K],
  setSliceField: (k: K, v: DatosComercialesData[K]) => void,
  parse?: (raw: string) => DatosComercialesData[K]
) {
  const { canEditCampos } = usePermisosCampos();
  const { isEditable, updateActuales } = useEditarActuales();
  const actuales = useProveedoresStore((s) => s.datosActuales) as ProveedoresData | null;

  // Determina el valor fuente (snapshot de edición si aplica; sino el slice)
  const rawValue: DatosComercialesData[K] =
    isEditable && actuales
      ? ((actuales[key] as DatosComercialesData[K]) ?? sliceValue)
      : sliceValue;

  // ⚠️ Importante: para la UI, el value del input debe ser SIEMPRE string
  const value: string =
    rawValue == null ? "" : (typeof rawValue === "string" ? rawValue : String(rawValue));

  /**
   * onChange:
   * - Acepta string o evento (FlexibleInputField puede pasar value directo o event)
   * - Guarda `undefined` cuando el input queda vacío ("" -> undefined)
   * - Si hay `parse`, lo aplica sobre el string antes de guardar (útil para números)
   */
  const onChange = (v: any) => {
    const nextStr: string =
      typeof v === "string" ? v : v?.target?.value ?? String(v ?? "");

    const trimmed = nextStr.trim();
    let next: DatosComercialesData[K];

    if (trimmed === "") {
      next = undefined as unknown as DatosComercialesData[K];
    } else if (parse) {
      next = parse(nextStr);
    } else {
      next = nextStr as unknown as DatosComercialesData[K];
    }

    // 1) actualiza slice visual
    setSliceField(key, next);

    // 2) sincroniza datosActuales (si corresponde)
    if (isEditable) {
 updateActuales({ [key]: next } as Partial<ProveedorDomain>);
    }
  };

  return { value, onChange, disabled: !canEditCampos };
}
