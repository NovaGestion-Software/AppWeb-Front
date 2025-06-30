import { TbReportMoney } from "react-icons/tb";
import { useMovCajaTotalesStore } from "../Store/store";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FcBinoculars } from "react-icons/fc";
import { Botonera } from "../../../_components/Botonera";

export default function BotoneraTabla() {
  const { estaProcesado } = useMovCajaTotalesStore();
  const buttonsClass = "h-8 w-28 v1440:w-28 v1536:w-40  rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm";
  const btnClassAlone = "h-8 w-12 v1440:w-28 v1536:w-24  rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm";

  const config: BotoneraConfig[] = [
    {
      type: "simple",
      text: "Valores",
      icon: <TbReportMoney size={14} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      text: "Créditos",
      icon: <FaHandHoldingUsd size={16} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
     {
      type: "simple",
      icon: <FcBinoculars size={16} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: btnClassAlone,
    },
  ];

  return <Botonera config={config} className="m-1 mb-2" />;
}
