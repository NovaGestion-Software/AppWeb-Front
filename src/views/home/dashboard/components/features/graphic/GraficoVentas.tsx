import { useEffect, Dispatch } from 'react';
import { AreaChart, Card } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import { obtenerDashboardGrafico } from '@/services/AppService';
import SkeletonChart from './SkeletonChart';

interface ChartDataItem {
  date: string; // Propiedad específica
  [key: string]: number | null | string; // Permitir string para 'date' y number | null para el resto
}

interface VentasData {
  mes: string;
  cantidad: number;
  importe: string;
}

interface DataGraficoResponse {
  ventasAñoActual: VentasData[];
  ventasAñoAnterior: VentasData[];
}

interface DataGrafico {
  titulo: string;
  dataGrafico: { chartData: ChartDataItem[] };
  formatoValor: number;
  categorias: string[];
  colores: string[];
  xLabel: string;
  yLabel: string;
}

interface GraficoVentasProps {
  handleRefetch: boolean;
  // setHandleRefetch: (value: boolean) => void;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
}

export default function GraficoVentas({ handleRefetch, setHandleRefetch }: GraficoVentasProps) {
  const {
    data: dataGrafico,
    refetch: refetchGrafico,
    isFetching: fetchingGrafico,
  } = useQuery<DataGraficoResponse[]>({
    queryKey: ['dashboard-grafico'],
    queryFn: obtenerDashboardGrafico,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
    gcTime: 1000 * 60 * 10,
  });

  const chartData = transformarDatosGrafico(dataGrafico);
  const placeholderChartData = generarPlaceholderChartData();
  const valueFormatter = (number: number): string =>
    `${Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(number / 1_000_000)} M`;

  useEffect(() => {
    if (handleRefetch) {
      refetchGrafico();
      setHandleRefetch(false);
    }
  }, [handleRefetch, refetchGrafico, setHandleRefetch]);

  function generarPlaceholderChartData(): ChartDataItem[] {
    const anios = obtenerRangoAnios();
    const meses = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];

    return meses.map((mes) => ({
      date: mes,
      [anios[0]]: null,
      [anios[1]]: null,
    }));
  }

  function obtenerSiglaMes(fechaISO: string): string {
    const meses = [
      'ENE',
      'FEB',
      'MAR',
      'ABR',
      'MAY',
      'JUN',
      'JUL',
      'AGO',
      'SEP',
      'OCT',
      'NOV',
      'DIC',
    ];
    const mesIndex = parseInt(fechaISO.slice(5, 7), 10) - 1;
    return meses[mesIndex] || 'N/A';
  }

  // Rango de años basado en el año actual
  function obtenerRangoAnios(): string[] {
    const anioActual = new Date().getFullYear();
    return [`${anioActual - 2}-${anioActual - 1}`, `${anioActual - 1}-${anioActual}`];
  }

  function transformarDatosGrafico(dataGrafico?: DataGraficoResponse[]): ChartDataItem[] {
    if (!dataGrafico || dataGrafico.length < 2) return [];

    const [ventasActual, ventasAnterior] = dataGrafico;
    // Verifica si las propiedades existen en ventasActual y ventasAnterior
    if (!ventasActual.ventasAñoActual || !ventasAnterior.ventasAñoAnterior) return [];

    const categoriasDinamicas = obtenerRangoAnios();

    return ventasActual.ventasAñoActual.map((actual, index) => ({
      date: obtenerSiglaMes(actual.mes),
      [categoriasDinamicas[0]]: ventasAnterior.ventasAñoAnterior[index]
        ? parseFloat(ventasAnterior.ventasAñoAnterior[index].importe)
        : null,
      [categoriasDinamicas[1]]: parseFloat(actual.importe),
    }));
  }

  const data: DataGrafico = {
    titulo: 'Ventas Anuales',
    dataGrafico: { chartData },
    formatoValor: 1,
    categorias: obtenerRangoAnios(),
    colores: ['cyan', 'indigo'],
    xLabel: 'Meses en el año',
    yLabel: 'Importe (ARS)',
  };

  return (
    <>
      {fetchingGrafico ? (
        <div>
          <SkeletonChart />
        </div>
      ) : (
        <Card className="shadow-none transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400">
          <p className="text-2xl text-tremor-content-strong font-semibold">{data.titulo}</p>
          <AreaChart
            className="h-[400px]"
            data={chartData.length > 0 ? chartData : placeholderChartData}
            index="date"
            yAxisWidth={95}
            categories={data?.categorias}
            colors={data?.colores}
            valueFormatter={valueFormatter}
            xAxisLabel={data.xLabel}
            yAxisLabel={data.yLabel}
          />
        </Card>
      )}
    </>
  );
}
