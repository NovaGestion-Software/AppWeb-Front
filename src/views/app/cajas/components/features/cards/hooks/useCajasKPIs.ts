import { useMemo } from "react";
import { SucursalCaja } from "@/types";
import {
  totalSucursales,
  totalCajas,
  totalVentas,
  totalCobranzasCredito,
  totalCobranzasPP,
  totalPorImporte,
  totalMovCaja,
  totalDisponibilidades,
  totalGiftCard,
  totalOrdenCompra,
} from "../../_shared/domain/totals"

/**
 * KPIs numéricos (PUROS). No devuelve strings ni moneda.
 */
export type CajasKPIs = Record<string, number>;

export function useCajasKPIs(cajas: SucursalCaja[] | undefined): CajasKPIs {
  return useMemo(() => {
    const source = cajas ?? [];

    const kpis: CajasKPIs = {
      // Generales
      totalSucursales: totalSucursales(source),
      totalCajas: totalCajas(source),
      totalVentas: totalVentas(source),
      totalCobranzasCredito: totalCobranzasCredito(source),
      totalCobranzasPP: totalCobranzasPP(source),

      // Medios de pago (por clave de importe: ventas+cobranza+planpago)
      efectivo: totalPorImporte(source, "importe01"),
      cheques: totalPorImporte(source, "importe02"),
      transferencia: totalPorImporte(source, "importe03"),
      creditosSF: totalPorImporte(source, "importe04"),
      financieras: totalPorImporte(source, "importe06"),
      tarjetaCredito: totalPorImporte(source, "importe07"),
      tarjetaDebito: totalPorImporte(source, "importe08"),
      mutuales: totalPorImporte(source, "importe09"),
      cuentaCorriente: totalPorImporte(source, "importe10"),
      billeteras: totalPorImporte(source, "importe11"),
      vales: totalPorImporte(source, "importeva"),
      giftCard: totalGiftCard(source),
      ordenCompra: totalOrdenCompra(source),

      // Movimientos y disponibilidades
      totalIngresos: totalMovCaja(source, "ingresos"),
      totalGastos: totalMovCaja(source, "gastos"),
      totalRetiros: totalMovCaja(source, "retiro"),
      disponibilidades: totalDisponibilidades(source),
    };

    return kpis;
  }, [cajas]);
}

// Alias opcional si te gusta el singular:
export const useCajasKPI = useCajasKPIs;
