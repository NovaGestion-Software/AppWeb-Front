import { useEffect, Dispatch } from 'react';
import { AreaChart } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import { obtenerDashboardGrafico } from '@/services/AppService';
import SkChart from './skeleton/SkChart';
import ViewTitle from '@/frontend-resourses/components/Labels/ViewTitle';
import { DataGrafico, DataGraficoResponse } from '../_shared/Types/types';
import { obtenerRangoAnios, transformarDatosGrafico } from './domain/transform';
import { generarPlaceholderChartData } from './domain/placeholders';


export interface GraficoVentasProps {
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
          <SkChart />
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <div className="w-full bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400 rounded-md">
            <ViewTitle title="Ventas Anuales"  />
            <div className="p-5">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
