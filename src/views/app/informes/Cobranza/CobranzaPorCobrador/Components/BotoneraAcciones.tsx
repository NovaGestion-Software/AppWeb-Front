
import { FcBinoculars } from "react-icons/fc";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { Botonera } from "../../../_components/Botonera";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useCobranzasPorCobrador } from "../Store/Store";

export default function BotoneraAcciones() {
  const { estaProcesado } = useCobranzasPorCobrador();
  const buttonsClass = `h-6 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;
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
  ];
  return (
    <Card className="s col-start-10  v1536:col-start-10 self-start row-start-1  v1536:row-start-2 v1536:relative v1536:bottom-12">
      <Botonera config={config} />
    </Card>
  );
}
