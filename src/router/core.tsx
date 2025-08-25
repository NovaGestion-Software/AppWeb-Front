import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "@/Components/Guards/ProtectedRoute";
import Layout from "@/Components/Layouts/Layout";
import Portal from "@/views/auth/Portal";
import { LazyPage, lazyNamed } from "./LazyPage";

// Core pages (lazy)
const HomeView = lazy(() => import("@/views/app/home/HomeView"));
const DashboardView = lazy(() => import("@/views/app/dashboard/DashboardView"));
const CajasView = lazy(() => import("@/views/app/cajas/CajasView"));
const IntegracionesView = lazy(() => import("@/views/app/Integraciones/IntegracionesView"));
const Redirect = lazy(lazyNamed(() => import("@/views/app/Integraciones/Components/Redirect"), "Redirect"));
const ConfigView = lazy(() => import("@/views/app/config/ConfigView"));

// Informes visibles en producción
const VentasHoraView = lazy(() => import("@/views/app/informes/Ventas/ventasXHora/VentasHoraView"));

export const coreRoutes: RouteObject[] = [
  { path: "/", element: <Portal /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "home", element: LazyPage(<HomeView />) },
          { path: "dashboard", element: LazyPage(<DashboardView />) },
          { path: "cajas", element: LazyPage(<CajasView />) },
          { path: "integraciones", element: LazyPage(<IntegracionesView />) },
          { path: "integracion", element: LazyPage(<Redirect />) },

          {
            path: "informes",
            children: [
              { path: "ventas-hora", element: LazyPage(<VentasHoraView />) },
            ],
          },

          { path: "configuracion", element: LazyPage(<ConfigView />) },
        ],
      },
    ],
  },
  // 404 básica opcional (ajustá a tu componente de Error)
  { path: "*", element: <div style={{ padding: 24 }}>404</div> },
];
