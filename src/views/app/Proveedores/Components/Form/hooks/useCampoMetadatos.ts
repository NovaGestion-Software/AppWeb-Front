// /Store/Form/hooks/useCampoMetadatos.ts
import { useCallback, useMemo, useState } from "react";
import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProveedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "./useEditarActuales";
import type { MetadatosData } from "../../../Store/Form/Slices/metadatos.slice";
import type { ProveedorDomain } from "../../../Data/domain";

type Setter = <K extends keyof MetadatosData>(key: K, value: MetadatosData[K]) => void;

export function useCampoMetadatos<K extends keyof MetadatosData>(
  key: K,
  sliceValue: MetadatosData[K],
  setMetadatosField: Setter,
  options?: {
    /** Parser opcional para transformar el string/event al tipo final del slice */
    parse?: (raw: any) => MetadatosData[K];
  }
) {
  const { canEditCampos } = usePermisosCampos();
  const { isEditable, updateActuales } = useEditarActuales();
  const actuales = useProveedoresStore((s) => s.datosActuales) as ProveedorDomain | null;

  const disabled = useMemo(() => !canEditCampos, [canEditCampos]);

  // fuente: snapshot de edición si existe; sino el slice
  const fromActuales = isEditable && actuales ? ((actuales as any)[key] as MetadatosData[K]) : undefined;
  const rawValue: MetadatosData[K] = (fromActuales ?? sliceValue) as MetadatosData[K];

  // Para la UI: boolean queda boolean; el resto como string controlada
  const value: any =
    typeof rawValue === "boolean" ? !!rawValue : rawValue == null ? "" : typeof rawValue === "string" ? rawValue : String(rawValue);

  const [/*error*/, /*setError*/] = useState<string | undefined>(undefined); // reservado por si luego querés validar

  const onChange = useCallback(
    (v: any) => {
      let next: MetadatosData[K];

      if (options?.parse) {
        next = options.parse(v);
      } else {
        // inferencia simple por tipo actual
        const sample = sliceValue as any;
        if (typeof sample === "number") {
          const s = typeof v === "string" ? v.trim() : String(v ?? "");
          next = (s === "" ? 0 : (Number(s) as any)) as MetadatosData[K];
        } else if (typeof sample === "boolean") {
          if (typeof v === "boolean") next = v as MetadatosData[K];
          else if (typeof v === "string") {
            const sv = v.toLowerCase().trim();
            next = ((sv === "true" || sv === "1") ? true : (sv === "false" || sv === "0") ? false : Boolean(sv)) as MetadatosData[K];
          } else if (typeof v === "number") {
            next = (v === 1 ? true : v === 0 ? false : Boolean(v)) as MetadatosData[K];
          } else {
            next = Boolean(v) as MetadatosData[K];
          }
        } else {
          // string (fechas, etc.)
          const s = typeof v === "string" ? v : v?.target?.value ?? String(v ?? "");
          next = s as MetadatosData[K];
        }
      }

      // 1) actualizar slice
      setMetadatosField(key, next);

      // 2) sincronizar snapshot si estás en modo edición
      if (isEditable) {
        updateActuales({ [key]: next } as Partial<ProveedorDomain>);
      }
    },
    [sliceValue, key, setMetadatosField, isEditable, updateActuales, options?.parse]
  );

  return { value, onChange, disabled };
}
