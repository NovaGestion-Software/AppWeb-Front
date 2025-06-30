import { TableNode } from "@/types";

export interface ComparativoVentasItem extends TableNode {
  id: number;
  dia: number;
  comparativoPrincipal: number;        // 05-2025
  comparativoUno: number;              // 05-2024
  porcentajeComparativoUno: number;    // % respecto a 2025
  comparativoUnDos: number;            // 05-2023
  porcentajeComparativoDos: number;    // % respecto a 2025
  comparativoTres: number;             // 05-2022
  porcentajeComparativoTres: number;   // % respecto a 2025
  comparativoCuatro: number;           // 05-2021
  porcentajeComparativoCuatro: number; // % respecto a 2025
  comparativoCinco: number;            // 05-2020
  porcentajeComparativoCinco: number;  // % respecto a 2025
}

export const comparativoVentasData: Array<ComparativoVentasItem> = [
  {
    id: 1,
    dia: 1,
    comparativoPrincipal: 12000,
    comparativoUno: 11000,
    porcentajeComparativoUno: 91.7,
    comparativoUnDos: 10500,
    porcentajeComparativoDos: 87.5,
    comparativoTres: 9800,
    porcentajeComparativoTres: 81.7,
    comparativoCuatro: 9200,
    porcentajeComparativoCuatro: 76.7,
    comparativoCinco: 8700,
    porcentajeComparativoCinco: 72.5,
  },
  {
    id: 2,
    dia: 2,
    comparativoPrincipal: 11500,
    comparativoUno: 10700,
    porcentajeComparativoUno: 93.0,
    comparativoUnDos: 10200,
    porcentajeComparativoDos: 88.7,
    comparativoTres: 9400,
    porcentajeComparativoTres: 81.7,
    comparativoCuatro: 9000,
    porcentajeComparativoCuatro: 78.3,
    comparativoCinco: 8600,
    porcentajeComparativoCinco: 74.8,
  },
  {
    id: 3,
    dia: 3,
    comparativoPrincipal: 12500,
    comparativoUno: 11800,
    porcentajeComparativoUno: 94.4,
    comparativoUnDos: 11000,
    porcentajeComparativoDos: 88.0,
    comparativoTres: 10000,
    porcentajeComparativoTres: 80.0,
    comparativoCuatro: 9400,
    porcentajeComparativoCuatro: 75.2,
    comparativoCinco: 9000,
    porcentajeComparativoCinco: 72.0,
  },
  {
    id: 4,
    dia: 4,
    comparativoPrincipal: 13000,
    comparativoUno: 12300,
    porcentajeComparativoUno: 94.6,
    comparativoUnDos: 11500,
    porcentajeComparativoDos: 88.5,
    comparativoTres: 10500,
    porcentajeComparativoTres: 80.8,
    comparativoCuatro: 9600,
    porcentajeComparativoCuatro: 73.8,
    comparativoCinco: 9200,
    porcentajeComparativoCinco: 70.8,
  },
  {
    id: 5,
    dia: 5,
    comparativoPrincipal: 12800,
    comparativoUno: 12000,
    porcentajeComparativoUno: 93.8,
    comparativoUnDos: 11200,
    porcentajeComparativoDos: 87.5,
    comparativoTres: 10400,
    porcentajeComparativoTres: 81.3,
    comparativoCuatro: 9500,
    porcentajeComparativoCuatro: 74.2,
    comparativoCinco: 9100,
    porcentajeComparativoCinco: 71.1,
  },
];
