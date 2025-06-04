import { useCallback, useState } from "react";
import HerramientasInforme, { ExcelExportConfig } from "../../_components/HerramientasInforme";
import * as XLSX from "xlsx";
import { ActionButton } from "@/frontend-resourses/components";
import ModalFiltro from "@/frontend-resourses/components/Modales/ModalFiltro";
import { SucursalesModal } from "@/types";
import { FaStoreAlt } from "react-icons/fa";
import { useCobranzaPorVencimientoStore } from "../store/CobranzaPorVencimientoStore";

interface BotoneraProps {
  data: Record<string, any>[];
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  estaProcesado: boolean;
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function Botonera({ data, estaProcesado, disabled, className }: BotoneraProps) {
  const [showModalSucursales, setShowModalSucursales] = useState(false);
  const {
    // filtros
    sucursalesSeleccionadas,
    setSucursalesSeleccionadas,
    sucursalesDisponibles,
    setSucursalesDisponibles,
  } = useCobranzaPorVencimientoStore();

  const renderSucursalesItem = (item: SucursalesModal) => {
    return (
      <>
        {item.nsucursal} - {item.sucursal}
      </>
    );
  };

  // Preparar estructura para exportToExcel
  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Cobranza por Vencimiento",
        data: data,
        // Puedes añadir más configuraciones por hoja aquí
      }
    ],
    fileName: "Informe_Cobranza_Por_Vencimiento.xlsx",
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
      <HerramientasInforme
        data={data}
        estaProcesado={!estaProcesado}
        disabledPrint={disabled}
        disabledClean={disabled}
        disabledExportExcel={disabled}
        exportConfig={exportConfig}
        
      />
      
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
