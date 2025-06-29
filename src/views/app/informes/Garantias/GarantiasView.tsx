import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../ventasXHora/Hooks/useEscapeShortcut";
import { useGarantiasStore } from "./Store/store";
import Tabla from "./Componentes/Tabla";
import Search from "./Componentes/Search";
import Date from "./Componentes/Date";
import BotoneraPrincipal from "./Componentes/BotoneraPrincipal";


export default function GarantiasView() {
  const { estaProcesado, setEstaProcesado } = useGarantiasStore();

  const handleClearData = () => {
    setEstaProcesado(false);
  };
  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });
  return (
    <div>
      <ViewTitle title="Garantias" />
      <div className="grid2 gap-1 mx-6 my-2 ">
        <Date />
        <Search />
        <BotoneraPrincipal />
        <Tabla />
      </div>
    </div>
  );
}
