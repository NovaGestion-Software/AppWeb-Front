import { useCallback } from 'react';
import * as XLSX from 'xlsx';
import ModalSucursales from './ModalSucursales';
import HerramientasInforme from '../../_components/HerramientasInforme';

interface DataItem {
  id: number;
  hora: string;
  nOperaciones: number;
  porcentajeOperaciones: number;
  importe: string;
  porcentajeImporte: number;
  pares: number;
  porcentajePares: number;
}

interface HerramientasComponentProps {
  data: DataItem[];
  store?: boolean;
  sucursales: string[];
  sucursalesSeleccionadas: string[];
  setSucursalesSeleccionadas: (value: string[]) => void;
  isProcessing: boolean;
  planes?: boolean;
}

export default function HerramientasComponent({
  data,
  sucursales,
  sucursalesSeleccionadas,
  setSucursalesSeleccionadas,
  isProcessing,
}: HerramientasComponentProps) {
  const handleExportExcel = useCallback(() => {
    const datosTransformados = Object.entries(data).map(([hora, item]) => ({
      hora,
      importe: item.importe,
      cantidad: item.nOperaciones,
      pares: item.pares,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datosTransformados);
    XLSX.utils.book_append_sheet(wb, ws, 'Informe1');
    XLSX.writeFile(wb, 'Informe.xlsx');
  }, [data]);

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

  return (
    <>
      <HerramientasInforme
        data={data}
        isProcessing={isProcessing}
        handleExportExcel={handleExportExcel}
        handlePrint={handlePrint}
      >
        <ModalSucursales
          sucursales={sucursales}
          sucursalesSeleccionadas={sucursalesSeleccionadas}
          setSucursalesSeleccionadas={setSucursalesSeleccionadas}
          isProcessing={isProcessing}
        />
      </HerramientasInforme>
    </>
  );
}
