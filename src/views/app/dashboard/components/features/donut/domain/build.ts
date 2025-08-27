import { CLAVES_IMPORTES } from "../config/importeKey";

type DonutDatum = { name: string; valor: number };

export type DonutCardData = {
  /** Total general asociado al gráfico. */
  total: number;
  /** Datos de cada segmento del donut: nombre y valor numérico. */
  data: DonutDatum[];
  /** Etiquetas de categorías (alineadas por índice con las claves de importes). */
  categoria: string[];
};

/**
 * Construye la estructura de datos para un gráfico tipo **donut card**,
 * a partir de un total y un desglose de importes.
 *
 * El mapeo entre categorías y claves de importes es posicional:
 * - `categorias[i]` corresponde a la clave `clavesImportes[i]`
 *   (ej. `"importe01"`, `"importe02"`, etc.).
 *
 * Claves consideradas (en orden):
 * - `"importe01"`, `"importe02"`, `"importe03"`, `"importe06"`,
 *   `"importe07"`, `"importe08"`, `"importe09"`, `"importe11"`.
 *
 * @param total - Total global que se quiere mostrar en la tarjeta.
 * @param importes - Objeto con claves de importes (`importeXX`) y valores numéricos.
 * @param categorias - Lista de nombres de categoría que se alinean por índice con los importes.
 *
 * @returns Objeto `DonutCardData` con:
 * - `total`: el total global.
 * - `data`: arreglo `{ name, valor }` para alimentar el gráfico.
 * - `categoria`: las categorías en el mismo orden recibido.
 *
 * @example
 * ```ts
 * const total = 1000;
 * const importes = { importe01: 400, importe02: 300, importe03: 300 };
 * const categorias = ["Efectivo", "Débito", "Crédito"];
 *
 * const donut = buildDonutCardData(total, importes, categorias);
 *
 * // donut = {
 * //   total: 1000,
 * //   data: [
 * //     { name: "Efectivo", valor: 400 },
 * //     { name: "Débito", valor: 300 },
 * //     { name: "Crédito", valor: 300 },
 * //   ],
 * //   categoria: ["Efectivo", "Débito", "Crédito"]
 * // }
 * ```
 */
export function buildDonutCardData(
  total: number,
  importes: Record<string, number>,
  categorias: string[]
): DonutCardData {
  return {
    total,
    data: categorias.map((categoria, i) => {
      const clave = CLAVES_IMPORTES[i];
      return { name: categoria, valor: importes[clave] ?? 0 };
    }),
    categoria: categorias,
  };
}
