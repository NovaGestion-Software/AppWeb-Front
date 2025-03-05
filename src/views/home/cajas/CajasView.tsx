import { useState } from 'react';
import RefreshButton from '../../../Components/ui/Buttons/RefreshButton';
import CardComponent from './components/features/cards/CardComponent';
import CajasList from './components/features/list/CajasList';
import { useQuery } from '@tanstack/react-query';
import { obtenerCajasImportes } from '@/services/AppService';
import { SucursalCaja } from '@/types';
import TablaCaja from './components/features/table/TablaCaja';

export default function CajasView() {
  const [handleRefetch, setHandleRefetch] = useState(false);

  const {
    data: cajas,
    isFetching,
    refetch,
  } = useQuery<SucursalCaja[]>({
    queryKey: ['cajas'],
    queryFn: obtenerCajasImportes,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  return (
    <>
      <div className="overflow-hidden">
        <div className="flex items-center text-2xl font-bold px-6 py-2 gap-x-3">
          <h1>Movimientos de Cajas</h1>
          <RefreshButton setRefetch={setHandleRefetch} />
        </div>

        <div className="grid grid-cols-12 w-full p-4 gap-8">
          <div className="col-span-12 mx-4 ">
            <CardComponent
              handleRefetch={handleRefetch}
              setHandleRefetch={setHandleRefetch}
              cajas={cajas || []}
              refetch={refetch}
              isFetching={isFetching}
            />
          </div>
          <div className="col-span-12  flex flex-row gap-8 justify-center ">
            <CajasList
              handleRefetch={handleRefetch}
              setHandleRefetch={setHandleRefetch}
              cajas={cajas || []}
              refetch={refetch}
              isFetching={isFetching}
            />
            <TablaCaja handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
          </div>
        </div>
      </div>
    </>
  );
}
