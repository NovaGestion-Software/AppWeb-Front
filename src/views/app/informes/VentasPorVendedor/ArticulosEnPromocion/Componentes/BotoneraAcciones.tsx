import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { Botonera } from "../../../_components/Botonera";
import { useArticulosEnPromocion } from "../Store/Store";

import { FaPlusCircle, FaEdit, FaTrashAlt, FaSave } from "react-icons/fa";

export default function BotoneraAcciones() {
  const { estaProcesado, setEstaProcesado } = useArticulosEnPromocion();

  const buttonsClass = `h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;
  const buttonIconSize = 12;
  const config: BotoneraConfig[] = [
    {
      type: "simple",
      icon: <FaPlusCircle size={buttonIconSize} />,
      color: "green",
      text: "Agregar",
      onClick: () => setEstaProcesado(true),
      disabled: estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <FaEdit size={buttonIconSize} />,
      color: "blue",
      text: "Modificar",
      onClick: () => setEstaProcesado(false),
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <FaTrashAlt size={buttonIconSize} />,
      color: "red",
      text: "Eliminar",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <FaSave size={buttonIconSize} />,
      color: "blue",
      text: "Grabar",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
  ];

  return (
    <Card className="col-start-1  self-center row-start-1   ">
      <Botonera config={config} className="p-1" />
    </Card>
  );
}
