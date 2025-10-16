// src/views/app/Proveedores/Components/Form/hooks/useEditarActuales.ts
import { ProveedorDomain } from "../../../Data/domain";
import { useProveedoresStore } from "../../../Store/Store";



/** Campos string que querés garantizar como string no-undefined */
const REQUIRED_STRINGS: (keyof ProveedorDomain)[] = ["nfantasia", "nombre"];

/** Coercea a string vacío los requeridos que vengan undefined/null */
function coerceRequiredStrings<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): T {
  const out = { ...obj };
  for (const k of keys) {
    const v = out[k as string];
    if (v === undefined || v === null) (out as any)[k] = "";
  }
  return out;
}

function finalizeDomain<T extends ProveedorDomain>(raw: T): T {
  return coerceRequiredStrings(raw, REQUIRED_STRINGS);
}

type UpdaterFn = (curr: ProveedorDomain | null) => ProveedorDomain;

export function useEditarActuales(): {
  isEditable: boolean;
  /** PATCH no destructivo: mergea sólo claves definidas (ignora undefined) */
  updateActuales(patch: Partial<ProveedorDomain>): void;
  /** REPLACE: reemplaza todo el objeto (usa callback) */
  updateActuales(updater: UpdaterFn): void;
} {
  const isEditable = useProveedoresStore((s) => Boolean(s.datosActuales));
  const setDatosActuales = useProveedoresStore((s) => s.setDatosActuales);

  function updateActuales(arg: Partial<ProveedorDomain> | UpdaterFn) {
    const curr = useProveedoresStore.getState().datosActuales as ProveedorDomain | null;

    if (typeof arg === "function") {
      // REPLACE
      const nextRaw = (arg as UpdaterFn)(curr);
      const next = finalizeDomain(nextRaw);
      setDatosActuales(next);
      return;
    }

    // PATCH
    // PATCH
    if (!curr) return;
    // No quitar undefined: queremos poder "vaciar" el campo
    const merged = { ...curr, ...arg } as ProveedorDomain;
    const next = finalizeDomain(merged);
    setDatosActuales(next);
  }

  return { isEditable, updateActuales };
}
