import { ChartDataItem } from "../../_shared/Types/types";
import { obtenerRangoAnios } from "./transform";

/**
 * Genera datos "placeholder" para un gráfico de barras/líneas con rango de años.
 *
 * - Crea **12 puntos** correspondientes a los meses `Ene–Dic`.
 * - Cada punto contiene:
 *   - `date`: nombre abreviado del mes.
 *   - Una clave por cada año en el rango (`anios[0]`, `anios[1]`), inicializadas en `null`.
 * - Es **null-safe**, siempre devuelve las categorías aun cuando no haya datos.
 *
 * @returns Arreglo de `ChartDataItem[]` con 12 objetos, listos para usar en un gráfico.
 *
 * @example
 * ```ts
 * const data = generarPlaceholderChartData();
 * // [
 * //   { date: "Ene", 2024: null, 2025: null },
 * //   { date: "Feb", 2024: null, 2025: null },
 * //   ...
 * //   { date: "Dic", 2024: null, 2025: null }
 * // ]
 * ```
 */
export function generarPlaceholderChartData(): ChartDataItem[] {
  const anios = obtenerRangoAnios();
  const meses = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];

  return meses.map((mes) => ({
    date: mes,
    [anios[0]]: null,
    [anios[1]]: null,
  })) as ChartDataItem[];
}
