import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { FunctionComponent, useState } from "react";
import ShowButtons from "./ShowButtons";
import { useRentabilidadStore } from "../Store/useRentabilidadStore";

interface BotoneraModalesProps {}

const BotoneraModales: FunctionComponent<BotoneraModalesProps> = () => {
  const { estaProcesado } = useRentabilidadStore();
  // show modals de filtros
  const [_showUniNego, setShowUniNego] = useState(false);
  const [_showOpciones, setShowOpciones] = useState(false);
  // show modal rubros
  const [_showSucursales, setShowSucursales] = useState(true);

  const propsShowModales = {
    propsShowModal: {
      setShowUniNego: setShowUniNego,
      setShowSucursales: setShowSucursales,
      setShowOpciones: setShowOpciones,
    },
  };
  return (
    <Card className="col-start-7">
      <ShowButtons estaProcesado={estaProcesado} className="flex gap-1 " props={propsShowModales} />
    </Card>
  );
};

export default BotoneraModales;
