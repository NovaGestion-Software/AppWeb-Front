import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import Tabla from "./Components/Tabla";
import Date from "./Components/Date";
import { useDistribucionMensualClientes } from "./Store/Store";
import BotoneraPrincipal from "./Components/BotoneraPrincipal";
import Resumen from "./Components/Resumen";

export default function DistribucionMensualClientesView() {
  const { estaProcesado, setEstaProcesado } = useDistribucionMensualClientes();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });

  return (
    <div>
      <ViewTitle title="Distribución Mensual Créditos " />
      <div className="grid2 gap-1 mx-6 my-2">
        <Date />
        <Tabla />
        <Resumen />
        <BotoneraPrincipal handleClean={handleClearData} />
      </div>
    </div>
  );
}
