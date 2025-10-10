// Helpers puros y atómicos de conversión/normalización
export const bool01ToBool = (v: 0 | 1 | null | undefined): boolean => v === 1;
export const boolTo01 = (b: boolean | null | undefined): 0 | 1 => (b ? 1 : 0);

export const trimOrUndef = (s: string | null | undefined): string | undefined => {
  const t = s?.trim();
  return t ? t : undefined;
};

// Ajustá estas dos según el formato exacto de tu backend
export const backendToIso = (s: string | null | undefined): string | undefined => {
  if (!s) return undefined;
  // TODO: parsear "YYYY-MM-DD HH:mm:ss" a ISO. Podés hacerlo manualmente sin Date si querés.
  // Por ahora devolvemos s para no bloquear el setup.
  return s;
};

export const isoToBackend = (iso: string | undefined): string | null => {
  if (!iso) return null;
  // TODO: convertir de ISO -> "YYYY-MM-DD HH:mm:ss"
  return iso;
};
