import { CLAVES_IMPORTES } from "../config/importeKey";

/**
 * Calcula los importes de cobranzas para **año actual** o **año anterior**.
 *
 * - Si `obtenerTotal = true` (por defecto) → devuelve un único número con el total.
 * - Si `obtenerTotal = false` → devuelve un objeto con desglose por clave de importe.
 *
 * Claves consideradas:
 * - `"importe01"`, `"importe02"`, `"importe03"`, `"importe06"`,
 *   `"importe07"`, `"importe08"`, `"importe09"`, `"importe11"`.
 *
 * @param data - Estructura de datos que contiene la información de cobranzas.
 *   Se espera que sea un arreglo donde:
 *   - `data[2].cobranzasAñoActual` contiene cobranzas del año actual.
 *   - `data[3].cobranzasAñoAnterior` contiene cobranzas del año anterior.
 * @param tipoCobranza - `"actual"` para año actual o `"anterior"` para año anterior.
 * @param obtenerTotal - `true` para devolver la suma total (default),
 *   `false` para devolver desglose por clave.
 *
 * @returns
 * - `number` si `obtenerTotal = true`.
 * - `Record<string, number>` con desglose por clave si `obtenerTotal = false`.
 *
 * @example
 * ```ts
 * // Total de cobranzas del año actual
 * const total = calcularImportes(data, "actual");
 * // → 15300
 *
 * // Desglose de cobranzas del año anterior
 * const detalle = calcularImportes(data, "anterior", false);
 * // → { importe01: 5000, importe02: 3000, ..., importe11: 200 }
 * ```
 */
export function calcularImportes(
  data: any,
  tipoCobranza: "actual" | "anterior",
  obtenerTotal: boolean = true
) {
  const index = tipoCobranza === "actual" ? 2 : 3;
  const key =
    tipoCobranza === "actual"
      ? "cobranzasAñoActual"
      : "cobranzasAñoAnterior";
  const cobranzas = data?.[index]?.[key] ?? [];


  if (obtenerTotal) {
    return cobranzas.reduce((total: number, caja: any) => {
      const sub = CLAVES_IMPORTES.reduce(
        (acc: number, k) =>
          acc + Math.floor(Number.parseFloat(caja?.[k]) || 0),
        0
      );
      return total + sub;
    }, 0);
  }

  return CLAVES_IMPORTES.reduce((acc: Record<string, number>, k) => {
    acc[k] = cobranzas.reduce(
      (s: number, caja: any) =>
        s + Math.floor(Number.parseFloat(caja?.[k]) || 0),
      0
    );
    return acc;
  }, {});
}
