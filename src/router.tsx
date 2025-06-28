import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Portal from './views/auth/Portal';
import ProtectedRoute from './Components/features/ProtectedRoute';
import HomeView from './views/app/home/HomeView';
import DashboardView from './views/app/dashboard/DashboardView';
import CajasView from './views/app/cajas/CajasView';
import CobranzaVencimView from './views/app/informes/cobranzaXVencim/CobranzaVencimView';
import VentasXVendedorView from './views/app/informes/ventasXVendedor/VentasXVendedorView';
import VentasHoraView from './views/app/informes/ventasXHora/VentasHoraView';
import ConfigView from './views/app/config/ConfigView';
import Layout from './Components/ui/layouts/Layout';
import StockPorSeccionView from './views/app/stockSeccion/StockPorSeccionView';
import VentasPorSeccionView from './views/app/informes/VentasPorSeccion/VentasPorSeccionView';
import CobranzasView from './views/app/informes/cobranzas/cobranzasView';
import MorosidadView from './views/app/informes/morosidad/MorosidadView';
import IngresosView from './views/app/informes/Ingresos/IngresosView';
import CompClientOtrasSucView from './views/app/informes/CompClientOtrasSuc/CompClientOtrasSucView';
import Ranking from './views/Ranking/Ranking';
import VentasUnidadNegocioView from './views/app/informes/VentasUnidadNegocio/VentasUnidadNegocioView';
import RentabilidadMPagoView from './views/app/informes/RentabilidadMPago/RentabilidadMPagoView';
import RankingClientesView from './views/app/informes/RankingClientes/RankingClientesView';
import RentabilidadView from './views/app/informes/Rentabilidad/RentabilidadView';
import VentasPorCondicionView from './views/app/informes/VentasPorCondicion/VentasPorCondicionView';
import MovCajaView from './views/app/informes/MovimientosCajas/MovimientosCajasView';
import MovCajaTotalesView from './views/app/informes/MovimientosCajaTotales/MovimientosCajasTotalesView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal />} index />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<HomeView />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/cajas" element={<CajasView />} />
            <Route path="/informes">
              <Route path="cobranza-vencim" element={<CobranzaVencimView />} />
              <Route path="cobranzas" element={<CobranzasView />} />
              <Route path="morosidad" element={<MorosidadView />} />
              <Route path="ventas-vend" element={<VentasXVendedorView />} />
              <Route path="ventas-seccion" element={<VentasPorSeccionView />} />
              <Route path="ventas-hora" element={<VentasHoraView />} />
              <Route path="ventas-uni-nego" element={<VentasUnidadNegocioView />} />
              <Route path="ventas-condicion" element={<VentasPorCondicionView />} />

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
