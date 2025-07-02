import { ViewTitle } from "@/frontend-resourses/components";
import Tabla from "./Componentes/Tabla";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import BotoneraPrincipal from "./Componentes/BotoneraPrincipal";
import BotoneraModales from "./Componentes/BotoneraModales";
import Date from "./Componentes/Date";
import Search from "./Componentes/Search";
import { useVentasEnPromocion } from "./Store/Store";
import RadioButtons from "./Componentes/RadioButtons";

export default function VentasEnPromocionView() {
  const { estaProcesado, setEstaProcesado, } = useVentasEnPromocion();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });


  return (
    <div>
      <ViewTitle title="Ventas Promoción" />
      <div className="grid2 gap-2 mx-6 my-2 ">
        <Date />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <BotoneraModales />
        <Search />
        <RadioButtons />
      </div>

    </div>
  );
}
