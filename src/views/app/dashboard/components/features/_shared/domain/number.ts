/**
 * Formatea un número entero al estilo **compacto en español (Argentina)**.
 *
 * - Para valores menores a 1 millón: aplica separador de miles con `.`  
 *   Ejemplo: `12_345` → `"12.345"`.
 * - Para valores de 1 millón o más: devuelve el valor en millones, sin decimales,
 *   seguido de `"M"`.  
 *   Ejemplo: `1_234_567` → `"1M"`.
 *
 * @param n - Número entero a formatear.
 * @returns Representación compacta como string.
 *
 * @example
 * ```ts
 * formatCompactIntegerEsAR(999_999);   // "999.999"
 * formatCompactIntegerEsAR(1_234_567); // "1M"
 * formatCompactIntegerEsAR(42);        // "42"
 * ```
 */
export function formatCompactIntegerEsAR(n: number): string {
  if (!Number.isFinite(n)) return "0";

  if (Math.abs(n) < 1_000_000) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const millones = Math.trunc(n / 1_000_000);
  return `${millones}M`;
}
