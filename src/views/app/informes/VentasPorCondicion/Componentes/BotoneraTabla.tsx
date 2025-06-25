import { FunctionComponent, useState } from "react";
import { useVentasPorCondicionStore } from "../Store/useVentasPorCondicionStore";
import ShowButtonsTable from "./ShowButtonsTable";

interface BotoneraTablaProps {}

const BotoneraTabla: FunctionComponent<BotoneraTablaProps> = () => {
  const { estaProcesado } = useVentasPorCondicionStore();
  // show modals de filtros
  const [_showDetalles, setShowDetalles] = useState(false);
  // show modal rubros
  const [_showSinFinanciacion, setShowSinFinanciacion] = useState(true);

  const propsShowModales = {
    setShowDetalles: setShowDetalles,
    setShowSinFinanciacion: setShowSinFinanciacion,
  };
  return (
      <ShowButtonsTable estaProcesado={estaProcesado} className="flex gap-1 " props={propsShowModales} />
  );
};

export default BotoneraTabla;
