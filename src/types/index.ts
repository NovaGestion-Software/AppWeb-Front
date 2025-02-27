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
