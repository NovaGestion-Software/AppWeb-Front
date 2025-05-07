import { TablaDefault, ViewTitle } from '@/frontend-resourses/components';
import RangeDatesInput from '@/frontend-resourses/components/Inputs/RangeDatesInput';
import { useVentasPorSeccionStore } from './useVentasPorSeccionStore';
import { ApiResponse, FechasRango } from '@/types';
import BotoneraHerramientas from './Componentes/HerramientasButtons';
import { useEffect, useState } from 'react';
import { handleClearData } from './Funciones/Handles';
import { dataDefault } from './data';
import { agruparPorIndice, ConfigKeys, crearDataParaTablaModular, extraerItems, extraerItemsDeIndice } from '@/frontend-resourses/utils/dataManipulation';
import { ConfigTabla } from '../ventasXHora/VentasHoraView';
import { formatearNumero } from '@/utils';
import { TablaVentaPorSeccion, VentaPorSeccionType } from './Componentes/TablaVentaPorSeccion';

export default function VentasPorSeccionView() {
  const {
    // status de la vista
    status,
    setStatus,
    // parametros de fetch
    fechas,
    setFechas,
    // data.data
    ventasPorSeccion,
    setVentasPorSeccion,

    // filtros
    sucursalesSeleccionadas,
    setSucursalesSeleccionadas,
    sucursalesDisponibles,
    setSucursalesDisponibles,
  } = useVentasPorSeccionStore();
  //const [foco, setFoco] = useState(false);
  // estado del informe
  const [estaProcesado, setEstaProcesado] = useState(false);
  // Formateo a array de strings
  const sucursalesDisponiblesStr = sucursalesDisponibles.map((s) => s.nsucursal);
  const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.nsucursal);

  //constate prueba para botonera de herramientas
  const exampleData: Record<string, any>[] = [
    { id: 1, nombre: 'Lucas', edad: 30 },
    { id: 2, nombre: 'Sofía', activo: true },
    { id: 3, nombre: 'Tomás', notas: [10, 9, 8] },
  ];

  // llamado a fetch
  //    const { mutate } = useMutation<ApiResponse, Error, FechasRango>({
  //     mutationFn: () => obtenerVentasPorSucursal(fechas),
  //     onMutate: () => {
  //       setStatus('pending');
  //     },
  //     onError: (error) => {
  //       console.error('Error al obtener los datos:', error);
  //       setStatus('error');
  //     },
  //     onSuccess: (data) => {
  //       // console.log(data.data);
  //       if (data.data.length === 0) {
  //         showAlert({
  //           text: 'El rango de fecha seleccionado no contiene información',
  //           icon: 'error',
  //           cancelButtonText: 'Cerrar',
  //           showCancelButton: true,
  //           timer: 2200,
  //         });
  //       }
  //       setVentasPorSeccion(data.data);
  //       // setSucursalesDisponibles(data.data.map((sucursal) => sucursal.nsucursal));
  //       // setSucursalesSeleccionadas(data.data.map((sucursal) => sucursal.nsucursal));
  //       // setProcesado(true);
  //       // setFooter(true);
  //       setStatus('success');
  //     },
  //     onSettled: () => {
  //       setStatus('idle');
  //     },
  //   });
  // simula llamado a fetch
  async function handleFetchData(dates: FechasRango): Promise<void> {
    try {
      //  console.log('fechas en handle', dates)
      setVentasPorSeccion(dataDefault);
      setEstaProcesado(true)
      //   mutate(dates);
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error al obtener los datos');
      //   setFoco(true);
    }
  }

  // extrae horarios para indice.
  const indiceTabla = ventasPorSeccion ? extraerItemsDeIndice(ventasPorSeccion, 'info', 'seccion') : [];

  console.log('indice,', indiceTabla)
  // funcion agrupar por horario, te suma los totales en base a sumKey
  const config: ConfigKeys = {
    filtroKey: 'nsucursal',
    agrupadorKey: 'seccion',
    innerArrayKey: 'info',
    sumaKeys: ['importe'],
    convertir: ['importe'],
    detalleKey: 'nseccion',
  };

  console.log('previo a agrupar', ventasPorSeccion);
  const { datos, totales } = agruparPorIndice(ventasPorSeccion, sucursalesSeleccionadasStr, indiceTabla, config, formatearNumero);

  // crea datos en estructura de tabla.
  const configTabla: ConfigTabla = {
    agrupadorKey: 'seccion',
    columnas: [
      {
        key: 'nseccion',
        label: 'nseccion',
        totalKey: 'nseccion',
      },
      {
        key: 'importe',
        label: 'importe',
        calcularPorcentaje: true,
        totalKey: 'importe',
        parseNumber: true,
      },
    ],
  };

  const filasGenericas = crearDataParaTablaModular(datos, totales, configTabla);
  
  const filas: VentaPorSeccionType[] = filasGenericas.map((fila) => ({
    id: fila.id as number,
    seccion: fila.seccion as string,
    nseccion: fila.nseccion as string,
    importe: fila.importe as string,
    porcentajeImporte: fila.porcentajeImporte as string,
  }));

  // SETEAR FILTROS.
  useEffect(() => {
    if (ventasPorSeccion?.length) {
      setEstaProcesado(true);
      extraerItems({
        data: ventasPorSeccion,
        itemsKeysGroup: { nsucursal: 'nsucursal', sucursal: 'sucursal' },
        itemsSeleccionados: sucursalesSeleccionadas,
        setItemsDisponibles: setSucursalesDisponibles,
        setItemsSeleccionados: setSucursalesSeleccionadas,
      });
    }
  }, [ventasPorSeccion]);

  // FOOTER TABLA 1
  const totalImporteFormateado = formatearNumero(totales.importe);
  const datosParaFooter = {
    seccion: filas.length,
    nseccion: totales.cantidad,
    importe: totalImporteFormateado,
    porcentajeImporte: '',
  };

  const handleClearData = () => {
    setVentasPorSeccion([])
    setEstaProcesado(false)
  }
  //console.log
  useEffect(() => {
    console.log('ventas por seccion', ventasPorSeccion);
    console.log('ventas por datos', datos);
    console.log('ventas por filasGenericas', filasGenericas);
  }, [ventasPorSeccion, indiceTabla]);
  return (
    <div className="h-screen w-screen">
      {/** Titulo */}
      <ViewTitle title="Ventas por Sección" />
      {/** Body */}
      <div className="grid grid-cols-12 grid-rows-12 h-screen w-svw ml-3 gap-4 p-4">
        <RangeDatesInput
          className="col-span-6 col-start-1 w-[30rem] lg:col-span-4 bg-white p-2"
          textoBotones={{ fetch: 'Procesar', clear: 'Borrar' }}
          conBotones={true}
          estado={status}
          setFechas={setFechas}
          showPresets={true}
          onClearData={handleClearData}
          onFetchData={handleFetchData}
        />
        <BotoneraHerramientas 
        data={exampleData} 
        className="col-span-3 col-start-8 bg-white w-fit p-2" 
        disabled={false} 
        estaProcesado={estaProcesado}
        handleClean={handleClearData} />



        <TablaVentaPorSeccion
        className='col-start-1 col-span-2 border border-black justify-start 
        items-start w-fit h-[32rem] 2xl:h-[42rem] rounded-lg bg-white overflow-hidden '
         data={filas} datosFooter={datosParaFooter} estaProcesado={estaProcesado} />
      </div>
    </div>
  );
}
