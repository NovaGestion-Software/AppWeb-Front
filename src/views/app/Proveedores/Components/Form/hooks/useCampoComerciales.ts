// /views/app/Proveedores/Components/Form/hooks/useCampoComerciales.ts
import { useCallback, useMemo, useState } from "react";
import type { ZodSchema } from "zod";
import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProveedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "./useEditarActuales";
import type { DatosComercialesData } from "../../../Store/Form/Slices/datosComerciales.slice";
import type { ProveedorDomain } from "../../../Data/domain";
import type { Guard } from "../Utils/guards";
import {
  computeCurrentValue,
  resolveActiveGuard,
  normalizeIncoming,
  runGuardSticky,
  castToDomainType,
  syncState,
  validateWithZodRespectingGuard,
} from "../Utils/campo.utils";

type Options<K extends keyof DatosComercialesData> = {
  parse?: (raw: string) => DatosComercialesData[K];
  guard?: Guard;
  validator?: ZodSchema<any>;
};

/**
 * Hook tipado por dominio para Datos Comerciales.
 * - Aplica guard global (bloquea <> y control chars) + meta por clave.
 * - Error sticky .  Zod solo si no hubo bloqueo/corrección.
 * - Convierte a number/string según el tipo del slice (no maneja booleans en este slice).
 */
export function useCampoComerciales<K extends keyof DatosComercialesData>(
  key: K,
  sliceValue: DatosComercialesData[K],
  setSliceField: (k: K, v: DatosComercialesData[K]) => void,
  options?: Options<K>
) {
  const { canEditCampos } = usePermisosCampos();
  const { isEditable, updateActuales } = useEditarActuales();
  const actuales = useProveedoresStore((s) => s.datosActuales) as ProveedorDomain | null;

  const [error, setError] = useState<string | undefined>(undefined);

  // Valor efectivo normalizado. (Este slice no usa booleans; ignoramos isBoolean/actual)
  const { valueStr } = computeCurrentValue<keyof DatosComercialesData, DatosComercialesData>(
    key,
    sliceValue,
    (actuales as Partial<DatosComercialesData>) ?? null,
    isEditable
  );

  // Guard: global primero + meta/override
  const guard = useMemo(() => resolveActiveGuard(String(key), options?.guard), [key, options?.guard]);  

  const onChange = useCallback(
    (v: any) => {
      // 1) Normalizar entrada a string
      const incoming = normalizeIncoming(v);
      const prevStr = valueStr;

      // 2) Guard sticky (bloqueo/corrección prioriza error del guard)
      const { nextStr, blocked, corrected, guardError } = runGuardSticky(guard, incoming, prevStr);

      if (blocked) {
        setError((e) => guardError ?? e ?? "Valor inválido o límite alcanzado");
        return;
      }

      // 3) Convertir al tipo del dominio (parse custom o inferencia por sample)
      const nextTyped = castToDomainType<DatosComercialesData[K]>(
        nextStr,
        sliceValue as DatosComercialesData[K],
        options?.parse as ((raw: string) => DatosComercialesData[K]) | undefined
      );

      // 4) Store + snapshot
      syncState<DatosComercialesData, K>(setSliceField, key, nextTyped, isEditable, updateActuales as any);

      // 5) Validación Zod sin parpadeo (guard > Zod)
      const finalError = validateWithZodRespectingGuard(options?.validator, nextStr, blocked, corrected, guardError);
      setError(finalError);
    },
    [guard, valueStr, setSliceField, key, isEditable, updateActuales, sliceValue, options?.parse, options?.validator]
  );

  const onBlur = useCallback(() => {
    if (!options?.validator) return;
    const r = options.validator.safeParse(valueStr);
    setError(r.success ? undefined : r.error.issues[0]?.message);
  }, [options?.validator, valueStr]);

  return {
    value: valueStr, // siempre string en este slice
    onChange,
    onBlur,
    error,
    setError,
    disabled: !canEditCampos,
  };
}
