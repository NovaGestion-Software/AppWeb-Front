import { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { RiFileExcel2Fill, RiPrinterFill } from "@remixicon/react";
import ModalSucursales2 from "./ModalSucursales2";
// import { TOGGLE_VIEW_SUCURSAL } from "../../../../lib/features/informeCobranzaSlice";
// import { RootState } from "../../../../lib/store";

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

interface GrupoBotonesFuncionesProps {
  data: DataItem[];
  store?: boolean;
  sucursales: string[];
  sucursalesSeleccionadas: string[];
  setSucursalesSeleccionadas: (value: string[]) => void;
  isProcessing: boolean;
  planes?: boolean;
}

const GrupoBotonesFunciones: React.FC<GrupoBotonesFuncionesProps> = ({
  data,
  sucursales,
  sucursalesSeleccionadas,
  setSucursalesSeleccionadas,
  isProcessing,
}) => {
  // const storeInformeCobranza = useSelector(
  //   (state: RootState) => state.informeCobranzas
  // );

  const handleExportExcel = useCallback(() => {
    const datosTransformados = Object.entries(data).map(([hora, item]) => ({
      hora,
      importe: item.importe,
      cantidad: item.nOperaciones,
      pares: item.pares,
    }));

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

//   {store ? (
//     <ModalSucursales
//       storeSelector={(state: RootState) => state.informeCobranzas}
//       toggleAction={TOGGLE_VIEW_SUCURSAL}
//     />
//   ) : (
// )}
  return (
    <div className="flex flex-row items-center justify-center gap-6 h-14 py-2 px-4 rounded-lg border bg-white">
    
        <ModalSucursales2
          sucursales={sucursales}
          sucursalesSeleccionadas={sucursalesSeleccionadas}
          setSucursalesSeleccionadas={setSucursalesSeleccionadas}
          isProcessing={isProcessing}
        />
    

      <button
        onClick={handleExportExcel}
        disabled={!isProcessing}
        className={`w-16 h-9 rounded-md p-1 flex items-center justify-center text-white ${
          isProcessing
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-500 cursor-not-allowed border-none"
        }`}
      >
        <RiFileExcel2Fill />
      </button>

      <button
        onClick={handlePrint}
        disabled={!isProcessing}
        className={`w-16 h-9 rounded-md flex items-center justify-center text-white ${
          isProcessing
            ? "bg-sky-600 hover:bg-sky-700"
            : "bg-gray-500 cursor-not-allowed border-none"
        }`}
      >
        <RiPrinterFill />
      </button>
    </div>
  );
};

export default GrupoBotonesFunciones;
