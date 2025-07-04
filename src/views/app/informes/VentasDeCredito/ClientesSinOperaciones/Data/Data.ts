import { TableNode } from "@/types";

export interface ClienteSinOperacion extends TableNode {
  id: number;
  cuenta: string;
  nombre: string;
  area: string;
  telefono: string;
  dom1: string;
  dom2: string;
  localidad: string;
  fecAlta: string;
  fecComp: string;
  fecCon: string;
}

export const clientesSinOperacionesData: Array<ClienteSinOperacion> = [
  {
    id: 1,
    cuenta: "CU001",
    nombre: "Distribuidora Río Grande",
    area: "Zona Sur",
    telefono: "341-5551234",
    dom1: "Av. Belgrano 245",
    dom2: "Of. 102",
    localidad: "Rosario",
    fecAlta: "2023-09-15",
    fecComp: "-",
    fecCon: "-",
  },
  {
    id: 2,
    cuenta: "CU002",
    nombre: "Servicios Industriales SRL",
    area: "Zona Oeste",
    telefono: "341-4789001",
    dom1: "San Martín 852",
    dom2: "Galpón 3",
    localidad: "Funes",
    fecAlta: "2023-11-03",
    fecComp: "-",
    fecCon: "-",
  },
  {
    id: 3,
    cuenta: "CU003",
    nombre: "Electro Hogar S.A.",
    area: "Zona Norte",
    telefono: "341-5098374",
    dom1: "Córdoba 1543",
    dom2: "PB",
    localidad: "Granadero Baigorria",
    fecAlta: "2024-01-20",
    fecComp: "-",
    fecCon: "-",
  },
  {
    id: 4,
    cuenta: "CU004",
    nombre: "Corralón Los Andes",
    area: "Zona Centro",
    telefono: "341-6007788",
    dom1: "San Lorenzo 300",
    dom2: "",
    localidad: "Rosario",
    fecAlta: "2024-03-11",
    fecComp: "-",
    fecCon: "-",
  },
  {
    id: 5,
    cuenta: "CU005",
    nombre: "Distribuciones El Rápido",
    area: "Zona Este",
    telefono: "341-4290311",
    dom1: "Mendoza 1750",
    dom2: "Depto B",
    localidad: "Villa Gobernador Gálvez",
    fecAlta: "2023-10-25",
    fecComp: "-",
    fecCon: "-",
  },
];


export const footer: Array<Record<string, string>> = [
  {
    cuenta: "5",
    nombre: "",
    cancelados: "",
    noVencidos: "",
    morosos: "",
    total: "",
    promedio: "",
  },
];
