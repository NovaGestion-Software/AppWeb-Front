import { RiFileExcel2Fill, RiPrinterFill } from "@remixicon/react";
import { ImExit } from "react-icons/im";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import { useState, useCallback } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { ExcelExportConfig } from "@/types";
import SelectedTables from "./SelectedTables";

interface BotoneraInformeProps {
  className?: string;
  exportConfig: ExcelExportConfig;
  containerId: string | number;
  itemsDisponibles?: { id: string | number; nombre: string }[];
  setSelectedIds?: (ids: (string | number)[]) => void;
  handleClean?: () => void;
  disabled?: boolean;
}

export default function BotoneraDefault({ className = "", exportConfig, containerId, itemsDisponibles, setSelectedIds, handleClean, disabled = false }: BotoneraInformeProps) {
  const [tableSelect, setTableSelect] = useState(false);
  const [accion, setAccion] = useState<"imprimir" | "exportar" | null>(null);
  const navigate = useNavigate();

  function calcularAnchoColumnas(data: any[]): { wch: number }[] {
    if (data.length === 0) return [];

    // Obtener todas las claves de las propiedades del primer objeto
    const keys = Object.keys(data[0]);

    return keys.map((key) => {
      // Calcular el largo máximo entre el nombre de la columna y todos los valores de esa columna
      const maxLength = Math.max(
        key.length,
        ...data.map((row) => {
          const val = row[key];
          return val ? String(val).length : 0;
        })
      );
      return { wch: maxLength + 2 }; // +2 para un poco de padding
    });
  }

  const exportToExcel = (config: ExcelExportConfig) => {
    try {
      const wb = XLSX.utils.book_new();

      config.sheets.forEach((sheet) => {
        const ws = XLSX.utils.json_to_sheet(sheet.data);

        // Calcular y asignar ancho automático según contenido
        ws["!cols"] = calcularAnchoColumnas(sheet.data);

        XLSX.utils.book_append_sheet(wb, ws, sheet.name);
      });

      XLSX.writeFile(wb, `${config.fileName}.xlsx`);
    } catch (error) {
      console.error("Error al exportar Excel:", error);
    }
  };

  const handlePrint = useCallback((ids: (string | number)[]) => {
    const tablas = ids.map((id) => document.getElementById(`${id}`)?.cloneNode(true) as HTMLElement).filter(Boolean);

    if (!tablas.length) {
      alert("No se encontraron las tablas seleccionadas");
      return;
    }

    const printWindow = window.open("", "_blank", "width=800,height=900");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head><title>Impresión</title></head>
        <body>${tablas.map((t) => t.outerHTML).join("<hr/>")}</body>
      </html>
    `);
    printWindow.document.close();

    printWindow.onload = () => setTimeout(() => printWindow.print(), 300);
  }, []);

  const handleSelectionConfirm = (ids: (string | number)[]) => {
    setSelectedIds?.(ids);
    if (accion === "exportar") {
      exportToExcel(exportConfig);
    } else {
      handlePrint(ids);
    }
  };

  const handleExit = () => {
    handleClean?.();
    navigate("/home");
  };

  return (
    <div className={`flex gap-6 w-fit rounded-lg ${className}`}>
      <ActionButton
        icon={<RiFileExcel2Fill className="w-4 h-4" />}
        color="green"
        disabled={disabled}
        onClick={
          itemsDisponibles
            ? () => {
                setAccion("exportar");
                setTableSelect(true);
              }
            : () => exportToExcel(exportConfig)
        }
        addClassName="h-5 rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm"
      />

      <ActionButton
        icon={<RiPrinterFill className="w-4 h-4" />}
        color="blue"
        disabled={disabled}
        onClick={
          itemsDisponibles
            ? () => {
                setAccion("imprimir");
                setTableSelect(true);
              }
            : () => handlePrint([containerId])
        }
        addClassName="h-5 rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm"
      />

      <ActionButton icon={<ImExit className="w-4 h-4" />} color="red" onClick={handleExit} disabled={disabled} addClassName="h-5 rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm 2xl:w-12" />

      {tableSelect && itemsDisponibles && (
        <SelectedTables className="z-50" funcion={accion === "imprimir" ? "Imprimir" : "Exportar"} itemsDisponibles={itemsDisponibles} setShowSelectedTables={setTableSelect} onConfirm={handleSelectionConfirm} />
      )}
    </div>
  );
}
