import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import Botonera from "./Componentes/Botonera";
import Search from "./Componentes/Search";
import Tabla from "./Componentes/Tabla";
import Date from "./Componentes/Date";
import BotoneraModales from "./Componentes/BotoneraModales";
import { useVentasPorCondicionStore } from "./Store/useVentasPorCondicionStore";

export default function VentasPorCondicionView() {
  const { estaProcesado, setEstaProcesado } = useVentasPorCondicionStore();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });

  
  return (
    <div>
      <ViewTitle title="Ventas por Condicion " />
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
