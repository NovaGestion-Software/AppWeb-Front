import { TableNode } from "@table-library/react-table-library/types/table";

export interface RentabilidadMPItem extends TableNode {
  id: number;
  fondo: string;
  detalle: string;
  costo: number;
  venta: number;
  utilidad: number;
  porcentaje: number;
}

export const rentabilidadMPData: Array<RentabilidadMPItem> = [
  {
    id: 1,
    fondo: "8000",
    detalle: "Rollos 5m",
    costo: 15000,
    venta: 22000,
    utilidad: 7000,
    porcentaje: 46.67,
  },
  {
    id: 2,
    fondo: "12000",
    detalle: "Pack x10",
    costo: 3200,
    venta: 5000,
    utilidad: 1800,
    porcentaje: 56.25,
  },
  {
    id: 3,
    fondo: "53156",
    detalle: "Bolsa 100u",
    costo: 1800,
    venta: 3000,
    utilidad: 1200,
    porcentaje: 66.67,
  },
  {
    id: 4,
    fondo: "7751",
    detalle: "Rollos 7m",
    costo: 21000,
    venta: 33000,
    utilidad: 12000,
    porcentaje: 57.14,
  },
  {
    id: 5,
    fondo: "1213641",
    detalle: "Bobina",
    costo: 850,
    venta: 1500,
    utilidad: 650,
    porcentaje: 76.47,
  },
];
export const rentabilidadMPFooter: Array<RentabilidadMPItem> = [
  {
    id: 1,
    fondo: String(rentabilidadMPData.length),
    detalle: "",
    costo: 15000,
    venta: 22000,
    utilidad: 7000,
    porcentaje: 46.67,
  },

];
