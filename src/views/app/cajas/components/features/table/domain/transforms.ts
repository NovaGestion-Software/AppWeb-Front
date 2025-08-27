import { CajasSeccionItemNum, CajasSeccionResponse } from "../../_shared/types/types";

/**
 * Convierte un valor a número de forma segura.
 * - Limpia símbolos `$`, espacios y separadores de miles.
 * - Permite valores decimales con punto.
 * @param value - Valor a convertir (puede ser number, string o null/undefined).
 * @returns Número válido o `0` si no es convertible.
 */
function toNumberSafe(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const str = String(value ?? '')
    .replace(/\$/g, '')
    .replace(/\s+/g, '')
    .replace(/\./g, '.') // por si viniera con puntos, los dejamos como decimal
    .replace(/,/g, '');  // si llegara con separador de miles, se elimina
  const n = parseFloat(str);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Normaliza los datos de secciones:
 * - Convierte `venta` a number usando {@link toNumberSafe}.
 * - Recorta y limpia `nseccion` si llega con espacios adicionales.
 * @param data - Respuesta cruda del backend con ventas por sección.
 * @returns Arreglo de objetos normalizados con `venta: number`.
 */
export function normalizeSeccionData(data: CajasSeccionResponse): CajasSeccionItemNum[] {
  return (data ?? []).map((item) => ({
    ...item,
    nseccion: (item.nseccion ?? '').trim(),
    venta: toNumberSafe(item.venta),
  }));
}
