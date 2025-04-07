// import { TableNode } from '@table-library/react-table-library/types/table';
import { Dayjs } from 'dayjs';

export type Account = {
  empresa: string;
  usuario: string;
  password: string;
};

export type ColorTypes =
  | 'gray'
  | 'grayDefault'
  | 'graySoft'
  | 'grayStrong'
  | 'grayDeshab'
  | 'blue'
  | 'blueSoft'
  | 'green'
  | 'greenSoft'
  | 'red'
  | 'redSoft';

export type DashboardCard = {
  titulo: string;
  valortotal: number | null;
  unidad: string;
  simbolo: number;
  subtitulo1: string;
  subtitulo2: string;
  valor1: number;
  valor2: number;
  unidad1: string;
  unidad2: string;
};

// CAJAS
export type Importes = {
  importe01: string;
  importe02: string;
  importe03: string;
  importe04: string;
  importe06: string;
  importe07: string;
  importe08: string;
  importe09: string;
  importe10: string;
  importe11: string;
  importeva: string;
};

export type DatCaja = {
  ncaja: number;
  caja: string;
  fecha_a: string;
  fecha_c: string | null;
  ventas: Importes;
  cobranza: Importes;
  planpago: Importes;
  ingresos: string;
  gastos: string;
  retiro: string;
};

export type SucursalCaja = {
  sucursal: string;
  nsucursal: string;
  datcaja: DatCaja[];
};

// INFORMES

export type SucursalInfo = {
  horaini: string;
  importe: string;
  cantidad: number;
  pares: number;
};

export type Sucursal = {
  sucursal: string;
  nsucursal: string;
  info: SucursalInfo[];
};

export type ApiResponse = {
  status: string;
  data: Sucursal[];
  message: string;
  code: number;
};

export type FechasRango = {
  from: string | Dayjs;
  to: string | Dayjs;
};

export interface VentaPorHora {
  id: number;
  hora: string;
  nOperaciones: number | string;
  porcentajeOperaciones: number | string;
  importe: string;
  porcentajeImporte: number | string;
  pares: number | string;
  porcentajePares: number | string;
  //   totalImporte: number | string;
  //   totalOperaciones: number | string;
  //   totalPares: number | string;
}

export type Status = 'error' | 'idle' | 'pending' | 'success' | null;

export interface TablaStocks extends TableNode {
  codigo: string;
  talle: string;
  descripcion: string;
  marca: string;
  nmarca: string;
  precio: string;
  total: string;
  stockPorDeposito: {
    [depositoId: string]: string; // Cada depósito tiene un stock como string
  };
}

export interface TableColumn<T> {
  label: string;
  renderCell: (item: T) => React.ReactNode;
  cellProps?: (item: T) => any;
}

export interface TableNode {
  id: string | number; // ID único para cada fila
  codigo?: string;
}

export interface TablaSecciones extends TableNode {
  seccion: string;
  nseccion: string;
  rubros: { rubro: string; nrubro: string }[];
}

export interface Talle {
  talle: string;
  stock: string;
}

export interface Deposito {
  deposito: string;
  ndeposito: string;
  talles: Talle[];
}

// DEPOSITO MODAL
export interface DepositoModal {
  deposito: string;
  ndeposito: string;
}
// DEPOSITO MODAL
export interface MarcaModal {
  marca: string;
  nmarca: string;
}

export interface Producto {
  codigo: string;
  nombre: string;
  marca: string;
  nmarca: string;
  tipotalle: string;
  prec1: string;
  prec2: string;
  prec3: string;
  depositos: Deposito[];
}

export interface Rubro {
  rubro: string;
  nrubro: string;
  productos: Producto[];
}

export type TablaStock1 = Rubro[];

export  interface Precios {
  contado: string;
  lista2: string;
  lista3: string;
}

export interface ProductoAgrupado {
  id: string;
  codigo: string;
  talle: string;
  descripcion: string;
  marca: string;
  nmarca: string;
  precios: Precios;
  precio: string;
  stockPorDeposito: { [depositoId: string]: string };
  total: string;
}
