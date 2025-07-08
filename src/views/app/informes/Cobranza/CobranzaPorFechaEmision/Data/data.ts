import { TableNode } from "@/types";

export interface CobranzaFechaEmision extends TableNode {
  id: number;
  concepto: string;
  importe: number;
  pago: number;
  planPago: number;
  moraBruta: number;
  moraBrutaPorcentaje: number;
  nDebito: number;
  moraNeta: number;
  moraNetaPorcentaje: number;
}

export const cobranzasPorFechaEmisionData: Array<CobranzaFechaEmision> = [
  {
    id: 1,
    concepto: "Venta Mayo 2025",
    importe: 15000,
    pago: 12000,
    planPago: 2000,
    moraBruta: 1000,
    moraBrutaPorcentaje: 6.67,
    nDebito: 500,
    moraNeta: 500,
    moraNetaPorcentaje: 3.33,
  },
  {
    id: 2,
    concepto: "Venta Abril 2025",
    importe: 18000,
    pago: 16000,
    planPago: 1000,
    moraBruta: 1000,
    moraBrutaPorcentaje: 5.56,
    nDebito: 400,
    moraNeta: 600,
    moraNetaPorcentaje: 3.33,
  },
  {
    id: 3,
    concepto: "Cuotas Marzo 2025",
    importe: 22000,
    pago: 19000,
    planPago: 2000,
    moraBruta: 1000,
    moraBrutaPorcentaje: 4.55,
    nDebito: 300,
    moraNeta: 700,
    moraNetaPorcentaje: 3.18,
  },
  {
    id: 4,
    concepto: "Créditos Febrero",
    importe: 14000,
    pago: 11000,
    planPago: 2500,
    moraBruta: 500,
    moraBrutaPorcentaje: 3.57,
    nDebito: 200,
    moraNeta: 300,
    moraNetaPorcentaje: 2.14,
  },
  {
    id: 5,
    concepto: "Financiaciones Enero",
    importe: 16000,
    pago: 13000,
    planPago: 2000,
    moraBruta: 1000,
    moraBrutaPorcentaje: 6.25,
    nDebito: 600,
    moraNeta: 400,
    moraNetaPorcentaje: 2.5,
  },
  {
    id: 6,
    concepto: "Operaciones Especiales",
    importe: 10000,
    pago: 9000,
    planPago: 500,
    moraBruta: 500,
    moraBrutaPorcentaje: 5.0,
    nDebito: 200,
    moraNeta: 300,
    moraNetaPorcentaje: 3.0,
  },
  {
    id: 7,
    concepto: "Cobranza Express",
    importe: 12500,
    pago: 10000,
    planPago: 2000,
    moraBruta: 500,
    moraBrutaPorcentaje: 4.0,
    nDebito: 250,
    moraNeta: 250,
    moraNetaPorcentaje: 2.0,
  },
  {
    id: 8,
    concepto: "Venta ZN",
    importe: 17000,
    pago: 14500,
    planPago: 2000,
    moraBruta: 500,
    moraBrutaPorcentaje: 2.94,
    nDebito: 100,
    moraNeta: 400,
    moraNetaPorcentaje: 2.35,
  },
  {
    id: 9,
    concepto: "Plan Verano",
    importe: 15500,
    pago: 13000,
    planPago: 2000,
    moraBruta: 500,
    moraBrutaPorcentaje: 3.23,
    nDebito: 300,
    moraNeta: 200,
    moraNetaPorcentaje: 1.29,
  },
  {
    id: 10,
    concepto: "Operaciones ZS",
    importe: 13500,
    pago: 11000,
    planPago: 2000,
    moraBruta: 500,
    moraBrutaPorcentaje: 3.70,
    nDebito: 150,
    moraNeta: 350,
    moraNetaPorcentaje: 2.59,
  },
];
