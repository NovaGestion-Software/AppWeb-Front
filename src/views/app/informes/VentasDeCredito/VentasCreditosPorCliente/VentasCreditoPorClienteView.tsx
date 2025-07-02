import { ViewTitle } from "@/frontend-resourses/components";
import Tabla from "./Components/Tabla";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import BotoneraPrincipal from "./Components/BotoneraPrincipal";
import BotoneraModales from "./Components/BotoneraModales";
import Date from "./Components/Date";
import { useVentasCreditoPorCliente } from "./Store/Store";

export default function VentasDeCreditoView() {
    // falta tener data falsa bien.
  const { estaProcesado, setEstaProcesado, } = useVentasCreditoPorCliente();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });


  return (
    <div>
      <ViewTitle title="Ventas de Crédito por Cliente" />
      <div className="grid2 gap-2 mx-6 my-2 ">
        <Date />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <BotoneraModales />
      </div>

    </div>
  );
}
