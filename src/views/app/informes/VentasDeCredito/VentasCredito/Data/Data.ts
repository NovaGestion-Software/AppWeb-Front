import { TableNode } from "@/types";

export interface VentaCreditoItem extends TableNode {
  id: number;
  fecha: string;
  nOpera: string;
  venta: number;
  gastos: number;
  financiacion: number;
  importe: number;
  importePromedio: number;
  ncProm: number;
  icPromedio: number;
  anticipo: number;
}


export const ventasCreditoData: Array<VentaCreditoItem> = [
  {
    id: 1,
    fecha: "2025-06-01",
    nOpera: "OP1001",
    venta: 25000,
    gastos: 1200,
    financiacion: 1800,
    importe: 28000,
    importePromedio: 14000,
    ncProm: 2,
    icPromedio: 7000,
    anticipo: 5000,
  },
  {
    id: 2,
    fecha: "2025-06-02",
    nOpera: "OP1002",
    venta: 32000,
    gastos: 1500,
    financiacion: 2100,
    importe: 35600,
    importePromedio: 11866.67,
    ncProm: 3,
    icPromedio: 7286.67,
    anticipo: 8000,
  },
  {
    id: 3,
    fecha: "2025-06-03",
    nOpera: "OP1003",
    venta: 18000,
    gastos: 950,
    financiacion: 1250,
    importe: 20100,
    importePromedio: 10050,
    ncProm: 2,
    icPromedio: 5025,
    anticipo: 3000,
  },
  {
    id: 4,
    fecha: "2025-06-04",
    nOpera: "OP1004",
    venta: 29000,
    gastos: 1300,
    financiacion: 1600,
    importe: 31900,
    importePromedio: 10633.33,
    ncProm: 3,
    icPromedio: 5316.67,
    anticipo: 6000,
  },
  {
    id: 5,
    fecha: "2025-06-05",
    nOpera: "OP1005",
    venta: 15000,
    gastos: 700,
    financiacion: 1000,
    importe: 16700,
    importePromedio: 8350,
    ncProm: 2,
    icPromedio: 4175,
    anticipo: 4000,
  },
  {
    id: 6,
    fecha: "2025-06-06",
    nOpera: "OP1006",
    venta: 36000,
    gastos: 1800,
    financiacion: 2200,
    importe: 40000,
    importePromedio: 13333.33,
    ncProm: 3,
    icPromedio: 6666.67,
    anticipo: 9000,
  },
  {
    id: 7,
    fecha: "2025-06-07",
    nOpera: "OP1007",
    venta: 27000,
    gastos: 1100,
    financiacion: 1700,
    importe: 29800,
    importePromedio: 14900,
    ncProm: 2,
    icPromedio: 7450,
    anticipo: 5500,
  },
  {
    id: 8,
    fecha: "2025-06-08",
    nOpera: "OP1008",
    venta: 19500,
    gastos: 800,
    financiacion: 900,
    importe: 21200,
    importePromedio: 10600,
    ncProm: 2,
    icPromedio: 5300,
    anticipo: 3500,
  },
  {
    id: 9,
    fecha: "2025-06-09",
    nOpera: "OP1009",
    venta: 31000,
    gastos: 1400,
    financiacion: 1900,
    importe: 34300,
    importePromedio: 11433.33,
    ncProm: 3,
    icPromedio: 5716.67,
    anticipo: 7000,
  },
  {
    id: 10,
    fecha: "2025-06-10",
    nOpera: "OP1010",
    venta: 22000,
    gastos: 900,
    financiacion: 1100,
    importe: 24000,
    importePromedio: 12000,
    ncProm: 2,
    icPromedio: 6000,
    anticipo: 4500,
  },
];

export const ventasCreditoFooter: Array<VentaCreditoItem> = [
  {
    id: 1,
    fecha: "0",
    nOpera: "0",
    venta: 240.00,
    gastos: 1224100,
    financiacion: 2311800,
    importe: 2228000,
    importePromedio: 1402200,
    ncProm: 12,
    icPromedio: 723000,
    anticipo: 5123000,
  },
];
