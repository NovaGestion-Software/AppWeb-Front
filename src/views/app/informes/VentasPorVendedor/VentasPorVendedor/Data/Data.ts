import { TableNode } from "@/types";

export interface VentaVendedorItem extends TableNode {
  id: number;
  vende: string;
  nombre: string;
  codigo: string;
  descripcion: string;
  marca: string;
  cantidad: number;
  importe: number;
}


export const ventasPorVendedorData: Array<VentaVendedorItem> = [
  {
    id: 1,
    vende: "Lucas",
    nombre: "Lucas Fernández",
    codigo: "P001",
    descripcion: "Camisa manga larga",
    marca: "UrbanStyle",
    cantidad: 5,
    importe: 25000,
  },
  {
    id: 2,
    vende: "Laura",
    nombre: "Laura Gómez",
    codigo: "P002",
    descripcion: "Jean skinny azul",
    marca: "DenimPro",
    cantidad: 3,
    importe: 19800,
  },
  {
    id: 3,
    vende: "Juan",
    nombre: "Juan Pérez",
    codigo: "P003",
    descripcion: "Zapatilla deportiva",
    marca: "RunnerX",
    cantidad: 2,
    importe: 32000,
  },
  {
    id: 4,
    vende: "Sofía",
    nombre: "Sofía Ramírez",
    codigo: "P004",
    descripcion: "Campera impermeable",
    marca: "NorthPeak",
    cantidad: 1,
    importe: 18500,
  },
  {
    id: 5,
    vende: "Pedro",
    nombre: "Pedro Almodovar ",
    codigo: "P005",
    descripcion: "Remera básica algodón",
    marca: "UrbanStyle",
    cantidad: 10,
    importe: 18000,
  },
];



export const ventasPorVendedorFooter: Array<VentaVendedorItem> = [
  {
    id: 1,
    vende: "5",
    nombre: "",
    codigo: "",
    descripcion: "",
    marca: "",
    cantidad: 235,
    importe: 1225000,
  },

];
