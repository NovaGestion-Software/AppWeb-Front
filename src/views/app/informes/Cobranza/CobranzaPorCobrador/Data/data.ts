import { TableNode } from "@/types";

export interface CobranzaCobrador extends TableNode {
  id: number;
  fecha: string;
  Tipo: string;
  recibo: string;
  telefoncobrador: string;
  cuenta: string;
  nombre: string;
  capitalV: number;
  capitalNV: number;
  interesPP: number;
  financiacion: number;
  intMora: number;
  importe: number;
}

export const cobranzasCobradorData: Array<CobranzaCobrador> = [
  {
    id: 1,
    fecha: "2025-06-01",
    Tipo: "Contado",
    recibo: "RC001-000123",
    telefoncobrador: "Juan Domínguez",
    cuenta: "CU001",
    nombre: "Distribuidora Centro",
    capitalV: 15000,
    capitalNV: 2000,
    interesPP: 800,
    financiacion: 1200,
    intMora: 600,
    importe: 19600,
  },
  {
    id: 2,
    fecha: "2025-06-01",
    Tipo: "Financiado",
    recibo: "RC001-000124",
    telefoncobrador: "Juan Domínguez",
    cuenta: "CU002",
    nombre: "Almacén San José",
    capitalV: 10000,
    capitalNV: 1500,
    interesPP: 500,
    financiacion: 1000,
    intMora: 300,
    importe: 13300,
  },
  {
    id: 3,
    fecha: "2025-06-01",
    Tipo: "Contado",
    recibo: "RC001-000125",
    telefoncobrador: "Lucía Sosa",
    cuenta: "CU003",
    nombre: "Carnicería El Tano",
    capitalV: 18000,
    capitalNV: 2200,
    interesPP: 1000,
    financiacion: 800,
    intMora: 500,
    importe: 22500,
  },
  {
    id: 4,
    fecha: "2025-06-01",
    Tipo: "Financiado",
    recibo: "RC001-000126",
    telefoncobrador: "Lucía Sosa",
    cuenta: "CU004",
    nombre: "Mercado Las Flores",
    capitalV: 9000,
    capitalNV: 1000,
    interesPP: 700,
    financiacion: 600,
    intMora: 200,
    importe: 11500,
  },
  {
    id: 5,
    fecha: "2025-06-01",
    Tipo: "Contado",
    recibo: "RC001-000127",
    telefoncobrador: "Carlos Méndez",
    cuenta: "CU005",
    nombre: "Verdulería El Verde",
    capitalV: 12000,
    capitalNV: 1000,
    interesPP: 600,
    financiacion: 500,
    intMora: 400,
    importe: 14500,
  },
];




export const footer: Array<Record<string, string>> = [
  {
  fecha: "10",
  Tipo: "",
  recibo: "",
  telefoncobrador: "",
  cuenta: "",
  nombre: ":",
  capitalV: "64000",
  capitalNV: "7700",
  interesPP: "3600",
  financiacion: "4100",
  intMora: "2000",
  importe: "81400",
  },
];
