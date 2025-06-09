import { useCallback } from "react";
import * as XLSX from "xlsx";
import HerramientasInforme, { ExcelExportConfig } from "../../informes/_components/HerramientasInforme";
import { useStockPorSeccion } from "../store/useStockPorSeccion";

interface HerramientasComponentProps {
  data: Record<string, any>[]; // Ahora acepta cualquier estructura de datos
  datosParaFooter?: Record<string, any>; // Opcional
  estaProcesado: boolean;
  modalSucursales?: boolean;
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
  className?: string;
}

export default function Botonera({ data, datosParaFooter, estaProcesado, disabled, handleClean, className }: HerramientasComponentProps) {
  // Aseguramos que datosTotales tenga un ID
  const datosTotales = datosParaFooter
    ? { id: 1, hora: "Totales", ...datosParaFooter } 
    : null;

const {id} = useStockPorSeccion()

  const handleExportExcel = useCallback(() => {
    if (!data || data.length === 0) return;

    // Convertimos los datos en un array de objetos sin depender de claves fijas
    const datosTransformados = data.map((item, index) => ({
      id: index + 1, // Añadir un ID opcional
      ...item, // Mantener la estructura original
    }));

    // Si hay datos totales, los agregamos al final
    if (datosTotales) {
      datosTransformados.push(datosTotales);
    }

    // Creamos el libro de Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datosTransformados);
    XLSX.utils.book_append_sheet(wb, ws, "Informe");

    // Guardamos el archivo
    XLSX.writeFile(wb, "Informe.xlsx");
  }, [data, datosTotales]);

  const handleClearData =
    handleClean ||
    (() => {
      console.log("clear");
    });

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Stock por Seccion",
        data: data,
      },
    ],
    fileName: "Stock_Por_Seccion",
  };

  return (
    <div className={`${className}`}>
      <HerramientasInforme
        data={data}
        estaProcesado={estaProcesado}
        handleExportExcel={handleExportExcel}
        containerId={id}
        disabledExportExcel={disabled}
        disabledPrint={disabled}
        disabledClean={disabled}
        handleClean={handleClearData}
        exportConfig={exportConfig}
      ></HerramientasInforme>
    </div>
  );
}
