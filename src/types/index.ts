export type Account = {
  empresa: string;
  usuario: string;
  password: string;
};

// INFORME VENTAS POR HORA
export interface SucursalInfo {
  horaini: string;
  importe: string;
  cantidad: number;
  pares?: number;
}

export interface Sucursal {
  sucursal: string;
  nsucursal: string;
  info: SucursalInfo[];
}

export type ResponseVentasHora = Sucursal[];

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
