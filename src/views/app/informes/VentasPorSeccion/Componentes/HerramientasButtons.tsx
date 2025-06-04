import { useCallback, useState } from 'react';
import HerramientasInforme, { ExcelExportConfig } from '../../_components/HerramientasInforme';
import * as XLSX from 'xlsx';
import { ActionButton } from '@/frontend-resourses/components';
import ModalFiltro from '@/frontend-resourses/components/Modales/ModalFiltro';
import { SucursalesModal } from '@/types';
import { FaStoreAlt } from 'react-icons/fa';
import { useVentasPorSeccionStore } from '../useVentasPorSeccionStore';

interface BotoneraHerramientasProps {
  data: Record<string, any>[];
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  estaProcesado: boolean;
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function BotoneraHerramientas({ data, datosParaFooter, estaProcesado, disabled, className, handleClean }: BotoneraHerramientasProps) {
  const [showModalSucursales, setShowModalSucursales] = useState(false);
    const {
      // filtros
      sucursalesSeleccionadas,
      setSucursalesSeleccionadas,
      sucursalesDisponibles,
      setSucursalesDisponibles,
    } = useVentasPorSeccionStore();

  const datosTotales = datosParaFooter
    ? { id: 1, hora: 'Totales', ...datosParaFooter } // Se añade un identificador único
    : null;


  const handlePrint = useCallback(() => {
    const tableElement = document.getElementById('table-to-print');
    if (!tableElement) return;

    const printWindow = window.open('', '_blank', 'width=600,height=800');
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
      console.log('clear');
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
          }
        ],
        fileName: "Informe_Venta_Por_Seccion",
      };

  return (
    <div className={`${className} flex items-center justify-center gap-4 px-1 py-1  rounded-lg 2xl:h-14`}>
      <ActionButton text="Sucursales" icon={<FaStoreAlt size={15} />}
       addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm" onClick={() => setShowModalSucursales(true)} 
       disabled={!estaProcesado} color="blue"/>{' '}
      <HerramientasInforme data={data} estaProcesado={estaProcesado} exportConfig={exportConfig} handlePrint={handlePrint} disabledPrint={disabled} disabledClean={disabled} handleClean={handleClearData} />
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
