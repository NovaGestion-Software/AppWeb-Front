import { RiFileExcel2Fill, RiPrinterFill } from "@remixicon/react";
import { ImExit } from "react-icons/im";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectedTables from "./SelectedTables";
import { exportToExcel } from "@/utils/exportToExcel";
import { printElementsById } from "@/utils/printElementsById";
import { ExcelExportConfig } from "@/types";

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

  const handleSelectionConfirm = (ids: (string | number)[]) => {
    setSelectedIds?.(ids);
    if (accion === "exportar") {
      exportToExcel(exportConfig);
    } else {
      printElementsById(ids);
    }
  };

  const handleExit = () => {
    handleClean?.();
    navigate("/home");
  };

  const IconsClass = "w-4 h-4 m-1 v1920:w-6 v1920:h-6";
  const ButtonClass = "min-h-6 p-1 rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm";
  return (
    <div className={`flex gap-6  min-h-10 items-center w-fit rounded-lg ${className}`}>
      <ActionButton
        icon={<RiFileExcel2Fill className={IconsClass} />}
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
        addClassName={ButtonClass}
      />

      <ActionButton
        icon={<RiPrinterFill className={IconsClass} />}
        color="blue"
        disabled={disabled}
        onClick={
          itemsDisponibles
            ? () => {
                setAccion("imprimir");
                setTableSelect(true);
              }
            : () => printElementsById([containerId])
        }
        addClassName={ButtonClass}
      />

      <ActionButton icon={<ImExit className={IconsClass} />} color="red" onClick={handleExit} disabled={disabled} addClassName={ButtonClass} />

      {tableSelect && itemsDisponibles && (
        <SelectedTables className="z-50" funcion={accion === "imprimir" ? "Imprimir" : "Exportar"} itemsDisponibles={itemsDisponibles} setShowSelectedTables={setTableSelect} onConfirm={handleSelectionConfirm} />
      )}
    </div>
  );
}
