// import { Dispatch } from 'react';
import { AreaChart, Card } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import { obtenerDashboardGrafico } from '../../../../../services/AppService';
import SkeletonChart from './SkeletonChart';

interface GraficoVentasProps {
  handleRefetch: boolean;
  setHandleRefetch: (value: boolean) => void;
  //   setHandleRefetch: Dispatch<React.SetStateAction<boolean>>
}

interface VentasData {
  mes: string;
  cantidad: number;
  importe: string;
}

interface ChartDataItem {
  date: string; // Propiedad específica
  [key: string]: number | null | string; // Permitir string para 'date' y number | null para el resto
}

interface DataGraficoResponse {
  ventasAñoActual: VentasData[];
  ventasAñoAnterior: VentasData[];
}

interface DataTraida {
  titulo: string;
  dataGrafico: { chartData: ChartDataItem[] };
  formatoValor: number;
  categorias: string[];
  colores: string[];
  xLabel: string;
  yLabel: string;
}

export default function GraficoVentas({ handleRefetch, setHandleRefetch }: GraficoVentasProps) {
  const placeholderChartData: ChartDataItem[] = [
    { date: 'Ene', '2023': 135000, '2024': 140500 },
    { date: 'Feb', '2023': 127500, '2024': 133200 },
    { date: 'Mar', '2023': 145800, '2024': 125400 },
    { date: 'Abr', '2023': 152100, '2024': 138700 },
    { date: 'May', '2023': 160900, '2024': 150500 },
    { date: 'Jun', '2023': 148700, '2024': 160300 },
    { date: 'Jul', '2023': 175000, '2024': 166000 },
    { date: 'Ago', '2023': 163400, '2024': 170800 },
    { date: 'Sep', '2023': 180500, '2024': 176900 },
    { date: 'Oct', '2023': 190200, '2024': 0 },
    { date: 'Nov', '2023': 198300, '2024': 0 },
    { date: 'Dic', '2023': 215000, '2024': 0 },
  ];

  const {
    data: dataGrafico,
    isLoading: loadingGrafico,
    refetch: refetchGrafico,
    isFetching: fetchingGrafico,
  } = useQuery<DataGraficoResponse[]>({
    queryKey: ['dashboard grafico'],
    queryFn: obtenerDashboardGrafico,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
    gcTime: 1000 * 60 * 10,
  });

  // console.log('respuesta', dataGrafico);

  const obtenerSiglaMes = (fechaISO: string): string => {
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
    const numeroMes = parseInt(fechaISO.substring(5, 7)) - 1;
    return meses[numeroMes];
  };

  const obtenerRangoAnios = (): string[] => {
    const anioActual = new Date().getFullYear();
    const anioAnterior = anioActual - 1;
    return [`${anioAnterior - 1}-${anioAnterior}`, `${anioAnterior}-${anioActual}`];
  };

  const transformarDatosGrafico = (
    dataGrafico: DataGraficoResponse[] | undefined
  ): ChartDataItem[] => {
    if (!dataGrafico || dataGrafico.length < 2) return [];

    const categoriasDinamicas = obtenerRangoAnios();

    return dataGrafico[0].ventasAñoActual.map((actual, index) => {
      const anterior = dataGrafico[1].ventasAñoAnterior[index];
      const month = obtenerSiglaMes(actual.mes);

      return {
        date: month,
        [categoriasDinamicas[0]]: anterior ? parseFloat(anterior.importe) : null,
        [categoriasDinamicas[1]]: parseFloat(actual.importe),
      };
    });
  };

  const chartData = transformarDatosGrafico(dataGrafico);

  if (handleRefetch) {
    refetchGrafico();
    setHandleRefetch(false);
  }

  const valueFormatter = (number: number): string => {
    const formattedNumber = Intl.NumberFormat('es-ES', {
      maximumFractionDigits: 0,
    }).format(number / 1_000_000);
    return `${formattedNumber} M`;
  };

  const dataTraida: DataTraida = {
    titulo: 'Ventas Anuales',
    dataGrafico: { chartData },
    formatoValor: 1,
    categorias: obtenerRangoAnios(),
    colores: ['cyan', 'indigo'],
    xLabel: 'Meses en el año',
    yLabel: 'Importe (ARS)',
  };

  const data = {
    titulo: dataTraida?.titulo ?? 'Sin título',
    dataGrafico: dataTraida?.dataGrafico?.chartData ?? [],
    formatoValor: dataTraida?.formatoValor ?? ((num: number) => num),
    categorias: dataTraida?.categorias ?? [],
    colores: dataTraida?.colores ?? [],
    xLabel: dataTraida?.xLabel ?? 'Eje X',
    yLabel: dataTraida?.yLabel ?? 'Eje Y',
  };

  // console.log(dataTraida);

  return (
    <div>
      {loadingGrafico || fetchingGrafico ? (
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
    </div>
  );
}
