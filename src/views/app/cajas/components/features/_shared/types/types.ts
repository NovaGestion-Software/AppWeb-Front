
/** Claves soportadas para movimientos a nivel caja. */
export type MovimientoKey = "ingresos" | "gastos" | "retiro" | "retiros";

export type CajasSeccionItem = {
  seccion: string;
  nseccion: string;
  venta: string | number; 
};

export type CajasSeccionResponse = CajasSeccionItem[];

export type CajasSeccionItemNum = Omit<CajasSeccionItem, 'venta'> & {
  venta: number;
};

export type TablaRow = {
  seccion: string;
  nseccion: string;
  venta: string;         
  porcentaje: string;   
  porcentajeNeto: string;
};

export type TablaBuildResult = {
  totalVentas: string;       
  totalVentasNetas: string; 
  result: TablaRow[];
};
