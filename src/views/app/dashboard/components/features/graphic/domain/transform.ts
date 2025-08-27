import { ChartDataItem, DataGraficoResponse } from "../../_shared/Types/types";

/**
 * Convierte una fecha ISO en la sigla de mes en español (3 letras, mayúsculas).
 *
 * @param fechaISO - Fecha en formato ISO (`YYYY-MM-DD`).
 * @returns Sigla del mes (`"ENE"`, `"FEB"`, ..., `"DIC"`). Devuelve `"N/A"` si no se puede parsear.
 *
 * @example
 * ```ts
 * obtenerSiglaMes("2025-03-10"); // "MAR"
 * obtenerSiglaMes("2025-11-01"); // "NOV"
 * ```
 */
export function obtenerSiglaMes(fechaISO: string): string {
  const meses = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
  const mesIndex = parseInt(fechaISO.slice(5, 7), 10) - 1;
  return meses[mesIndex] ?? "N/A";
}

/**
 * Devuelve el rango de **dos años móviles** en formato string.
 *
 * - Primer valor: `"YYYY-YYYY"` (dos años atrás hasta el año anterior).
 * - Segundo valor: `"YYYY-YYYY"` (año anterior hasta el actual).
 *
 * Ejemplo en 2025:
 * - `["2023-2024", "2024-2025"]`
 *
 * @returns Tupla con dos strings representando los rangos de años.
 */
export function obtenerRangoAnios(): [string, string] {
  const anioActual = new Date().getFullYear();
  return [`${anioActual - 2}-${anioActual - 1}`, `${anioActual - 1}-${anioActual}`];
}

/**
 * Normaliza la respuesta del backend a la serie de datos de un gráfico comparativo.
 *
 * Espera un arreglo `dataGrafico` con al menos dos elementos:
 * - `ventasActual.ventasAñoActual`
 * - `ventasAnterior.ventasAñoAnterior`
 *
 * Cada posición del arreglo corresponde al mismo mes, comparando año actual vs año anterior.
 *
 * @param dataGrafico - Respuesta cruda del backend.
 * @returns Arreglo de `ChartDataItem[]` con datos listos para graficar.
 *   Cada objeto tiene:
 *   - `date`: sigla de mes (ej. `"ENE"`, `"FEB"`).
 *   - `[categorias[0]]`: valor del año anterior o `null`.
 *   - `[categorias[1]]`: valor del año actual o `null`.
 *
 * @example
 * ```ts
 * const data = transformarDatosGrafico(respuestaApi);
 * // [
 * //   { date: "ENE", "2023-2024": 1500, "2024-2025": 1800 },
 * //   { date: "FEB", "2023-2024": 2000, "2024-2025": 2100 },
 * //   ...
 * // ]
 * ```
 */
export function transformarDatosGrafico(dataGrafico?: DataGraficoResponse[]): ChartDataItem[] {
  if (!dataGrafico || dataGrafico.length < 2) return [];

  const [ventasActual, ventasAnterior] = dataGrafico;
  if (!ventasActual?.ventasAñoActual || !ventasAnterior?.ventasAñoAnterior) return [];

  const categorias = obtenerRangoAnios();

  return ventasActual.ventasAñoActual.map((actual, index) => {
    const anterior = ventasAnterior.ventasAñoAnterior[index];
    const importeAnterior = anterior ? Number.parseFloat(anterior.importe) : null;
    const importeActual = Number.parseFloat(actual.importe);

    return {
      date: obtenerSiglaMes(actual.mes),
      [categorias[0]]: Number.isFinite(importeAnterior as number) ? (importeAnterior as number) : null,
      [categorias[1]]: Number.isFinite(importeActual) ? importeActual : null,
    } as ChartDataItem;
  });
}
