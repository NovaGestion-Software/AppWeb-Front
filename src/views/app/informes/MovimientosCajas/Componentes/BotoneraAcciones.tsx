import { GoChecklist } from "react-icons/go";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useMovCajaStore } from "../Store/store";
import { LuRefreshCcw } from "react-icons/lu";
import { BsCalendarRangeFill } from "react-icons/bs";
import { RiCloseCircleLine, RiPlayCircleLine } from "react-icons/ri";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { Botonera } from "../../_components/Botonera";
import { getBotonSucursal } from "@/utils/helpers/botonera";
import { useState } from "react";

export default function BotoneraAcciones() {
  const { estaProcesado, setEstaProcesado } = useMovCajaStore();
  const [_show, setShow] = useState<boolean>();

  const buttonsClass = `h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;
  const buttonIconSize = 16;
  const config: BotoneraConfig[] = [
    {
      type: "simple",
      icon: <RiPlayCircleLine size={buttonIconSize} />,
      color: "green",
      onClick: () => setEstaProcesado(true),
      disabled: estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <RiCloseCircleLine size={buttonIconSize} />,
      color: "red",
      onClick: () => setEstaProcesado(false),
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <LuRefreshCcw size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <BsCalendarRangeFill size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    getBotonSucursal({ setVisible: setShow, conTexto: false, disabled: !estaProcesado, iconSize: buttonIconSize }),
    {
      type: "simple",
      icon: <GoChecklist size={buttonIconSize} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
  ];

  return (
    <Card className="col-start-11 ml-4 self-center row-start-2 v1536:col-start-10 v1536:ml-6 v1920:ml-10 ">
      <Botonera config={config} className="p-1" />
    </Card>
  );
}
