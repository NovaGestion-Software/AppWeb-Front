import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../../_Hooks/useEscapeShortcut";
import Search from "./Components/Search";
import { useClientesSinOperaciones } from "./Store/Store";
import Tabla from "./Components/Tabla";
import BotoneraPrincipal from "./Components/Botonera";
import Date from "./Components/Date";

export default function ClientesSinOperacionesView() {
  const { estaProcesado, setEstaProcesado } = useClientesSinOperaciones();

  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });

  return (
    <div>
      <ViewTitle title="Clientes sin Operaciones " />
      <div className="grid2 gap-1 mx-6 my-2">
        <Date />
        <Search />
        <Tabla />
        <BotoneraPrincipal handleClean={handleClearData} />
      </div>
    </div>
  );
}
