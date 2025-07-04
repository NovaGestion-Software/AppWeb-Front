import { TableNode } from "@/types";

export interface DistribucionMensualCredito extends TableNode {
  id: number;
  mes: string;
  cantidad: number;
  importe: number;
}

export const distribucionMensualCreditosData: Array<DistribucionMensualCredito> = [
  { id: 1, mes: "Enero", cantidad: 24, importe: 145000 },
  { id: 2, mes: "Febrero", cantidad: 18, importe: 123400 },
  { id: 3, mes: "Marzo", cantidad: 27, importe: 168200 },
  { id: 4, mes: "Abril", cantidad: 22, importe: 139800 },
  { id: 5, mes: "Mayo", cantidad: 30, importe: 175600 },
  { id: 6, mes: "Junio", cantidad: 19, importe: 128750 },
  { id: 7, mes: "Julio", cantidad: 25, importe: 154300 },
  { id: 8, mes: "Agosto", cantidad: 21, importe: 141900 },
  { id: 9, mes: "Septiembre", cantidad: 20, importe: 135000 },
  { id: 10, mes: "Octubre", cantidad: 23, importe: 147800 },
  { id: 11, mes: "Noviembre", cantidad: 26, importe: 162500 },
  { id: 12, mes: "Diciembre", cantidad: 29, importe: 189700 },
];

export const footer: Array<Record<string, string>> = [
  {
    mes: "",
    cantidad: "122231",
    importe: "12312321",

  },
];
