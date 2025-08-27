import { DatCaja, Importes, SucursalCaja } from "@/types";
import { IMPORTE_KEYS, SPECIAL_IMPORTES, ImporteKey } from "./importeKeys";
import { MovimientoKey } from "../types/types";

/**
 * Convierte un valor a número de forma segura.
 * @param value - Valor a convertir (string o number).
 * @returns Número válido o 0 si no es convertible.
 */
const toNumber = (value: unknown): number => {
  const n = typeof value === "string" ? parseFloat(value) : (value as number);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Suma un conjunto de claves de importes dentro de un objeto `Importes`.
 * @param importes - Objeto con montos por clave (importe01, importe02, ...).
 * @param keys - Lista de claves a sumar.
 * @returns Suma numérica de las claves indicadas.
 */
const sumImportesKeys = (importes: Importes, keys: readonly string[]): number =>
  keys.reduce((acc, key) => acc + toNumber(importes[key as keyof Importes]), 0);

/**
 * Obtiene la cantidad total de sucursales.
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @returns Número de sucursales.
 */
export function totalSucursales(cajasPorSucursal: SucursalCaja[] = []): number {
  return cajasPorSucursal.length;
}

/**
 * Obtiene la cantidad total de cajas (sumadas en todas las sucursales).
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @returns Número total de cajas.
 */
export function totalCajas(cajasPorSucursal: SucursalCaja[] = []): number {
  return cajasPorSucursal.reduce(
    (acc, sucursal) => acc + (sucursal.datcaja?.length ?? 0),
    0
  );
}

/**
 * Calcula el total de ventas (suma de todos los importes de ventas).
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @returns Monto total de ventas.
 */
export function totalVentas(cajasPorSucursal: SucursalCaja[] = []): number {
  return cajasPorSucursal.reduce((accSucursal, sucursal) => {
    const totalEnSucursal = sucursal.datcaja.reduce((accCaja, caja) => {
      return accCaja + sumImportesKeys(caja.ventas, IMPORTE_KEYS);
    }, 0);
    return accSucursal + totalEnSucursal;
  }, 0);
}

/**
 * Calcula el total de cobranzas por crédito.
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @returns Monto total de cobranzas (crédito).
 */
export function totalCobranzasCredito(cajasPorSucursal: SucursalCaja[] = []): number {
  return cajasPorSucursal.reduce((accSucursal, sucursal) => {
    const totalEnSucursal = sucursal.datcaja.reduce((accCaja, caja) => {
      return accCaja + sumImportesKeys(caja.cobranza, IMPORTE_KEYS);
    }, 0);
    return accSucursal + totalEnSucursal;
  }, 0);
}

/**
 * Calcula el total de cobranzas por plan de pago.
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @returns Monto total de cobranzas (plan de pago).
 */
export function totalCobranzasPP(cajasPorSucursal: SucursalCaja[] = []): number {
  return cajasPorSucursal.reduce((accSucursal, sucursal) => {
    const totalEnSucursal = sucursal.datcaja.reduce((accCaja, caja) => {
      return accCaja + sumImportesKeys(caja.planpago, IMPORTE_KEYS);
    }, 0);
    return accSucursal + totalEnSucursal;
  }, 0);
}

/**
 * Calcula el total por clave de importe sumando ventas + cobranza + planpago.
 * Ejemplos de claves: efectivo (importe01), débito (importe08), billeteras (importe11), etc.
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @param key - Clave de importe a sumar.
 * @returns Suma total para la clave indicada.
 */
export function totalPorImporte(
  cajasPorSucursal: SucursalCaja[] = [],
  key: ImporteKey | string
): number {
  return cajasPorSucursal.reduce((accSucursal, sucursal) => {
    const totalEnSucursal = sucursal.datcaja.reduce((accCaja, caja) => {
      return (
        accCaja +
        toNumber(caja.ventas[key as keyof Importes]) +
        toNumber(caja.cobranza[key as keyof Importes]) +
        toNumber(caja.planpago[key as keyof Importes])
      );
    }, 0);
    return accSucursal + totalEnSucursal;
  }, 0);
}

/**
 * Calcula el total de un movimiento de caja (ingresos, gastos, retiros).
 * Soporta tanto `caja.movcaja?.[key]` como `caja[key]` por compatibilidad.
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @param key - Clave del movimiento (por ej., 'ingresos', 'gastos', 'retiros').
 * @returns Suma total del movimiento indicado.
 */
export function totalMovCaja(
  cajasPorSucursal: SucursalCaja[] = [],
  key: MovimientoKey
): number {
  return cajasPorSucursal.reduce((accSucursal, sucursal) => {
    const totalEnSucursal = sucursal.datcaja.reduce((accCaja, caja) => {
      // Compatibilidad: a veces viene como `retiro` (singular), a veces `retiros` (plural)
      const valueFromField =
        key === "retiros" && (caja as any).retiro != null
          ? (caja as any).retiro
          : (caja as any)[key];

      const valueFromNested = (caja as any).movcaja?.[key];
      return accCaja + toNumber(valueFromField ?? valueFromNested);
    }, 0);
    return accSucursal + totalEnSucursal;
  }, 0);
}

/**
 * Calcula el total de disponibilidades.
 * Fórmula por caja: efectivo (ventas+cobranza+planpago en importe01) + ingresos - gastos - retiros.
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @returns Suma total de disponibilidades.
 */
export function totalDisponibilidades(cajasPorSucursal: SucursalCaja[] = []): number {
  return cajasPorSucursal.reduce((accSucursal, sucursal) => {
    const totalEnSucursal = sucursal.datcaja.reduce((accCaja, caja) => {
      const efectivoVentas = toNumber(caja.ventas?.importe01);
      const efectivoCobranza = toNumber(caja.cobranza?.importe01);
      const efectivoPlanPago = toNumber(caja.planpago?.importe01);
      const efectivoTotal = efectivoVentas + efectivoCobranza + efectivoPlanPago;

      const ingresos = toNumber((caja as any).ingresos);
      const gastos = toNumber((caja as any).gastos);
      const retiro = toNumber((caja as any).retiro ?? (caja as any).retiros);

      return accCaja + (efectivoTotal + ingresos - gastos - retiro);
    }, 0);
    return accSucursal + totalEnSucursal;
  }, 0);
}

/**
 * Atajo para total “especial” de Gift Card (clave fuera de `IMPORTE_KEYS`).
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @returns Total de Gift Cards.
 */
export function totalGiftCard(cajasPorSucursal: SucursalCaja[] = []): number {
  return totalPorImporte(cajasPorSucursal, SPECIAL_IMPORTES.giftCard);
}

/**
 * Atajo para total “especial” de Orden de Compra (clave fuera de `IMPORTE_KEYS`).
 * @param cajasPorSucursal - Arreglo de sucursales con sus cajas.
 * @returns Total de Órdenes de Compra.
 */
export function totalOrdenCompra(cajasPorSucursal: SucursalCaja[] = []): number {
  return totalPorImporte(cajasPorSucursal, SPECIAL_IMPORTES.ordenCompra);
}

/* =========================
   Funciones usadas en "list"
   ========================= */

/**
 * Calcula el efectivo total de una caja (ventas + cobranza + planpago de `importe01`).
 * @param caja - Caja individual.
 * @returns Monto de efectivo total.
 */
function calcularEfectivoTotal(caja: DatCaja): number {
  const efectivoVentas = parseFloat(caja.ventas?.importe01 || "0");
  const efectivoCobranza = parseFloat(caja.cobranza?.importe01 || "0");
  const efectivoPlanPago = parseFloat(caja.planpago?.importe01 || "0");
  return efectivoCobranza + efectivoPlanPago + efectivoVentas;
}

/**
 * Calcula el total de los métodos de cobro para un tipo dado (ventas, cobranza o planpago).
 * @param caja - Caja individual.
 * @param tipo - Clave del tipo dentro de la caja (ventas | cobranza | planpago).
 * @returns Total formateado como string sin decimales.
 */
export function calcularTotal(caja: DatCaja, tipo: keyof DatCaja): string {
  const importes = IMPORTE_KEYS;
  const importesCaja = caja[tipo] as Importes;
  const total = importes.reduce(
    (sum, key) => sum + (parseFloat(importesCaja[key as keyof Importes]) || 0),
    0
  );

  return total.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

/**
 * Calcula la disponibilidad de una caja y la devuelve formateada.
 * Fórmula: efectivo + ingresos - gastos - retiros.
 * @param caja - Caja individual.
 * @returns Total formateado como string sin decimales.
 */
export function calcularDisponibilidad(caja: DatCaja): string {
  const efectivo = calcularEfectivoTotal(caja);
  const ingresos = parseFloat(caja.ingresos || "0");
  const gastos = parseFloat(caja.gastos || "0");
  const retiros = parseFloat(caja.retiro || "0");
  const totalCajaActual = efectivo + ingresos - gastos - retiros;

  return totalCajaActual.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

/**
 * Calcula la disponibilidad de una caja y la devuelve como número.
 * Fórmula: efectivo + ingresos - gastos - retiros.
 * @param caja - Caja individual.
 * @returns Total numérico.
 */
export function calcularDisponibilidadNumerica(caja: DatCaja): number {
  const efectivo = calcularEfectivoTotal(caja);
  const ingresos = parseFloat(caja.ingresos || "0");
  const gastos = parseFloat(caja.gastos || "0");
  const retiros = parseFloat(caja.retiro || "0");
  return efectivo + ingresos - gastos - retiros;
}

/**
 * Calcula el efectivo total de una caja y lo devuelve formateado.
 * @param caja - Caja individual.
 * @returns Efectivo total formateado como string sin decimales.
 */
export function calcularEfectivo(caja: DatCaja): string {
  const efectivo = calcularEfectivoTotal(caja);
  return efectivo.toLocaleString(undefined, { maximumFractionDigits: 0 });
}
