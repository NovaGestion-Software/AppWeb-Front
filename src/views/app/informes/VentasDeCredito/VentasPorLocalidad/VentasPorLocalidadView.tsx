import { ViewTitle } from "@/frontend-resourses/components";
import Tabla from "./Componentes/Tabla";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import BotoneraPrincipal from "./Componentes/BotoneraPrincipal";
import BotoneraModales from "./Componentes/BotoneraModales";
import Date from "./Componentes/Date";
import { useVentasEnCredito } from "./Store/Store";

export default function VentasPorLocalidadView() {
  const { estaProcesado, setEstaProcesado, } = useVentasEnCredito();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });


  return (
    <div>
      <ViewTitle title="Ventas por Localidad" />
      <div className="grid2 gap-2 mx-6 my-2 ">
        <Date />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <BotoneraModales />
      </div>

    </div>
  );
}
