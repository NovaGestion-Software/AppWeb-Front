import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { crearExportConfig } from "@/utils/helpers/botonera";
import BotoneraDefault from "../../../_components/BotoneraDefault";
import { distribucionMensualCreditosData } from "../Data/Data";
import { useDistribucionMensualClientes } from "../Store/Store";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function BotoneraPrincipal({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useDistribucionMensualClientes();
  const exportConfig = crearExportConfig("informe_distribucion_mensual_creditos",
     "Distribución Mensual Créditos", distribucionMensualCreditosData);
  return (
    <Card className={`${className}  col-start-12 row-start-1 self-start v1536:col-start-12  `}>
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClean} />
    </Card>
  );
}
