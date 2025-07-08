import { TableNode } from "@/types";

export interface CobranzaPorFechaYVto extends TableNode {
  id: number;
  fecha: string;
  cantidad: number;
  importe: number;
  interes: number;
  financiacion: number;
  importeTotal: number;
  importePorcentaje: number;
}


export const cobranzaPorFechaYVtoData: Array<CobranzaPorFechaYVto> = [
  {
    id: 1,
    fecha: "2025-06-01",
    cantidad: 8,
    importe: 32000,
    interes: 1200,
    financiacion: 800,
    importeTotal: 34000,
    importePorcentaje: 12.5,
  },
  {
    id: 2,
    fecha: "2025-06-02",
    cantidad: 5,
    importe: 20000,
    interes: 1000,
    financiacion: 500,
    importeTotal: 21500,
    importePorcentaje: 10.0,
  },
  {
    id: 3,
    fecha: "2025-06-03",
    cantidad: 10,
    importe: 45000,
    interes: 1800,
    financiacion: 1200,
    importeTotal: 48000,
    importePorcentaje: 15.3,
  },
  {
    id: 4,
    fecha: "2025-06-04",
    cantidad: 3,
    importe: 12000,
    interes: 400,
    financiacion: 300,
    importeTotal: 12700,
    importePorcentaje: 5.7,
  },
  {
    id: 5,
    fecha: "2025-06-05",
    cantidad: 6,
    importe: 28000,
    interes: 950,
    financiacion: 600,
    importeTotal: 29550,
    importePorcentaje: 9.8,
  },
  {
    id: 6,
    fecha: "2025-06-06",
    cantidad: 7,
    importe: 31000,
    interes: 1100,
    financiacion: 750,
    importeTotal: 32850,
    importePorcentaje: 10.9,
  },
  {
    id: 7,
    fecha: "2025-06-07",
    cantidad: 4,
    importe: 16000,
    interes: 600,
    financiacion: 400,
    importeTotal: 17000,
    importePorcentaje: 6.2,
  },
  {
    id: 8,
    fecha: "2025-06-08",
    cantidad: 9,
    importe: 39000,
    interes: 1400,
    financiacion: 1000,
    importeTotal: 41400,
    importePorcentaje: 13.7,
  },
  {
    id: 9,
    fecha: "2025-06-09",
    cantidad: 5,
    importe: 20000,
    interes: 700,
    financiacion: 500,
    importeTotal: 21200,
    importePorcentaje: 7.9,
  },
  {
    id: 10,
    fecha: "2025-06-10",
    cantidad: 6,
    importe: 25000,
    interes: 900,
    financiacion: 650,
    importeTotal: 26550,
    importePorcentaje: 8.5,
  },
];




export const footer: Array<Record<string, string>> = [
  {  fecha: "",
  cantidad: "63",
  importe: "269000",
  interes: "10050",
  financiacion: "6700",
  importeTotal: "285750",
  importePorcentaje: "100",
  },
];
