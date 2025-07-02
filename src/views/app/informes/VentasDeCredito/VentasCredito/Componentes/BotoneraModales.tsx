import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { getBotonSucursal } from "@/utils/helpers/botonera";
import { useState } from "react";
import { Botonera } from "../../../_components/Botonera";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { useVentasEnCredito } from "../Store/Store";
import { MdReceiptLong } from "react-icons/md";

export default function BotoneraModales() {
  const [_show, setShow] = useState<boolean>();
  const { estaProcesado } = useVentasEnCredito();
  const buttonsClass = `h-6 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;


  const config: BotoneraConfig[] = [
    getBotonSucursal({
      setVisible: setShow,
      disabled: !estaProcesado,
    }),
    {
      type: "simple",
      icon: <MdReceiptLong size={12} />,
      color: "blue",
      text: "Planes",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: `${buttonsClass}`,
    },
  ];

  return (
    <Card className="col-start-9 v1536:col-start-8 self-center">
      <Botonera config={config} />
    </Card>
  );
}
