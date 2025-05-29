import { useCallback } from "react";
import HerramientasInforme from "../../_components/HerramientasInforme";
import * as XLSX from "xlsx";


interface BotoneraProps {
  data: Record<string, any>[];
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  estaProcesado: boolean;
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function Botonera({ data, datosParaFooter, estaProcesado, disabled, className, handleClean }: BotoneraProps) {




  return (
    <div className={`${className}`}>
      <HerramientasInforme
        data={data}
        estaProcesado={!estaProcesado}
        handleClean={handleClean}
        disabledPrint={disabled}
        disabledClean={disabled}
        disabledExportExcel={disabled}
        datosParaFooter={datosParaFooter}
        gapButtons="gap-2"
      />

    </div>
  );
}
