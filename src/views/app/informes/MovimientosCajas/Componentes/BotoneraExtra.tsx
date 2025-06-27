import { ActionButton } from "@/frontend-resourses/components";
import { IoIosCloudDownload } from "react-icons/io";
import { FaArrowCircleDown, FaArrowCircleUp, FaCashRegister, FaCoins } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useMovCajaStore } from "../Store/store";


function Buttons({ className, estaProcesado }: { className?: string; estaProcesado: boolean }) {

  return (
    <div className={`${className} flex flex-row gap-3 `}>
      <ActionButton text="Cobranza" onClick={() => {}}
       addClassName="h-5 rounded-md text-xxs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm"
        disabled={!estaProcesado} color="blue" icon={<FaCashRegister size={12} />} />
      <ActionButton
        text="Ingresos"
        onClick={() => {}}
        disabled={!estaProcesado}
        color="blue"
        icon={<FaArrowCircleDown size={12} />}
        addClassName="h-5 w-28 v1440:w-28 v1536:w-40  rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm"
      />

      <ActionButton text="Gastos" color="blue" disabled={!estaProcesado} onClick={() => {}} 
      icon={<FaArrowCircleUp size={12} />} addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton text="Recaud." color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<FaCoins size={12} />} addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton text="MFondos" color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<MdCurrencyExchange size={12} />} addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton text="Bajar" color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<IoIosCloudDownload size={12} />} addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton text="Subir Host" color="blue" disabled={!estaProcesado} onClick={() => {}}
       icon={<IoCloudUploadSharp size={12} />} addClassName="h-5 w-36 rounded-md text-xxs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />
    </div>
  );
}

export default function BotoneraExtra() {
  const { estaProcesado } = useMovCajaStore();
  return (
    <Card>
      <Buttons estaProcesado={estaProcesado} className="" />
    </Card>
  );
}
