import { IoIosCloudDownload } from "react-icons/io";
import { FaArrowCircleDown, FaArrowCircleUp, FaCashRegister, FaCoins } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useMovCajaStore } from "../Store/store";
import { Botonera } from "../../_components/Botonera";
import { BotoneraConfig } from "@/types/ButtonConfig";


export default function BotoneraExtra() {
  const { estaProcesado } = useMovCajaStore();
  const buttonsClass = `h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;
  const buttonIconSize = 12;
  const config: BotoneraConfig[] = [
    {
      type: "simple",
      icon: <FaCashRegister size={buttonIconSize} />,
      color: "blue",
      text: "Cobranza",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      text: "Ingresos",
      icon: <FaArrowCircleDown size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },

    {
      type: "simple",
      text: "Gastos",
      icon: <FaArrowCircleUp size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },

    {
      type: "simple",
      text: "Recaud.",
      icon: <FaCoins size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },

    {
      type: "simple",
      text: "MFondos",
      icon: <MdCurrencyExchange size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },

    {
      type: "simple",
      text: "Bajar",
      icon: <IoIosCloudDownload size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      text: "Subir Host",
      icon: <IoCloudUploadSharp size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: `${buttonsClass} w-36`,
    },
  ];
  return (
    <Card>
      <Botonera config={config} />
    </Card>
  );
}
