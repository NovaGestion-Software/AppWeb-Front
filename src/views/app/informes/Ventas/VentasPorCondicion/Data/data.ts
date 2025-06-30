import { TableNode } from "@table-library/react-table-library/types/table";

export interface VentaPorCondicionItem extends TableNode {
  id: number;
  fecha: string;
  sucursal: string;
  codb: number;
  codbCant: number;
  taMuBilMer: number;
  taMuBilMerCant: number;
  taMuBilFin: number;
  taMuBilFinCant: number;
  credMer: number;
  credMerCant: number;
  credFin: number;
  credFinCant: number;
  chTrCC: number;
  chTrCCCant: number;
  total: number;
  operacion: string;
  valorPromedio: number;
}

export const ventasPorCondicionData: Array<VentaPorCondicionItem> = [
  {
    id: 1,
    fecha: "2025-06-20",
    sucursal: "Sucursal Centro",
    codb: 54000,
    codbCant: 12,
    taMuBilMer: 78000,
    taMuBilMerCant: 18,
    taMuBilFin: 45000,
    taMuBilFinCant: 9,
    credMer: 62000,
    credMerCant: 14,
    credFin: 39000,
    credFinCant: 8,
    chTrCC: 32000,
    chTrCCCant: 6,
    total: 310000,
    operacion: "Venta General",
    valorPromedio: 8378.38,
  },
  {
    id: 2,
    fecha: "2025-06-21",
    sucursal: "Sucursal Norte",
    codb: 42000,
    codbCant: 10,
    taMuBilMer: 67000,
    taMuBilMerCant: 15,
    taMuBilFin: 38000,
    taMuBilFinCant: 7,
    credMer: 55000,
    credMerCant: 11,
    credFin: 31000,
    credFinCant: 6,
    chTrCC: 29000,
    chTrCCCant: 5,
    total: 262000,
    operacion: "Operación Especial",
    valorPromedio: 8419.35,
  },
  {
    id: 3,
    fecha: "2025-06-22",
    sucursal: "Sucursal Oeste",
    codb: 46000,
    codbCant: 11,
    taMuBilMer: 70000,
    taMuBilMerCant: 16,
    taMuBilFin: 42000,
    taMuBilFinCant: 8,
    credMer: 58000,
    credMerCant: 12,
    credFin: 35000,
    credFinCant: 7,
    chTrCC: 31000,
    chTrCCCant: 6,
    total: 282000,
    operacion: "Liquidación",
    valorPromedio: 8275.00,
  },
  {
    id: 4,
    fecha: "2025-06-23",
    sucursal: "Sucursal Este",
    codb: 49000,
    codbCant: 13,
    taMuBilMer: 74000,
    taMuBilMerCant: 17,
    taMuBilFin: 40000,
    taMuBilFinCant: 9,
    credMer: 60000,
    credMerCant: 13,
    credFin: 37000,
    credFinCant: 8,
    chTrCC: 33000,
    chTrCCCant: 7,
    total: 293000,
    operacion: "Promoción",
    valorPromedio: 8371.43,
  },
  {
    id: 5,
    fecha: "2025-06-24",
    sucursal: "Sucursal Sur",
    codb: 51000,
    codbCant: 12,
    taMuBilMer: 76000,
    taMuBilMerCant: 18,
    taMuBilFin: 43000,
    taMuBilFinCant: 8,
    credMer: 61000,
    credMerCant: 13,
    credFin: 38000,
    credFinCant: 7,
    chTrCC: 34000,
    chTrCCCant: 6,
    total: 303000,
    operacion: "Venta Mayorista",
    valorPromedio: 8450.00,
  },
];

export const ventasPorCondicionFooter: Array<VentaPorCondicionItem> = [
  {
    id: 1,
    fecha: String(ventasPorCondicionData.length),
    sucursal: "",
    codb: 54000,
    codbCant: 12,
    taMuBilMer: 78000,
    taMuBilMerCant: 18,
    taMuBilFin: 45000,
    taMuBilFinCant: 9,
    credMer: 62000,
    credMerCant: 14,
    credFin: 39000,
    credFinCant: 8,
    chTrCC: 32000,
    chTrCCCant: 6,
    total: 310000,
    operacion: "45",
    valorPromedio: 8378.38,
  },
];
