import { useState } from "react";
import { ActionButton } from "@/frontend-resourses/components";
import ModalFiltro from "@/frontend-resourses/components/Modales/ModalFiltro";
import { ExcelExportConfig, SucursalesModal } from "@/types";
import { FaStoreAlt } from "react-icons/fa";
import { useVentasPorSeccionStore } from "../useVentasPorSeccionStore";
import HerramientasInforme from "../../../_components/HerramientasInforme";

interface BotoneraHerramientasProps {
  data: Record<string, any>[];
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  estaProcesado: boolean;
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function BotoneraHerramientas({ data, estaProcesado, disabled, className, handleClean }: BotoneraHerramientasProps) {
  const [showModalSucursales, setShowModalSucursales] = useState(false);
  const {
    // filtros
    sucursalesSeleccionadas,
    setSucursalesSeleccionadas,
    sucursalesDisponibles,
    setSucursalesDisponibles,
    id,
  } = useVentasPorSeccionStore();

  const handleClearData =
    handleClean ||
    (() => {
      console.log("clear");
    });

  const renderSucursalesItem = (item: SucursalesModal) => {
    return (
      <>
        {item.nsucursal} - {item.sucursal}
      </>
    );
  };

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Ventas por Seccion",
        data: data,
      },
    ],
    fileName: "Informe_Venta_Por_Seccion",
  };

  return (
    <div className={`${className} flex items-center justify-center gap-4 px-1 py-1  rounded-lg 2xl:h-14`}>
      <ActionButton
        text="Sucursales"
        icon={<FaStoreAlt size={15} />}
        addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm"
        onClick={() => setShowModalSucursales(true)}
        disabled={!estaProcesado}
        color="blue"
      />{" "}
      <HerramientasInforme data={data} estaProcesado={estaProcesado} exportConfig={exportConfig} containerId={id} disabledPrint={disabled} disabledClean={disabled} handleClean={handleClearData} />
      <ModalFiltro<SucursalesModal>
        title="Sucursales"
        renderItem={renderSucursalesItem}
        showModal={showModalSucursales}
        setShowModal={setShowModalSucursales}
        datos={sucursalesDisponibles}
        disabled2={false}
        disabled={false}
        itemsDisponibles={sucursalesDisponibles}
        itemsSeleccionados={sucursalesSeleccionadas}
        setItemsDisponibles={setSucursalesDisponibles}
        setItemsSeleccionados={setSucursalesSeleccionadas}
        iconReact={<FaStoreAlt size={25} />}
        addIconClassName=" text-white w-14 h-12 m-0 flex items-center justify-center "
      />
    </div>
  );
}
