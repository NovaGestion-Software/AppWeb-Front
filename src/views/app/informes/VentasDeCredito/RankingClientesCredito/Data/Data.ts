import { TableNode } from "@/types";

export interface RankingClientesCreditosItem extends TableNode {
  id: number;
  cuenta: string;
  nombre: string;
  cancelados: number;
  noVencidos: number;
  morosos: number;
  total: number;
  promedio: number;
}

export const rankingClientesCreditosData: Array<RankingClientesCreditosItem> = [
  {
    id: 1,
    cuenta: "CU001",
    nombre: "Cuenta Central",
    cancelados: 153000,
    noVencidos: 32000,
    morosos: 8800,
    total: 193800,
    promedio: 48450,
  },
  {
    id: 2,
    cuenta: "CU002",
    nombre: "Sucursal Oeste",
    cancelados: 108000,
    noVencidos: 27800,
    morosos: 12400,
    total: 148200,
    promedio: 37050,
  },
  {
    id: 3,
    cuenta: "CU003",
    nombre: "Sucursal Norte",
    cancelados: 94000,
    noVencidos: 14500,
    morosos: 6700,
    total: 115200,
    promedio: 38400,
  },
  {
    id: 4,
    cuenta: "CU004",
    nombre: "Sucursal Sur",
    cancelados: 73000,
    noVencidos: 13200,
    morosos: 5600,
    total: 91800,
    promedio: 30600,
  },
  {
    id: 5,
    cuenta: "CU005",
    nombre: "Sucursal Centro",
    cancelados: 122500,
    noVencidos: 24400,
    morosos: 11000,
    total: 157900,
    promedio: 39475,
  },
];

export const footerRankingCreditosClientes: Array<Record<string, string>> = [
  {
    cuenta: "5",
    nombre: "",
    cancelados: "550500",
    noVencidos: "111900",
    morosos: "44500",
    total: "706900",
    promedio: "",
  },
];
