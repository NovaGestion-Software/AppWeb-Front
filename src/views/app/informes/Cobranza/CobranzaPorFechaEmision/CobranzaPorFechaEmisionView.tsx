import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import Tabla from "./Components/Tabla";
import BotoneraPrincipal from "./Components/BotoneraPrincipal";
import BotoneraModales from "./Components/BotoneraModales";
import { useCobranzasPorFechaEmision } from "./Store/store";
import Date from "./Components/Date";
import Totales from "./Components/Totales";

export default function CobranzasPorFechaEmisionView() {
  const { estaProcesado, setEstaProcesado } = useCobranzasPorFechaEmision();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });

  return (
    <div>
      <ViewTitle title="Cobranza por Fecha de Emisíon" />
      <div className="grid2 gap-2 mx-6 my-2 ">
        <Date />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <Totales />
        <BotoneraModales />
      </div>
    </div>
  );
}
