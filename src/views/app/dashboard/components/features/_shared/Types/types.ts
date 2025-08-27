export interface ChartDataItem {
  date: string; // Propiedad específica
  [key: string]: number | null | string; // Permitir string para 'date' y number | null para el resto
}

export interface VentasData {
  mes: string;
  cantidad: number;
  importe: string;
}


export interface DataGraficoResponse {
  ventasAñoActual: VentasData[];
  ventasAñoAnterior: VentasData[];
}
export interface DataGrafico {
  titulo: string;
  dataGrafico: { chartData: ChartDataItem[] };
  formatoValor: number;
  categorias: string[];
  colores: string[];
  xLabel: string;
  yLabel: string;
}

