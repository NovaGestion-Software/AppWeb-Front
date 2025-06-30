import { ViewTitle } from "@/frontend-resourses/components";
import { useGarantiasStore } from "./Store/store";
import Tabla from "./Componentes/Tabla";
import Search from "./Componentes/Search";
import Date from "./Componentes/Date";
import BotoneraPrincipal from "./Componentes/BotoneraPrincipal";
import { useEscapeShortcut } from "../_Hooks/useEscapeShortcut";


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
      <div className="grid2 gap-1 my-2 mx-6  ">
        <Date />
        <Search />
        <BotoneraPrincipal />
        <Tabla />
      </div>
    </div>
  );
}
