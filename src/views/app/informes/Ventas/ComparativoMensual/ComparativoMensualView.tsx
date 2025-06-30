import { ViewTitle } from "@/frontend-resourses/components";
import Tabla from "./Componentes/Tabla";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import { useComparativoMensual } from "./Store/Store";
import BotoneraPrincipal from "./Componentes/BotoneraPrincipal";
import BotoneraModales from "./Componentes/BotoneraModales";
import ModalParametros from "./Componentes/ModalParametros";

export default function ComparativoMensualView() {
  const { estaProcesado, setEstaProcesado, } = useComparativoMensual();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });


  return (
    <div>
      <ViewTitle title="Comparativo Mensual de Ventas" />
      <div className="grid2 gap-1 mx-6 my-2 ">
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <BotoneraModales />
      </div>

      <ModalParametros />
    </div>
  );
}
