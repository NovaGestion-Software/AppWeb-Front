import { RiFileExcel2Fill, RiPrinterFill } from "@remixicon/react";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { IoTrash } from "react-icons/io5";
import SelectedTables from "../morosidad/Componentes/SelectedTables";

interface Item {
  id: string | number;
  nombre: string;
}
interface HerramientasInformeProps<_T> {
  data: Record<string, any>[]; // ✅ Ahora acepta cualquier tipo de datos
  estaProcesado: boolean;
  handleExportExcel?: () => void;
  handlePrint?: () => void;
  handleClean?: () => void;
  disabledExportExcel?: boolean;
  disabledPrint?: boolean;
  datosParaFooter?: Record<string, any>;
  disabledClean?: boolean;
  disabledAll?: boolean;
  gapButtons?: string;
  itemsDisponibles?: Item[];
  selectedIds?: string[]; // IDs seleccionados para imprimir
  setSelectedIds?: (ids: (string | number)[]) => void; // Función para actualizar los IDs seleccionados
  exportConfig?: ExcelExportConfig;
}

export interface ExcelExportConfig {
  sheets: {
    name: string;
    data: any[];
    headers?: string[]; // Opcional: personalizar headers
  }[];
  fileName: string;
}

export default function HerramientasInforme<T>({
  data,
  handleClean,
  datosParaFooter,
  disabledExportExcel,
  disabledPrint,
  disabledClean,
  gapButtons = "gap-6",
  disabledAll,
  itemsDisponibles,
  setSelectedIds,
  exportConfig,
}: HerramientasInformeProps<T>) {
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [data, datosParaFooter]);
  // Determina el estado disabled de cada botón
  const isExportExcelDisabled = disabledAll ?? disabledExportExcel;
  const isPrintDisabled = disabledAll ?? disabledPrint;
  const isCleanDisabled = disabledAll ?? disabledClean;
  const [tableSelect, setTableSelect] = useState(false);
  const [accionActual, setAccionActual] = useState<"imprimir" | "exportar" | null>(null);

  // lo que me imagino es que ahora al modificar las funciones para modificar lso datos, voy a crear directameente un objeto con los datos de la tabla y tambien los totales del footer
  // y asi envio todo eso por data en herramientas component para que se exporte.
  // Sobre la funcion de imprimir la tabla lo que me imagino es cambiar donde se coloca el id, o dejar ese idunique para los estilos pero para pasarlo al padre pasar el que tiene todo el contenedor.

  // const datosTotales = datosParaFooter
  //   ? { id: 1, hora: "Totales", ...datosParaFooter } // Se añade un identificador único
  //   : null;

  // // const handleExportExcel = useCallback(() => {
  // //   if (!data || data.length === 0) return;

  // //   // Convertimos los datos en un array de objetos sin depender de claves fijas
  // //   const datosTransformados = data.map((item, index) => ({
  // //     id: index + 1, // Añadir un ID opcional
  // //     ...item, // Mantener la estructura original
  // //   }));

  // //   // Si hay datos totales, los agregamos al final
  // //   if (datosTotales) {
  // //     datosTransformados.push(datosTotales);
  // //   }

  // //   // Creamos el libro de Excel
  // //   const wb = XLSX.utils.book_new();
  // //   const ws = XLSX.utils.json_to_sheet(datosTransformados);
  // //   XLSX.utils.book_append_sheet(wb, ws, "Informe");

  // //   // Guardamos el archivo
  // //   XLSX.writeFile(wb, "Informe.xlsx");
  // // }, [data, datosTotales]);

  const exportToExcel = (config: ExcelExportConfig) => { 
    try {
      const wb = XLSX.utils.book_new();

      // Procesar cada hoja
      config.sheets.forEach((sheet) => {
        if (sheet.data && sheet.data.length > 0) {
          const ws = XLSX.utils.json_to_sheet(sheet.data);
          XLSX.utils.book_append_sheet(wb, ws, sheet.name);
        }
      });

      // Generar el archivo
      XLSX.writeFile(wb, `${config.fileName}.xlsx`);
      return true;
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      return false;
    }
  };

  const handlePrint = useCallback((tableIds: (string | number)[]) => {
    if (!tableIds || tableIds.length === 0) {
      alert("No hay tablas seleccionadas para imprimir");
      return;
    }

    const tableElements = tableIds
      .map((id) => {
        const element = document.getElementById(`${id}`);
        if (!element) {
          console.warn(`No se encontró la tabla con ID: ${id}`);
          return null;
        }

        // Clonar el elemento para no modificar el original
        const clone = element.cloneNode(true) as HTMLElement;

        // Eliminar elementos no necesarios para imprimir
        clone.querySelectorAll(".no-print, button, .actions").forEach((el) => el.remove());
        return clone;
      })
      .filter(Boolean) as HTMLElement[];

    if (tableElements.length === 0) {
      alert("No se encontraron las tablas seleccionadas");
      return;
    }

    const printWindow = window.open("", "_blank", "width=800,height=900");
    if (!printWindow) return;

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Reporte Impreso</title>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 15px; 
            margin: 0;
            color: #333;
          }
          .print-section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .print-header {
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #ddd;
          }
          .print-title {
            font-size: 1.5em;
            font-weight: bold;
            margin: 0 0 5px 0;
          }
          .print-subtitle {
            font-size: 1em;
            color: #666;
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 0.9em;
          }
          th {
            background-color: #f5f5f5;
            text-align: left;
            font-weight: bold;
          }
          th, td {
            padding: 8px 12px;
            border: 1px solid #ddd;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .page-break {
            page-break-after: always;
          }
          @media print {
            body {
              padding: 0;
              font-size: 12px;
            }
            .print-section {
              margin-bottom: 20pt;
            }
            th, td {
              padding: 6px 8px;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-header">
          <h1 class="print-title">Reporte Completo</h1>
          <p class="print-subtitle">Generado el ${new Date().toLocaleDateString()}</p>
        </div>

        ${tableElements
          .map((table, index) => {
            const title = table.dataset.printTitle || `Tabla ${index + 1}`;
            const tableHTML = table.querySelector("table")?.outerHTML || "";

            return `
            <div class="print-section">
              <h2 class="print-title">${title}</h2>
              ${tableHTML}
            </div>
            ${index < tableElements.length - 1 ? '<div class="page-break"></div>' : ""}
          `;
          })
          .join("")}
      </body>
    </html>
  `);

    printWindow.document.close();

    // Esperar a que carguen los estilos antes de imprimir
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 300);
    };
  }, []);

  const handleSelectionConfirm = (selectedIds: (string | number)[]) => {
    setSelectedIds?.(selectedIds || []);
    if (accionActual === "exportar") {
      console.log("exportconfig ");
      if (exportConfig) {
        exportToExcel(exportConfig);
      }
    } else {
      handlePrint(selectedIds);
    }
  };

  const handleMostrarSelector = (accion: "imprimir" | "exportar") => {
    setAccionActual(accion);
    setTableSelect(true);
  };

  return (
    <div className={`flex justify-center ${gapButtons} w-fit rounded-lg `}>
      <ActionButton
        onClick={itemsDisponibles ? () => handleMostrarSelector("exportar") : () => exportToExcel(exportConfig || { sheets: [], fileName: "Informe" })}
        disabled={isExportExcelDisabled}
        addClassName="h-5   rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm"
        color="green"
        icon={<RiFileExcel2Fill className="h-3 w-3 v1536:h-5 v1536:w-5" />}
      />
      <ActionButton
        onClick={itemsDisponibles ? () => handleMostrarSelector("imprimir") : () => handlePrint(["table-to-print"])}
        disabled={isPrintDisabled}
        addClassName="h-5  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm"
        color="blue"
        icon={<RiPrinterFill className="h-3 w-3 v1536:h-5 v1536:w-5" />}
      />
      <ActionButton
        icon={<IoTrash className="h-3 w-3 v1536:h-5 v1536:w-5" />}
        color="red"
        addClassName="h-5  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm 2xl:w-12"
        onClick={handleClean || (() => {})}
        disabled={isCleanDisabled}
      />
      {tableSelect && (
        <SelectedTables className="z-50" funcion={accionActual === "imprimir" ? "Imprimir" : "Exportar"} itemsDisponibles={itemsDisponibles} setShowSelectedTables={setTableSelect} onConfirm={handleSelectionConfirm} />
      )}
    </div>
  );
}
