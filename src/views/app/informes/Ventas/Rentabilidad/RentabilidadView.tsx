import { ViewTitle } from "@/frontend-resourses/components";
import Date from "./Componentes/Date";
import Search from "./Componentes/Search";
import RadioButtons from "./Componentes/RadioButtons";
import Tabla from "./Componentes/Tabla";
import Botonera from "./Componentes/Botonera";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import { useRentabilidadStore } from "./Store/useRentabilidadStore";
import BotoneraModales from "./Componentes/BotoneraModales";

export default function RentabilidadView() {
  const { estaProcesado, setEstaProcesado } = useRentabilidadStore();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });
  return (
    <div>
      <ViewTitle title="Rentabilidad" />
      <div className="grid2 gap-1 mx-6 my-2 ">
        <Date />
        <Search />
        <RadioButtons />
        <Tabla />
        <Botonera handleClean={handleClearData} />
        <BotoneraModales />
      </div>
    </div>
  );
}
