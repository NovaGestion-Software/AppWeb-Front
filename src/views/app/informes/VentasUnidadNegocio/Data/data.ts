import { TableNode } from "@table-library/react-table-library/types/table";

interface UnidadNegocio extends TableNode {
  codigo: string;
  nombre: string;
  marca: string;
  unidad: string;
  cantidad: number;
  importe: number;
}


export const ventasUnidadNegocioData: Array<UnidadNegocio> = [
  {
    id: 1,
    codigo: "P001-456",
    nombre: "Producto A",
    marca: "MarcaUno",
    unidad: "unidad",
    cantidad: 25,
    importe: 7500.0,
  },
  {
    id: 2,
    codigo: "P002-123",
    nombre: "Producto B",
    marca: "MarcaDos",
    unidad: "par",
    cantidad: 10,
    importe: 4300.5,
  },
  {
    id: 3,
    codigo: "P003-789",
    nombre: "Producto C",
    marca: "MarcaTres",
    unidad: "unidad",
    cantidad: 40,
    importe: 12400.75,
  },
  {
    id: 4,
    codigo: "P004-321",
    nombre: "Producto D",
    marca: "MarcaUno",
    unidad: "par",
    cantidad: 18,
    importe: 6200.0,
  },
  {
    id: 5,
    codigo: "P005-654",
    nombre: "Producto E",
    marca: "MarcaCuatro",
    unidad: "unidad",
    cantidad: 33,
    importe: 9900.25,
  },
];


export const ventasUnidadNegocioFooterData: Array<UnidadNegocio> = [
  {
    id: 1,
    codigo: String(ventasUnidadNegocioData.length),
    nombre:  "",
    marca: "",
    unidad: "",
    cantidad: 4,
    importe: 120000.0,
  },

];