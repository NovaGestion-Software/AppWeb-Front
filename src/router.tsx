import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Portal from './views/auth/Portal';
import HomeView from './views/home/HomeView';
import ProtectedRoute from './Components/features/ProtectedRoute';
import DashboardView from './views/home/dashboard/DashboardView';
import CajasView from './views/home/cajas/CajasView';
import CobranzaVencimView from './views/home/informes/cobranzaXVencim/CobranzaVencimView';
import VentasXVendedorView from './views/home/informes/ventasXVendedor/VentasXVendedorView';
import VentasHoraView from './views/home/informes/ventasXHora/VentasHoraView';
import ConfigView from './views/home/config/ConfigView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal />} index />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<HomeView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/informes">
              <Route path="cobranza-vencim" element={<CobranzaVencimView />} />
              <Route path="ventas-vend" element={<VentasXVendedorView />} />
              <Route path="ventas-hora" element={<VentasHoraView />} />
            </Route>
            <Route path="/cajas" element={<CajasView />} />
            <Route path="/configuracion" element={<ConfigView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
