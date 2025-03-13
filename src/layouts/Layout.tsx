import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../Components/ui/SideBar';
import Cookies from 'js-cookie';

export default function Layout() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const environment = import.meta.env.VITE_ENV;

  useEffect(() => {
    // const accessToken = Cookies.get('token_acceso');
    const refreshToken = Cookies.get('token_refresh');

    if (!refreshToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <SideBar open={open} setOpen={setOpen} />

      <div
        className={`flex flex-col w-full min-h-screen pl-16 transition-all duration-300 bg-layout `}
      >
        {environment === 'development' && (
          <div className="absolute top-0 left-1/2 z-50 p-1 2xl:p-2 text-white font-bold text-xl  bg-red-600 hover:bg-red-700 border-b-2 border-x-2 border-red-800 shadow-2xl rounded-b-md cursor-default -translate-x-1/2 transition">
            Desarrollo
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
}
