import { IoMdOptions } from "react-icons/io";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { LuRefreshCcw } from "react-icons/lu";
import { BsCalendarRangeFill } from "react-icons/bs";
import { RiCloseCircleLine, RiPlayCircleLine } from "react-icons/ri";
import { useState } from "react";
import { Botonera } from "../../_components/Botonera";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { useMovCajaTotalesStore } from "../Store/store";

export default function BotoneraAcciones() {
  const { estaProcesado, setEstaProcesado } = useMovCajaTotalesStore();
  const [_show, setShow] = useState<boolean>();
  const buttonsClass = `h-6 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;

  const config: BotoneraConfig[] = [
    {
      type: "simple",
      icon: <RiPlayCircleLine size={16} />,
      color: "green",
      onClick: () => setEstaProcesado(true),
      disabled: estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <RiCloseCircleLine size={16} />,
      color: "red",
      onClick: () => setEstaProcesado(false),
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <LuRefreshCcw size={16} />,
      color: "blue",
      onClick: () => {},
      disabled: !estaProcesado,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <BsCalendarRangeFill size={16} />,
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
