import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MdOutlineAttachMoney, MdOutlineCategory } from "react-icons/md";
import { FaChevronDown, FaChevronUp, FaThumbtack } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { CiCalendar, CiClock2, CiLogout } from "react-icons/ci";
import { SiAwsorganizations } from "react-icons/si";
import { TiHome } from "react-icons/ti";
import Cookies from "js-cookie";
import { GrDocumentTime } from "react-icons/gr";
import { BiBarChartSquare, BiTransferAlt } from "react-icons/bi";
import { FaBoxesPacking, FaRankingStar } from "react-icons/fa6";
import { useVentasHoraStore } from "@/views/app/informes/ventasXHora/store/useVentasHoraStore";
import { BsPerson, BsPersonBoundingBox } from "react-icons/bs";
import { TbCashRegister } from "react-icons/tb";
import { AnimatedOverflowText } from "./layouts/AnimatedOverflowText";
import { GiPayMoney, GiProfit } from "react-icons/gi";
interface SubMenuItem {
  title: string;
  icon?: JSX.Element;
  href?: string;
  submenus?: SubMenuItem[];
}

type MenuItem = SubMenuItem;

type SideBarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SideBar({ open, setOpen }: SideBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [isPinned, setIsPinned] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  // const [hovering, setHovering] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(open ? 224 : 240); // ancho en px
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const [hoveringArrow, setHoveringArrow] = useState(false);

  const { clearVentasPorHora } = useVentasHoraStore();

  const storedUser = localStorage.getItem("_u");
  const user = storedUser ? JSON.parse(storedUser) : {};

  const Menus: MenuItem[] = [
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
      title: "Movimientos de Caja",
      href: "/cajas",
      icon: <MdOutlineAttachMoney />,
    },
    {
      title: "Stock por Sección",
      href: "/stock-seccion",
      icon: <FaBoxesPacking />,
    },
    {
      title: "Informes", // Menú desplegable principal
      icon: <BiBarChartSquare />,
      submenus: [
        {
          title: "Ventas por Hora",
          href: "/informes/ventas-hora",
          icon: <GrDocumentTime />,
        },
        {
          title: "Ventas por Sección",
          href: "/informes/ventas-seccion",
          icon: <MdOutlineCategory />,
        },
        {
          title: "Ventas por Vendedor",
          href: "/informes/ventas-vend",
          icon: <BsPerson />,
        },
        {
          title: "Ventas por Unidad de Negocio",
          href: "/informes/ventas-uni-nego",
          icon: <SiAwsorganizations />,
        },
        {
          title: "Ventas por Condicion",
          href: "/informes/ventas-condicion",
          icon: <GiPayMoney />,
        },
        {
          title: "Comp. Clientes otras Sucursales",
          href: "/informes/clientes-otras-suc",
          icon: <BsPersonBoundingBox />,
        },
        {
          title: "Cobranzas",
          href: "/informes/cobranzas",
          icon: <CiClock2 />,
        },
        {
          title: "Cobranzas por Vencimiento",
          href: "/informes/cobranza-vencim",
          icon: <CiClock2 />,
        },
        {
          title: "Ingresos",
          href: "/informes/ingresos",
          icon: <TbCashRegister />,
        },
        {
          title: "Morosidad",
          href: "/informes/morosidad",
          icon: <CiCalendar />,
        },
        {
          title: "Mov. de Cajas",
          href: "/informes/mov-cajas",
          icon: <BiTransferAlt />,
        },
        {
          title: "Rentabilidad",
          href: "/informes/rentabilidad",
          icon: <GiProfit />,
        },
        {
          title: "Rentabilidad - Medio de Pago",
          href: "/informes/rentabilidadmp",
          icon: <GiProfit />,
        },
        {
          title: "Ranking de Clientes",
          href: "/informes/ranking",
          icon: <FaRankingStar />,
        },
      ],
    },
  ];
  /**
   * 
   *  {
      title: "Informes", // Menú desplegable principal
      icon: <BiBarChartSquare />,
      submenus: [
        {
          title: "Informes de Análisis", // Submenú desplegable
          submenus: [
            {
              title: "Ventas por Hora",
              href: "/informes/ventas-hora",
              icon: <GrDocumentTime />,
            },
            {
              title: "Ventas por Sección",
              href: "/informes/ventas-seccion",
              icon: <MdOutlineCategory />,
            },
            {
              title: "Ventas por Vendedor",
              href: "/informes/ventas-vend",
              icon: <BsPerson />,
            },
            {
              title: "Cobranzas por Vencimiento",
              href: "/informes/cobranza-vencim",
              icon: <CiClock2 />,
            },
          ],
        },
      ],
    },
   */
  // Función para alternar el estado de un menú desplegable
  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title], // Alternar el estado del menú
    }));
  };

  const isMenuActive = (menu: MenuItem) => {
    if (menu.href === location.pathname) return true;
    if (!menu.submenus) return false;

    return menu.submenus.some((submenu) => submenu.href === location.pathname || (submenu.submenus && submenu.submenus.some((subsub) => subsub.href === location.pathname)));
  };

  const renderMenu = (menu: MenuItem) => {
    const isOpen = openMenus[menu.title];

    return (
      <li key={menu.title}>
        {menu.href ? (
          <Link
            to={menu.href}
            className={`flex items-center text-white text-sm gap-x-2 cursor-pointer p-2 rounded-l-md rounded-r-none mt-0.5 hover:bg-[#FFFFFF2B] hover:-translate-y-0.5 duration-300 overflow-hidden 2xl:text-base ${
              location.pathname === menu.href ? "bg-[#FFFFFF2B] -translate-y-0.5" : ""
            }`}
          >
            <span className={`duration-300 ${location.pathname === menu.href ? "scale-110" : ""}`}>{menu.icon}</span>
            <span className={`block transition-all duration-500 whitespace-nowrap overflow-hidden ${!open ? "max-w-0 opacity-0" : "max-w-full opacity-100"}`}>{menu.title}</span>
          </Link>
        ) : (
          <div
            className={`flex items-center text-white text-sm gap-x-2 p-2 rounded-l-md rounded-r-none mt-0.5 hover:bg-[#FFFFFF2B] hover:-translate-y-0.5 duration-300 overflow-hidden cursor-pointer 2xl:text-base  ${
              isMenuActive(menu) ? "bg-[#FFFFFF2B] -translate-y-0.5" : ""
            }`}
            onClick={() => toggleMenu(menu.title)}
          >
            <span className={`duration-300 ${menu.submenus?.some((submenu) => submenu.href === location.pathname) ? "scale-110" : ""}`}>{menu.icon}</span>
            <span className={`block transition-all duration-500 whitespace-nowrap overflow-hidden ${!open ? "max-w-0 opacity-0" : "max-w-full opacity-100"}`}>{menu.title}</span>
            {menu.submenus &&
              open && ( // Mostrar flecha solo si el menú está abierto
                <span className="ml-auto text-xs 2xl:text-base">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
              )}
          </div>
        )}

        {/* Renderizar submenús si el menú está desplegado */}
        {menu.submenus &&
          isOpen &&
          open && ( // Solo renderizar submenús si el SideBar está abierto
            <ul className="pl-4 ">
              {menu.submenus.map((submenu) => (
                <p key={submenu.title} style={{ fontSize: "10px" }}>
                  {submenu.submenus ? (
                    renderMenu(submenu)
                  ) : (
                    <Link
                      to={submenu.href ?? "#"}
                      className={`text-white text-sm flex items-center gap-x-2 cursor-pointer p-2 pl-4 rounded-l-md rounded-r-none mt-0.5 hover:bg-[#FFFFFF2B] hover:-translate-y-0.5 duration-300 overflow-hidden ${
                        submenu.href === location.pathname ? "bg-[#FFFFFF2B] -translate-y-0.5" : ""
                      }`}
                    >
                      <span className={`duration-300 ${submenu.href === location.pathname ? "scale-110" : ""}`}>{submenu.icon}</span>

                      <AnimatedOverflowText text={submenu.title} />
                    </Link>
                  )}
                </p>
              ))}
            </ul>
          )}
      </li>
    );
  };

  const isSidebarOpen = open || isPinned;

  const handleMouseEnter = () => {
    if (!isPinned) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) setOpen(false);
  };
  const handleThumbtack = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    //  setOpen(newPinnedState); // Si se fija abierto, también se abre
  };

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
    localStorage.removeItem("homologacion");
    localStorage.removeItem("user");

    clearVentasPorHora();

    navigate("/");
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !isPinned) return;
      e.preventDefault();
      const newWidth = e.clientX;
      if (newWidth > 120 && newWidth < 400) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto"; // habilitar selección otra vez
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPinned]);

  return (
    <div
      ref={sidebarRef}
      style={{ width: `${isSidebarOpen ? sidebarWidth : 80}px` }}
      className="fixed top-0 left-0 z-50 h-full border-r 
      border-r-slate-400 bg-gradient-to-b from-slate-900 
      to-[#081A51] transition-all duration-300 ease-out overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* thumbtrack */}
      <div className="flex justify-end left-1 h-5">
        <div
          onMouseEnter={() => setHoveringArrow(true)}
          onMouseLeave={() => setHoveringArrow(false)}
          onClick={handleThumbtack}
          className={`
      cursor-pointer
      transition-all duration-300 ease-in-out
      ${isSidebarOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
      ${hoveringArrow || isPinned ? "text-yellow-400" : "text-white"}
    `}
          style={{ transformOrigin: "center center" }}
        >
          <FaThumbtack
            className={`
        w-6 h-5 pt-1 mt-0.5
        transition-all duration-300 ease-in-out
        ${isPinned ? "scale-90 text-yellow-400" : ""}
        ${hoveringArrow && !isPinned ? "scale-105 text-yellow-400" : ""}
      `}
          />
        </div>
      </div>

      {/* Logo Nova */}
      <div className="flex items-center justify-start w-full mt-2 ml-1 gap-1">
        <div className="flex justify-center items-center w-16 h-16 p-2 bg-white rounded-full shadow-md border border-gray-300 flex-shrink-0">
          <img width={200} height={200} src={`data:image/jpeg;base64,${user.logonova}`} alt="Nova Logo" className="rounded-full w-full h-full object-contain" />
        </div>
        <div className={`overflow-hidden transition-all duration-500 min-w-0 ${open ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0"}`}>
          <span className="text-slate-400 font-bold text-2xl whitespace-nowrap">NovaGestión</span>
        </div>
      </div>

      <hr className="w-full border-t border-gray-700 mt-4 " />

      {/* Empresa */}
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="relative flex flex-col justify-center items-center gap-1 w-16 h-28">
          <div className={`flex justify-center items-center p-2 w-14 h-14 rounded-full bg-white transition-all duration-500 ${open ? "translate-y-1" : "translate-y-5"}`}>
            <img width={200} height={200} alt="logoempresa" src={`data:image/jpeg;base64,${user.logoemp}`} className="transition-all duration-500" />
          </div>
          <span className={`h-8 text-sm text-white font-semibold origin-left transition-all translate-y-2 2xl:text-xl ${open ? "opacity-100 duration-500" : "opacity-0 duration-100"} overflow-hidden whitespace-nowrap`}>
            {user.nfantasia}
          </span>
        </div>
      </div>

      <hr className="w-full border-t border-gray-700" />

      {/* Menú */}
      <ul className={`absolute top-52 mt-3 ml-1 w-full transition-all`}>
        <div className="min-h-[20rem] 2xl:min-h-[38rem] max-h-[10rem] 
        overflow-y-auto scrollbar-custom">{Menus.map((menu) => renderMenu(menu))}</div>
        <hr className="w-full pt-12 border-t border-gray-700" />
      </ul>

      {/* Configuración */}
      {localStorage.getItem("_tu") === "1" && (
        <Link to="/configuracion" className="flex justify-center
         items-center gap-1 fixed bottom-16 left-7 duration-100 hover:translate-x-1 transition-all hover:scale-105">
          <div className="cursor-pointer w-8">
            <img src="/img/icons/settings.png" alt="Configuración" className="w-6 h-6" />
          </div>
          <span className={`transition-opacity duration-500 ${!open ? "opacity-0 invisible" : "opacity-100 visible text-white"}`}>Configuración</span>
        </Link>
      )}

      {isPinned && (
        <div
          className="absolute top-0 right-0 h-full w-2 cursor-col-resize z-50"
          onMouseDown={(_e) => {
            isResizing.current = true;
            document.body.style.userSelect = "none"; // bloquear selección
            document.body.style.cursor = "ew-resize"; // cursor resize horizontal
          }}
        ></div>
      )}

      {/* Log out */}
      <Link to="/" className="flex items-center gap-3 fixed bottom-2 left-5 duration-100 hover:translate-x-1 transition-all hover:scale-105" onClick={handleLogout}>
        <div className="border bg-white rounded-full cursor-pointer w-8">
          <CiLogout className="w-6 h-8 font-extrabold" />
        </div>
        <span className={`transition-all duration-500 whitespace-nowrap overflow-hidden ${!open ? "max-w-0 opacity-0" : "max-w-full opacity-100 text-white text-lg"}`}>Salir</span>
      </Link>
    </div>
  );
}
