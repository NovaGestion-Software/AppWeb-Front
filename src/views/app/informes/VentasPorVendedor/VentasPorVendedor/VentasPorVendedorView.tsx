import { ViewTitle } from "@/frontend-resourses/components";
import Tabla from "./Componentes/Tabla";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import BotoneraPrincipal from "./Componentes/BotoneraPrincipal";
import BotoneraModales from "./Componentes/BotoneraModales";
import { useVentasPorVendedor } from "./Store/Store";
import RadioButtons from "./Componentes/RadioButtons";
import Date from "./Componentes/Date";
import Search from "./Componentes/Search";

export default function VentasPorVendedorView() {
  const { estaProcesado, setEstaProcesado, } = useVentasPorVendedor();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });


  return (
    <div>
      <ViewTitle title="Ventas por Vendedor" />
      <div className="grid2 gap-1 mx-6 my-2 ">
        <Date />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <BotoneraModales />
        <Search />
        <RadioButtons />
      </div>

    </div>
  );
}
