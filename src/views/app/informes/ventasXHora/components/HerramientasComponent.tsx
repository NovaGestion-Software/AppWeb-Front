import { useCallback } from "react";
import * as XLSX from "xlsx";
import ModalSucursales from "./ModalSucursales";
import HerramientasInforme from "../../_components/HerramientasInforme";

interface DataItem {
  id: number;
  hora: string;
  nOperaciones: number | string;
  porcentajeOperaciones: number | string;
  importe: string;
  porcentajeImporte: number | string;
  pares: number | string;
  porcentajePares: number | string;
}
interface DataFooter {
  id: number | string;
  hora: string;
  totalOperaciones: number | string;
  porcentajeOperaciones: number | string;
  totalImporte: string | number;
  porcentajeImporte: number | string;
  totalPares: number | string;
  porcentajePares: number | string;
}

 
interface HerramientasComponentProps {
  data: DataItem[];
  store?: boolean;
  sucursales: string[];
  sucursalesSeleccionadas: string[];
  setSucursalesSeleccionadas: (value: string[]) => void;
  isProcessing: boolean;
  planes?: boolean;
  datosParaFooter: DataFooter;
}

export default function HerramientasComponent({
  data,

  // sucursales,
  // sucursalesSeleccionadas,
  // setSucursalesSeleccionadas,
        datosParaFooter,

  isProcessing,
}: HerramientasComponentProps) {
  const { totalOperaciones, totalPares, totalImporte } = datosParaFooter;
  const datosTotales = {
    horas: "", // Identificador en la columna de horas
    hora: "Totales", // Identificador en la columna de horas
    operaciones: totalOperaciones,
    porcentajeOperaciones: "",
    pares: totalPares,
    porcentajePares: "",
    importe: totalImporte.toString(),
    porcentajeImporte: "",
  };

  const handleExportExcel = useCallback(() => {
    const datosTransformados = Object.entries(data).map(([horas, item]) => ({
      horas,
      hora: item.hora,
      operaciones: item.nOperaciones,
      porcentajeOperaciones: item.porcentajeOperaciones,
      pares: item.pares,
      porcentajePares: item.porcentajePares,
      importe: item.importe,
      porcentajeImporte: item.porcentajeImporte,
    }));
    datosTransformados.push(datosTotales);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datosTransformados);
    XLSX.utils.book_append_sheet(wb, ws, "Informe1");
    XLSX.writeFile(wb, "Informe.xlsx");
  }, [data]);

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

  return (
    <>
      <HerramientasInforme
        data={data}
        isProcessing={isProcessing}
        handleExportExcel={handleExportExcel}
        handlePrint={handlePrint}
      >
        <ModalSucursales
          // sucursales={sucursales}
          // sucursalesSeleccionadas={sucursalesSeleccionadas}
          // setSucursalesSeleccionadas={setSucursalesSeleccionadas}
          isProcessing={isProcessing}
        />
      </HerramientasInforme>
    </>
  );
}
