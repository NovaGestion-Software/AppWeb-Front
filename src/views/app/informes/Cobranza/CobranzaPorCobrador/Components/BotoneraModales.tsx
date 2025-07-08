import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { Botonera } from "../../../_components/Botonera";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { useCobranzasPorCobrador } from "../Store/Store";
import { FaUserAlt } from "react-icons/fa";

export default function BotoneraModales() {
//  const [_show, setShow] = useState<boolean>();
  const { estaProcesado } = useCobranzasPorCobrador();
    const buttonsClass = `h-6 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;
  const buttonIconSize = 12;

  const config: BotoneraConfig[] = [
    {
      type: "simple",
      icon: <FaUserAlt size={buttonIconSize} />,
      color: "blue",
      text: "Cobradores",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
  ];

  return (
    <Card className="col-start-11 relative right-5 v1536:right-0 v1536:col-start-10  self-start">
      <Botonera config={config} />
    </Card>
  );
}
