import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { getBotonSucursal } from "@/utils/helpers/botonera";
import { useState } from "react";
import { Botonera } from "../../../_components/Botonera";
import { useComparativoMensual } from "../Store/Store";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { MdReceiptLong } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";

export default function BotoneraModales() {
  const [_show, setShow] = useState<boolean>();
  const { estaProcesado, setEstaProcesado, setShowParametros } = useComparativoMensual();
  const buttonsClass = `h-6 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;
  const handleParametros = () => {
    setShowParametros(true)
    console.log('onclik')
  }

  const config: BotoneraConfig[] = [
    getBotonSucursal({
      setVisible: setShow,
      disabled: !estaProcesado,
    }),
    {
      type: "simple",
      icon: <MdReceiptLong size={12} />,
      color: "blue",
      text: "Uni. Negocio",
      onClick: () => setEstaProcesado(true),
      disabled: !estaProcesado,
      addClassName: `${buttonsClass} w-28 v1536:w-40`,
    },
    {
      type: "simple",
      icon: <IoMdOptions size={12} />,
      color: "blue",
      text: "Parametros",
      onClick: handleParametros,
      disabled: estaProcesado,
      addClassName: `${buttonsClass}`,
    },
  ];

  return (
    <Card>
      <Botonera config={config} />
    </Card>
  );
}
