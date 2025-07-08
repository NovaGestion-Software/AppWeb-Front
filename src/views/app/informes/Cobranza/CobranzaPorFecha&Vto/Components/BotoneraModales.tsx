import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { Botonera } from "../../../_components/Botonera";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { getBotonSucursal } from "@/utils/helpers/botonera";
import {  MdReceiptLong } from "react-icons/md";
import { useState } from "react";
import { useCobranzasPorFechaYVto } from "../Store/store";

export default function BotoneraModales() {
  const [_show, setShow] = useState<boolean>();
  const { estaProcesado } = useCobranzasPorFechaYVto();
  const buttonsClass = `h-6 rounded-md text-xxs  v1440:h-8 
  v1536:h-9 v1536:px-6 v1536:text-sm v1920:h-9`;
  const buttonIconSize = "text-[0.75rem] v1440:text-base v1536:text-lg v1920:text-xl";

  const config: BotoneraConfig[] = [
    {
      type: "simple",
      icon: <MdReceiptLong className={buttonIconSize} />,
      color: "blue",
      text: "U. Negocio",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: `${buttonsClass} w-32 v1536:w-44`,
    },
    getBotonSucursal({
      setVisible: setShow,
      disabled: !estaProcesado,
    }),
    {
      type: "simple",
      icon: <MdReceiptLong className={buttonIconSize} />,
      color: "blue",
      text: "Planes",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: `${buttonsClass}`,
    },
  ];

  return (
    <Card className="col-start-8 relative right-5 v1536:-right-10 v1536:col-start-7  
    self-start">
      <Botonera config={config} />
    </Card>
  );
}
