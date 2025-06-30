import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Portal from './views/auth/Portal';
import ProtectedRoute from './Components/features/ProtectedRoute';
import HomeView from './views/app/home/HomeView';
import DashboardView from './views/app/dashboard/DashboardView';
import CajasView from './views/app/cajas/CajasView';
import CobranzaVencimView from './views/app/informes/Cobranza/cobranzaXVencim/CobranzaVencimView';
import VentasXVendedorView from './views/app/informes/VentasPorVendedor/DetalleVentasPorVendedor/VentasXVendedorView';
import VentasHoraView from './views/app/informes/Ventas/ventasXHora/VentasHoraView';
import ConfigView from './views/app/config/ConfigView';
import Layout from './Components/ui/layouts/Layout';
import StockPorSeccionView from './views/app/stockSeccion/StockPorSeccionView';
import VentasPorSeccionView from './views/app/informes/Ventas/VentasPorSeccion/VentasPorSeccionView';
import CobranzasView from './views/app/informes/Cobranza/cobranzas/cobranzasView';
import MorosidadView from './views/app/informes/Cobranza/morosidad/MorosidadView';
import IngresosView from './views/app/informes/Ventas/Ingresos/IngresosView';
import CompClientOtrasSucView from './views/app/informes/Ventas/CompClientOtrasSuc/CompClientOtrasSucView';
import VentasUnidadNegocioView from './views/app/informes/VentasUnidadNegocio/VentasUnidadNegocioView';
import RentabilidadMPagoView from './views/app/informes/Ventas/RentabilidadMPago/RentabilidadMPagoView';
import RankingClientesView from './views/app/informes/Ventas/RankingClientes/RankingClientesView';
import RentabilidadView from './views/app/informes/Ventas/Rentabilidad/RentabilidadView';
import VentasPorCondicionView from './views/app/informes/Ventas/VentasPorCondicion/VentasPorCondicionView';
import MovCajaView from './views/app/informes/Caja/MovimientosCajas/MovimientosCajasView';
import MovCajaTotalesView from './views/app/informes/Caja/MovimientosCajaTotales/MovimientosCajasTotalesView';
import GarantiasView from './views/app/informes/Garantias/GarantiasView';
import ComparativoMensualView from './views/app/informes/Ventas/ComparativoMensual/ComparativoMensualView';

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
            <Route path="/informes">
              <Route path="cobranza-vencim" element={<CobranzaVencimView />} />
              <Route path="cobranzas" element={<CobranzasView />} />
              <Route path="morosidad" element={<MorosidadView />} />
              <Route path="detalle-ventas-vend" element={<VentasXVendedorView />} />
              <Route path="ventas-seccion" element={<VentasPorSeccionView />} />
              <Route path="ventas-hora" element={<VentasHoraView />} />
              <Route path="ventas-uni-nego" element={<VentasUnidadNegocioView />} />
              <Route path="ventas-condicion" element={<VentasPorCondicionView />} />
              <Route path="comparativo-mensual" element={<ComparativoMensualView />} />

              <Route path="garantias" element={<GarantiasView />} />

              <Route path="mov-cajas" element={<MovCajaView />} />
              <Route path="mov-cajas-totales" element={<MovCajaTotalesView />} />
              
              <Route path="ingresos" element={<IngresosView />} />
              <Route path="rentabilidad" element={<RentabilidadView />} />
              <Route path="rentabilidadmp" element={<RentabilidadMPagoView />} />
              <Route path="ranking" element={<RankingClientesView />} />
              <Route path="clientes-otras-suc" element={<CompClientOtrasSucView />} />

            </Route>
            <Route path="/stock-seccion" element={<StockPorSeccionView />} />
            <Route path="/configuracion" element={<ConfigView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
