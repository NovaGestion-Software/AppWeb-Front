import HerramientasInforme, { ExcelExportConfig } from "../../_components/HerramientasInforme";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useMovCajaStore } from "../Store/store";
import { movCajaData } from "../Data/data";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function BotoneraDefault({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useMovCajaStore();

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Movimientos de Caja",
        // data de la tabla, en este caso una unica tabla.
        data: movCajaData,
      },
    ],
    fileName: "informe_mov_caja",
  };



  return (
    <Card className={`${className}  col-start-13 row-start-1 self-center v1536:col-start-12  `}>
      <HerramientasInforme
        // data : export excel, deberia de ser data de la tabla y del footer.
        data={movCajaData}
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
