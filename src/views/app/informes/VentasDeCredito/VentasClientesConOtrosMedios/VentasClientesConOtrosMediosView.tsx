import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import { useVentasClientesOtrosMedios } from "./Store/Store";
import Tabla from "./Components/Tabla";
import BotoneraPrincipal from "./Components/BotoneraPrincipal";
import PeriodoVentas from "./Components/PeriodoVentas";
import PeriodoCompras from "./Components/PeriodoCompras";
import Search from "./Components/Search";
import BotoneraModales from "./Components/BotoneraModales";
import BotoneraAcciones from "./Components/BotoneraAcciones";

export default function VentasClientesOtrosMediosView() {
  // falta tener data falsa bien.
  const { estaProcesado, setEstaProcesado } = useVentasClientesOtrosMedios();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });

  return (
    <div>
      <ViewTitle title="Ventas Clientes con Otros Medios" />
      <div className="grid2 gap-2 mx-6 my-2 ">
        <PeriodoVentas />
        <PeriodoCompras />
        <Search />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
        <BotoneraModales />
        <BotoneraAcciones />
      </div>
    </div>
  );
}
