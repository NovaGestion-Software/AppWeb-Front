import { TableNode } from "@/frontend-resourses/components/types";

export interface GarantiaItem extends TableNode {
  id: number;
  fecha: string;
  garantia: string;
  vende: string;
  cliente: string;
  nombre: string;
  suc: string;
  comprob: string;
  importe: number;
  mes: string;
}

export const garantiasData: Array<GarantiaItem> = [
  {
    id: 1,
    fecha: "2025-06-01",
    garantia: "3 meses",
    vende: "Lucas",
    cliente: "CL001",
    nombre: "Distribuidora Centro",
    suc: "001",
    comprob: "FC001-00012345",
    importe: 21500,
    mes: "Jun",
  },
  {
    id: 2,
    fecha: "2025-06-04",
    garantia: "6 meses",
    vende: "Sofía",
    cliente: "CL002",
    nombre: "Boutique Morena",
    suc: "002",
    comprob: "FC002-00012346",
    importe: 18700,
    mes: "Jun",
  },
  {
    id: 3,
    fecha: "2025-06-07",
    garantia: "1 año",
    vende: "Marcos",
    cliente: "CL003",
    nombre: "Mercería El Sol",
    suc: "003",
    comprob: "FC003-00012347",
    importe: 32450,
    mes: "Jun",
  },
  {
    id: 4,
    fecha: "2025-06-10",
    garantia: "3 meses",
    vende: "Laura",
    cliente: "CL004",
    nombre: "Textiles Norte",
    suc: "004",
    comprob: "FC004-00012348",
    importe: 15200,
    mes: "Jun",
  },
  {
    id: 5,
    fecha: "2025-06-12",
    garantia: "6 meses",
    vende: "Lucas",
    cliente: "CL005",
    nombre: "Comercio San Luis",
    suc: "005",
    comprob: "FC005-00012349",
    importe: 27900,
    mes: "Jun",
  },
];


export interface GarantiaFooter extends TableNode {
  id: string;
  fecha: string;
  garantia: string;
  vende: string;
  cliente: string;
  nombre: string;
  suc: string;
  comprob: string;
  importe: string;
  mes: string;
}

export const garantiasFooter: Array<GarantiaFooter> = [
  {
    id: "",
    fecha: String(garantiasData.length),
    garantia: "",
    vende: "",
    cliente: "",
    nombre: "",
    suc: "",
    comprob: "",
    importe: "1213554",
    mes: "",
  },
];