import { ViewTitle } from "@/frontend-resourses/components";
import Tabla from "./Components/Tabla";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import Date from "./Components/Date";
import RadioButtons from "./Components/RadioButtons";
import { useRankingClientesCredito } from "./Store/Store";
import BotoneraPrincipal from "./Components/BotoneraPrincipal";

export default function RankingClientesCreditoView() {
    // falta tener data falsa bien.
  const { estaProcesado, setEstaProcesado, } = useRankingClientesCredito();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });


  return (
    <div>
      <ViewTitle title="Ranking Clientes Crédito" />
      <div className="grid2 gap-2 mx-6 my-2 ">
        <Date />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <RadioButtons />
      </div>

    </div>
  );
}
