import { useCallback, useState } from "react";
import { ActionButton } from "@/frontend-resourses/components";
import ModalFiltro from "@/frontend-resourses/components/Modales/ModalFiltro";
import { ExcelExportConfig, SucursalesModal } from "@/types";
import { FaStoreAlt } from "react-icons/fa";
import { useVentasPorVendedorStore } from "../store/useVentasPorVendedorStore";
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
  } = useVentasPorVendedorStore();

  // const datosTotales = datosParaFooter
  //   ? { id: 1, hora: 'Totales', ...datosParaFooter } // Se añade un identificador único
  //   : null;

  const exportConfig: ExcelExportConfig = {
    sheets: [
      {
        name: "Ventas por Vendedor",
        data: data,
      },
    ],
    fileName: "Informe_Venta_Por_Vendedor",
  };

  const handlePrint = useCallback(() => {
    const tableElement = document.getElementById("table-to-print");
    if (!tableElement) return;

    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) return;

    printWindow.document.write(`
          <html>
            <head>
              <title>Imprimir Tabla</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; margin: 0; }
                table { width: 100%; border-collapse: collapse; }
                table, th, td { border: 1px solid black; }
                th, td { padding: 8px; text-align: left; }
                @media print { body { font-size: 12px; } button { display: none; } }
              </style>
            </head>
            <body>
              <h1>Informe</h1>
              ${tableElement.outerHTML}
            </body>
          </html>
        `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  }, []);

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

  return (
    <div className={`${className} flex items-center justify-center gap-6 h-10  rounded-lg 2xl:h-14`}>
      <ActionButton text="Sucursales" icon={<FaStoreAlt size={15} />} addClassName="2xl:h-8" onClick={() => setShowModalSucursales(true)} disabled={!estaProcesado} color="blue" size="xs" />{" "}
      <HerramientasInforme containerId={id} data={data} estaProcesado={estaProcesado} exportConfig={exportConfig} handlePrint={handlePrint} disabledPrint={disabled} disabledClean={disabled} handleClean={handleClearData} />
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
