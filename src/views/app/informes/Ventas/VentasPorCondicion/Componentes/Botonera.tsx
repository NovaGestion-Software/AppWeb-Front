import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { ventasPorCondicionData, } from "../Data/data";
import { useVentasPorCondicionStore } from "../Store/useVentasPorCondicionStore";
import { ExcelExportConfig } from "@/types";
import HerramientasInforme from "../../../_components/HerramientasInforme";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function Botonera({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useVentasPorCondicionStore();

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Ventas Por Condicion",
        // data de la tabla, en este caso una unica tabla.
        data: ventasPorCondicionData,
      },
    ],
    fileName: "informe_ventas_condicion",
  };



  return (
    <Card className={`${className}  col-start-12 self-start`}>
      <HerramientasInforme
        // data : export excel, deberia de ser data de la tabla y del footer.
        data={ventasPorCondicionData}
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
