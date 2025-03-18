import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TablaSecciones } from '@/types';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { obtenerRubrosDisponibles } from '@/services/ApiPhpService';
import ViewTitle from '@/Components/ui/Labels/ViewTitle';
import HerramientasComponent from '../informes/ventasXHora/components/HerramientasComponent';
import VerFoto from './componentes/VerFoto';
import OrdenarPorCheckbox from './componentes/OrdernarPorCheckbox';
import FiltroPorStock from './componentes/FiltroPorStock';
import FiltrarPorTipo from './componentes/FiltrarPorTipo';
import FiltrarSegunLista from './componentes/FiltrarSegunLista';
import FiltroModal from '@/layouts/FiltrosModal';
import BusquedaStock from './componentes/BusquedaStock';
import TablaSeccionRubro from './componentes/TablaSeccionRubro';
import TablaStock from './componentes/TablaStock';
import ActionButton from '@/Components/ui/Buttons/ActionButton';

export default function StockPorSeccion() {
  const [showMarcasModal, setShowMarcasModal] = useState(false);
  const [showTemporadasModal, setShowTemporadasModal] = useState(false);
  const [showDepositosModal, setShowDepositosModal] = useState(false);
  const [showRubrosModal, setShowRubrosModal] = useState(true);
  const isProcessing = false;
  let depositos = ['Chacabuco', 'San Juan', 'Almagro', 'La Boca'];
  let temporadas = ['Clasico', 'Anual', 'Verano', 'Invierno'];

  // state para rubros
  const [datos, setDatos] = useState<TablaSecciones[]>([]);

  //STORE
  const {
    stockRenderizado,
    marcasDisponibles,
    marcasSeleccionadas,
    setMarcasDisponibles,
    setMarcasSeleccionadas,
    depositosDisponibles,
    depositosSeleccionadas,
    setDepositosDisponibles,
    setDepositosSeleccionadas,
    temporadasDisponibles,
    temporadasSeleccionadas,
    setTemporadasDisponibles,
    setTemporadasSeleccionadas,
  } = useStockPorSeccion();

  // console.log('stock renderizado', stockRenderizado)
  // console.log('stock ', tablaStock )

  // TABLA PARA RUBROS
  const { data: rubrosDis } = useQuery({
    queryKey: ['rubros-seccion'],
    queryFn: obtenerRubrosDisponibles,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  useEffect(() => {
    if (rubrosDis) {
      setDatos(rubrosDis.data);
    }
  }, [rubrosDis]);

  // const { data: stockDis } = useQuery({
  //   queryKey: ['rubros-stock'],
  //   queryFn: obtenerProductos,
  //   refetchOnWindowFocus: false,
  //   staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  // });

  // console.log('stock', stockDis)

  return (
    <div className="w-full h-full px-4 pt-0 overflow-hidden">
      <ViewTitle title={'Stock por Seccion'} />
      <div className="grid grid-cols-11 grid-rows-1 rounded py-2 px-8 h-11 items-center mt-1">
        {/**BOTONES SHOW MODAL DEPOSITOS Y RUBROS - ORDENAR POR CHECKBOXS( CODIGO , MARCA Y DESCRIPCION )*/}
        <div className="flex gap-6 items-center w-fit bg-white py-1 px-3 rounded-lg col-start-4 col-span-5 2xl:col-span-3 2xl:col-start-4 ">
          <ActionButton
            onClick={() => setShowDepositosModal(true)}
            text="Depositos"
            disabled={false}
            color="blue"
            size="xs"
          />
          <ActionButton
            onClick={() => setShowRubrosModal(true)}
            text="Rubros"
            disabled={false}
            color="blue"
            size="xs"
          />
          {/** GRUPO 4 - FUNCION PARA RE ORDENAR*/}
          <OrdenarPorCheckbox />
        </div>

        {/** EXPORTORTAR A EXCEEL E IMPRIMIR. */}
        <div className="p-1 rounded-lg  col-span-2 col-start-9 2xl:col-span-2 2xl:col-start-7 2xl:left-10 2xl:relative 2xl:px-4 ">
          <HerramientasComponent
            data={stockRenderizado}
            isProcessing={!isProcessing}
            datosParaFooter={datos}
            modalSucursales={false}
          />
        </div>
      </div>

      {/** HERRAMIENTAS DE LA VISTA */}
      <div className="grid grid-cols-10 grid-rows-2 space-x-4 px-2">
        {/**FOTO Y BOTONES */}
        <div className="col-start-1 row-start-1 col-span-2 row-span-2 2xl:left-0 2xl:col-start-2 ">
          <VerFoto />
        </div>

        {/**CON STOCK, TODOS, NEGATIVOS - CONTADO, LISTA 2, LISTA 3 */}
        <div className="flex gap-2 items-center rounded-lg col-start-3 col-span-8 row-span-1  2xl:col-span- 2xl:col-start-4">
          {/**GRUPO 1 */}
          <div className="border p-1 bg-white rounded-lg">
            <FiltrarPorTipo />
          </div>
          {/** GRUPO 2 */}
          <div className="border p-1 bg-white rounded-lg">
            <FiltroPorStock />
          </div>
          {/**GRUPO 3 -  */}
          <div className="border p-1 bg-white rounded-lg">
            <FiltrarSegunLista />
          </div>
        </div>

        {/**INPUTS BUSCAR - BOTONES SHOW MODAL TEMPORADAS Y MARCAS */}
        <div className="flex gap-3 items-center w-fit row-start-2 border px-1 rounded-lg bg-white col-start-3 col-span-7 2xl:col-span-5 2xl:px-4 2xl:col-start-4">
          <BusquedaStock data={stockRenderizado} />

          <ActionButton
            text="Temporadas"
            color="blue"
            onClick={() => setShowTemporadasModal(true)}
            size="xs"
          />
          <ActionButton
            text="Marcas"
            color="blue"
            onClick={() => setShowMarcasModal(true)}
            size="xs"
          />
        </div>

        {/**VER MOVIMIENTOS EN INVETARIO */}
        {/* <div className="flex items-end justify-center col-start-11 col-span-1  row-span-2   ">
          <div className="flex items-center justify-center bg-slate-200 p-2 cursor-pointer rounded-lg w-[4.2rem] h-[4.1rem]">
            <img
              src="/img/icons/inspection.png"
              alt="Ver Movimientos"
              className="w-12 h-12"
            />
          </div>
        </div> */}
      </div>

      {/**TABLA STOCK */}
      <div className="grid grid-cols-12 px-4 py-2">
        <div className="flex items-center justify-center col-span-full ">
          <TablaStock />
        </div>
      </div>

      {/** MODAL DE TABLA */}
      <TablaSeccionRubro
        data={datos}
        showRubrosModal={showRubrosModal}
        setShowRubrosModal={setShowRubrosModal}
      />

      <FiltroModal
        title="Marcas"
        showModal={showMarcasModal}
        setShowModal={setShowMarcasModal}
        datos={stockRenderizado.map((item) => item.marca)} // Datos originales
        itemsDisponibles={marcasDisponibles}
        itemsSeleccionados={marcasSeleccionadas}
        setItemsDisponibles={setMarcasDisponibles}
        setItemsSeleccionados={setMarcasSeleccionadas}
      />

      <FiltroModal
        title="Depositos"
        showModal={showDepositosModal}
        setShowModal={setShowDepositosModal}
        datos={depositos.map((item) => item)} // Datos originales
        itemsDisponibles={depositosDisponibles}
        itemsSeleccionados={depositosSeleccionadas}
        setItemsDisponibles={setDepositosDisponibles}
        setItemsSeleccionados={setDepositosSeleccionadas}
      />

      <FiltroModal
        title="Temporadas"
        showModal={showTemporadasModal}
        setShowModal={setShowTemporadasModal}
        datos={temporadas.map((item) => item)} // Datos originales
        itemsDisponibles={temporadasDisponibles}
        itemsSeleccionados={temporadasSeleccionadas}
        setItemsDisponibles={setTemporadasDisponibles}
        setItemsSeleccionados={setTemporadasSeleccionadas}
      />
    </div>
  );
}
