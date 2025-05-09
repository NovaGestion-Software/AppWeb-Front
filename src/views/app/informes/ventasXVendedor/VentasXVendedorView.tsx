import TablaExpandible from '@/frontend-resourses/components/Tables/TablaExpandible';
import { useState } from 'react';
import { dataVentaPorVendedor, VentaPorVendedor, VentaPorVendedorColumns } from './data';
import { ExtendedColumn } from '@/frontend-resourses/components/Tables/types';
import { ViewTitle } from '@/frontend-resourses/components';
import RangeDatesInput from '@/frontend-resourses/components/Inputs/RangeDatesInput';
import { FechasRango } from '@/types';
import { useVentasPorVendedorStore } from './store/useVentasPorVendedorStore';
import BotoneraHerramientas from '../VentasPorSeccion/Componentes/HerramientasButtons';
import { ListaFiltrosAplicados } from '@/frontend-resourses/components/Complementos/ListaFiltrosAplicados';
import TablaVentasPorVendedor from './components/TablaVentasVendedor';
import BusquedaVendedor from './components/BusquedaVendedor';

export default function VentasXVendedorView() {
  const {
    // status de la vista
    status,
    setStatus,
    // parametros de fetch
    fechas,
    setFechas,
    // data.data
    ventasPorVendedor,
    setVentasPorVendedor,
    secciones,
    setSecciones,
    // filtros
    sucursalesSeleccionadas,
    setSucursalesSeleccionadas,
    sucursalesDisponibles,
    setSucursalesDisponibles,
  } = useVentasPorVendedorStore();
  const [estaProcesado, setEstaProcesado] = useState(false);
  // Formateo a array de strings
  const sucursalesDisponiblesStr = sucursalesDisponibles.map((s) => s.nsucursal);
  const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.nsucursal);

  // simula llamado a fetch
  async function handleFetchData(dates: FechasRango): Promise<void> {
    try {
      //  console.log('fechas en handle', dates)
      setVentasPorVendedor(dataVentaPorVendedor);
      setEstaProcesado(true);
      //   mutate(dates);
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error al obtener los datos');
      //   setFoco(true);
    }
  }
  const handleClearData = () => {
    setVentasPorVendedor([]);
    setEstaProcesado(false);
  };

  console.log('ventasvendedor', ventasPorVendedor);
  //constate prueba para botonera de herramientas
  const exampleData: Record<string, any>[] = [
    { id: 1, nombre: 'Lucas', edad: 30 },
    { id: 2, nombre: 'Sofía', activo: true },
    { id: 3, nombre: 'Tomás', notas: [10, 9, 8] },
  ];
  return (
    <div className="min-h-screen ">
      <ViewTitle title="Ventas por Vendedor" />
      <div
        className="h-screen w-auto ml-3 gap-4 p-4 pb-0 pr-0
      grid grid-cols-12 grid-rows-12 
      v1440:grid-cols-11 "
      >
        <RangeDatesInput
          className="col-span-6 col-start-1 w-[30rem] 
          v1440:w-[38rem] v1440:col-start-2 v1440:py-6  bg-white p-2"
          textoBotones={{ fetch: 'Procesar', clear: 'Borrar' }}
          conBotones={true}
          estado={status}
          setFechas={setFechas}
          showPresets={true}
          onClearData={handleClearData}
          onFetchData={handleFetchData}
          estaProcesado={estaProcesado}
        />

        <BotoneraHerramientas
          data={exampleData}
          className="bg-white w-fit p-2
                col-span-3 col-start-8 
                v1440:col-start-8 "
          disabled={false}
          estaProcesado={estaProcesado}
          handleClean={handleClearData}
        />

        <BusquedaVendedor
          className="col-start-1 row-start-2 col-span-5
                 v1440:w-[38rem] v1440:col-start-2  v1440:gap-4 "
        />

        <ListaFiltrosAplicados className="col-start-1 col-span-5 row-start-12 v1440:mx-6 " itemsDisponibles={sucursalesDisponiblesStr} itemsSeleccionados={sucursalesSeleccionadasStr} />

        <TablaVentasPorVendedor
          className="justify-start w-fit h-fit items-start rounded-lg bg-white p-1 overflow-hidden
                  col-start-1 col-span-2  row-start-3
                  v1440:col-start-2 "
        />
      </div>
    </div>
  );
}
