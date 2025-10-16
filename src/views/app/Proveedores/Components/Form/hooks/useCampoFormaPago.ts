// /views/app/Proveedores/Components/Form/hooks/useCampoFormaPago.ts
import { useCallback, useMemo, useState } from "react";
import type { ZodSchema } from "zod";
import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProveedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "./useEditarActuales";
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

// importá solo FormaPagoData
import type { FormaPagoData } from "../../../Store/Form/Slices/formaPago.slice";

type Options<K extends keyof FormaPagoData> = {
  parse?: (raw: string) => FormaPagoData[K];
  guard?: Guard;
  validator?: ZodSchema<any>;
};

export function useCampoFormaPago<K extends keyof FormaPagoData>(
  key: K,
  sliceValue: FormaPagoData[K],
  setSliceField: (k: K, v: FormaPagoData[K]) => void,
  options?: Options<K>
) {
  const { canEditCampos } = usePermisosCampos();
  const { isEditable, updateActuales } = useEditarActuales();
  const actuales = useProveedoresStore((s) => s.datosActuales) as ProveedorDomain | null;

  const [error, setError] = useState<string | undefined>(undefined);

  const { actual, isBoolean, valueStr } = computeCurrentValue<keyof FormaPagoData, FormaPagoData>(
    key,
    sliceValue,
    (actuales as unknown as Record<string, any>) ?? null,
    isEditable
  );

  const guard = useMemo(() => resolveActiveGuard(String(key), options?.guard), [key, options?.guard]);

  const onChange = useCallback(
    (v: any) => {
      if (isBoolean) {
        const nextBool = typeof v === "boolean" ? v : Boolean(v);
        syncState<FormaPagoData, K>(setSliceField, key, nextBool as FormaPagoData[K], isEditable, updateActuales as any);
        setError(undefined);
        return;
      }

      const incoming = normalizeIncoming(v);
      const prevStr = valueStr;

      const { nextStr, blocked, corrected, guardError } = runGuardSticky(guard, incoming, prevStr);

      if (blocked) {
        setError((e) => guardError ?? e ?? "Valor inválido o límite alcanzado");
        return;
      }

      const nextTyped = castToDomainType<FormaPagoData[K]>(
        nextStr,
        sliceValue as FormaPagoData[K],
        options?.parse as ((raw: string) => FormaPagoData[K]) | undefined
      );

      syncState<FormaPagoData, K>(setSliceField, key, nextTyped, isEditable, updateActuales as any);

      const finalError = validateWithZodRespectingGuard(options?.validator, nextStr, blocked, corrected, guardError);
      setError(finalError);
    },
    [isBoolean, guard, valueStr, setSliceField, key, isEditable, updateActuales, sliceValue, options?.parse, options?.validator]
  );

  const onBlur = useCallback(() => {
    if (isBoolean) return;
    if (!options?.validator) return;
    const r = options.validator.safeParse(valueStr);
    setError(r.success ? undefined : r.error.issues[0]?.message);
  }, [isBoolean, options?.validator, valueStr]);

  return {
    value: (isBoolean ? (actual as boolean) : valueStr) as string | boolean,
    onChange,
    onBlur,
    error,
    setError,
    disabled: !canEditCampos,
  };
}
