import { MdOutlineAttachMoney } from "react-icons/md";
import { IoWalletSharp } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { GrDocumentTime } from "react-icons/gr";
import { TbPlugConnected } from "react-icons/tb";
import { FaChartArea, FaCreditCard, FaFileInvoiceDollar, FaMapMarkerAlt, FaMoneyCheckAlt, FaRegCreditCard, FaUserSlash } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { HiCreditCard } from "react-icons/hi";
import { TbCashRegister } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { FaBalanceScale, FaFileContract, FaGift, FaMoneyBillWave, FaTags, FaUserTie } from "react-icons/fa";
import { SiAwsorganizations } from "react-icons/si";
import { CiCalendar, CiCalendarDate, CiClock2, CiUser } from "react-icons/ci";
import { BiBarChartSquare, BiTransferAlt } from "react-icons/bi";
import { FaBoxesPacking, FaMoneyBillTransfer } from "react-icons/fa6";
import { BsPerson, BsPersonBoundingBox } from "react-icons/bs";
import { GiPayMoney, GiProfit } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";
interface SubMenuItem {
  title: string;
  icon?: JSX.Element;
  href?: string;
  submenus?: SubMenuItem[];
  orden?: number;
}

export type MenuItem = SubMenuItem;

export const MenuBase: MenuItem[] = [
  {
    title: "Inicio",
    href: "/home",
    icon: <TiHome />,
    orden: 1,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <RiDashboardFill />,
    orden: 2,
  },
  {
    title: "Movimientos de Caja",
    href: "/cajas",
    icon: <MdOutlineAttachMoney />,
    orden: 3,
  },
  {
    title: "Informes Ventas",
    icon: <FaChartLine />,
    orden: 5,
    submenus: [
      {
        title: "Importes", // Menú desplegable principal
        icon: <IoWalletSharp />,
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

export const MenuDev: MenuItem[] = [
  {
    title: "Stock por Sección",
    href: "/stock-seccion",
    icon: <FaBoxesPacking />,
    orden: 4,
  },
  {
    title: "Informes Ventas",
    icon: <FaChartLine />,
    orden: 5,
    submenus: [
      {
        title: "Importes", // Menú desplegable principal
        icon: <IoWalletSharp />,
        submenus: [
          {
            title: "Ventas por Condicion",
            href: "/informes/ventas-condicion",
            icon: <GiPayMoney />,
          },
          {
            title: "Ventas por Sección",
            href: "/informes/ventas-seccion",
            icon: <MdOutlineCategory />,
          },
          {
            title: "Ingresos",
            href: "/informes/ingresos",
            icon: <TbCashRegister />,
          },
          {
            title: "Ranking de Clientes",
            href: "/informes/ranking",
            icon: <FaRankingStar />,
          },
          {
            title: "Rentabilidad ( Artículo )",
            href: "/informes/rentabilidad",
            icon: <GiProfit />,
          },
          {
            title: "Rentabilidad - Medio de Pago",
            href: "/informes/rentabilidadmp",
            icon: <GiProfit />,
          },
          {
            title: "Comparativo Mensual de Ventas",
            href: "/informes/comparativo-mensual",
            icon: <FaBalanceScale />,
          },

          {
            title: "Comp. Clientes otras Sucursales",
            href: "/informes/clientes-otras-suc",
            icon: <BsPersonBoundingBox />,
          },
        ],
      },
      {
        title: "Creditos",
        icon: <HiCreditCard />,
        submenus: [
          {
            title: "Ventas de Créditos",
            href: "/informes/ventas-creditos",
            icon: <FaRegCreditCard />,
          },
          {
            title: "Ventas por Localidad",
            href: "/informes/ventas-localidad",
            icon: <FaMapMarkerAlt />,
          },
          {
            title: "Ventas de Créditos por Cliente",
            href: "/informes/creditos-clientes",
            icon: <FaCreditCard />,
          },
          {
            title: "Ranking Clientes Créditos",
            href: "/informes/ranking-creditos-clientes",
            icon: <FaRankingStar />,
          },
          {
            title: "Clientes sin Operaciones",
            href: "/informes/clientes-sin-operaciones",
            icon: <FaUserSlash />,
          },
          {
            title: "Distribucion Mensual de Créditos",
            href: "/informes/dist-men-clientes",
            icon: <FaChartArea />,
          },

          {
            title: "Ventas Clientes con Otros Medios",
            href: "/informes/vent-client-otros-medios",
            icon: <FaMoneyCheckAlt />,
          },
        ],
      },
    ],
  },
  {
    title: "Informes Cobranzas",
    icon: <FaMoneyBillWave />,
    orden: 6,
    submenus: [
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
        title: "Morosidad",
        href: "/informes/morosidad",
        icon: <CiCalendar />,
      },
      {
        title: "Cobranza por Cobrador",
        href: "/informes/cobranzas-cobrador",
        icon: <CiUser />,
      },
      {
        title: "Cobranza por Fecha de Emisíon",
        href: "/informes/cobranzas-fecha-emision",
        icon: <CiCalendarDate />,
      },
      {
        title: "Cobranza y Vto.",
        href: "/informes/cobranza-vto",
        icon: <CiClock2 />,
      },
    ],
  },

  {
    title: "Ventas por Vendedor", // Menú desplegable principal
    icon: <FaUserTie />,
    orden: 7,
    submenus: [
      {
        title: "Ventas por Vendedor",
        href: "/informes/ventas-vend",
        icon: <BsPerson />,
      },
      {
        title: "Detalle Ventas por Vendedor",
        href: "/informes/detalle-ventas-vend",
        icon: <BsPerson />,
      },

      {
        title: "Articulos en Promoción",
        href: "/informes/art-prom",
        icon: <FaTags />,
      },
      {
        title: "Ventas en Promoción",
        href: "/informes/ventas-prom",
        icon: <FaGift />,
      },
    ],
  },

  {
    title: "Otros Informes", // Menú desplegable principal
    icon: <BiBarChartSquare />,
    orden: 8,
    submenus: [
      {
        title: "Ventas por Unidad de Negocio",
        href: "/informes/ventas-uni-nego",
        icon: <SiAwsorganizations />,
      },
      {
        title: "Garantias",
        href: "/informes/garantias",
        icon: <FaFileContract />,
      },
      {
        title: "Mov. de Cajas",
        href: "/informes/mov-cajas",
        icon: <BiTransferAlt />,
      },
      {
        title: "Mov. de Cajas Totales",
        href: "/informes/mov-cajas-totales",
        icon: <FaMoneyBillTransfer />,
      },
    ],
  },
  {
    title: "Integraciones",
    href: "/integraciones",
    icon: <TbPlugConnected />,
    orden: 9,
  },
    {
    title: "Ordenes de Pago",
    href: "/form-mercado-pago",
    icon: <FaFileInvoiceDollar />,
    orden: 10,
  },
];
