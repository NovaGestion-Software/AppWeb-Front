import { useEffect, useState } from "react";
import HerramientasInforme, { ExcelExportConfig } from "../../_components/HerramientasInforme";
import { useMorosidadStore } from "../Store/store";
import { dataTablaActividad, dataTablaCategoria, dataTablaLocalidad, dataTablaRango } from "../ts/data";
interface BotoneraProps {
  data: Record<string, any>[];
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  estaProcesado: boolean;
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function Botonera({  datosParaFooter, estaProcesado, disabled, className, handleClean }: BotoneraProps) {
  let datos: Record<string, any>[] = [];
  const [idsElegidos, setIdsElegidos] = useState<(string | number)[]>([]);
  const [excelConfig, setExcelConfig] = useState<ExcelExportConfig>();

  const idCategoria = useMorosidadStore((state) => state.tablas.categoria.id);
  const idLocalidad = useMorosidadStore((state) => state.tablas.localidad.id);
  const idActividad = useMorosidadStore((state) => state.tablas.actividad.id);
  const idRango = useMorosidadStore((state) => state.tablas.rango.id);
  // const actividadData = useMorosidadStore((state) => state.tablas.actividad.data);
  // const categoriaData = useMorosidadStore((state) => state.tablas.categoria.data);
  // const rangoData = useMorosidadStore((state) => state.tablas.rango.data);
  // const localidadData = useMorosidadStore((state) => state.tablas.localidad.data);
  const actividadData = dataTablaActividad;
  const categoriaData = dataTablaCategoria;
  const rangoData = dataTablaRango;
  const localidadData = dataTablaLocalidad;

  const tablasDiposnibles = [
    { id: idLocalidad, nombre: "Tabla de Localidad" },
    { id: idCategoria, nombre: "Tabla de Categoria " },
    { id: idActividad, nombre: "Tabla de Actividad" },
    { id: idRango, nombre: "Tabla de Rango" },
  ];

  //  tipo para las configuraciones de exportación

  interface TablaExportConfig {
    id: string | number;
    nombre: string;
    data: any[];
  }
  // Función que mapea IDs a configuraciones de exportación
  const getTablasParaExportar = (idsSeleccionados: (string | number)[]) => {
    const todasLasTablas: TablaExportConfig[] = [
      {
        id: idLocalidad,
        nombre: "Localidad",
        data: localidadData,
      },
      {
        id: idCategoria,
        nombre: "Categoría",
        data: categoriaData,
      },
      {
        id: idActividad,
        nombre: "Actividad",
        data: actividadData,
      },
      {
        id: idRango,
        nombre: "Rango",
        data: rangoData,
      },
    ];

    // Filtrar solo las tablas seleccionadas
    return idsSeleccionados.length > 0 ? todasLasTablas.filter((tabla) => idsSeleccionados.includes(tabla.id)) : todasLasTablas; // Si no hay selección, exportar todas
  };

  // Preparar los datos
  useEffect(() => {
    if (idsElegidos.length === 0) return;

    const tablasAExportar = getTablasParaExportar(idsElegidos);

    // Verificar que hay datos para exportar
    const tablasConDatos = tablasAExportar.filter((tabla) => tabla.data && tabla.data.length > 0);

    if (tablasConDatos.length === 0) {
      console.warn("No hay datos para exportar en las tablas seleccionadas");
      return;
    }

    // Preparar estructura para exportToExcel
    const exportConfig = {
      sheets: tablasConDatos.map((tabla) => ({
        name: tabla.nombre,
        data: tabla.data,
        // Puedes añadir más configuraciones por hoja aquí
      })),
      fileName: "Informe_Morosidad",
    };

    setExcelConfig(exportConfig);
    // Aquí llamarías a tu función exportToExcel(exportConfig)
    console.log("Configuración lista para exportar:", exportConfig);

    // Ejemplo de cómo sería la llamada:
    // exportToExcel(exportConfig);
  }, [idsElegidos, localidadData, categoriaData, actividadData, rangoData]);

  return (
    <div className={`${className}`}>
      <HerramientasInforme
        data={datos}
        estaProcesado={!estaProcesado}
        handleClean={handleClean}
        disabledPrint={disabled}
        disabledClean={disabled}
        disabledExportExcel={disabled}
        datosParaFooter={datosParaFooter}
        gapButtons="gap-2"
        itemsDisponibles={tablasDiposnibles}
        setSelectedIds={setIdsElegidos}
        exportConfig={excelConfig}
      />
    </div>
  );
}
