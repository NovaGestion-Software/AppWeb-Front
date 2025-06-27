import { ActionButton } from "@/frontend-resourses/components";
import {  MdSaveAs } from "react-icons/md";
import { useMovCajaStore } from "../Store/store";
import { TbReportMoney } from "react-icons/tb";
import { FaBan, FaClipboardList, FaFileInvoiceDollar, FaHandHoldingUsd } from "react-icons/fa";
import { FcBinoculars } from "react-icons/fc";

function Buttons({ className, estaProcesado }: { className?: string; estaProcesado: boolean }) {
  return (
    <div className={`${className} gap-3 flex m-1 mb-2 `}>
      <ActionButton text="Grabar" onClick={() => {}
    } addClassName="h-5  rounded-md text-xxs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm"
     disabled={!estaProcesado} color="blue" icon={<MdSaveAs size={12} />} />
      <ActionButton
        text="Valores"
        onClick={() => {}}
        disabled={!estaProcesado}
        color="blue"
        icon={<TbReportMoney size={14} />}
        addClassName="h-5 w-28 v1440:w-28 v1536:w-40  rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm"
      />

      <ActionButton text="Resumen" color="blue" disabled={!estaProcesado} onClick={() => {}} 
      icon={<FaClipboardList size={12} />} addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton text="Créditos" color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<FaHandHoldingUsd size={12} />} addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton text="Anular mov." color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<FaBan size={12} />} addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<FcBinoculars size={12} />} addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton text="O. Pago" color="blue" disabled={!estaProcesado} onClick={() => {}} icon={<FaFileInvoiceDollar size={12} />} addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />
    </div>
  );
}

export default function BotoneraTabla() {
  const { estaProcesado } = useMovCajaStore();
  return <Buttons estaProcesado={estaProcesado} className="" />;
}
