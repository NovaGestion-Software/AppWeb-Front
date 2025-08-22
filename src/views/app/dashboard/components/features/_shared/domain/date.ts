/**
 * Genera un conjunto de años relativos al actual.
 *
 * Permite obtener:
 * - El año actual.
 * - Años anteriores (hacia atrás).
 * - Años posteriores (hacia adelante).
 *
 * Se puede elegir si los valores devueltos son `number` o `string`.
 *
 * @param params Opciones de generación.
 * @param params.anteriores - Cantidad de años hacia atrás (ej. `2` → `[2023, 2022]`).
 * @param params.posteriores - Cantidad de años hacia adelante (ej. `2` → `[2026, 2027]`).
 * @param params.type - Tipo de retorno: `"number"` (por defecto) o `"string"`.
 *
 * @returns Objeto con:
 * - `actual`: Año actual (según `type`).
 * - `anteriores`: Año o arreglo de años anteriores (opcional).
 * - `posteriores`: Año o arreglo de años posteriores (opcional).
 *
 * @example
 * ```ts
 * // Año actual como número
 * getYears(); 
 * // → { actual: 2025 }
 *
 * // 2 años hacia atrás y 1 hacia adelante
 * getYears({ anteriores: 2, posteriores: 1 });
 * // → { actual: 2025, anteriores: [2024, 2023], posteriores: 2026 }
 *
 * // Resultado en strings
 * getYears({ anteriores: 1, type: "string" });
 * // → { actual: "2025", anteriores: "2024" }
 * ```
 */
export function getYears(params?: {
  anteriores?: number;
  posteriores?: number;
  type?: "string" | "number";
}) {
  const actual = new Date().getFullYear();
  const { anteriores, posteriores, type = "number" } = params ?? {};

  const gen = (n: number, dir: "prev" | "next") =>
    Array.from({ length: n }, (_, i) =>
      dir === "prev" ? actual - (i + 1) : actual + (i + 1)
    );

  const antRaw = anteriores ? gen(anteriores, "prev") : undefined;
  const posRaw = posteriores ? gen(posteriores, "next") : undefined;

  const antFinal = antRaw ? (anteriores === 1 ? antRaw[0] : antRaw) : undefined;
  const posFinal = posRaw ? (posteriores === 1 ? posRaw[0] : posRaw) : undefined;

  const toType = (x: number | number[] | undefined) =>
    x === undefined ? undefined : Array.isArray(x) ? x.map(String) : String(x);

  if (type === "string") {
    return {
      actual: String(actual),
      ...(antFinal !== undefined && { anteriores: toType(antFinal) }),
      ...(posFinal !== undefined && { posteriores: toType(posFinal) }),
    };
  }

  return {
    actual,
    ...(antFinal !== undefined && { anteriores: antFinal }),
    ...(posFinal !== undefined && { posteriores: posFinal }),
  };
}
