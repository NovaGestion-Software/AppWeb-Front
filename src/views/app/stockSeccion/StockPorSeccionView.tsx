import ViewTitle from '@/Components/ui/Labels/ViewTitle';
import { obtenerProductos } from '@/services/ApiPhpService';
import { useQuery } from '@tanstack/react-query';
import TablaStock from './componentes/TablaStock';

export default function StockPorSeccionView() {
  const {
    data: rubrosDis,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['rubros-seccion'],
    queryFn: obtenerProductos,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error al cargar los productos</div>;
  }

  //   console.log(rubrosDis.data);

  return (
    <>
      <ViewTitle title={'Stock por Sección'} />
      <div>
        <TablaStock dataParaTabla={rubrosDis.data} />
      </div>
    </>
  );
}
