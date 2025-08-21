import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "@/Components/Guards/ProtectedRoute";
import Layout from "@/Components/Layouts/Layout";
import { LazyPage } from "./LazyPage";

const StockPorSeccionView = lazy(() => import("@/views/app/stockSeccion/StockPorSeccionView"));
const FormMercadoPagoView = lazy(() => import("@/views/app/FormMercadoPago/FormMercadoPagoView"));

export const devExtraRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "stock-seccion", element: LazyPage(<StockPorSeccionView />) },
          { path: "form-mercado-pago", element: LazyPage(<FormMercadoPagoView />) },
        ],
      },
    ],
  },
];
