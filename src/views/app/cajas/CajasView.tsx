import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerCajasImportes } from '@/services/AppService';
import { SucursalCaja } from '@/types';
import CardComponent from './components/features/cards/CardComponent';
import CajasList from './components/features/list/CajasList';
import TablaCaja from './components/features/table/TablaCaja';
import ViewTitle from '@/frontend-resourses/components/Labels/ViewTitle';

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
    <div className="overflow-hidden">
      <ViewTitle
        title={'Movimientos de Cajas'}
        showRefreshButton={true}
        setHandleRefetch={setHandleRefetch}
      />

      <div className="grid grid-cols-12 w-full pt-4 pl-2 gap-8">
        <div className="col-span-12 ml-4 ">
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
  );
}
