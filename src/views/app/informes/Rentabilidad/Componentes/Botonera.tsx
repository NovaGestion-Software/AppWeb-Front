import HerramientasInforme, { ExcelExportConfig } from "../../_components/HerramientasInforme";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useRentabilidadStore } from "../Store/useRentabilidadStore";
import { rentabilidadData } from "../Data/data";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function Botonera({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useRentabilidadStore();

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Rentabilidad",
        // data de la tabla, en este caso una unica tabla.
        data: rentabilidadData,
      },
    ],
    fileName: "informe_rentabilidad",
  };



  return (
    <Card className={`${className}  col-start-12`}>
      <HerramientasInforme
        // data : export excel, deberia de ser data de la tabla y del footer.
        data={rentabilidadData}
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
