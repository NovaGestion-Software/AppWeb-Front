import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { crearExportConfig } from "@/utils/helpers/botonera";
import BotoneraDefault from "../../../_components/BotoneraDefault";
import { useVentasClientesOtrosMedios } from "../Store/Store";
import { ventasClientesOtrosMediosData } from "../Data/data";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>;
  disabled?: boolean;
  handleClean?: () => void;
}

export default function BotoneraPrincipal({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useVentasClientesOtrosMedios();
  const exportConfig = crearExportConfig("informe_ventas_clientes_otros_medios", "Informe Ventas Clientes con Otros Medios", ventasClientesOtrosMediosData);
  return (
    <Card className={`${className}  col-start-12 row-start-1 self-start v1536:col-start-12  `}>
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClean} />
    </Card>
  );
}
