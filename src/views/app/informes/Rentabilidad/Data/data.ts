import { TableNode } from "@/frontend-resourses/components/Tables/types";

export interface RentabilidadItem extends TableNode {
  id: number;
  codigo: string;
  talle: string;
  descripcion: string;
  marca: string;
  cantidad: number;
  costo: number;
  venta: number;
  utilidad: number;
  porcentaje: number;
  costoNeto: string;
  fecha: string;
  fCosto: string;
}

export const rentabilidadData: Array<RentabilidadItem> = [
  {
    id: 1,
    codigo: "A1023",
    talle: "M",
    descripcion: "Remera Dry-Fit",
    marca: "Nike",
    cantidad: 10,
    costo: 3500,
    venta: 6000,
    utilidad: 2500,
    porcentaje: 71.43,
    costoNeto: "",
    fecha: "2025-06-15",
    fCosto: "2025-06-10",
  },
  {
    id: 2,
    codigo: "B2051",
    talle: "L",
    descripcion: "Campera Windbreaker",
    marca: "Adidas",
    cantidad: 4,
    costo: 12000,
    venta: 19000,
    utilidad: 7000,
    porcentaje: 58.33,
    costoNeto: "",
    fecha: "2025-06-16",
    fCosto: "2025-06-11",
  },
  {
    id: 3,
    codigo: "C3088",
    talle: "S",
    descripcion: "Pantalón Cargo",
    marca: "Levi's",
    cantidad: 7,
    costo: 7800,
    venta: 10500,
    utilidad: 2700,
    porcentaje: 34.62,
    costoNeto: "",
    fecha: "2025-06-17",
    fCosto: "2025-06-12",
  },
  {
    id: 4,
    codigo: "D4120",
    talle: "XL",
    descripcion: "Zapatillas Running",
    marca: "Puma",
    cantidad: 5,
    costo: 15000,
    venta: 22000,
    utilidad: 7000,
    porcentaje: 46.67,
    costoNeto: "",
    fecha: "2025-06-18",
    fCosto: "2025-06-13",
  },
  {
    id: 5,
    codigo: "E5015",
    talle: "M",
    descripcion: "Buzo con Capucha",
    marca: "Reebok",
    cantidad: 8,
    costo: 9500,
    venta: 14000,
    utilidad: 4500,
    porcentaje: 47.37,
    costoNeto: "",
    fecha: "2025-06-19",
    fCosto: "2025-06-14",
  },
];

export const rentabilidadFooter: Array<RentabilidadItem> = [
  {
    id: 1,
    codigo: String(rentabilidadData.length),
    talle: "",
    descripcion: "",
    marca: "",
    cantidad: 10,
    costo: 3500,
    venta: 6000,
    utilidad: 2500,
    porcentaje: 71.43,
    costoNeto: "",
    fecha: "",
    fCosto: "",
  },

];