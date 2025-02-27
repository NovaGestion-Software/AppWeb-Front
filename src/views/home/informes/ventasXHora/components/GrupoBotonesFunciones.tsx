// import { useDispatch, useSelector } from "react-redux";
// import ModalSucursales from "./ModalSucursales";
// import ModalPlanes from "./ModalPlanes";

import * as XLSX from 'xlsx';
import { RiFileExcel2Fill, RiPrinterFill } from '@remixicon/react';
// import { TOGGLE_VIEW_SUCURSAL } from "./../../../../lib/features/informeCobranzaSlice";
// import ModalSucursales2 from "./ModalSucursales2";

interface GrupoBotonesFuncionesProps {
  data: any;
  //   store: any;
  sucursales: { nsucursal: string; nombre: string }[];
  //   sucursalesSeleccionadas: string[];
  setSucursalesSeleccionadas: React.Dispatch<React.SetStateAction<string[]>>;
  onConfirm: () => void;
  isProcessing: boolean;
  //   planes: any[];
}

export default function GrupoBotonesFunciones({
  data,
  //   store,
  sucursales,
  //   sucursalesSeleccionadas,
  setSucursalesSeleccionadas,
  onConfirm,
  isProcessing,
}: //   planes,
GrupoBotonesFuncionesProps) {
  //   const storeInformeCobranza = useSelector((state) => state.informeCobranzas);

  console.log('data en grupo: ', data);
  const handleExportExcel = () => {
    const datosTransformados = Object.keys(data).map((hora) => ({
      hora,
      importe: data[hora].importe,
      cantidad: data[hora].cantidad,
      pares: data[hora].pares,
    }));

    // Crear un libro de trabajo y una hoja de cálculo
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datosTransformados);

    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Informe1');

    // Exportar el archivo Excel
    XLSX.writeFile(wb, 'Informe.xlsx');
  };

  //   const handlePrint = () => {
  //     const printWindow = window.open("", "_blank", "width=600,height=800");
  //     const tableContent = document.getElementById("table-to-print").outerHTML;

  //     printWindow.document.write(`
  //       <html>
  //         <head>
  //           <title>Imprimir Tabla</title>
  //           <style>
  //             body {
  //               font-family: Arial, sans-serif;
  //               padding: 20px;
  //               margin: 0;
  //             }
  //             table {
  //               width: 100%;
  //               border-collapse: collapse;
  //             }
  //             table, th, td {
  //               border: 1px solid black;
  //             }
  //             th, td {
  //               padding: 8px;
  //               text-align: left;
  //             }
  //             @media print {
  //               body {
  //                 font-size: 12px;
  //               }
  //               button {
  //                 display: none;
  //               }
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <h1>Informe</h1>
  //           ${tableContent}
  //         </body>
  //       </html>
  //     `);

  //     printWindow.document.close();
  //     printWindow.print();
  //   };

  return (
    <div className="flex flex-row items-center justify-center gap-6 h-14  py-2 px-4 rounded-lg border bg-white">
      {/** boton modal sucursales */}
      {/* {store ? (
        <ModalSucursales
          storeSelector={(state) => state.informeCobranzas}
          toggleAction={TOGGLE_VIEW_SUCURSAL}
        />
      ) : (
        <ModalSucursales2
          sucursales={sucursales}
          onConfirm={onConfirm}
          setSucursalesSeleccionadas={setSucursalesSeleccionadas}
          isProcessing={isProcessing}
        />
      )} */}
      {/**Boton Planes */}
      {/* {planes && <ModalPlanes />} */}

      {/** export excel */}
      <button
        onClick={handleExportExcel}
        disabled={!isProcessing}
        className={` w-16 h-9 rounded-md p-1 flex items-center justify-center  ${
          isProcessing
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-500 cursor-not-allowed border-none'
        } text-white`}
      >
        <RiFileExcel2Fill className="" />
      </button>
      {/** Imprimir */}
      <button
        // onClick={handlePrint}
        disabled={!isProcessing}
        className={`w-16 h-9 rounded-md flex items-center justify-center  ${
          isProcessing
            ? 'bg-sky-600 hover:bg-sky-700'
            : 'bg-gray-500 cursor-not-allowed border-none'
        } text-white`}
      >
        <RiPrinterFill />
      </button>
    </div>
  );
}
