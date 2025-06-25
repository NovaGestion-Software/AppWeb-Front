import HerramientasInforme, { ExcelExportConfig } from "../../_components/HerramientasInforme";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useRentabilidadMPStore } from "../Store/useRentabilidadMPagoStore";
import { rentabilidadMPData } from "../Data/data";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function Botonera({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useRentabilidadMPStore();

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Rentabilidad Medio de Pago",
        // data de la tabla, en este caso una unica tabla.
        data: rentabilidadMPData,
      },
    ],
    fileName: "informe_rentabilidad_medio_pago",
  };



  return (
    <Card className={`${className}  col-start-12`}>
      <HerramientasInforme
        // data : export excel, deberia de ser data de la tabla y del footer.
        data={rentabilidadMPData}
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
