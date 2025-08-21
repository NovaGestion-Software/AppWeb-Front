import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { LazyPage } from "./LazyPage";
import ProtectedRoute from "@/Components/Guards/ProtectedRoute";
import Layout from "@/Components/Layouts/Layout";

// Ventas
const VentasPorSeccionView = lazy(() => import("@/views/app/informes/Ventas/VentasPorSeccion/VentasPorSeccionView"));
const VentasPorCondicionView = lazy(() => import("@/views/app/informes/Ventas/VentasPorCondicion/VentasPorCondicionView"));
const VentasUnidadNegocioView = lazy(() => import("@/views/app/informes/VentasUnidadNegocio/VentasUnidadNegocioView"));
const ComparativoMensualView = lazy(() => import("@/views/app/informes/Ventas/ComparativoMensual/ComparativoMensualView"));
const IngresosView = lazy(() => import("@/views/app/informes/Ventas/Ingresos/IngresosView"));
const RankingClientesView = lazy(() => import("@/views/app/informes/Ventas/RankingClientes/RankingClientesView"));
const RentabilidadView = lazy(() => import("@/views/app/informes/Ventas/Rentabilidad/RentabilidadView"));
const RentabilidadMPagoView = lazy(() => import("@/views/app/informes/Ventas/RentabilidadMPago/RentabilidadMPagoView"));
const CompClientOtrasSucView = lazy(() => import("@/views/app/informes/Ventas/CompClientOtrasSuc/CompClientOtrasSucView"));

// Ventas de crédito
const VentasDeCreditoView = lazy(() => import("@/views/app/informes/VentasDeCredito/VentasCredito/VentasCreditoView"));
const VentasPorLocalidadView = lazy(() => import("@/views/app/informes/VentasDeCredito/VentasPorLocalidad/VentasPorLocalidadView"));
const VentasDeCreditoPorClienteView = lazy(() => import("@/views/app/informes/VentasDeCredito/VentasCreditosPorCliente/VentasCreditoPorClienteView"));
const RankingClientesCreditoView = lazy(() => import("@/views/app/informes/VentasDeCredito/RankingClientesCredito/RankingClientesCreditoView"));
const ClientesSinOperacionesView = lazy(() => import("@/views/app/informes/VentasDeCredito/ClientesSinOperaciones/ClientesSinOperacionesView"));
const DistribucionMensualClientesView = lazy(() => import("@/views/app/informes/VentasDeCredito/DistribucionMensualCreditos/DistribucionMensualCreditoView"));
const VentasClientesOtrosMediosView = lazy(() => import("@/views/app/informes/VentasDeCredito/VentasClientesConOtrosMedios/VentasClientesConOtrosMediosView"));

// Cobranzas
const CobranzaVencimView = lazy(() => import("@/views/app/informes/Cobranza/cobranzaXVencim/CobranzaVencimView"));
const CobranzasView = lazy(() => import("@/views/app/informes/Cobranza/cobranzas/cobranzasView"));
const MorosidadView = lazy(() => import("@/views/app/informes/Cobranza/morosidad/MorosidadView"));
const CobranzasPorCobradorView = lazy(() => import("@/views/app/informes/Cobranza/CobranzaPorCobrador/CobranzaPorCobradorView"));
const CobranzasPorFechaEmisionView = lazy(() => import("@/views/app/informes/Cobranza/CobranzaPorFechaEmision/CobranzaPorFechaEmisionView"));
const CobranzasPorFechaYVtoView = lazy(() => import("@/views/app/informes/Cobranza/CobranzaPorFecha&Vto/CobranzaYVtoView"));

// Por vendedor / otros
const DetallesVentasXVendedorView = lazy(() => import("@/views/app/informes/VentasPorVendedor/DetalleVentasPorVendedor/VentasXVendedorView"));
const VentasPorVendedorView = lazy(() => import("@/views/app/informes/VentasPorVendedor/VentasPorVendedor/VentasPorVendedorView"));
const ArticulosEnPromocionView = lazy(() => import("@/views/app/informes/VentasPorVendedor/ArticulosEnPromocion/ArticulosEnPromocionView"));
const VentasEnPromocionView = lazy(() => import("@/views/app/informes/VentasPorVendedor/VentasPromocion/VentasPromocionView"));
const GarantiasView = lazy(() => import("@/views/app/informes/Garantias/GarantiasView"));
const MovCajaView = lazy(() => import("@/views/app/informes/Caja/MovimientosCajas/MovimientosCajasView"));
const MovCajaTotalesView = lazy(() => import("@/views/app/informes/Caja/MovimientosCajaTotales/MovimientosCajasTotalesView"));

/**
 * ✅ SOLO DEV: rutas bajo /app/informes
 * (ventas-hora NO va acá; está en producción)
 */
export const informesDevRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "informes",
            children: [
              { path: "ventas-seccion", element: LazyPage(<VentasPorSeccionView />) },
              { path: "ventas-condicion", element: LazyPage(<VentasPorCondicionView />) },
              { path: "ventas-uni-nego", element: LazyPage(<VentasUnidadNegocioView />) },
              { path: "comparativo-mensual", element: LazyPage(<ComparativoMensualView />) },
              { path: "ingresos", element: LazyPage(<IngresosView />) },
              { path: "ranking", element: LazyPage(<RankingClientesView />) },
              { path: "rentabilidad", element: LazyPage(<RentabilidadView />) },
              { path: "rentabilidadmp", element: LazyPage(<RentabilidadMPagoView />) },
              { path: "clientes-otras-suc", element: LazyPage(<CompClientOtrasSucView />) },

              // Ventas de crédito
              { path: "ventas-creditos", element: LazyPage(<VentasDeCreditoView />) },
              { path: "ventas-localidad", element: LazyPage(<VentasPorLocalidadView />) },
              { path: "creditos-clientes", element: LazyPage(<VentasDeCreditoPorClienteView />) },
              { path: "ranking-creditos-clientes", element: LazyPage(<RankingClientesCreditoView />) },
              { path: "clientes-sin-operaciones", element: LazyPage(<ClientesSinOperacionesView />) },
              { path: "dist-men-clientes", element: LazyPage(<DistribucionMensualClientesView />) },
              { path: "vent-client-otros-medios", element: LazyPage(<VentasClientesOtrosMediosView />) },

              // Cobranzas
              { path: "cobranza-vencim", element: LazyPage(<CobranzaVencimView />) },
              { path: "cobranzas", element: LazyPage(<CobranzasView />) },
              { path: "morosidad", element: LazyPage(<MorosidadView />) },
              { path: "cobranzas-cobrador", element: LazyPage(<CobranzasPorCobradorView />) },
              { path: "cobranzas-fecha-emision", element: LazyPage(<CobranzasPorFechaEmisionView />) },
              { path: "cobranza-vto", element: LazyPage(<CobranzasPorFechaYVtoView />) },

              // Por vendedor / otros
              { path: "detalle-ventas-vend", element: LazyPage(<DetallesVentasXVendedorView />) },
              { path: "ventas-vend", element: LazyPage(<VentasPorVendedorView />) },
              { path: "art-prom", element: LazyPage(<ArticulosEnPromocionView />) },
              { path: "ventas-prom", element: LazyPage(<VentasEnPromocionView />) },
              { path: "garantias", element: LazyPage(<GarantiasView />) },
              { path: "mov-cajas", element: LazyPage(<MovCajaView />) },
              { path: "mov-cajas-totales", element: LazyPage(<MovCajaTotalesView />) },
            ],
          },
        ],
      },
    ],
  },
];