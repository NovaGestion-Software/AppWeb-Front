import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DepositoModal, MarcaModal, Precios } from "@/types";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import { obtenerRubrosDisponibles } from "@/services/ApiPhpService";
import ViewTitle from "@/Components/ui/Labels/ViewTitle";
import HerramientasComponent from "../informes/ventasXHora/components/HerramientasComponent";
import OrdenarPorCheckbox from "./componentes/OrdernarPorCheckbox";
import FiltroPorStock from "./componentes/FiltroPorStock";
import FiltrarPorTipo from "./componentes/FiltrarPorTipo";
import FiltrarSegunLista from "./componentes/FiltrarSegunLista";
import FiltroModal from "@/layouts/FiltrosModal";
import BusquedaStock from "./componentes/BusquedaStock";
import TablaSeccionRubro from "./componentes/TablaSeccionRubro";
import TablaStock from "./componentes/TablaStock";
import ActionButton from "@/Components/ui/Buttons/ActionButton";
import { useFiltros } from "./hooks/useFiltros";
import { formatPrice } from "./utils/formatPrice";

export default function StockPorSeccionView() {
  const [showMarcasModal, setShowMarcasModal] = useState(false);
  const [showDepositosModal, setShowDepositosModal] = useState(false);
  const [showRubrosModal, setShowRubrosModal] = useState(true);
  const isProcessing = false;
  const { aplicarFiltros, aplicarOrdenamiento } = useFiltros();

  // store
  const {
    tablaStock,
    stockRenderizado,
    datosRubros,
    setDatosRubros,
    setProductos,
    checkboxSeleccionados,
    marcasSeleccionadas,
    marcasDisponibles,
    setMarcasDisponibles,
    setMarcasSeleccionadas,
    depositosDisponibles,
    depositosSeleccionados,
    setDepositosDisponibles,
    setDepositosSeleccionados,
    setCheckboxSeleccionados,
    setStatus,
    productos,
    status
  } = useStockPorSeccion();

  // TABLA PARA RUBROS
  const { data: rubrosDis } = useQuery({
    queryKey: ["rubros-seccion"],
    queryFn: obtenerRubrosDisponibles,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  // Setea los rubros
  useEffect(() => {
    if (rubrosDis) {
      setDatosRubros(rubrosDis.data);
      console.log("rubrosDis", rubrosDis.data);
    }
  }, [rubrosDis]);

 
  // SETEA FILTROS DE CHECKBOXS
  useEffect(() => {
    if (stockRenderizado.length > 0) {
      setCheckboxSeleccionados("grupo1", "Talles");
      setCheckboxSeleccionados("grupo2", "Todos");
      setCheckboxSeleccionados("grupo3", "CONTADO");
      setCheckboxSeleccionados("grupo4", "Descripcion"); // Asegúrate de que este valor sea válido
    }
  }, [stockRenderizado, setCheckboxSeleccionados]);
  const getPrecioKey = (grupo3: string): keyof Precios => {
    return grupo3 === 'LISTA 2' ? 'lista2' : 
           grupo3 === 'LISTA 3' ? 'lista3' : 'contado';
  };
  
  // APLICACIÓN DE FILTROS, PRECIOS Y REORDENAMIENTO
  useEffect(() => {
    if (stockRenderizado.length === 0) return;
    const filtrados = aplicarFiltros();
    const precioKey = getPrecioKey(checkboxSeleccionados.grupo3 || "CONTADO");
    const productosConPrecio = filtrados.map(item => ({
      ...item,
      precio: formatPrice(item.precios[precioKey]),
    }));
    const ordenados = aplicarOrdenamiento(productosConPrecio);
    
    setProductos(ordenados);
  }, [
    stockRenderizado,
    checkboxSeleccionados.grupo1,
    checkboxSeleccionados.grupo2,
    checkboxSeleccionados.grupo3, 
    checkboxSeleccionados.grupo4,
    depositosSeleccionados,
    marcasSeleccionadas
  ]);
  // RENDERIZADO DE ITEMS DE LOS MODALES
  const renderMarcaItem = (item: MarcaModal) => { return <>{item.nmarca}</>; };
  const renderDepositoItem = (item: DepositoModal) => { return (   <>{item.deposito} - {item.ndeposito} </>);   };

  // CAMBIO DE ESTADO 
  useEffect(() => {
    if(tablaStock?.length === 0) { setStatus("idle") }
    else { setStatus("success")} 
  }, [status, setStatus, tablaStock]);

// tabla stock tiene los datos actuales, los datos actuales se pasan por datos agrupados y se setean en stock renderizado.
// la pregunta es que pasa si agrego mas datos, a tablastock, se vuelve a hacer la peticion y se setea stock renderizado con los nuevos datos? pero se puede conservar los anteriores no?
// ya tenemos en la store rubrostofetch que serian los que ya fueron llamados.

  // Tabla stock serian los datos originales del endpoint
  // Stock Renderizado es el resultado de la funcion agrupar por stock
  // Productos es una copia de stock renderizado
  // Productos es lo que se muestra en la tabla
  // En los filtros tengo que usar una copia de productos, porque siempre tiene que ser sobre lo que se ve actualmente en la tabla.
  // Escuchando las alteraciones en el estado de itemsSeleccionados correspondiente de cada filtro
  // Modificarla segun el filtro
  // Terminar seteando productos con el nuevo estado.

  // La copia para los filtros no se hace sobre productos porque en negativos por ejemplo no hay productos con stock, y viceversa.
  // Si es filtro por negativo se hace sobre stock renderizado, si es con stock se hace sobre stock renderizado.
  // Si el filtro es de ordenamiento se hace sobre productos.
  // Si el filtro es talles o articulos se hace sobre Stock renderizado.

  // La busqueda tiene que ser sobre los elementos de la tabla, es decir Productos.
  return (
    <div className="w-full h-full  ">
      <ViewTitle title={"Stock por Sección"} /> 
      {/** HERRAMIENTAS DE LA VISTA */}
      <div className="grid grid-cols-10 grid-rows-2 px-2 py-2">
      {/**BOTONES SHOW MODAL DEPOSITOS Y RUBROS - ORDENAR POR CHECKBOXS( CODIGO , MARCA Y DESCRIPCION )*/}
      <div className="flex gap-6 items-center mt-3 mb-1 w-fit h-10 bg-white py- px-3 rounded-lg col-start-3 col-span-5 2xl:col-span-3 2xl:col-start-4 ">
          <ActionButton
            text="Depósitos"
            onClick={() => setShowDepositosModal(true)}
            disabled={status === "idle"}
            color="blue"
            size="xs"
          />
          <ActionButton
            text="Rubros"
            onClick={() => setShowRubrosModal(true)}
            disabled={false}
            color="blue"
            size="xs"
          />
          {/** GRUPO 4 - FUNCION PARA RE ORDENAR*/}
          <OrdenarPorCheckbox />
        </div>
        {/** EXPORTORTAR A EXCEEL E IMPRIMIR. */}
        <div className="p-1 my-1 rounded-lg col-span-2 
        col-start-8 2xl:col-span-2 2xl:col-start-7 2xl:left-10 2xl:relative 2xl:px-4">
          <HerramientasComponent
            data={productos}
            isProcessing={!isProcessing}
            datosParaFooter={datosRubros}
            modalSucursales={false}
            disabled={status === "idle"}

          />
        </div>

        {/**CON STOCK, TODOS, NEGATIVOS - CONTADO, LISTA 2, LISTA 3 */}
        <div className="flex gap-2 my-1 items-center rounded-lg 
        col-start-3 col-span-8 row-span-1  2xl:col-span- 2xl:col-start-4">
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
        <div className="flex gap-3 my-1 items-center w-fit 
        row-start-2 border px-1 rounded-lg bg-white col-start-3
         col-span-7 2xl:col-span-5 2xl:px-4 2xl:col-start-4">
          <BusquedaStock />
          <ActionButton
            text="Marcas"
            color="blue"
            disabled={status === "idle"}
            onClick={() => setShowMarcasModal(true)}
            size="xs"
          />
        </div>
      </div>
      {/**TABLA STOCK */}
      <div className="grid grid-cols-12 px-4 py-2">
        <div className="flex items-center justify-center col-span-full p-2 pb-5">
          <TablaStock />
        </div>
      </div>
      {/** TABLA RUBROS */}
      <TablaSeccionRubro
        data={datosRubros}
        showRubrosModal={showRubrosModal}
        setShowRubrosModal={setShowRubrosModal}
      />
      {/** MODAL DE FILTRO  DEPOSITOS */}
      <FiltroModal<DepositoModal>
        title="Depósitos"
        showModal={showDepositosModal}
        setShowModal={setShowDepositosModal}
        datos={depositosDisponibles} 
        itemsDisponibles={depositosDisponibles}
        itemsSeleccionados={depositosSeleccionados}
        setItemsDisponibles={setDepositosDisponibles}
        setItemsSeleccionados={setDepositosSeleccionados}
        renderItem={renderDepositoItem}
        disabled={status === "idle"}
        disabled2={status === "idle"}
        
      />
      {/** MODAL DE FILTRO MARCAS */}
      <FiltroModal<MarcaModal>
        title="Marcas"
        showModal={showMarcasModal}
        setShowModal={setShowMarcasModal}
        datos={marcasDisponibles}
        itemsDisponibles={marcasDisponibles}
        itemsSeleccionados={marcasSeleccionadas}
        setItemsDisponibles={setMarcasDisponibles}
        setItemsSeleccionados={setMarcasSeleccionadas}
        renderItem={renderMarcaItem}
        disabled={status === "idle"}
        disabled2={status === "idle"}
      />
    </div>
  );
}
