import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProovedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "./useEditarActuales";
import type { RetencionesData } from "../../../Store/Form/Slices/retenciones.slice";

/** Claves de UI que manejamos en el bloque */
type RetKey = "regimen" | "exento" | "certificado" | "vigenciaDesde" | "vigenciaHasta";
/** IDs de retención soportados (vista) */
type RetId = "IB" | "GAN" | "IVA";

/** Mapeo helper: (id, key) -> clave BE en la store */
function mapKey(id: RetId, key: RetKey): keyof RetencionesData {
  const suf = id === "IB" ? "bru" : id === "GAN" ? "gan" : "iva";
  switch (key) {
    case "regimen":       return `idreg${suf}` as keyof RetencionesData;   // number
    case "exento":        return `exret${suf}` as keyof RetencionesData;   // boolean
    case "certificado":   return `nexret${suf}` as keyof RetencionesData;  // string|undefined
    case "vigenciaDesde": return `fec${suf}` as keyof RetencionesData;     // string|undefined
    case "vigenciaHasta": return `vto${suf}` as keyof RetencionesData;     // string|undefined
  }
}

/**
 * Hook para editar campos de retención en la vista (array) contra la store plana (BE).
 * - Lee/escribe usando setRetencionesField (clave BE mapeada).
 * - Actualiza también datosActuales cuando está en modo edición.
 */
export function useCampoRetencion(
  id: RetId,
  key: RetKey,
  sliceValue: unknown, // valor que te llega desde la vista derivada (por si querés usarlo como fallback)
  setRetencionesField: <K extends keyof RetencionesData>(k: K, v: RetencionesData[K]) => void
) {
  const { canEditCampos } = usePermisosCampos();
  const { isEditable, updateActuales } = useEditarActuales();
  const store = useProovedoresStore.getState();

  const beKey = mapKey(id, key);

  // Valor actual real desde la store plana
  const current = (store as any)[beKey] as RetencionesData[typeof beKey] | undefined;

  // Normalizamos el valor a lo que espera la UI
  const value =
    current !== undefined ? current : (sliceValue as RetencionesData[typeof beKey]);

  const onChange = (v: any) => {
    let next: any = v;

    // regimen es numérico en BE; si llega string desde el input, parseamos
    if (key === "regimen") {
      const n = typeof v === "string" ? Number(v) : v;
      next = Number.isNaN(n) ? 0 : n;
    }

    // 1) Actualiza store plana
    setRetencionesField(beKey as any, next);

    // 2) Actualiza snapshot datosActuales (si corresponde)
    if (isEditable) {
      updateActuales((curr) => ({ ...(curr ?? {} as any), [beKey]: next }) as any);
    }
  };

  return { value, onChange, disabled: !canEditCampos };
}
