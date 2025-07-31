import { crearExportConfig } from "@/utils/helpers/botonera";
import BotoneraDefault from "../../../_components/BotoneraDefault";
import { useVentasHoraStore } from "../store/useVentasHoraStore";
import { useHandleClearData } from "../Utils/useHandleClear";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>;
  disabled?: boolean;
}

export default function BotoneraPrincipal({ className }: BotoneraProps) {
  const handleClearData = useHandleClearData();

  const { id, estaProcesado, filas } = useVentasHoraStore();
  const data = filas ? filas : [];
  const exportConfig = crearExportConfig("informe_ventas_por_hora", "Informe Ventas por Hora", data);
  return (
    <div className={`${className}  self-center  `}>
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClearData} />
    </div>
  );
}
