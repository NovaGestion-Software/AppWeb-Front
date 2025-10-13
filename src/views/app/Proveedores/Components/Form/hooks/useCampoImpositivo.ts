import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProveedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "./useEditarActuales";

import { z } from "zod";
import { ProovedoresEsquema } from "@/schemas/Proovedores/proovedores.esquema";
import { ProveedorDomain } from "../../../Data/domain";
type ProveedoresData = z.infer<typeof ProovedoresEsquema>;

// Claves BE válidas en Situación Fiscal
type SFKey = "idctrib" | "idtdoc" | "cuit" | "ibruto";

/**
 * Hook genérico para campos impositivos (situación fiscal).
 * - key: "idctrib" | "idtdoc" | "cuit" | "ibruto"
 * - sliceValue: valor del slice (store)
 * - setSliceField: setter del slice (k, v)
 * - parse: (opcional) convierte string => tipo final (p.ej. number)
 */
export function useCampoImpositivo<K extends SFKey>(
  key: K,
  sliceValue: ProveedoresData[K],
  setSliceField: (k: K, v: ProveedoresData[K]) => void,
  parse?: (raw: string) => ProveedoresData[K]
) {
  const { canEditCampos } = usePermisosCampos();
  const { isEditable, updateActuales } = useEditarActuales();
  const actuales = useProveedoresStore((s) => s.datosActuales) as ProveedoresData | null;

  const value: ProveedoresData[K] =
    isEditable && actuales
      ? ((actuales[key] as ProveedoresData[K]) ?? sliceValue)
      : sliceValue;

  const onChange = (v: string | ProveedoresData[K]) => {
    const next = (typeof v === "string" && parse) ? parse(v) : (v as ProveedoresData[K]);

    // 1) actualiza slice
    setSliceField(key, next);

    // 2) sincroniza snapshot (si corresponde)
    if (isEditable) {
updateActuales({ [key]: next } as Partial<ProveedorDomain>);
    }
  };

  return { value, onChange, disabled: !canEditCampos };
}
