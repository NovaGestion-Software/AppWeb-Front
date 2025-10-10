import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
  const location = useLocation();

  const tokenAcceso = Cookies.get("token_acceso");
  const tokenRefresh = Cookies.get("token_refresh");
  const isAuthenticated = Boolean(tokenAcceso || tokenRefresh);

  if (!isAuthenticated) {
    console.log("Redirigiendo a / porque no hay token_acceso ni token_refresh");
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
