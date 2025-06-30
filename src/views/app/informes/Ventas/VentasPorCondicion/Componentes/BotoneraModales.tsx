import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { FunctionComponent, useState } from "react";
import ShowButtons from "./ShowButtons";
import { useVentasPorCondicionStore } from "../Store/useVentasPorCondicionStore";

interface BotoneraModalesProps {}

const BotoneraModales: FunctionComponent<BotoneraModalesProps> = () => {
  const { estaProcesado } = useVentasPorCondicionStore();
  // show modals de filtros
  const [_showUniNego, setShowUniNego] = useState(false);
  // show modal rubros
  const [_showSucursales, setShowSucursales] = useState(true);

  const propsShowModales = {
    propsShowModal: {
      setShowUniNego: setShowUniNego,
      setShowSucursales: setShowSucursales,
    },
  };
  return (
    <Card className="col-start-9 v1536:col-start-8 self-start">
      <ShowButtons estaProcesado={estaProcesado} className="flex gap-1 " props={propsShowModales} />
    </Card>
  );
};

export default BotoneraModales;
