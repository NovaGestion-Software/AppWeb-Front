import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import Tabla from "./Components/Tabla";
import BotoneraPrincipal from "./Components/BotoneraPrincipal";
import Search from "./Components/Search";
import BotoneraModales from "./Components/BotoneraModales";
import { useCobranzasPorCobrador } from "./Store/Store";
import PeriodoRecibos from "./Components/PeriodoRecibos";
import PeriodoPlanPago from "./Components/PeriodoPlanPago";
import Total from "./Components/Total";
import BotoneraAcciones from "./Components/BotoneraAcciones";
import BotoneraCheckbox from "./Components/BotoneraCheckbox";

export default function CobranzasPorCobradorView() {
  const { estaProcesado, setEstaProcesado } = useCobranzasPorCobrador();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });

  return (
    <div>
      <ViewTitle title="Cobranza por Cobrador" />
      <div className="grid2 gap-2 mx-6 my-2 ">
        <PeriodoRecibos />
        <PeriodoPlanPago />
        <Search />
        <Total />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <BotoneraAcciones />
        <BotoneraModales />
        <BotoneraCheckbox />
      </div>
    </div>
  );
}
