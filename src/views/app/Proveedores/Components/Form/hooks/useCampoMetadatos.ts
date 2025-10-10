// /Store/Form/hooks/useCampoMetadatos.ts
import { useCallback, useMemo } from "react";
import { MetadatosData } from "../../../Store/Form/Slices/metadatos.slice";
import { usePermisosCampos } from "../../../Store/Status/status.selectors";
// ^ Si no tenés este selector, podés setear disabled=false directo.

type Setter = <K extends keyof MetadatosData>(key: K, value: MetadatosData[K]) => void;

/**
 * Hook para vincular un campo de Metadatos con el formulario.
 * Mantiene la firma compatible con tus otros `useCampoX`.
 */
export function useCampoMetadatos<K extends keyof MetadatosData>(
  key: K,
  sliceValue: MetadatosData[K],
  setMetadatosField: Setter
) {
  // Si tenés control de permisos/IMAC:

  const { canEditCampos } = usePermisosCampos();

  const disabled = useMemo(() => !canEditCampos, [canEditCampos]);

  const onChange = useCallback(
    (val: MetadatosData[K]) => {
      setMetadatosField(key, val);
    },
    [key, setMetadatosField]
  );

  return {
    value: sliceValue,
    onChange,
    disabled,
  };
}
