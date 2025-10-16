// /views/app/Proveedores/Components/Form/hooks/useCampoRetencion.ts
import { useCallback, useMemo, useState } from "react";
import type { ZodSchema } from "zod";
import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProveedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "./useEditarActuales";
import type { RetencionesData } from "../../../Store/Form/Slices/retenciones.slice";
import type { Guard } from "../Utils/guards";
import {
  normalizeIncoming,
  runGuardSticky,
  resolveActiveGuard,
  validateWithZodRespectingGuard,
} from "../Utils/campo.utils";

type RetKey = "regimen" | "exento" | "certificado" | "vigenciaDesde" | "vigenciaHasta";
type RetId  = "IB" | "GAN" | "IVA";

function mapKey(id: RetId, key: RetKey): keyof RetencionesData {
  const suf = id === "IB" ? "bru" : id === "GAN" ? "gan" : "iva";
  switch (key) {
    case "regimen":       return `idreg${suf}` as keyof RetencionesData;   // boolean en domain/store
    case "exento":        return `exret${suf}` as keyof RetencionesData;   // boolean
    case "certificado":   return `nexret${suf}` as keyof RetencionesData;  // string | undefined
    case "vigenciaDesde": return `fec${suf}` as keyof RetencionesData;     // string | undefined (YYYY-MM-DD)
    case "vigenciaHasta": return `vto${suf}` as keyof RetencionesData;     // string | undefined
  }
}

type Options = {
  parse?: (raw: string) => any;
  guard?: Guard;
  validator?: ZodSchema<any>;
};

/**
 * Hook tipado para Retenciones (IB / GAN / IVA).
 * - Guard global (bloquea <> y control chars) + meta por clave (derivada del id y key).
 * - Error sticky: si bloquea/corrige, el mensaje del guard prevalece (sin parpadeo).
 * - Booleans ruta rápida (regimen/exento). Resto: string controlado (fechas/certificado).
 */
export function useCampoRetencion(
  id: RetId,
  key: RetKey,
  sliceValue: unknown,
  setRetencionesField: <K extends keyof RetencionesData>(k: K, v: RetencionesData[K]) => void,
  options?: Options
) {
  const { canEditCampos } = usePermisosCampos();
  const { isEditable, updateActuales } = useEditarActuales();

  // Clave BE resultante
  const beKey = mapKey(id, key);

  // Valor actual desde la store (usás getState en tu implementación original)
  const store = useProveedoresStore.getState() as any;
  const current: RetencionesData[typeof beKey] | undefined = store[beKey];

  // ¿Es booleano?
  const isBoolean = key === "regimen" || key === "exento";

  // Normalizar string para inputs controlados (cuando no es boolean)
  const valueStr = isBoolean
    ? ""
    : String(
        current ?? sliceValue ?? "" // fallback consistente con tu versión previa
      );

  const [error, setError] = useState<string | undefined>(undefined);

  // Meta key por defecto para certificados (ya la tenías), si no, usar beKey
  const defaultKeyForMeta =
    key === "certificado"
      ? (id === "IB" ? "nexretbru" : id === "GAN" ? "nexretgan" : "nexretiva")
      : String(beKey);

  // Guard efectivo: GLOBAL primero + meta por clave (o override)
  const guard = useMemo(
    () => resolveActiveGuard(defaultKeyForMeta, options?.guard),
    [defaultKeyForMeta, options?.guard]
  );

  const onChange = useCallback(
    (v: any) => {
      // 1) Booleans ruta rápida
      if (isBoolean) {
        const nextBool = typeof v === "boolean" ? v : Boolean(v);
        setRetencionesField(beKey as any, nextBool);
        if (isEditable) updateActuales({ [beKey]: nextBool } as any);
        setError(undefined);
        return;
      }

      // 2) Normalizar ingreso a string
      const incoming = normalizeIncoming(v);
      const prevStr = valueStr;

      // 3) Guard sticky (bloqueo duro/corrección prioriza su error)
      const { nextStr, blocked, corrected, guardError } = runGuardSticky(guard, incoming, prevStr);
      if (blocked) {
        setError((e) => guardError ?? e ?? "Valor inválido o límite alcanzado");
        return;
      }

      // 4) Parse opcional (fecha/certificado) o pasar string directo
      const next = options?.parse ? options.parse(nextStr) : nextStr;

      // 5) Persistir en slice + snapshot BE
      setRetencionesField(beKey as any, next);
      if (isEditable) updateActuales({ [beKey]: next } as any);

      // 6) Validación con precedencia guard > Zod (sin parpadeo)
      const finalErr = validateWithZodRespectingGuard(options?.validator, nextStr, blocked, corrected, guardError);
      setError(finalErr);
    },
    [isBoolean, beKey, valueStr, guard, setRetencionesField, isEditable, updateActuales, options?.parse, options?.validator]
  );

  const onBlur = useCallback(() => {
    if (isBoolean) return;
    if (!options?.validator) return;
    const r = options.validator.safeParse(valueStr);
    setError(r.success ? undefined : r.error.issues[0]?.message);
  }, [isBoolean, options?.validator, valueStr]);

  return {
    value: isBoolean ? (current ?? false) : valueStr,
    onChange,
    onBlur,
    error,
    disabled: !canEditCampos,
  };
}
