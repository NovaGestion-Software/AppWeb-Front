import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { crearExportConfig } from "@/utils/helpers/botonera";
import { useProveedoresStore } from "../../Store/Store";
import { proveedoresData } from "../../Data/data";
import BotoneraDefault from "../../../informes/_components/BotoneraDefault";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; 
  disabled?: boolean;
  handleClean?: () => void; 
}

export default function BotoneraPrincipal({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useProveedoresStore();
  const exportConfig = crearExportConfig("datos_proveedores",
     "Proveedores", proveedoresData);
  return (
    <Card solid={false} className={`${className}  col-start-12 row-start-1 self-start v1536:col-start-12  `}>
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClean} />
    </Card>
  );
}
