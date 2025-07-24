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
import { useFocoReset } from "./Hooks/useResetFoco";
import { useAutoSeleccionSucursales } from "./Hooks/useAutoSeleccionFiltros";
import { botoneraClass, bodyClass, leftSideClass } from "./config/classes.config";
import { useVentasPorHoraQuery } from "./Hooks/useVentasPorHoraQuery";

export default function VentasHoraView() {
  //store
  const {
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
  let existenDatos = data && data.length > 0;

  const dataFinal = data || [];

  // Procesamiento de datos
  const { filas, totales } = useProcesarDatosTabla({
    data: dataFinal,
    sucursalesSeleccionadas,
    config: agrupacionConfig,
    configTabla: tablaConfig,
  });

  // FOOTER TABLA 1
  const totalImporteFormateado = formatearNumero(totales.importe);
  const datosParaFooter = {
    hora: "",
    nOperaciones: estaProcesado ? totales.cantidad : "",
    porcentajeOperaciones: "",
    pares: estaProcesado ? totales.pares : "",
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
  useFocoReset({ foco, setFoco });
  
  // ShortCut Escape Hook.
  const handleClearData = useHandleClearData();
  useEscapeShortcut({ estaProcesado, handleClearData });

  useEffect(() => {
    if (existenDatos) {
      setEstaProcesado(true);
    }
  }, [existenDatos]);

  return (
    <div className="h-screen ">
      <ViewTitle title={"Ventas por Hora"} />

      <div className="flex flex-col h-fit mx-4">
        
        {/** BOTONERA */}
        <div className={botoneraClass}>
          {/**RangeDates Input */}
          <DateInput refetch={refetch} />

          {/**modales y funcionabilidades */}
          <Botonera data={filas} />
        </div>

        {/**Sucursales, Grafico, y Tabla*/}
        <div className={bodyClass}>
          {estaProcesado && (
            <div className={leftSideClass}>
              <ListaSucursalesFiltradas />

              {/* Gráfico */}
              <GraficoOperaciones />
            </div>
          )}

          {/** Tabla */}
          <Tabla dataParaTabla={filas} datosFooter={datosParaFooter} />
        </div>
      </div>
      <ModalFiltroSucursales />
    </div>
  );
}
