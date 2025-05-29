import { useCallback } from 'react';
import * as XLSX from 'xlsx';
import HerramientasInforme from '../../_components/HerramientasInforme';
import { Card } from '@/frontend-resourses/components/Cards/CardBase';

interface HerramientasComponentProps {
  data: Record<string, any>[]; // Ahora acepta cualquier estructura de datos
  datosParaFooter?: Record<string, any>; // Opcional
  estaProcesado: boolean;
  modalSucursales?: boolean;
  disabled?: boolean;
  handleClean ?: () => void; // Función opcional para limpiar
  className?: string;
}

export default function HerramientasComponent({
  data,
  datosParaFooter,
  estaProcesado,
  disabled,
  handleClean,
  className
}: HerramientasComponentProps) {
  // Aseguramos que datosTotales tenga un ID
  const datosTotales = datosParaFooter
    ? { id: 1, hora: 'Totales', ...datosParaFooter } // Se añade un identificador único
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
    XLSX.utils.book_append_sheet(wb, ws, 'Informe');

    // Guardamos el archivo
    XLSX.writeFile(wb, 'Informe.xlsx');
  }, [data, datosTotales]);

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

  const handleClearData = handleClean || (() => {
    console.log('clear');
  });

  return (
    <Card className={`${className} `}>
      <HerramientasInforme
        data={data}
        estaProcesado={estaProcesado}
        handleExportExcel={handleExportExcel}
        handlePrint={handlePrint}
        disabledExportExcel={disabled}
        disabledPrint={disabled}
        disabledClean={disabled}
        handleClean={handleClearData}
        >
      </HerramientasInforme>
    </Card>
  );
}
