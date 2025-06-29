import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useMovCajaStore } from "../Store/store";
import { movCajaData } from "../Data/data";
import { crearExportConfig } from "@/utils/helpers/botonera";
import BotoneraDefault from "../../_components/BotoneraDefault";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function BotoneraPrincipal({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useMovCajaStore();
  const exportConfig = crearExportConfig("informe_mov_cajas", "Movimientos Caja", movCajaData);
  return (
    <Card className={`${className}  col-start-13 row-start-1 self-center v1536:col-start-12  `}>
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClean} />
    </Card>
  );
}
