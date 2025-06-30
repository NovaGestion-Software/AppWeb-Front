import { ViewTitle } from "@/frontend-resourses/components";

import { useMovCajaStore } from "./Store/store";
import Tabla from "./Componentes/Tabla";
import RadioButtons from "./Componentes/RadioButtons";
import BotoneraExtra from "./Componentes/BotoneraExtra";
import BotoneraAcciones from "./Componentes/BotoneraAcciones";
import BotoneraPrincipal from "./Componentes/BotoneraPrincipal";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";

export default function MovCajaView() {
  const { estaProcesado, setEstaProcesado } = useMovCajaStore();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });
  return (
    <div>
      <ViewTitle title="Movimientos de Caja" />
      <div className="grid2 gap-1 mx-6 my-2 ">
        <BotoneraExtra />
        <BotoneraPrincipal handleClean={handleClearData} />
        <RadioButtons />
        <Tabla />
        <BotoneraAcciones />
      </div>
    </div>
  );
}
