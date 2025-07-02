import { TableNode } from "@/types";

export interface VentaLocalidadItem extends TableNode {
  id: number;
  codigo: string;
  localidad: string;
  contado: number;
  tarjeta: number;
  credito: number;
  Otros: number;
  noCompraAP: number;
  noCompraRZ: number;
  operacion: number;
  operacionAP: number;
  operacionRZ: number;
  nue: number;
  nuexi: number;
}

export const ventasPorLocalidadData: Array<VentaLocalidadItem> = [
  {
    id: 1,
    codigo: "LOC001",
    localidad: "Rosario",
    contado: 23400,
    tarjeta: 17200,
    credito: 5800,
    Otros: 1200,
    noCompraAP: 300,
    noCompraRZ: 100,
    operacion: 10,
    operacionAP: 8,
    operacionRZ: 2,
    nue: 6,
    nuexi: 4,
  },
  {
    id: 2,
    codigo: "LOC002",
    localidad: "Santa Fe",
    contado: 19800,
    tarjeta: 21000,
    credito: 9100,
    Otros: 700,
    noCompraAP: 600,
    noCompraRZ: 200,
    operacion: 12,
    operacionAP: 10,
    operacionRZ: 2,
    nue: 5,
    nuexi: 7,
  },
  {
    id: 3,
    codigo: "LOC003",
    localidad: "Paraná",
    contado: 15800,
    tarjeta: 13200,
    credito: 4200,
    Otros: 950,
    noCompraAP: 250,
    noCompraRZ: 300,
    operacion: 9,
    operacionAP: 6,
    operacionRZ: 3,
    nue: 3,
    nuexi: 6,
  },
  {
    id: 4,
    codigo: "LOC004",
    localidad: "Venado Tuerto",
    contado: 8700,
    tarjeta: 7600,
    credito: 2900,
    Otros: 300,
    noCompraAP: 120,
    noCompraRZ: 180,
    operacion: 6,
    operacionAP: 4,
    operacionRZ: 2,
    nue: 2,
    nuexi: 4,
  },
  {
    id: 5,
    codigo: "LOC005",
    localidad: "Rafaela",
    contado: 20400,
    tarjeta: 17400,
    credito: 7600,
    Otros: 400,
    noCompraAP: 100,
    noCompraRZ: 120,
    operacion: 11,
    operacionAP: 7,
    operacionRZ: 4,
    nue: 7,
    nuexi: 4,
  },
  {
    id: 6,
    codigo: "LOC006",
    localidad: "Villa María",
    contado: 13400,
    tarjeta: 10200,
    credito: 3100,
    Otros: 850,
    noCompraAP: 140,
    noCompraRZ: 90,
    operacion: 7,
    operacionAP: 5,
    operacionRZ: 2,
    nue: 4,
    nuexi: 3,
  },
  {
    id: 7,
    codigo: "LOC007",
    localidad: "Córdoba",
    contado: 32000,
    tarjeta: 28600,
    credito: 9800,
    Otros: 1300,
    noCompraAP: 500,
    noCompraRZ: 600,
    operacion: 15,
    operacionAP: 9,
    operacionRZ: 6,
    nue: 9,
    nuexi: 6,
  },
  {
    id: 8,
    codigo: "LOC008",
    localidad: "San Nicolás",
    contado: 14700,
    tarjeta: 11200,
    credito: 3400,
    Otros: 600,
    noCompraAP: 80,
    noCompraRZ: 130,
    operacion: 6,
    operacionAP: 3,
    operacionRZ: 3,
    nue: 2,
    nuexi: 4,
  },
];

export const footerVentasPorLocalidad: Array<Record<string, string>> = [
  {
    codigo: "",
    localidad: String(ventasPorLocalidadData.length),
    contado: "128200",
    tarjeta: "116800",
    credito: "42900",
    Otros: "6300",
    noCompraAP: "2090",
    noCompraRZ: "1720",
    operacion: "76",
    operacionAP: "52",
    operacionRZ: "24",
    nue: "38",
    nuexi: "38",
  },
];
