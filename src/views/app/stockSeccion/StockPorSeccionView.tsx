import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DepositoModal, MarcaModal } from "@/types";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import { obtenerRubrosDisponibles } from "@/services/ApiPhpService";
import ViewTitle from "@/frontend-resourses/components/Labels/ViewTitle";
import HerramientasComponent from "../informes/ventasXHora/components/HerramientasComponent";
import OrdenarPorCheckbox from "./componentes/OrdernarPorCheckbox";
import FiltroPorStock from "./componentes/FiltroPorStock";
import FiltrarPorTipo from "./componentes/FiltrarPorTipo";
import FiltrarSegunLista from "./componentes/FiltrarSegunLista";
import ModalFiltro from "@/frontend-resourses/components/Modales/ModalFiltro";
import BusquedaStock from "./componentes/BusquedaStock";
import TablaSeccionRubro from "./componentes/TablaSeccionRubro";
import TablaStock from "./componentes/TablaStock";
import ActionButton from "@/Components/ui/Buttons/ActionButton";
import { useFiltros } from "./hooks/useFiltros";
import showAlert from "@/frontend-resourses/utils/showAlert";
import ListaItemsPedidos from "./componentes/ListaItemsPedidos";
import { FaWarehouse } from "react-icons/fa6";
import ShowModalButtons from "./componentes/ShowModalButtons";
import GrupoInputsRadio from "./componentes/GrupoInputsRadio";

