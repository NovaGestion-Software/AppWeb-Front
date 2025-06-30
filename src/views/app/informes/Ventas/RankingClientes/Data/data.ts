import { TableNode } from "@table-library/react-table-library/types/table";



export interface RankingClienteItem extends TableNode {
  id: number;
  cliente: string;
  nombre: string;
  nOpera: number;
  porcentajeOpera: number;
  importe: number;
  porcentajeImporte: number;
  valorPromedio: number;
}
export interface RankingClienteFooter extends TableNode {
  id: number;
  cliente: string;
  nombre: string;
  nOpera: number;
  porcentajeOpera: string;
  importe: number;
  porcentajeImporte: string;
  valorPromedio: number;
}


export const rankingClientesData: Array<RankingClienteItem> = [
  {
    id: 1,
    cliente: "CL001",
    nombre: "Distribuidora Centro",
    nOpera: 28,
    porcentajeOpera: 14.7,
    importe: 248000,
    porcentajeImporte: 19.6,
    valorPromedio: 8857.14,
  },
  {
    id: 2,
    cliente: "CL002",
    nombre: "Mercería El Sol",
    nOpera: 19,
    porcentajeOpera: 10.0,
    importe: 132500,
    porcentajeImporte: 10.5,
    valorPromedio: 6973.68,
  },
  {
    id: 3,
    cliente: "CL003",
    nombre: "Boutique Morena",
    nOpera: 36,
    porcentajeOpera: 18.9,
    importe: 316200,
    porcentajeImporte: 25.0,
    valorPromedio: 8783.33,
  },
  {
    id: 4,
    cliente: "CL004",
    nombre: "Textiles Norte",
    nOpera: 12,
    porcentajeOpera: 6.3,
    importe: 84500,
    porcentajeImporte: 6.7,
    valorPromedio: 7041.67,
  },
  {
    id: 5,
    cliente: "CL005",
    nombre: "Comercio San Luis",
    nOpera: 21,
    porcentajeOpera: 11.1,
    importe: 157000,
    porcentajeImporte: 12.4,
    valorPromedio: 7476.19,
  },
];
export const rankingClientesFooter: Array<RankingClienteFooter> = [
  {
    id: 1,
    cliente: String(rankingClientesData.length),
    nombre: "",
    nOpera: 28,
    porcentajeOpera: "" ,
    importe: 248000,
    porcentajeImporte: "",
    valorPromedio: 8857.14,
  },
];