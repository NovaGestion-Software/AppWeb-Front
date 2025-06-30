import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { rankingClientesData, } from "../Data/data";
import { useRankingClientesStore } from "../Store/useRankingClientesStore";
import { ExcelExportConfig } from "@/types";
import HerramientasInforme from "../../../_components/HerramientasInforme";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function Botonera({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useRankingClientesStore();

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Ranking de Clientes",
        // data de la tabla, en este caso una unica tabla.
        data: rankingClientesData,
      },
    ],
    fileName: "informe_ranking_clientes",
  };



  return (
    <Card className={`${className}  col-start-12`}>
      <HerramientasInforme
        // data : export excel, deberia de ser data de la tabla y del footer.
        data={rankingClientesData}
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
