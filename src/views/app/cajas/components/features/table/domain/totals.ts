// domain/totals.ts
import { formatNumber } from '../../_shared/domain/format';
import { EXCLUDED_SECTIONS_FOR_NET } from '../config/excludedSections';
import { normalizeSeccionData } from './transforms';
import {
  CajasSeccionResponse,
  CajasSeccionItemNum,
  TablaBuildResult,
  TablaRow,
} from './../../_shared/types/types';

/**
 * Indica si una sección está excluida para el cálculo neto.
 * @param seccion - Código de sección.
 * @param excluded - Lista de secciones a excluir.
 * @returns `true` si la sección está en la lista de exclusión; de lo contrario `false`.
 */
function isExcluded(seccion: string, excluded: readonly string[]) {
  // Set adentro por tamaño chico; si querés hiper-opt, podés elevar a nivel módulo
  const set = new Set(excluded);
  return set.has(seccion);
}

/**
 * Calcula los totales bruto y neto de ventas.
 * - `total`: suma de todas las ventas.
 * - `totalNet`: suma de ventas excluyendo las secciones configuradas.
 * @param data - Datos numéricos por sección.
 * @param excluded - Lista de secciones a excluir del total neto.
 * @returns Objeto con `{ total, totalNet }`.
 */
export function computeTotals(
  data: CajasSeccionItemNum[],
  excluded: readonly string[],
) {
  let total = 0;
  let totalNet = 0;

  for (const item of data) {
    const v = item.venta || 0;
    total += v;
    if (!isExcluded(item.seccion, excluded)) {
      totalNet += v;
    }
  }
  return { total, totalNet };
}

/**
 * Convierte un valor en porcentaje respecto a una base.
 * @param value - Valor actual.
 * @param base - Base de cálculo.
 * @returns Porcentaje con dos decimales y símbolo `%`. Devuelve `0%` si la base es 0.
 */
function toPercent(value: number, base: number): string {
  if (!base || base === 0) return '0%';
  const pct = (value / base) * 100;
  return `${pct.toFixed(2)}%`;
}

/**
 * Construye las filas de la tabla de “Venta por Sección”.
 * @param data - Datos numéricos por sección (normalizados).
 * @param totals - Totales `{ total, totalNet }` previamente calculados.
 * @param excluded - Secciones a excluir del porcentaje neto.
 * @returns Arreglo de filas listas para renderizar (`TablaRow[]`).
 */
function buildRows(
  data: CajasSeccionItemNum[],
  totals: { total: number; totalNet: number },
  excluded: readonly string[],
): TablaRow[] {
  const { total, totalNet } = totals;

  return data.map((item) => {
    const porcentaje = toPercent(item.venta, total);
    const porcentajeNeto = isExcluded(item.seccion, excluded)
      ? '0%'
      : toPercent(item.venta, totalNet);

    return {
      seccion: item.seccion,
      nseccion: item.nseccion,
      // En filas NO ponemos símbolo $, seguimos tu criterio actual:
      venta: formatNumber(item.venta),
      porcentaje,
      porcentajeNeto,
    };
  });
}

/**
 * Orquestador principal para la tabla de “Venta por Sección”.
 * Normaliza datos, calcula totales y arma las filas para la UI.
 * @param data - Respuesta cruda del backend (posiblemente con strings y símbolos).
 * @returns Resultado con totales (con `$`) y filas formateadas.
 */
export function buildTablaSeccion(data: CajasSeccionResponse): TablaBuildResult {
  const normalized = normalizeSeccionData(data ?? []);
  const totals = computeTotals(normalized, EXCLUDED_SECTIONS_FOR_NET);

  // Si total=0, devolvemos todo “0” pero mantenemos las filas con 0s y %.
  if (totals.total === 0) {
    const zeroRows: TablaRow[] = normalized.map((item) => ({
      seccion: item.seccion,
      nseccion: item.nseccion,
      venta: '0',
      porcentaje: '0%',
      porcentajeNeto: '0%',
    }));

    return {
      totalVentas: '$0',
      totalVentasNetas: '$0',
      result: zeroRows,
    };
  }

  const rows = buildRows(normalized, totals, EXCLUDED_SECTIONS_FOR_NET);

  // Totales con símbolo $
  return {
    totalVentas: `$${formatNumber(totals.total)}`,
    totalVentasNetas: `$${formatNumber(totals.totalNet)}`,
    result: rows,
  };
}