export default function StockPorSeccionView() {
  // show modals de filtros
  const [showMarcasModal, setShowMarcasModal] = useState(false);
  const [showDepositosModal, setShowDepositosModal] = useState(false);
  // show modal rubros
  const [showRubrosModal, setShowRubrosModal] = useState(true);
  // Estaprocesado
  const isProcessing = false;
  // hook filtros
  const { aplicarFiltros, aplicarOrdenamiento } = useFiltros();
  // store
  const {
    tablaStock,
    rubrosPendientes,
    rubrosPendientesData,
    rubrosTraidosData,
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
    status,
    resetStore,
  } = useStockPorSeccion();

  // seteo de arrays para filtros.
  const depositosFiltroSeleccionados = depositosSeleccionados.map((d) => d.deposito);
  const depositosFiltroDisponibles = depositosDisponibles.map((d) => d.deposito);
  const marcasFiltrosSeleccionados = marcasSeleccionadas.map((m) => m.nmarca);
  // props de filtros
  const propsFiltros = {
    stockRenderizado: stockRenderizado,
    stateFiltros: checkboxSeleccionados,
    filtrarStock: {
      grupo: checkboxSeleccionados?.grupo2 || null,
    },
    filtradoSimple: {
      itemsDisponibles: marcasFiltrosSeleccionados,
      key: "nmarca",
    },
    filtradoComplejo: {
      itemsDisponibles: depositosFiltroDisponibles,
      claveDepositos: "stockPorDeposito",
      itemsSeleccionados: depositosFiltroSeleccionados,
    },
    listaPrecios: { grupo: checkboxSeleccionados?.grupo3 || "CONTADO" },
  };
  // criterios de ordenamiento
  const criterios = [
    { case: "Codigo", key: "codigo", type: "number" },
    { case: "Marca", key: "nmarca", type: "string" },
    { case: "Descripcion", key: "descripcion", type: "string" },
  ];
  // fetch TABLA PARA RUBROS
  const { data: rubrosDis } = useQuery({
    queryKey: ["rubros-seccion"],
    queryFn: obtenerRubrosDisponibles,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  // Set DatosRubros
  useEffect(() => {
    if (rubrosDis) {
      setDatosRubros(rubrosDis.data);
    }
  }, [rubrosDis]);

  // SET FILTROS DE CHECKBOXS
  useEffect(() => {
    if (stockRenderizado.length > 0) {
      setCheckboxSeleccionados("grupo1", "Talles");
      setCheckboxSeleccionados("grupo2", "Todos");
      setCheckboxSeleccionados("grupo3", "CONTADO");
      setCheckboxSeleccionados("grupo4", "Descripcion"); // Asegúrate de que este valor sea válido
    }
  }, [stockRenderizado, setCheckboxSeleccionados]);

  // APLICACIÓN DE FILTROS, PRECIOS Y REORDENAMIENTO
  useEffect(() => {
    if (stockRenderizado.length === 0) return;
    const filtrados = aplicarFiltros(propsFiltros);
    const datosOrdenados = aplicarOrdenamiento(filtrados, checkboxSeleccionados, ...criterios);
    // set Productos
    setProductos(datosOrdenados);
  }, [stockRenderizado, checkboxSeleccionados.grupo1, checkboxSeleccionados.grupo2, checkboxSeleccionados.grupo3, checkboxSeleccionados.grupo4, depositosSeleccionados, marcasSeleccionadas]);
  // RENDERIZADO DE ITEMS DE LOS MODALES
  const renderMarcaItem = (item: MarcaModal) => {
    return <>{item.nmarca}</>;
  };
  const renderDepositoItem = (item: DepositoModal) => {
    return (
      <>
        {item.deposito} - {item.ndeposito}{" "}
      </>
    );
  };

  console.log("rubros", datosRubros);
  // CAMBIO DE ESTADO
  useEffect(() => {
    if (tablaStock?.length === 0) {
      setStatus("idle");
    } else {
      setStatus("success");
    }
  }, [status, setStatus, tablaStock]);
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

  const handleClean = async () => {
    const result = await showAlert({
      title: "¿Estás seguro?",
      text: "Todo el progreso se perderá",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí, limpiar todo",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      resetStore();
    }
  };

  //Funcion para mostrar cartel de error si no hay rubros traidos.
  // parece que rubros pendientes esta a destiempo porque utilizxa una variable que se setea antes de que se muestre el error
  // y toma los datos atrasados.
  // hacer modos de prueba de cuando data viene vacio y cuando data viene con un item pero menos de 5  o cuando viene con mas
  const handleError = () => {
    if (rubrosPendientes?.length > 0) {
      showAlert({
        title: "Upps!",
        text: `Los siguientes rubros no se han podido traer: ${rubrosPendientesData.map((rubro) => {
          return rubro.nombre;
        })}.`,
        icon: "info",
        timer: 3000,
      });
    }
    if (rubrosPendientes?.length > 5) {
      showAlert({
        title: "Upps!",
        text: `Hay rubros que no se han podido traer.`,
        icon: "info",
        timer: 3000,
      });
    }
  };

  useEffect(() => {
    if (rubrosPendientes?.length > 0) {
      handleError();
    }
  }, [rubrosPendientes]);

  const propsShowModales = {
    propsShowModal: {
      setShowRubros: setShowRubrosModal,
      setShowMarcas: setShowMarcasModal,
      setShowDepositos: setShowDepositosModal,
    },
    status: status,
  };
  return (
    <div className="w-full h-lvh   ">
      <ViewTitle title={"Stock por Sección"} />
      {/** HERRAMIENTAS DE LA VISTA */}
      <div className="grid grid-cols-10 grid-rows-2 gap-y-2  px-8 pt-2 pb-0">
        {/**Inputs Radio */}
        <GrupoInputsRadio
          className="justify-between              
               col-start-2 col-span-9 row-span-1  row-start-1 
               v1440:justify-start   v1440:gap-8
               v1536:col-start-2 v1536:gap-12 v1536:col-span-9
               v1920:col-start-3 v1920:gap-6  " />

        {/**SHOW DEPOSITOS, RUBROS Y MARCAS*/}
        <ShowModalButtons
          props={propsShowModales}
          className="flex gap-6 items-center w-fit h-10
         bg-white px-3 rounded-lg  
           col-start-2 col-span-5 row-start-2 
            v1536:col-start-2 
            v1920:col-start-3 v1920:relative v1920:right-8
            "
        />
        {/**Inputs Busqueda*/}
        <BusquedaStock
          className=" w-fit bg-white relative right-2.5
        col-start-5 row-start-2 col-span-5 
        v1440:right-8
        v1536:px-4 v1536:col-start-5 v1536:right-12
        v1920:col-start-5 "
        />
        <HerramientasComponent
          className=" flex  w-fit h-10 px-2 relative left-12 items-center bg-white  rounded-lg
                      col-start-9 col-span-2 row-start-2
                      v1440:-left-3
                      v1536:col-span-3 v1536:col-start-8 v1536:left-24
                      v1920:col-start-8 v1920:-left-6"
          data={productos}
          handleClean={handleClean}
          estaProcesado={!isProcessing}
          modalSucursales={false}
          disabled={status === "idle"}
        />
      </div>

      {/**TABLA STOCK */}
      <div className="grid grid-cols-10  px-8 py-2">
        <div className="flex items-start gap-2 justify-center col-span-full">
          {/** LISTA */}
          <ListaItemsPedidos className="h-1/2" rubrosPendientesData={rubrosPendientesData} rubrosTraidosData={rubrosTraidosData} />
          <TablaStock />
        </div>
      </div>

      {/** MODALES */}

      {/** TABLA RUBROS */}
      <TablaSeccionRubro data={datosRubros} showRubrosModal={showRubrosModal} setShowRubrosModal={setShowRubrosModal} />
      {/** MODAL DE FILTRO  DEPOSITOS */}
      <ModalFiltro<DepositoModal>
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
        addIconClassName=" text-white w-14 h-12 m-0 flex items-center justify-center "
        iconReact={<FaWarehouse size={28} />}
      />
      {/** MODAL DE FILTRO MARCAS */}
      <ModalFiltro<MarcaModal>
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
