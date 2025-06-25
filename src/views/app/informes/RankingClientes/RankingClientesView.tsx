import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../ventasXHora/Hooks/useEscapeShortcut";
import Botonera from "./Componentes/Botonera";
import Search from "./Componentes/Search";
import Tabla from "./Componentes/Tabla";
import Date from "./Componentes/Date";
import BotoneraModales from "./Componentes/BotoneraModales";
import { useRankingClientesStore } from "./Store/useRankingClientesStore";

export default function RankingClientesView() {
  const { estaProcesado, setEstaProcesado } = useRankingClientesStore();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });

  
  return (
    <div>
      <ViewTitle title="Ranking de Clientes " />
      <div className="grid2 gap-1 mx-6 my-2">
        <Date />
        <Search />
        <Tabla />
        <Botonera handleClean={handleClearData} />
        <BotoneraModales />
      </div>
    </div>
  );
}
