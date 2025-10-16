// /views/app/Proveedores/Components/Form/hooks/useCampoIdentificacion.ts
import { useCallback, useMemo, useState } from "react";
import type { ZodSchema } from "zod";
import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProveedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "./useEditarActuales";
import type { ProveedorDomain } from "../../../Data/domain";
import { computeCurrentValue, resolveActiveGuard, normalizeIncoming, runGuardSticky, validateWithZodRespectingGuard } from "../Utils/campo.utils";

/**
 * Hook para campos de Identificación (nombre, nfantasia).
 * - Reutiliza guards globales (bloqueo de <> y control chars) + meta por clave.
 * - Error sticky al bloquear/corregir; Zod sólo si no hubo guard activo.
 * - Mantiene API: `setField(v: string)` (retrocompatible con tu componente actual).
 */
export function useCampoIdentificacion<K extends "nombre" | "nfantasia">(key: K, sliceValue: string, setField: (v: string) => void, opts?: { validator?: ZodSchema<any> }) {
  const clearFieldError = useProveedoresStore((s) => s.clearFieldError);
  const { canEditCampos } = usePermisosCampos();
  const { isEditable, updateActuales } = useEditarActuales();
  const actuales = useProveedoresStore((s) => s.datosActuales) as ProveedorDomain | null;

  const [error, setError] = useState<string | undefined>(undefined);

  // Modelamos un subconjunto mínimo del dominio para aprovechar computeCurrentValue
  type IdentData = { nombre: string; nfantasia?: string | null };

  const {valueStr } = computeCurrentValue<keyof IdentData, IdentData>(key, sliceValue, (actuales as Partial<IdentData>) ?? null, isEditable);

  // Siempre aplica guard global + meta por clave
  const guard = useMemo(() => resolveActiveGuard(String(key), undefined), [key]);

  const onChange = useCallback(
    (v: any) => {
      // Identificación solo maneja strings; ruta booleana no aplica
      const incoming = normalizeIncoming(v);
      const prevStr = valueStr;

      const { nextStr, blocked, corrected, guardError } = runGuardSticky(guard, incoming, prevStr);
      // Guard con comportamiento sticky (bloqueo/corrección prioriza su error)

      if (blocked) {
        setError((e) => guardError ?? e ?? "Valor inválido o límite alcanzado");
        return;
      }

      // Actualizar slice + datosActuales (string plano)
      setField(nextStr);
      if (isEditable) {
        updateActuales({ [key]: nextStr } as Partial<ProveedorDomain>);
      }
      clearFieldError(key);

      // Validación Zod sólo si no hubo corrección/bloqueo (evita parpadeo)
      const finalErr = validateWithZodRespectingGuard(opts?.validator, nextStr, blocked, corrected, guardError);
      setError(finalErr);
    },
    [guard, valueStr, setField, isEditable, updateActuales, key, opts?.validator]
  );

  const onBlur = useCallback(() => {
    if (!opts?.validator) return;
    const r = opts.validator.safeParse(valueStr);
    setError(r.success ? undefined : r.error.issues[0]?.message);
  }, [opts?.validator, valueStr]);

  return {
    value: valueStr,
    onChange,
    onBlur,
    error,
    disabled: !canEditCampos,
  };
}
