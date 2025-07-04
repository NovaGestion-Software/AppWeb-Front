import { TableNode } from "@/types";
export interface VentaClienteItem extends TableNode {
  id: number;
  cliente: string;
  nombre: string;
  nOpera: number;
  importe: number;
  impProm: number;
  ultiMov: string;
}

export const ventasPorClienteData: Array<VentaClienteItem> = [
  {
    id: 1,
    cliente: "CL001",
    nombre: "Ferretería El Tornillo",
    nOpera: 8,
    importe: 48200,
    impProm: 6025,
    ultiMov: "2025-06-09",
  },
  {
    id: 2,
    cliente: "CL002",
    nombre: "Distribuidora Norte",
    nOpera: 12,
    importe: 72900,
    impProm: 6075,
    ultiMov: "2025-06-10",
  },
  {
    id: 3,
    cliente: "CL003",
    nombre: "ConstruMarket SRL",
    nOpera: 5,
    importe: 31000,
    impProm: 6200,
    ultiMov: "2025-06-07",
  },
  {
    id: 4,
    cliente: "CL004",
    nombre: "Corralón Centro",
    nOpera: 9,
    importe: 45000,
    impProm: 5000,
    ultiMov: "2025-06-08",
  },
  {
    id: 5,
    cliente: "CL005",
    nombre: "Servicios Integrales",
    nOpera: 4,
    importe: 21200,
    impProm: 5300,
    ultiMov: "2025-06-06",
  },
  {
    id: 6,
    cliente: "CL006",
    nombre: "Comercial Avellaneda",
    nOpera: 11,
    importe: 68000,
    impProm: 6182,
    ultiMov: "2025-06-09",
  },
  {
    id: 7,
    cliente: "CL007",
    nombre: "Aberturas Delta",
    nOpera: 3,
    importe: 14400,
    impProm: 4800,
    ultiMov: "2025-06-05",
  },
  {
    id: 8,
    cliente: "CL008",
    nombre: "Electro Hogar",
    nOpera: 6,
    importe: 31500,
    impProm: 5250,
    ultiMov: "2025-06-10",
  },
];


export const footerVentasPorCliente: Array<Record<string, string>> = [
  {
    cliente: String(ventasPorClienteData.length),
    nombre: "",
    nOpera: "",
    importe: "",
    impProm: "",
    ultiMov: "",
  },
];
