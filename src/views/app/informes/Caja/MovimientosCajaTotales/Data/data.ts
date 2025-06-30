import { TableNode } from "@/frontend-resourses/components/Tables/types";

export interface MovCajaTypes extends TableNode {
  id: number;
  autor: string;
  un: number;
  caja: number;
  fecha: string;
  hora: string;
  comprobante: string;
  vende: string;
  cliente: string;
  nombre: string;
  ingresos: number;
  egresos: number;
  otrosIngresos: number;
}
export interface MovCajaTypesFooter extends TableNode {
  id: string;
  autor: string;
  un: string;
  caja: string;
  fecha: string;
  hora: string;
  comprobante: string;
  vende: string;
  cliente: string;
  nombre: string;
  ingresos: string;
  egresos: string;
  otrosIngresos: string;
}


export const movCajaData: Array<MovCajaTypes> = [
  {
    id: 1,
    autor: "Lucas",
    un: 1,
    caja: 1,
    fecha: "2025-06-20",
    hora: "09:15",
    comprobante: "FC001-00012345",
    vende: "Juan Pérez",
    cliente: "CL001",
    nombre: "Distribuidora Centro",
    ingresos: 85000,
    egresos: 12000,
    otrosIngresos: 1500,
  },
  {
    id: 2,
    autor: "María",
    un: 2,
    caja: 1,
    fecha: "2025-06-20",
    hora: "10:45",
    comprobante: "FC001-00012346",
    vende: "Laura Gómez",
    cliente: "CL002",
    nombre: "Mercería El Sol",
    ingresos: 67000,
    egresos: 9500,
    otrosIngresos: 2000,
  },
  {
    id: 3,
    autor: "Lucas",
    un: 1,
    caja: 2,
    fecha: "2025-06-20",
    hora: "12:10",
    comprobante: "FC001-00012347",
    vende: "Carlos Díaz",
    cliente: "CL003",
    nombre: "Boutique Morena",
    ingresos: 72000,
    egresos: 8000,
    otrosIngresos: 1800,
  },
  {
    id: 4,
    autor: "Sofía",
    un: 3,
    caja: 1,
    fecha: "2025-06-20",
    hora: "14:25",
    comprobante: "FC001-00012348",
    vende: "Ana Torres",
    cliente: "CL004",
    nombre: "Textiles Norte",
    ingresos: 79000,
    egresos: 11000,
    otrosIngresos: 1300,
  },
  {
    id: 5,
    autor: "Lucas",
    un: 1,
    caja: 3,
    fecha: "2025-06-20",
    hora: "16:50",
    comprobante: "FC001-00012349",
    vende: "Juan Pérez",
    cliente: "CL005",
    nombre: "Comercio San Luis",
    ingresos: 91000,
    egresos: 15000,
    otrosIngresos: 2500,
  },
];

export const movCajaFooter: Array<MovCajaTypesFooter> = [
  {
    id: "",
    autor: "",
    un: "",
    caja: "",
    fecha: "",
    hora: "",
    comprobante: "",
    vende: "",
    cliente: "",
    nombre: "",
    ingresos: "",
    egresos: "",
    otrosIngresos: "",
  },]