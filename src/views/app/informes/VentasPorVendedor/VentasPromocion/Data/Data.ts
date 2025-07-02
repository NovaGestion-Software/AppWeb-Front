import { TableNode } from "@/types";

export interface VentaPromoItem extends TableNode {
  id: number;
  vende: string;
  nombre: string;
  codigo: string;
  descripcion: string;
  marca: string;
  cantidad: number;
  importe: number;
}



export const ventasEnPromocionData: Array<VentaPromoItem> = [
  {
    id: 1,
    vende: "Pedro",
    nombre: "Pedro Hernandez",
    codigo: "P001",
    descripcion: "Camisa cuadros",
    marca: "UrbanStyle",
    cantidad: 3,
    importe: 21600,
  },
  {
    id: 2,
    vende: "Laura",
    nombre: "Laura Gómez",
    codigo: "P002",
    descripcion: "Zapatilla deportiva",
    marca: "RunnerX",
    cantidad: 2,
    importe: 29800,
  },
  {
    id: 3,
    vende: "Juan",
    nombre: "Juan Pérez",
    codigo: "P003",
    descripcion: "Remera estampada",
    marca: "UrbanStyle",
    cantidad: 5,
    importe: 15000,
  },
  {
    id: 4,
    vende: "Sofía",
    nombre: "Sofía Ramírez",
    codigo: "P004",
    descripcion: "Campera térmica",
    marca: "NorthPeak",
    cantidad: 1,
    importe: 18900,
  },
  {
    id: 5,
    vende: "Pedro",
    nombre: "Pedro Hernandez",
    codigo: "P005",
    descripcion: "Jean clásico",
    marca: "DenimPro",
    cantidad: 4,
    importe: 26400,
  },
];

export const ventasEnPromocionFooter: Array<VentaPromoItem> = [
  {
    id: 1,
    vende: "5",
    nombre: "",
    codigo: "",
    descripcion: "",
    marca: "",
    cantidad: 300.03,
    importe: 22211600,
  },
];
