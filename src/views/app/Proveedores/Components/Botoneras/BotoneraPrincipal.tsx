import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { crearExportConfig } from "@/utils/helpers/botonera";
import { useProovedoresStore } from "../../Store/Store";
import { proovedoresData } from "../../Data/data";
import BotoneraDefault from "../../../informes/_components/BotoneraDefault";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function BotoneraPrincipal({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useProovedoresStore();
  const exportConfig = crearExportConfig("datos_proovedores",
     "Proovedores", proovedoresData);
  return (
    <Card solid={false} className={`${className}  col-start-12 row-start-1 self-start v1536:col-start-12  `}>
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClean} />
    </Card>
  );
}
