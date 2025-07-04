import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { crearExportConfig } from "@/utils/helpers/botonera";
import BotoneraDefault from "../../../_components/BotoneraDefault";
import { useClientesSinOperaciones } from "../Store/Store";
import { clientesSinOperacionesData } from "../Data/Data";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function BotoneraPrincipal({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useClientesSinOperaciones();
  const exportConfig = crearExportConfig("informe_articulos_promocion",
     "Articulos en Promocion", clientesSinOperacionesData);
  return (
    <Card className={`${className}  col-start-12 row-start-1 self-start v1536:col-start-12  `}>
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClean} />
    </Card>
  );
}
