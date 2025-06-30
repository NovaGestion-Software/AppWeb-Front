
import { ExcelExportConfig } from "@/types";
import { useCompClientOtrasSucStore } from "../Store/store";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import HerramientasInforme from "../../../_components/HerramientasInforme";

interface BotoneraProps {
  data: Record<string, any>[];
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  estaProcesado: boolean;
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function Botonera({ data, className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useCompClientOtrasSucStore();

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Compras Clientes en otras Sucursales",
        // data de la tabla, en este caso una unica tabla.
        data: data,
      },
    ],
    fileName: "Comp_Clie_otr_Suc",
  };

  return (
    <Card className={`${className} `}>
      <HerramientasInforme
        // data : export excel, deberia de ser data de la tabla y del footer.
        data={data}
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
