import { Dispatch } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerTortaCobranzasR } from '@/services/AppService';
import { getYears } from '../_shared/domain/date';
import { calcularImportes } from './domain/compute';
import { buildDonutCardData } from './domain/build';
import { formatCompactIntegerEsAR } from '../_shared/domain/number';
import { useRefetchOnFlag } from '@/Hooks/useRefetchOnFlag';
import DonutCard from '../../../../../../Components/DonutsChart/DonutCard';
import ViewTitle from '@/frontend-resourses/components/Labels/ViewTitle';

interface GraficoTortaProps {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
}

export default function GraficoTorta({ handleRefetch, setHandleRefetch }: GraficoTortaProps) {
  const {
    data: dataTorta,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-torta'],
    queryFn: obtenerTortaCobranzasR,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  useRefetchOnFlag(handleRefetch, setHandleRefetch, refetch);

  // objeto de años devueltos en string.
  const años = getYears({ anteriores: 1, type: 'string' });
  // as String esta porque lo necesita DonutCard
  const añoActual = años.actual as string;
  const añoAnterior = años?.anteriores as string;

  // Para obtener el total
  const totalActual = calcularImportes(dataTorta, 'actual');

  const totalAnterior = calcularImportes(dataTorta, 'anterior');

  // Para obtener los importes detallados
  const tImportesActual = calcularImportes(dataTorta, 'actual', false);
  const tImportesAnterior = calcularImportes(dataTorta, 'anterior', false);

  const categorias = ['Efectivo', 'Billeteras', 'Transferencias', 'Debito', 'Credito', 'Financieras', 'Cheques', 'Mutuales'];

  const cardUno = buildDonutCardData(totalActual, tImportesActual, categorias);
  const cardDos = buildDonutCardData(totalAnterior, tImportesAnterior, categorias);

  return (
    <div className="mt-10">
      <ViewTitle  title="Cobranza de Créditos"/>
      <div className="flex flex-col w-full h-full px-12 py-6 bg-white rounded-b-md shadow-none transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400 ">
        <div className="flex flex-col gap-1 mb-5">
          <p className="text-slate-500 left-1">Distribución según Forma de Pago:</p>
        </div>

        <div className="flex justify-around items-center w-full p-2 gap-2">
          <DonutCard fecha={añoActual} titulo="Año" label={`$ ${formatCompactIntegerEsAR(totalActual)}`} data={cardUno.data} categories={cardUno.categoria} fetching={isFetching} />

          <div className="w-px h-60 ml-5 mr-10 bg-gray-300"></div>

          <DonutCard fecha={añoAnterior} titulo="Año" label={`$ ${formatCompactIntegerEsAR(totalAnterior)}`} data={cardDos.data} categories={cardDos.categoria} fetching={isFetching} />
        </div>
      </div>
    </div>
  );
}
