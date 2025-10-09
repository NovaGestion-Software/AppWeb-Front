import dayjs from "@/lib/days";

/**
 * Formatea un número con separadores de miles.
 * @param n - Número a formatear.
 * @returns Número formateado como string (sin decimales).
 */
export const formatNumber = (n: number): string =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 });

/**
 * Formatea un número en pesos argentinos.
 * @param n - Número a formatear.
 * @returns String con símbolo `$` y número con separadores de miles.
 */
export const formatCurrency = (n: number): string =>
  `$ ${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

/**
 * Formatea una fecha en formato `YYYY-MM-DD HH:mm`.
 * @param fechaISO - Fecha en formato ISO 8601 (ej. `2025-03-10T21:34:23.000Z`).
 * @returns String formateado como `YYYY-MM-DD HH:mm`. Retorna `""` si la fecha no es válida.
 */
export const formatearFecha = (fechaISO: string): string => {
  if (!fechaISO) return "";

  const fecha = new Date(fechaISO);

  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // meses base 0
  const dia = String(fecha.getDate()).padStart(2, "0");
  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");

  return `${año}-${mes}-${dia} ${horas}:${minutos}`;
};

/**
 * Formatea una fecha ISO usando Day.js.
 * - Interpreta la cadena como UTC (`Z` al final).
 * - Convierte a la zona horaria por defecto (ej. AR).
 * - Devuelve string legible en formato `YYYY-MM-DD HH:mm`.
 * @param iso - Fecha en formato ISO o `null/undefined`.
 * @returns String formateado como `YYYY-MM-DD HH:mm`. Retorna `""` si no es válido.
 */
export function formatISO(iso?: string | null): string {
  if (!iso) return "";
  const d = dayjs.utc(iso).tz();
  return d.isValid() ? d.format("YYYY-MM-DD HH:mm") : "";
}
