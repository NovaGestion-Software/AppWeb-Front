import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import Search from "./Componentes/Search";
import { useArticulosEnPromocion } from "./Store/Store";
import Tabla from "./Componentes/Tabla";
import BotoneraPrincipal from "./Componentes/BotoneraPrincipal";
import BotoneraAcciones from "./Componentes/BotoneraAcciones";
import RadioButtons from "./Componentes/RadioButtons";

export default function ArticulosEnPromocionView() {
  const { estaProcesado, setEstaProcesado } = useArticulosEnPromocion();

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
        <Search />
        <Tabla />
        <RadioButtons />
        <BotoneraPrincipal handleClean={handleClearData} />
        <BotoneraAcciones />
      </div>
    </div>
  );
}
