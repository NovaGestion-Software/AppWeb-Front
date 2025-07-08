import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import Tabla from "./Components/Tabla";
import BotoneraPrincipal from "./Components/BotoneraPrincipal";
import BotoneraModales from "./Components/BotoneraModales";
import RadioButtons from "./Components/RadioButtons";
import { useCobranzasPorFechaYVto } from "./Store/store";
import Date from "./Components/Date";

export default function CobranzasPorFechaYVtoView() {
  const { estaProcesado, setEstaProcesado } = useCobranzasPorFechaYVto();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });

  return (
    <div>
      <ViewTitle title="Informe de Cobranza y Vto." />
      <div className="grid2 gap-2 mx-6 my-2 ">
        <Date />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <BotoneraModales />
        <RadioButtons />
      </div>
    </div>
  );
}
