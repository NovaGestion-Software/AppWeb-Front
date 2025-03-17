import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaArrowCircleLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { TiHome } from "react-icons/ti";
import Cookies from "js-cookie";
import { GrDocumentTime } from "react-icons/gr";
import { BiBarChartSquare } from "react-icons/bi";
import { FaBoxesPacking } from "react-icons/fa6";
type SideBarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SideBar({ open, setOpen }: SideBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({}); // Estado para manejar los menús desplegables

  const storedUser = localStorage.getItem("_u");
  const user = storedUser ? JSON.parse(storedUser) : {};

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false); 
    }, 1000); 
    return () => clearTimeout(timer); 
  }, [location.pathname])


  useEffect(() => {
    if (!open) {
      setOpenMenus({}); // Cierra todos los submenús
    }
  }, [open])

  const Menus = [
    {
      title: "Inicio",
      href: "/home",
      icon: <TiHome />,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <RiDashboardFill />,
    },
    {
      title: "Mov. de Caja",
      href: "/cajas",
      icon: <MdOutlineAttachMoney />,
    },
    {
      title: "Stock Por Seccion",
      href: "/stock-seccion",
      icon: <FaBoxesPacking />,
    },
    {
      title: "Informes", // Menú desplegable principal
      icon: <BiBarChartSquare />,
      submenus: [
        {
          title: "Informes de Analisis", // Submenú desplegable
          submenus: [
            {
              title: "Ventas por Hora",
              href: "/informes/ventas-hora",
              icon: <GrDocumentTime />,
            },
           
          ],
        }, 
      ],
    },
  ];

  const handleLogout = () => {
    queryClient.clear();

    Cookies.remove("token_acceso", { path: "/" });
    Cookies.remove("token_refresh", { path: "/" });
    Cookies.remove("token_acceso_prod", { path: "/" });
    Cookies.remove("token_refresh_prod", { path: "/" });
    Cookies.remove("token_acceso_des", { path: "/" });
    Cookies.remove("token_refresh_des", { path: "/" });

    localStorage.removeItem("_u");
    localStorage.removeItem("_tu");
    localStorage.removeItem("_nu");
    localStorage.removeItem("_ce");
    localStorage.removeItem("_dbp");
    localStorage.removeItem("_dbd");

    navigate("/");
  };

  // Función para alternar el estado de un menú desplegable
  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title], // Alternar el estado del menú
    }));
  };

  const renderMenu = (menu: any) => {
    const isOpen = openMenus[menu.title]; // Verificar si el menú está abierto
  
    return (
      <li key={menu.title}>
        {menu.href ? ( 
          <Link
            to={menu.href}
            className={`text-white text-base flex items-center gap-x-2 cursor-pointer p-2 rounded-l-md rounded-r-none mt-2
            hover:bg-[#FFFFFF2B] hover:-translate-y-1 duration-300 overflow-hidden ${
              location.pathname === menu.href ? "bg-[#FFFFFF2B] -translate-y-1" : ""
            }`}
          >
            <span
              className={`duration-300 ${
                location.pathname === menu.href ? "scale-110" : ""
              }`}
            >
              {menu.icon}
            </span>
            <span
              className={`block transition-all duration-500 whitespace-nowrap overflow-hidden ${
                !open ? "max-w-0 opacity-0" : "max-w-full opacity-100"
              }`}
            >
              {menu.title}
            </span>
          </Link>
        ) : (
       
          <div
            className={`text-white text-base flex items-center gap-x-2 cursor-pointer p-2 rounded-l-md rounded-r-none mt-2
            hover:bg-[#FFFFFF2B] hover:-translate-y-1 duration-300 overflow-hidden ${
              menu.submenus?.some(
                (submenu: any) => submenu.href === location.pathname
              )
                ? "bg-[#FFFFFF2B] -translate-y-1"
                : ""
            }`}
            onClick={() => toggleMenu(menu.title)} 
          >
            <span
              className={`duration-300 ${
                menu.submenus?.some(
                  (submenu: any) => submenu.href === location.pathname
                )
                  ? "scale-110"
                  : ""
              }`}
            >
              {menu.icon}
            </span>
            <span
              className={`block transition-all duration-500 whitespace-nowrap overflow-hidden ${
                !open ? "max-w-0 opacity-0" : "max-w-full opacity-100"
              }`}
            >
              {menu.title}
            </span>
            {menu.submenus && open && ( // Mostrar flecha solo si el menú está abierto
              <span className="ml-auto">
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            )}
          </div>
        )}
  
        {/* Renderizar submenús si el menú está desplegado */}
        {menu.submenus && isOpen && open && ( // Solo renderizar submenús si el SideBar está abierto
          <ul className="pl-6">
            {menu.submenus.map((submenu: any) => (
              <li key={submenu.title}>
                {submenu.submenus ? (
                  renderMenu(submenu)
                ) : (
                  <Link
                    to={submenu.href}
                    className={`text-white text-sm flex items-center gap-x-2 cursor-pointer p-2 rounded-l-md rounded-r-none mt-2
                    hover:bg-[#FFFFFF2B] hover:-translate-y-1 duration-300 overflow-hidden ${
                      submenu.href === location.pathname
                        ? "bg-[#FFFFFF2B] -translate-y-1 "
                        : ""
                    }`}
                  >
                    <span
                      className={`duration-300 ${
                        submenu.href === location.pathname ? "scale-110" : ""
                      }`}
                    >
                      {submenu.icon}
                    </span>
                    <span
                      className={`block transition-all duration-500 whitespace-nowrap overflow-hidden ${
                        !open ? "max-w-0 opacity-0" : "max-w-full opacity-100"
                      }`}
                    >
                      {submenu.title}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-[#081A51] 
    duration-300 pl-3 z-50 overflow-hidden ${open ? "w-60" : "w-20"} `}
    >
      {/**arrow */}
      <div className="flex justify-end left-1 relative py-3 mb-5">
        <FaArrowCircleLeft
          className={`w-6 h-5 relative right-[2px] cursor-pointer text-white duration-300 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
      </div>

      {/**logo */}
      <div
        className={`${
          open ? "w-60" : "w-16 "
        } duration-300 m-auto absolute top-8`}
      >
        <div
          className={`duration-300 m-auto bg-white rounded-full ${
            open ? "w-20 p-2" : "w-14 p-1"
          }`}
        >
          <img
            width={200}
            height={200}
            src={`data:image/jpeg;base64,${user.logonova}`}
            alt="Nova Logo"
            className="rounded-full"
          />
        </div>
      </div>

      {/**usuario */}
      <div className="flex flex-col justify-around items-center gap-1 relative top-12">
        <span
          className={`text-white font-semibold text-sm h-6 origin-left transition-all duration-500 overflow-hidden ${
            open
              ? "opacity-100 scale-100 max-w-full"
              : "opacity-0 scale-75 max-w-0"
          }`}
        ></span>
        <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center p-2 ">
          <img
            width={200}
            height={200}
            alt="User Logo"
            src={`data:image/jpeg;base64,${user.logoemp}`}
          />
        </div>

        <span
          className={`text-white duration-100 transition font-semibold origin-left h-8 uppercase ${
            open ? "" : " opacity-0 scale-0 "
          }`}
        >
          {user.nfantasia}
        </span>
      </div>

      {/**menu */}
      <ul
        className={`pt-6 absolute top-52 transition-all   ${
          !open ? "duration-500 w-[4.2rem]" : "w-[14.2rem] duration-0"
        }`}
      >
        {Menus.map((menu) => renderMenu(menu))}
      </ul>

      {/** Configuración */}
      {localStorage.getItem("_tu") === "1" && (
        <Link
          to="/configuracion"
          className="flex justify-center items-center gap-1 fixed bottom-16 left-7 duration-100 hover:translate-x-1 transition-all hover:scale-105"
        >
          <div className="cursor-pointer w-8">
            <img
              src="/img/icons/settings.png"
              alt="Configuración"
              className="w-6 h-6"
            />
          </div>

          <span
            className={`transition-opacity duration-500 ${
              !open ? "opacity-0 invisible" : "opacity-100 visible text-white"
            }`}
          >
            Configuración
          </span>
        </Link>
      )}

      {/** Log out */}
      <Link
        to="/"
        className="flex items-center gap-3 fixed bottom-2 left-5 duration-100 hover:translate-x-1 transition-all hover:scale-105"
        onClick={handleLogout}
      >
        <div className="border bg-white rounded-full cursor-pointer w-8">
          <CiLogout className="w-6 h-8 font-extrabold" />
        </div>

        <span
          className={`transition-all duration-500 whitespace-nowrap overflow-hidden ${
            !open
              ? "max-w-0 opacity-0"
              : "max-w-full opacity-100 text-white text-lg"
          }`}
        >
          Salir
        </span>
      </Link>
    </div>
  );
}