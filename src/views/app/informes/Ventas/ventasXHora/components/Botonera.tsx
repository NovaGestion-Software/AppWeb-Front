import { ActionButton } from "@/frontend-resourses/components";
import { FaStoreAlt } from "react-icons/fa";
import { useHandleClearData } from "../Utils/useHandleClear";
import { useVentasHoraStore } from "../store/useVentasHoraStore";
import HerramientasComponent from "./HerramientasComponent";

export default function Botonera({data}: {data: any}) {
  const handleClearData = useHandleClearData();
  const {
    // estados
    estaProcesado,
    //
    setShowSucursales,
  } = useVentasHoraStore();

  return (
    <div
      className="flex gap-6 items-center justify-center h-10 w-fit px-4 left-11 relative bg-white
             rounded-lg col-span-3 col-start-9 
             v1536:h-14 v1536:col-span-2 v1536:col-start-9 v1536:left-4 "
    >
      <ActionButton
        text="Sucursales"
        icon={<FaStoreAlt size={15} />}
        addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm"
        onClick={() => setShowSucursales(true)}
        disabled={!estaProcesado}
        color="blue"
        size="xs"
      />{" "}
      <HerramientasComponent 
      data={data} 
      estaProcesado={estaProcesado} 
      datosParaFooter={data} 
      disabled={!estaProcesado} 
      handleClean={handleClearData} />
    </div>
  );
}
