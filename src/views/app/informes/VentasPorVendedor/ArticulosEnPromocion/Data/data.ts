import { TableNode } from "@/types";
export interface ArticuloPromocionItem extends TableNode {
  id: number;
  codigo: string;
  descripcion: string;
  marca: string;
  precio: number;
  stock: number;
  dateInit: string;
  dateFin: string;
  suc: string;
  sel: string;
}
export interface ArticuloPromocionFooter extends TableNode {
  id: number;
  codigo: string;
  descripcion: string;
  marca: string;
  precio: string;
  stock: string;
  dateInit: string;
  dateFin: string;
  suc: string;
  sel: string;
}

export const articulosPromocionData: Array<ArticuloPromocionItem> = [
  {
    id: 1,
    codigo: "P001",
    descripcion: "Camisa estampada slim fit",
    marca: "UrbanStyle",
    precio: 7200,
    stock: 25,
    dateInit: "2025-06-15",
    dateFin: "2025-06-30",
    suc: "Centro",
    sel: "12",
  },
  {
    id: 2,
    codigo: "P002",
    descripcion: "Jean clásico azul oscuro",
    marca: "DenimPro",
    precio: 9800,
    stock: 15,
    dateInit: "2025-06-10",
    dateFin: "2025-06-25",
    suc: "Norte",
    sel: "7",
  },
  {
    id: 3,
    codigo: "P003",
    descripcion: "Zapatillas deportivas running",
    marca: "RunnerX",
    precio: 14500,
    stock: 8,
    dateInit: "2025-06-20",
    dateFin: "2025-07-05",
    suc: "Oeste",
    sel: "5",
  },
  {
    id: 4,
    codigo: "P004",
    descripcion: "Remera lisa de algodón",
    marca: "UrbanStyle",
    precio: 4600,
    stock: 40,
    dateInit: "2025-06-05",
    dateFin: "2025-06-30",
    suc: "Sur",
    sel: "18",
  },
  {
    id: 5,
    codigo: "P005",
    descripcion: "Campera inflable liviana",
    marca: "NorthPeak",
    precio: 18900,
    stock: 12,
    dateInit: "2025-06-12",
    dateFin: "2025-06-28",
    suc: "Este",
    sel: "9",
  },
];
export const articulosPromocionFooter: Array<ArticuloPromocionFooter> = [
  {
    id: 1,
    codigo: "5",
    descripcion: "",
    marca: "",
    precio: "",
    stock: "",
    dateInit: "",
    dateFin: "",
    suc: "",
    sel: "",
  },
];