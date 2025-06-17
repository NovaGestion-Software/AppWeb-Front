import { TableNode } from "@table-library/react-table-library/types/table";

interface UnidadNegocio extends TableNode {
  codigo: string;
  nombre: string;
  marca: string;
  unidad: string;
  cantidad: number;
  importe: number;
}


interface ImporteUnidadNegocio extends TableNode {
  fecha: string;
  comprob: string;
  vende: string;
  cuenta: string;
  nombre: string;
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

export const importesUnidadNegocioData: Array<ImporteUnidadNegocio> = [
  {
    id: 1,
    fecha: "2025-06-10",
    comprob: "FC001-00012345",
    vende: "Juan Pérez",
    cuenta: "Caja Principal",
    nombre: "Venta mostrador",
    importe: 7500.0,
  },
  {
    id: 2,
    fecha: "2025-06-10",
    comprob: "FC001-00012346",
    vende: "Laura Gómez",
    cuenta: "Transferencia Bancaria",
    nombre: "Pago online",
    importe: 4300.5,
  },
  {
    id: 3,
    fecha: "2025-06-11",
    comprob: "FC001-00012347",
    vende: "Carlos Ruiz",
    cuenta: "Tarjeta Crédito",
    nombre: "Venta web",
    importe: 12400.75,
  },
  {
    id: 4,
    fecha: "2025-06-11",
    comprob: "FC001-00012348",
    vende: "María López",
    cuenta: "Efectivo",
    nombre: "Compra en local",
    importe: 6200.0,
  },
  {
    id: 5,
    fecha: "2025-06-12",
    comprob: "NC001-00005432",
    vende: "Juan Pérez",
    cuenta: "Caja Secundaria",
    nombre: "Nota de crédito",
    importe: -990.25,
  },
];
export const importesUnidadNegocioDataDiario: Array<ImporteUnidadNegocio> = [
  {
    id: 1,
    fecha: "2025-06-10",
    comprob: "",
    vende: "",
    cuenta: "",
    nombre: "",
    importe: 12500.0,
  },
  {
    id: 2,
    fecha: "2025-06-11",
    comprob: "",
    vende: "",
    cuenta: "",
    nombre: "",
    importe: 22400.75,
  },
  {
    id: 3,
    fecha: "2025-06-12",
    comprob: "",
    vende: "",
    cuenta: "",
    nombre: "",
    importe: 1990.25,
  },
];

export const importesUnidadNegocioFooterData: Array<ImporteUnidadNegocio> = [
  {
    id: 999,
    fecha: String(importesUnidadNegocioData.length),
    comprob: "",
    vende: "",
    cuenta: "",
    nombre: "",
    importe: 30310.0,
  },
];
