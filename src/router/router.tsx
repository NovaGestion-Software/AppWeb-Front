import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { coreRoutes } from "./core";
import { informesDevRoutes } from "./informes";
import { devExtraRoutes } from "./dev";
import { useEntornoStore } from "@/views/app/config/Store/useEntornoStore";

export default function AppRouter() {
  const projectType = useEntornoStore((s) => s.projectType);

  const routes = [
    ...coreRoutes,
    ...(projectType === "dev" ? informesDevRoutes : []),
    ...(projectType === "dev" ? devExtraRoutes : []),
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
