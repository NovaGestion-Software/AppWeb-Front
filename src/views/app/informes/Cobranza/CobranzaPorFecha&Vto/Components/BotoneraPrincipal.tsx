import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { crearExportConfig } from "@/utils/helpers/botonera";
import BotoneraDefault from "../../../_components/BotoneraDefault";
import { useCobranzasPorFechaYVto } from "../Store/store";
import { cobranzaPorFechaYVtoData } from "../Data/data";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>;
  disabled?: boolean;
  handleClean?: () => void;
}

export default function BotoneraPrincipal({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useCobranzasPorFechaYVto();
  const exportConfig = crearExportConfig("informe_cobranzas_fecha_vto", 
    "Informe de Cobranza y Vto.", cobranzaPorFechaYVtoData);
  return (
    <Card className={`${className}  col-start-12 row-start-1 self-start v1536:col-start-12  `}>
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClean} />
    </Card>
  );
}
