import { ActionButton } from "@/frontend-resourses/components";
import { IoMdOptions } from "react-icons/io";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useMovCajaStore } from "../Store/store";
import { LuRefreshCcw } from "react-icons/lu";
import { FaWarehouse } from "react-icons/fa";
import { BsCalendarRangeFill } from "react-icons/bs";
import { RiCloseCircleLine, RiPlayCircleLine } from "react-icons/ri";

function Buttons({ className, estaProcesado, setEstaProcesado }: { className?: string; estaProcesado: boolean, setEstaProcesado: (value: boolean) => void; }) {
  const buttonsClass = `h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;
  const buttonSize = 16;
  return (
    <div className={`${className} flex flex-row gap-3  `}>
      <ActionButton icon={<RiPlayCircleLine  size={buttonSize}  />} color="green" addClassName={`${buttonsClass}`} onClick={() => setEstaProcesado(true)} disabled={estaProcesado} />

      <ActionButton icon={<RiCloseCircleLine size={buttonSize}  />} color="red" addClassName={`${buttonsClass}`}  onClick={() => setEstaProcesado(false)} disabled={!estaProcesado} />
      <ActionButton text="" color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<LuRefreshCcw size={buttonSize} />} addClassName={`${buttonsClass}`} />


      <ActionButton text="" color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<BsCalendarRangeFill size={buttonSize} />} addClassName={`${buttonsClass}`}  />

      <ActionButton text="" color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<FaWarehouse size={buttonSize} />} addClassName={`${buttonsClass}`}  />

      <ActionButton text="" color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<IoMdOptions size={buttonSize} />} addClassName={`${buttonsClass}`}  />
    </div>
  );
}

export default function BotoneraAcciones() {
  const { estaProcesado, setEstaProcesado } = useMovCajaStore();
  return (
    <Card className="col-start-11 ml-4 self-center row-start-2 v1536:col-start-10 v1536:ml-6 v1920:ml-10 ">
      <Buttons setEstaProcesado={setEstaProcesado} estaProcesado={estaProcesado} />
    </Card>
  );
}
