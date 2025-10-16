import { RiFileExcel2Fill, RiPrinterFill } from "@remixicon/react";
import { ImExit } from "react-icons/im";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectedTables from "./SelectedTables";
import { exportToExcel } from "@/utils/exportToExcel";
import { ExcelExportConfig } from "@/types";
import { printElementsById } from "@/utils/helpers/PrintFunction/printByIds";

export type PrintOptions = {
  title?: string;
  pageBreakBetween?: boolean;
  includeStyles?: boolean;
};

interface BotoneraInformeProps {
  className?: string;
  exportConfig: ExcelExportConfig;
  containerId: string | number;
  itemsDisponibles?: { id: string | number; nombre: string }[];
  setSelectedIds?: (ids: (string | number)[]) => void;
  disabled?: boolean;
  multiSelectExcel?: boolean;
  printOptions?: PrintOptions | ((ctx: { ids: (string | number)[]; accion: "imprimir" | "exportar" | null; containerId?: string | number }) => PrintOptions);

  handleClean?: () => void | boolean | { navigated?: boolean } | Promise<void | boolean | { navigated?: boolean }>;
  navigateAfterClean?: string | false;

  disabledExit?: boolean;
}
export default function BotoneraDefault({
  className = "",
  handleClean,
  navigateAfterClean = "/home",
  exportConfig,
  containerId,
  itemsDisponibles,
  setSelectedIds,
  disabled = false,
  disabledExit = disabled,
  multiSelectExcel = true,
  printOptions,
}: BotoneraInformeProps) {
  const [tableSelect, setTableSelect] = useState(false);
  const [accion, setAccion] = useState<"imprimir" | "exportar" | null>(null);
  const navigate = useNavigate();

  const resolvePrintOptions = (ids: (string | number)[]) => {
    if (typeof printOptions === "function") {
      return printOptions({ ids, accion, containerId });
    }
    return printOptions ?? {}; // por defecto sin opciones
  };

  const handleSelectionConfirm = (ids: (string | number)[]) => {
    setSelectedIds?.(ids);
    if (accion === "exportar") {
      exportToExcel(exportConfig);
    } else {
      printElementsById(ids, resolvePrintOptions(ids));
    }
  };

  const handleExit = async () => {
    // 1) Ejecutar clean (puede tener confirm interna y/o navegar)
    const result = await handleClean?.();

    // 2) Si el caller pidió que Botonera NO navegue, salimos
    if (navigateAfterClean === false) return;

    // 3) Si handleClean “señaló” que YA navegó, no navegamos aquí
    const alreadyNavigated = result === true || (typeof result === "object" && result?.navigated === true);
    if (alreadyNavigated) return;

    // 4) Retrocompat: navega como siempre
    navigate(typeof navigateAfterClean === "string" ? navigateAfterClean : "/home");
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
          itemsDisponibles && multiSelectExcel
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
            : () => {
                const ids = containerId ? ([containerId] as (string | number)[]) : [];
                printElementsById(ids, resolvePrintOptions(ids));
              }
        }
        addClassName={ButtonClass}
      />

      <ActionButton icon={<ImExit className={IconsClass} />} color="red" onClick={handleExit} 
      disabled={disabledExit} addClassName={ButtonClass} />

      {tableSelect && itemsDisponibles && (
        <SelectedTables className="z-50" funcion={accion === "imprimir" ? "Imprimir" : "Exportar"} itemsDisponibles={itemsDisponibles} setShowSelectedTables={setTableSelect} onConfirm={handleSelectionConfirm} />
      )}
    </div>
  );
}
