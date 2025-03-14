import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ProtectedRoute() {
  const token_acceso = Cookies.get('token_acceso');

  if (!token_acceso) {
    console.log('Redirigiendo a / porque no hay token');

    return <Navigate to="/" />;
  }

  return <Outlet />;
}
