import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useVentasHoraStore } from "@/views/app/informes/ventasXHora/store/useVentasHoraStore";
import { obtenerVentasHora } from "@/services/ApiPhpService";
import { FechasRango, SucursalesModal, VentaPorHora } from "@/types";
import { formatearNumero } from "@/utils";
import ViewTitle from "@/frontend-resourses/components/Labels/ViewTitle";
import dayjs from "dayjs";

import HerramientasComponent from "./components/HerramientasComponent";
import TablaVentaPorHora from "./components/TablaVentaPorHora";
// import showAlert from "@/utils/showAlert";
import ModalFiltro from "@/frontend-resourses/components/Modales/ModalFiltro";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import GraficoConZoom from "@/frontend-resourses/components/Charts/GraficoConZoom";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";

import { extraerItems, extraerItemsDeIndice, agruparPorIndice, crearDataParaTablaModular, obtenerValorMaximoConIndice } from "@/frontend-resourses/utils/dataManipulation";
import { ListaFiltrosAplicados } from "@/frontend-resourses/components/Complementos/ListaFiltrosAplicados";
import { FaStoreAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export type ConfigKeys = {
  filtroKey: string;
  agrupadorKey: string;
  innerArrayKey: string;
  sumaKeys: string[];
  convertir: string[];
};
type ColumnaTabla = {
  key: string; // Clave interna, ej: "importe"
  label: string; // Clave en el objeto final, ej: "importeFormateado"
  calcularPorcentaje?: boolean; // Si se calcula %
  totalKey?: string; // A cuál total se relaciona
  parseNumber?: boolean; // Si hay que parsear antes de hacer % (como "importe" con punto)
};
export type ConfigTabla = {
  agrupadorKey: string; // ej: "hora"
  columnas: ColumnaTabla[];
};

export default function VentasHoraView() {
  //const [procesado, setProcesado] = useState<boolean>(false);
  // prueba de _ para deploy
  const [_footer, setFooter] = useState<boolean>(false);
  const [foco, setFoco] = useState<boolean>(false);
  const [showModalSucursales, setShowModalSucursales] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // configuracion grafico
  const configuracionGrafico = [
    { label: "horaini", key: "horaini" },
    { label: "nOperaciones", key: "nOperaciones" },
  ];
  // configuracion agrupar indice
  const config: ConfigKeys = {
    filtroKey: "nsucursal",
    agrupadorKey: "horaini",
    innerArrayKey: "info",
    sumaKeys: ["importe", "cantidad", "pares"],
    convertir: ["importe"],
  };
  // Configuracion de tabla
  const configTabla: ConfigTabla = {
    agrupadorKey: "horaini",
    columnas: [
      {
        key: "cantidad",
        label: "nOperaciones",
        calcularPorcentaje: true,
        totalKey: "cantidad",
      },
      {
        key: "importe",
        label: "importe",
        calcularPorcentaje: true,
        totalKey: "importe",
        parseNumber: true,
      },
      {
        key: "pares",
        label: "pares",
        calcularPorcentaje: true,
        totalKey: "pares",
      },
    ],
  };

  //store
  const {
    // estados
    estaProcesado,
    setEstaProcesado,
    status,
    //   setStatus,
    // dates
    fechas,
    setFechas,
    // filtros
    sucursalesSeleccionadas,
    sucursalesDisponibles,
    setSucursalesSeleccionadas,
    setSucursalesDisponibles,
    clearSucursalesSeleccionadas,
    clearSucursalesDisponibles,
    // datos
    // ventasPorHora,
    // setVentasPorHora,
    clearVentasPorHora,
  } = useVentasHoraStore();

  // // llamado a fetch
  // const { mutate } = useMutation<ApiResponse, Error, FechasRango>({
  //   mutationFn: () => obtenerVentasHora(fechas),
  //   onMutate: () => {
  //     setStatus("pending");
  //   },
  //   onError: (error) => {
  //     console.error("Error al obtener los datos:", error);
  //     setStatus("error");
  //   },
  //   onSuccess: (data) => {
  //     // console.log(data.data);
  //     if (data.data.length === 0) {
  //       showAlert({
  //         text: "El rango de fecha seleccionado no contiene información",
  //         icon: "error",
  //         cancelButtonText: "Cerrar",
  //         showCancelButton: true,
  //         timer: 2200,
  //       });
  //     }
  //     setVentasPorHora(data.data);
  //     // setSucursalesDisponibles(data.data.map((sucursal) => sucursal.nsucursal));
  //     // setSucursalesSeleccionadas(data.data.map((sucursal) => sucursal.nsucursal));
  //     // setProcesado(true);
  //     // setFooter(true);
  //     setStatus("success");
  //   },
  //   onSettled: () => {
  //     setStatus("idle");
  //   },
  // });

  // cambie el use mutation por el useQuery para mantener los datos de la tabla almacenados en cache.
  // la idea es que los datos persistan en la cache y no almacenarlos en la store de zustand.
  // Al parecer como enfoque global es mejor usar useQuery para mantener los datos en cache
  // y dejar la store para cosas mas puntuales como los filtros y estados de la vista.

  // Fetch de datos con cache
  const { data, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["ventas", fechas],
    queryFn: () => (fechas ? obtenerVentasHora(fechas) : null),
    enabled: false, // Control manual
    staleTime: 5 * 60 * 1000,
    select: (response) => response.data,
  });

  //console.log("ventas por hora", ventasPorHora);
  // let existenDatos = ventasPorHora && ventasPorHora.length > 0;
  let existenDatos = data && data.length > 0;

  const dataFinal = data || [];
  // const dataFinal = ventasPorHora || [];

  // console.log("data final", dataFinal);

  // Formateo a array de strings
  const sucursalesDisponiblesStr = sucursalesDisponibles.map((s) => s.nsucursal);
  const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.nsucursal);

  // extrae horarios para indice.
  const indiceTabla = useMemo(() => (dataFinal ? extraerItemsDeIndice(dataFinal, "info", "horaini") : []), [dataFinal]);
  //console.log("indiceTabla", indiceTabla);

  // funcion agrupar por horario, te suma los totales en base a sumKey
  const { datos, totales } = useMemo(() => agruparPorIndice(dataFinal, sucursalesSeleccionadasStr, indiceTabla, config, formatearNumero), [dataFinal, sucursalesSeleccionadasStr, indiceTabla]);

  // console.log("datos", datos);

  // crea datos en estructura de tabla.1
  const filasGenericas = useMemo(() => crearDataParaTablaModular(datos, totales, configTabla), [datos, totales]);

  // seteo de filas segun VentaPorHora
  const filas: VentaPorHora[] = useMemo(
    () =>
      filasGenericas.map((fila) => ({
        id: fila.id as number,
        horaini: fila.horaini as string,
        nOperaciones: fila.nOperaciones as number,
        porcentajeNOperaciones: fila.porcentajeNOperaciones as string,
        importe: fila.importe as string,
        porcentajeImporte: fila.porcentajeImporte as string,
        pares: fila.pares as number,
        porcentajePares: fila.porcentajePares as string,
      })),
    [filasGenericas]
  );

  // esto es para setar los highLight
  // obtiene la fila que tiene el mayor importe y su indice (horario)
  const destacados = obtenerValorMaximoConIndice(filas, "importe", "horaini");
  const maxImporteFormateado = formatearNumero(destacados.maxValue);

  // formateo con miles y centavos del importe maximo para el footer
  const totalImporteFormateado = formatearNumero(totales.importe);

  // seteo de destacados.
  const indiceString = `${dayjs(fechas.from).format("DD/MM/YYYY")} - ${dayjs(fechas.to).format("DD/MM/YYYY")}`;
  const destacadosObject = {
    indice: indiceString,
    destacados: [
      { label: "Mayor Importe $", valor: maxImporteFormateado },
      { label: "Horario", valor: destacados.indice },
    ],
  };
  console.log(destacadosObject);

  // FOOTER TABLA 1
  const datosParaFooter = estaProcesado
    ? {
        hora: "",
        nOperaciones: totales.cantidad,
        porcentajeOperaciones: "",
        pares: totales.pares,
        porcentajePares: "",
        importe: totalImporteFormateado,
        porcentajeImporte: "",
      }
    : {
        hora: "",
        nOperaciones: "",
        porcentajeOperaciones: "",
        pares: "",
        porcentajePares: "",
        importe: "",
        porcentajeImporte: "",
      };

  // render sucursalesitems
  const renderSucursalesItem = (item: SucursalesModal) => {
    return (
      <>
        {item.nsucursal} - {item.sucursal}
      </>
    );
  };

  // Set Filtros
  const lastProcessedRef = useRef<number>(0);

  useEffect(() => {
    const yaHayFiltros = sucursalesSeleccionadas.length > 0;

    if (existenDatos && !yaHayFiltros && dataUpdatedAt > lastProcessedRef.current) {
      lastProcessedRef.current = dataUpdatedAt;

      extraerItems({
        data: dataFinal,
        itemsKeysGroup: { nsucursal: "nsucursal", sucursal: "sucursal" },
        itemsSeleccionados: [],
        setItemsDisponibles: setSucursalesDisponibles,
        setItemsSeleccionados: setSucursalesSeleccionadas,
      });
    }
  }, [dataUpdatedAt, existenDatos, sucursalesSeleccionadas]);

  useEffect(() => {
    if (existenDatos) {
      setEstaProcesado(true);
    }
  }, [existenDatos]);

  // LIMPIAR EL ESTADO FOCO A LOS 0.5S
  useEffect(() => {
    if (foco) {
      const timer = setTimeout(() => {
        setFoco(false); // Restaurar foco a false después de 2 segundos
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [foco]);

  // USAR ESCAPE PARA VACIAR INFORME
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (!estaProcesado) {
        navigate("/home");
        return;
      }
      if (e.key === "Escape" && dataFinal) {
        handleClearData();
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [dataFinal, estaProcesado]);

  // HANDLE FETCH
  const handleFetchData = async (_dates: FechasRango) => {
    // try {
    //   mutate(dates);
    //   console.log("mutate");
    // } catch (error) {
    //   console.error("Error en la petición:", error);
    //   alert("Error al obtener los datos");
    //   setFoco(true);
    // }
    refetch();
    //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                setEstaProcesado(true);
    console.log("refetch");
  };
  // CLEAR DATA
  const handleClearData = () => {
    setEstaProcesado(false);
    setFooter(false);
    clearVentasPorHora();
    clearSucursalesDisponibles();
    clearSucursalesSeleccionadas();
    setFoco(true);
    queryClient.removeQueries({ queryKey: ["ventas"] });
  };

  const propsRangePicker = {
    setFechas: setFechas,
  };


  return (
    <div className="h-screen ">
      <ViewTitle title={"Ventas por Hora"} />

      <div className="flex flex-col h-fit mx-4">
        {/** BOTONERA */}
        <div className="grid grid-cols-12 grid-rows-1 h-12 2xl:h-14 gap-4 ml-4 mt-2 mb-1 rounded">
          {/**RangeDates Input */}
          <div
            className="col-start-1 col-span-6 h-10  w-fit px-4 bg-white rounded-lg 
           2xl:col-span-4 2xl:col-start-2 2xl:relative 2xl:right-5 2xl:h-14 "
          >
            <RangeDatesInput
              conBotones={true}
              textoBotones={{ fetch: "Procesar", clear: "Borrar" }}
              onFetchData={handleFetchData}
              onClearData={handleClearData}
              rangeDatePicker={propsRangePicker}
              estado={status}
              setFocus={foco}
              estaProcesado={estaProcesado}
            />
          </div>

          {/**modales y funcionabilidades */}
          <div
            className="flex gap-6 items-center justify-center h-10 w-fit px-4 left-11 relative bg-white
             rounded-lg col-span-3 col-start-9 
             v1536:h-14 v1536:col-span-2 v1536:col-start-9 v1536:left-4 "
          >
            <ActionButton
              text="Sucursales"
              icon={<FaStoreAlt size={15} />}
              addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm"
              onClick={() => setShowModalSucursales(true)}
              disabled={!estaProcesado}
              color="blue"
              size="xs"
            />{" "}
            <HerramientasComponent data={filas} estaProcesado={estaProcesado} datosParaFooter={datosParaFooter} disabled={!estaProcesado} modalSucursales={false} handleClean={handleClearData} />
          </div>
        </div>

        {/**SUCURSALES, DESTACADOS Y TABLA*/}
        <div
          className="grid  grid-cols-12 gap-4 ml-4 2xl:h-[45rem]
         2xl:ml-0 2xl:mt-5 overflow-hidden"
        >
          {estaProcesado && (
            <div
              className="col-span-5 gap-2 2xl:col-start-2  
            flex flex-col items-center justify-evenly 
            2xl:justify-center 2xl:gap-6 2xl:items-center 
            transition-all duration-500 ease-out"
            >
              {/* Lista Sucursales */}
              <ListaFiltrosAplicados className="w-[29rem] v1440:w-[32rem] v1536:w-[36rem] " itemsDisponibles={sucursalesDisponiblesStr} itemsSeleccionados={sucursalesSeleccionadasStr} />

              {/* Información de ventas */}
              {/* <Destacados {...destacadosObject} /> */}

              {/* Gráfico */}
              <GraficoConZoom
                datosParaGraficos={filas}
                index="horaini"
                className=" w-[29rem] v1440:w-[32rem] v1536:w-[36rem]  h-72"
                widthGraficoModal="w-[64rem] h-[28rem]"
                categorias={["nOperaciones"]}
                tituloModal="N° Operaciones por Hora"
                keysMap={configuracionGrafico}
              />
            </div>
          )}

          {/** Tabla */}
          <div
            className={`flex bg-white  rounded-md w-fit h-fit 
               shadow shadow-gray-600  overflow-hidden  transition-all duration-500 ease-out  
               ${estaProcesado ? "col-start-6 col-span-7 2xl:col-start-7 " : " col-start-6 col-span-7  2xl:col-start-7 "}`}
          >
            <TablaVentaPorHora isProcessing={estaProcesado} dataParaTabla={filas} datosFooter={datosParaFooter} />
          </div>
        </div>
      </div>

      {/** Modales */}
      <ModalFiltro<SucursalesModal>
        title="Sucursales"
        renderItem={renderSucursalesItem}
        showModal={showModalSucursales}
        setShowModal={setShowModalSucursales}
        datos={sucursalesDisponibles}
        itemsDisponibles={sucursalesDisponibles}
        itemsSeleccionados={sucursalesSeleccionadas}
        setItemsDisponibles={setSucursalesDisponibles}
        setItemsSeleccionados={setSucursalesSeleccionadas}
        addIconClassName=" text-white w-14 h-12 m-0 flex items-center justify-center "
        iconReact={<FaStoreAlt size={25} />}
      />
    </div>
  );
}
