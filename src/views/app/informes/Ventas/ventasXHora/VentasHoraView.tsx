import { useEffect } from "react";
import { formatearNumero } from "@/utils";
import ViewTitle from "@/frontend-resourses/components/Labels/ViewTitle";
import DateInput from "./components/DateInput";
import Botonera from "./components/Botonera";
import GraficoOperaciones from "./Charts/GraficoOperaciones";
import ModalFiltroSucursales from "./Modals/ModalFiltroSucursales";
import ListaSucursalesFiltradas from "./components/ListaSucursalesFiltradas";
import Tabla from "./components/TablaVentaPorHora";
import { useHandleClearData } from "./Utils/useHandleClear";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import { useVentasHoraStore } from "./store/useVentasHoraStore";
import { useProcesarDatosTabla } from "./Hooks/useProcesarDatosTabla";
import { agrupacionConfig, tablaConfig } from "./config/tabla.config";
//import { useFocoReset } from "./Hooks/useResetFoco";
import { useAutoSeleccionSucursales } from "./Hooks/useAutoSeleccionFiltros";
import { botoneraClass, bodyClass, leftSideClass } from "./config/classes.config";
import { useVentasPorHoraQuery } from "./Hooks/useVentasPorHoraQuery";

export default function VentasHoraView() {
  //store
  const {
    // nuevos
    filas,
    setFilas,
    totales,
    setTotales,
    // estados
    estaProcesado,
    setEstaProcesado,
    // dates
    fechas,
    //foco
    foco,
    setFoco,
    // filtros
    sucursalesSeleccionadas,
    setSucursalesSeleccionadas,
    setSucursalesDisponibles,
  } = useVentasHoraStore();

  const { data, refetch, dataUpdatedAt } = useVentasPorHoraQuery(fechas);
  const existenDatos = data && data.length > 0;
  const dataFinal = data || [];

  // Procesamiento local de datos
  const datosProcesados = useProcesarDatosTabla({
    data: dataFinal,
    sucursalesSeleccionadas,
    config: agrupacionConfig,
    configTabla: tablaConfig,
  });

  // Guardar datos procesados en la store cuando están listos
  useEffect(() => {
    if (estaProcesado && datosProcesados.filas.length > 0) {
      setFilas(datosProcesados.filas);
      setTotales(datosProcesados.totales);
    }
  }, [estaProcesado, datosProcesados.filas, datosProcesados.totales, setFilas, setTotales]);

  // FOOTER TABLA
  const totalImporteFormateado = formatearNumero(totales?.importe || 0);
  const datosParaFooter = {
    hora: "",
    nOperaciones: estaProcesado ? totales?.cantidad : "",
    porcentajeOperaciones: "",
    pares: estaProcesado ? totales?.pares : "",
    porcentajePares: "",
    importe: estaProcesado ? totalImporteFormateado : "",
    porcentajeImporte: "",
  };

  // Set Filtros
  useAutoSeleccionSucursales({
    data: dataFinal,
    existenDatos: existenDatos,
    dataUpdatedAt: dataUpdatedAt,
    sucursalesSeleccionadas: sucursalesSeleccionadas,
    setSucursalesDisponibles: setSucursalesDisponibles,
    setSucursalesSeleccionadas: setSucursalesSeleccionadas,
  });

  // LIMPIAR EL ESTADO FOCO A LOS 0.5S
 // useFocoReset({ foco, setFoco });
  useEffect(() => {
    console.log("Foco cambió:", foco);
  }, [foco]);

  // ShortCut Escape Hook.
  const handleClearData = useHandleClearData();
  useEscapeShortcut({ estaProcesado, handleClearData });

  // Cambiar estado de procesado si hay datos nuevos
  useEffect(() => {
    if (existenDatos) {
      setEstaProcesado(true);
    //  setFoco(false);
    }
  }, [existenDatos]);

  useEffect(() => {

    if(estaProcesado){
      setFoco(false)
    }
    else{
      setFoco(true);
    }
  },[estaProcesado])

  return (
    <div className="h-screen ">
      <ViewTitle title={"Ventas por Hora"} />

      <div className="flex flex-col h-fit mx-4">
        {/** BOTONERA */}
        <div className={botoneraClass}>
          {/**RangeDates Input */}
          <DateInput refetch={refetch} />

          {/**modales y funcionabilidades */}
          <Botonera  />
        </div>

        {/**Sucursales, Grafico, y Tabla*/}
        <div className={bodyClass}>
          {estaProcesado && (
            <div className={leftSideClass}>
              <ListaSucursalesFiltradas />

              {/* Gráfico */}
              <GraficoOperaciones filas={filas || []} />
            </div>
          )}

          {/** Tabla */}
          <Tabla dataParaTabla={filas || []} datosFooter={datosParaFooter} />
        </div>
      </div>
      <ModalFiltroSucursales />
    </div>
  );
}
