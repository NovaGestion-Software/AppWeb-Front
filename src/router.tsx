import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portal from "./views/auth/Portal";
import ProtectedRoute from "./Components/features/ProtectedRoute";
import HomeView from "./views/app/home/HomeView";
import DashboardView from "./views/app/dashboard/DashboardView";
import CajasView from "./views/app/cajas/CajasView";
import CobranzaVencimView from "./views/app/informes/Cobranza/cobranzaXVencim/CobranzaVencimView";
import VentasHoraView from "./views/app/informes/Ventas/ventasXHora/VentasHoraView";
import ConfigView from "./views/app/config/ConfigView";
import Layout from "./Components/ui/layouts/Layout";
import StockPorSeccionView from "./views/app/stockSeccion/StockPorSeccionView";
import VentasPorSeccionView from "./views/app/informes/Ventas/VentasPorSeccion/VentasPorSeccionView";
import CobranzasView from "./views/app/informes/Cobranza/cobranzas/cobranzasView";
import MorosidadView from "./views/app/informes/Cobranza/morosidad/MorosidadView";
import IngresosView from "./views/app/informes/Ventas/Ingresos/IngresosView";
import CompClientOtrasSucView from "./views/app/informes/Ventas/CompClientOtrasSuc/CompClientOtrasSucView";
import VentasUnidadNegocioView from "./views/app/informes/VentasUnidadNegocio/VentasUnidadNegocioView";
import RentabilidadMPagoView from "./views/app/informes/Ventas/RentabilidadMPago/RentabilidadMPagoView";
import RankingClientesView from "./views/app/informes/Ventas/RankingClientes/RankingClientesView";
import RentabilidadView from "./views/app/informes/Ventas/Rentabilidad/RentabilidadView";
import VentasPorCondicionView from "./views/app/informes/Ventas/VentasPorCondicion/VentasPorCondicionView";
import MovCajaView from "./views/app/informes/Caja/MovimientosCajas/MovimientosCajasView";
import MovCajaTotalesView from "./views/app/informes/Caja/MovimientosCajaTotales/MovimientosCajasTotalesView";
import GarantiasView from "./views/app/informes/Garantias/GarantiasView";
import ComparativoMensualView from "./views/app/informes/Ventas/ComparativoMensual/ComparativoMensualView";
import DetallesVentasXVendedorView from "./views/app/informes/VentasPorVendedor/DetalleVentasPorVendedor/VentasXVendedorView";
import VentasPorVendedorView from "./views/app/informes/VentasPorVendedor/VentasPorVendedor/VentasPorVendedorView";
import ArticulosEnPromocionView from "./views/app/informes/VentasPorVendedor/ArticulosEnPromocion/ArticulosEnPromocionView";
import VentasEnPromocionView from "./views/app/informes/VentasPorVendedor/VentasPromocion/VentasPromocionView";
import VentasDeCreditoView from "./views/app/informes/VentasDeCredito/VentasCredito/VentasCreditoView";
import VentasPorLocalidadView from "./views/app/informes/VentasDeCredito/VentasPorLocalidad/VentasPorLocalidadView";
import VentasDeCreditoPorClienteView from "./views/app/informes/VentasDeCredito/VentasCreditosPorCliente/VentasCreditoPorClienteView";
import RankingClientesCreditoView from "./views/app/informes/VentasDeCredito/RankingClientesCredito/RankingClientesCreditoView";
import ClientesSinOperacionesView from "./views/app/informes/VentasDeCredito/ClientesSinOperaciones/ClientesSinOperacionesView";
import DistribucionMensualClientesView from "./views/app/informes/VentasDeCredito/DistribucionMensualCreditos/DistribucionMensualCreditoView";
import VentasClientesOtrosMediosView from "./views/app/informes/VentasDeCredito/VentasClientesConOtrosMedios/VentasClientesConOtrosMediosView";
import ConexionServidor from "./views/app/test/ConexionServidor";
import CobranzasPorCobradorView from "./views/app/informes/Cobranza/CobranzaPorCobrador/CobranzaPorCobradorView";
import CobranzasPorFechaEmisionView from "./views/app/informes/Cobranza/CobranzaPorFechaEmision/CobranzaPorFechaEmisionView";
import CobranzasPorFechaYVtoView from "./views/app/informes/Cobranza/CobranzaPorFecha&Vto/CobranzaYVtoView";
import IntegracionesView from "./views/app/Integraciones/IntegracionesView";
import { Redirect } from "./views/app/Integraciones/Components/Redirect";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal />} index />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<HomeView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/cajas" element={<CajasView />} />
            <Route path="/conexion" element={<ConexionServidor />} />
            <Route path="/integraciones" element={<IntegracionesView />} />
            <Route path="/integracion" element={<Redirect />} />
            <Route path="/informes">
              <Route path="ventas-hora" element={<VentasHoraView />} />
              <Route path="ventas-seccion" element={<VentasPorSeccionView />} />
              <Route path="ventas-condicion" element={<VentasPorCondicionView />} />
              <Route path="ventas-uni-nego" element={<VentasUnidadNegocioView />} />
              <Route path="comparativo-mensual" element={<ComparativoMensualView />} />
              <Route path="ingresos" element={<IngresosView />} />
              <Route path="ranking" element={<RankingClientesView />} />
              <Route path="rentabilidad" element={<RentabilidadView />} />
              <Route path="rentabilidadmp" element={<RentabilidadMPagoView />} />
              <Route path="clientes-otras-suc" element={<CompClientOtrasSucView />} />

              {/** Ventas de credito */}
              <Route path="ventas-creditos" element={<VentasDeCreditoView />} />
              <Route path="ventas-localidad" element={<VentasPorLocalidadView />} />
              <Route path="creditos-clientes" element={<VentasDeCreditoPorClienteView />} />
              <Route path="ranking-creditos-clientes" element={<RankingClientesCreditoView />} />
              <Route path="clientes-sin-operaciones" element={<ClientesSinOperacionesView />} />
              <Route path="dist-men-clientes" element={<DistribucionMensualClientesView />} />
              <Route path="vent-client-otros-medios" element={<VentasClientesOtrosMediosView />} />

              {/** Cobranzas */}
              <Route path="cobranza-vencim" element={<CobranzaVencimView />} />
              <Route path="cobranzas" element={<CobranzasView />} />
              <Route path="morosidad" element={<MorosidadView />} />
              <Route path="cobranzas-cobrador" element={<CobranzasPorCobradorView />} />
              <Route path="cobranzas-fecha-emision" element={<CobranzasPorFechaEmisionView />} />
                <Route path="cobranza-vto" element={<CobranzasPorFechaYVtoView />} />

              {/** ventas por vendedor */}
              <Route path="detalle-ventas-vend" element={<DetallesVentasXVendedorView />} />
              <Route path="ventas-vend" element={<VentasPorVendedorView />} />
              <Route path="art-prom" element={<ArticulosEnPromocionView />} />
              <Route path="ventas-prom" element={<VentasEnPromocionView />} />

              {/**Otros */}
              <Route path="garantias" element={<GarantiasView />} />

              <Route path="mov-cajas" element={<MovCajaView />} />
              <Route path="mov-cajas-totales" element={<MovCajaTotalesView />} />
            </Route>
            <Route path="/stock-seccion" element={<StockPorSeccionView />} />
            <Route path="/configuracion" element={<ConfigView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
