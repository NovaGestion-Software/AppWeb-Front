import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaWarehouse } from "react-icons/fa6";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import { obtenerRubrosDisponibles } from "@/services/ApiPhpService";
import { DepositoModal, MarcaModal } from "@/types";
import { useFiltros } from "./hooks/useFiltros";
import ViewTitle from "@/frontend-resourses/components/Labels/ViewTitle";
import ModalFiltro from "@/frontend-resourses/components/Modales/ModalFiltro";
import showAlert from "@/frontend-resourses/utils/showAlert";
import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import TablaSeccionRubro from "./componentes/TablaSeccionRubro";
import TablaStock from "./componentes/TablaStock";
import ListaItemsPedidos from "./componentes/ListaItemsPedidos";
import ShowModalButtons from "./componentes/ShowModalButtons";
import GrupoInputsRadio from "./componentes/GrupoInputsRadio";
import Botonera from "./componentes/Botonera";

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

    buscado,
    setBuscado,
    idsCoincidentes,
    indiceSeleccionado,
    indiceGlobal,
    ultimoIndiceBusqueda,
    setIndiceGlobal,
    setIdsCoincidentes,
    setIndiceSeleccionado,
    setUltimoIndiceBusqueda,
    setNavegandoCoincidentes,
    setModoNavegacion,
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
  const propsShowModales = {
    propsShowModal: {
      setShowRubros: setShowRubrosModal,
      setShowMarcas: setShowMarcasModal,
      setShowDepositos: setShowDepositosModal,
    },
    status: status,
  };
  const propsBusqueda = {
    data: productos,
    store: useStockPorSeccion,
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
      itemKey: "codigo",
      busquedaKeyText: ["descripcion", "nmarca"],
      busquedaKeyCode: ["codigo"],
      textLabelProperty: "Descripción o Marca",
      codeLabelProperty: "Codigo",
    },
  };
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

  // CAMBIO DE ESTADO
  useEffect(() => {
    if (tablaStock?.length === 0) {
      setStatus("idle");
    } else {
      setStatus("success");
    }
  }, [status, setStatus, tablaStock]);

  useEffect(() => {
    if (rubrosPendientesData?.length > 0) {
      handleError();
    }
  }, [rubrosPendientesData]);

  // RENDERIZADO DE ITEMS DE LOS MODALES
  function renderMarcaItem(item: MarcaModal) {
    return <>{item.nmarca}</>;
  }

  function renderDepositoItem(item: DepositoModal) {
    return (
      <>
        {item.deposito} - {item.ndeposito}{" "}
      </>
    );
  }

  async function handleClean() {
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
  }

  // Función para mostrar cartel de error si no hay rubros traídos
  function handleError() {
    if (rubrosPendientes?.length > 0) {
      showAlert({
        title: "Upps!",
        html: `
  <p>Los siguientes rubros no se han podido traer:</p>
  <ul style="color: #f79c09;">
    ${rubrosPendientesData.map((rubro) => `<li>${rubro.nombre}</li>`).join("")}
  </ul>
`,
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
  }

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
               v1920:col-start-3 v1920:gap-6  "
        />

        {/**SHOW DEPOSITOS, RUBROS Y MARCAS*/}
        <ShowModalButtons
          props={propsShowModales}
          className="flex gap-6 items-center h-10
                      col-start-2 col-span-5 row-start-2  v1440:h-11
                      v1536:col-start-2 v1536:relative right-8  
                      v1920:col-start-2 v1920:-right-12 "
        />
        <BusquedaInputs
          props={propsBusqueda}
          className=" w-fit bg-white relative right-2.5
                      col-start-5 row-start-2 col-span-5 
                      v1440:right-8
                      v1536:px-4 v1536:h-11 v1536:col-start-5 v1536:right-12
                      v1920:col-start-5 "
        />
        <Botonera
          className=" flex  w-fit  p-1.5  relative left-12 items-center bg-white rounded-lg shadow-sm shadow-gray-600
                      col-start-9 col-span-2 row-start-2
                       v1440:px-2 
                      v1536:col-span-3 v1536:h-11 v1536:col-start-8 v1536:left-24
                      v1920:col-start-8 v1920:-left-6 v1920:px-4  "
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
          <ListaItemsPedidos titulo="Rubros" className="h-1/2" rubrosPendientesData={rubrosPendientesData} rubrosTraidosData={rubrosTraidosData} />
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
