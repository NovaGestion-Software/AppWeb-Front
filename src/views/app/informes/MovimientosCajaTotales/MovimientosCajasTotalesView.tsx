import { ViewTitle } from "@/frontend-resourses/components";

import { useEscapeShortcut } from "../ventasXHora/Hooks/useEscapeShortcut";
import {useMovCajaTotalesStore } from "./Store/store";
import BotoneraDefault from "./Componentes/BotoneraDefault";
import Tabla from "./Componentes/Tabla";
import RadioButtons from "./Componentes/RadioButtons";
import BotoneraExtra from "./Componentes/BotoneraExtra";
import BotoneraAcciones from "./Componentes/BotoneraAcciones";

export default function MovCajaTotalesView() {
  const { estaProcesado, setEstaProcesado } = useMovCajaTotalesStore();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });
  return (
    <div>
      <ViewTitle title="Movimientos de Caja Totales" />
      <div className="grid2 gap-1 mx-6 my-2 ">
        <BotoneraExtra />
        <BotoneraDefault handleClean={handleClearData} />
        <RadioButtons />
        <Tabla />
        <BotoneraAcciones />
      </div>
    </div>
  );
}
