import type { FieldKey } from "@/views/app/Proveedores/Data/domain/validation.core";

/** Mapea campo → tabId (ajustá si tus ids difieren) */
export function fieldToTabId(field: FieldKey): string {
  const comerciales = new Set<FieldKey>(["nombre", "nfantasia",
    "domicilio1","domicilio2","localidad","cpostal","calle1","calle2",
    "latitud","longitud","email","codarea","codarea1","codarea2",
    "telefono","telefono1","telefono2","idcodprov"
  ]);
  const impositivos = new Set<FieldKey>(["idctrib","idtdoc","cuit","ibruto"]);

  if (comerciales.has(field)) return "comerciales";
  if (impositivos.has(field)) return "impositivos";
  return "comerciales";
}

/** Mapea campo → DOM id del input (ajustá a tu convención) */
export function fieldToDomId(field: FieldKey): string {
  switch (field) {
    case "nombre": return "proveedores:nombre";
    case "nfantasia": return "proveedores:nfantasia";
    case "domicilio1": return "proveedores:domicilio1";
    case "localidad": return "proveedores:localidad";
    case "cpostal": return "proveedores:cpostal";
    case "idcodprov": return "proveedores:idcodprov";
    case "idctrib": return "proveedores:idctrib";
    case "idtdoc": return "proveedores:idtdoc";
    case "cuit": return "proveedores:cuit";
    case "ibruto": return "proveedores:ibruto";
    default: return `proveedores:${String(field)}`;
  }
}

/**
 * Presenta errores en la UI:
 * - Vuelca errores al slice
 * - Cambia a la tab del primer error (si corresponde)
 * - Enfoca el input del primer error
 */
export function presentProveedorFormErrors(opts: {
  errors: Partial<Record<FieldKey, string>>;
  firstKey: FieldKey | null;
  setErrors: (e: Partial<Record<FieldKey, string>>) => void;
  setActiveTabById?: (tabId: string) => void;
  focus: (domId: string) => void;
}): { domId?: string } {
  const { errors, firstKey, setErrors, setActiveTabById, focus } = opts;
  setErrors(errors);

  if (firstKey) {
    const tabId = fieldToTabId(firstKey);
    setActiveTabById?.(tabId);
    const domId = fieldToDomId(firstKey);
    focus(domId);
    return { domId };
  }
  return {};
}
