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
              <Route path="ventas-vend" element={<VentasXVendedorView />} />
              <Route path="ventas-seccion" element={<VentasPorSeccionView />} />
              <Route path="ventas-hora" element={<VentasHoraView />} />
              
              <Route path="ingresos" element={<IngresosView />} />

            </Route>
            <Route path="/stock-seccion" element={<StockPorSeccionView />} />
            <Route path="/configuracion" element={<ConfigView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
