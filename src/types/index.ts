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
  from: string;
  to: string;
};
