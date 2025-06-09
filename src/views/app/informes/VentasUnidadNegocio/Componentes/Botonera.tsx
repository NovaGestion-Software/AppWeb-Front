import HerramientasInforme, { ExcelExportConfig } from "../../_components/HerramientasInforme";

import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { VentasUnidadNegocioStore } from "../Store/store";

interface BotoneraProps {
  data: Record<string, any>[];
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function Botonera({ data, className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = VentasUnidadNegocioStore();

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Ventas Por Unidad de Negocio",
        // data de la tabla, en este caso una unica tabla.
        data: data,
      },
    ],
    fileName: "ventas_Unidad_Negocio",
  };

  return (
    <Card className={`${className} col-start-12 `}>
      <HerramientasInforme
        // data : export excel, deberia de ser data de la tabla y del footer.
        data={data}
        // exportConfig: export excel, configuracion de archivo y paginas.
        exportConfig={exportConfig}
        // containerId: fn Imprimir, id del contenedor de la tabla y footer.
        containerId={id}
        handleClean={handleClean}
        estaProcesado={estaProcesado}
        disabledAll={!estaProcesado}
      />
    </Card>
  );
}
