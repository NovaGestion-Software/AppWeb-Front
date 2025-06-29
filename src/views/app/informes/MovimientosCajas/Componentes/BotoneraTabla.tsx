import { MdSaveAs } from "react-icons/md";
import { useMovCajaStore } from "../Store/store";
import { TbReportMoney } from "react-icons/tb";
import { FaBan, FaClipboardList, FaFileInvoiceDollar, FaHandHoldingUsd } from "react-icons/fa";
import { FcBinoculars } from "react-icons/fc";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { Botonera } from "../../_components/Botonera";

export default function BotoneraTabla() {
  const { estaProcesado } = useMovCajaStore();
  const buttonsClass = `h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;
  const buttonIconSize = 12;
  const config: BotoneraConfig[] = [
    {
      type: "simple",
      text: "Grabar",
      icon: <MdSaveAs size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      text: "Valores",
      icon: <TbReportMoney size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },

    {
      type: "simple",
      text: "Resumen",
      icon: <FaClipboardList size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },

    {
      type: "simple",
      text: "Créditos.",
      icon: <FaHandHoldingUsd size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },

    {
      type: "simple",
      text: "Anular mov.",
      icon: <FaBan size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },

    {
      type: "simple",
      icon: <FcBinoculars size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      text: "O. Pago",
      icon: <FaFileInvoiceDollar size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: `${buttonsClass} w-36`,
    },
  ];
  return <Botonera config={config} className="mb-2 m-1" />;
}
