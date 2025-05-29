import { RiFileExcel2Fill, RiPrinterFill } from "@remixicon/react";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import { useCallback, useEffect } from "react";
import * as XLSX from "xlsx";
import { IoTrash } from "react-icons/io5";

interface HerramientasInformeProps<_T> {
  data: Record<string, any>[]; // ✅ Ahora acepta cualquier tipo de datos
  estaProcesado: boolean;
  handleExportExcel?: () => void;
  handlePrint?: () => void;
  handleClean?: () => void;
  disabledExportExcel?: boolean;
  disabledPrint?: boolean;
  datosParaFooter?: Record<string, any>;
  disabledClean?: boolean;
  gapButtons?: string;
}

export default function HerramientasInforme<T>({ data, 
  handleClean,
   datosParaFooter, disabledExportExcel, disabledPrint, disabledClean, gapButtons = 'gap-6' }: HerramientasInformeProps<T>) {
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [data]);

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

  // aca lo que podria ser es una prop con la id que de la tabla que se quiere imprimir.
  // Al hacer click con el boton, abrir un menu desplegable con las posibilidades de impresion de la vista
  // con ese boton seleccionar el id de la tabla que se quiera y pasarlo a esta prop.
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
    <div className={`flex justify-center ${gapButtons} w-fit rounded-lg `}>
      <ActionButton
        onClick={handleExportExcel}
        disabled={disabledExportExcel}
        addClassName="h-5   rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm"
        color="green"
        icon={<RiFileExcel2Fill className="h-3 w-3 v1536:h-5 v1536:w-5" />}
      />
      <ActionButton
        onClick={handlePrint}
        disabled={disabledPrint}
        addClassName="h-5  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm"
        color="blue"
        icon={<RiPrinterFill className="h-3 w-3 v1536:h-5 v1536:w-5" />}
      />
      <ActionButton
        icon={<IoTrash className="h-3 w-3 v1536:h-5 v1536:w-5" />}
        color="red"
        addClassName="h-5  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm 2xl:w-12"
        onClick={handleClean || (() => {})}
        disabled={disabledClean}
      />
    </div>
  );
}
