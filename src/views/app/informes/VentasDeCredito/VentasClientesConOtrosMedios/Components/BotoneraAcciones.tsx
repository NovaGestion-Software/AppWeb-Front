import { MdSaveAs } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { FaBan, FaClipboardList, FaFileInvoiceDollar, FaHandHoldingUsd } from "react-icons/fa";
import { FcBinoculars } from "react-icons/fc";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { Botonera } from "../../../_components/Botonera";
import { useVentasClientesOtrosMedios } from "../Store/Store";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";

export default function BotoneraAcciones() {
  const { estaProcesado } = useVentasClientesOtrosMedios();
  const buttonsClass = `h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;
  const buttonIconSize = 12;
  const config: BotoneraConfig[] = [
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
      icon: <FaClipboardList size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <FaHandHoldingUsd size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
  ];
  return (
    <Card className="col-start-12 v1440:col-start-11 v1536:col-start-12 self-end row-start-2">
      <Botonera config={config} />
    </Card>
  );
}
