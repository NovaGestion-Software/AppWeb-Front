import { useState } from 'react';
import { dataVentaPorVendedor} from './data';
import { ViewTitle } from '@/frontend-resourses/components';
import RangeDatesInput from '@/frontend-resourses/components/Inputs/RangeDatesInput';
import { FechasRango } from '@/types';
import { useVentasPorVendedorStore } from './store/useVentasPorVendedorStore';
import BotoneraHerramientas from '../VentasPorSeccion/Componentes/HerramientasButtons';
import TablaVentasPorVendedor from './components/TablaVentasVendedor';
import BusquedaInputs from '@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs';

export default function VentasXVendedorView() {
  const {
    // status de la vista
    status,
    // parametros de fetch
    setFechas,
    // data.data
    setVentasPorVendedor,
    // filtros
    sucursalesSeleccionadas,
    sucursalesDisponibles,


        buscado,
    setBuscado,
    idsCoincidentes,
    indiceSeleccionado,
    setIndiceGlobal,
    setIdsCoincidentes,
    setIndiceSeleccionado,
    ultimoIndiceBusqueda,
    setUltimoIndiceBusqueda,
    setNavegandoCoincidentes,
    indiceGlobal,
    setModoNavegacion,
  } = useVentasPorVendedorStore();
  const [estaProcesado, setEstaProcesado] = useState(false);
  // Formateo a array de strings
  // const sucursalesDisponiblesStr = sucursalesDisponibles.map((s) => s.nsucursal);
  // const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.nsucursal);

  // simula llamado a fetch
  async function handleFetchData(_dates: FechasRango): Promise<void> {
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

  //constate prueba para botonera de herramientas
  const exampleData: Record<string, any>[] = [
    { id: 1, nombre: 'Lucas', edad: 30 },
    { id: 2, nombre: 'Sofía', activo: true },
    { id: 3, nombre: 'Tomás', notas: [10, 9, 8] },
  ];

     const propsBusqueda = {
    data: dataVentaPorVendedor,
    // busqueda
    buscado,
    setBuscado,
    idsCoincidentes,
    indiceSeleccionado,
    setIndiceGlobal,
    setIdsCoincidentes,
    setIndiceSeleccionado,
    ultimoIndiceBusqueda,
    setUltimoIndiceBusqueda,
    setNavegandoCoincidentes,
    indiceGlobal,
    setModoNavegacion,
    inputsLength: 2,
    modoBusqueda: "simple" as "simple",
    keysBusqueda: {
      itemKey: "vendedorCodigo",
      busquedaKeyText: ["vendedorNombre"],
      busquedaKeyCode: ["vendedorCodigo"],
      textLabelProperty: "Vendedor",
      codeLabelProperty: "Codigo",
    },
  };
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

        <BusquedaInputs props={propsBusqueda}
          className="bg-white col-start-1 row-start-2 col-span-5
                 v1440:w-[38rem] v1440:col-start-2  v1440:gap-4 "
        />

        {/* <ListaFiltrosAplicados className="col-start-1 col-span-5 row-start-12 v1440:mx-6 " itemsDisponibles={sucursalesDisponiblesStr} itemsSeleccionados={sucursalesSeleccionadasStr} /> */}

        <TablaVentasPorVendedor
          className="justify-start w-fit h-fit items-start rounded-lg bg-white p-1 overflow-hidden
                  col-start-1 col-span-2  row-start-3
                  v1440:col-start-2 "
        />
      </div>
    </div>
  );
}
