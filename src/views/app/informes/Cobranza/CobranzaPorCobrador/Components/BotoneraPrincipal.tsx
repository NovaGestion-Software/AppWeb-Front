import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { crearExportConfig } from "@/utils/helpers/botonera";
import BotoneraDefault from "../../../_components/BotoneraDefault";
import { useCobranzasPorCobrador } from "../Store/Store";
import { cobranzasCobradorData } from "../Data/data";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>;
  disabled?: boolean;
  handleClean?: () => void;
}

export default function BotoneraPrincipal({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useCobranzasPorCobrador();
  const exportConfig = crearExportConfig("informe_cobranzas_cobrador", "Informe Cobranza por Cobrador", cobranzasCobradorData);
  return (
    <Card className={`${className}  col-start-12 row-start-1 self-start v1536:col-start-12  `}>
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClean} />
    </Card>
  );
}
