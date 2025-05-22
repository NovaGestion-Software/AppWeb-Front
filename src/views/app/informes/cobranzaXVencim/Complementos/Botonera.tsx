import { useCallback, useState } from "react";
import HerramientasInforme from "../../_components/HerramientasInforme";
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

export default function Botonera({ data, datosParaFooter, estaProcesado, disabled, className, handleClean }: BotoneraProps) {
  const [showModalSucursales, setShowModalSucursales] = useState(false);
  const {
    // filtros
    sucursalesSeleccionadas,
    setSucursalesSeleccionadas,
    sucursalesDisponibles,
    setSucursalesDisponibles,
  } = useCobranzaPorVencimientoStore();

  const datosTotales = datosParaFooter
    ? { id: 1, hora: "Totales", ...datosParaFooter } // Se añade un identificador único
    : null;

  const handleExportExcel = useCallback(() => {
    if (!data || data.length === 0) return;

    // Convertimos los datos en un array de objetos sin depender de claves fijas
    const datosTransformados = data.map((item, index) => ({
      id: index + 1, // Añadir un ID opcional
      ...item, // Mantener la estructura original
    }));

    // Si hay datos totales, los agregamos al final
    if (datosTotales) {
      datosTransformados.push(datosTotales);
    }

    // Creamos el libro de Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datosTransformados);
    XLSX.utils.book_append_sheet(wb, ws, "Informe");

    // Guardamos el archivo
    XLSX.writeFile(wb, "Informe.xlsx");
  }, [data, datosTotales]);

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
        handleExportExcel={handleExportExcel}
        handleClean={handleClearData}
        handlePrint={handlePrint}
        disabledPrint={disabled}
        disabledClean={disabled}
        disabledExportExcel={disabled}
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
