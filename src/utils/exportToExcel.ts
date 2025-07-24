import * as XLSX from 'xlsx';
import { ExcelExportConfig } from '@/types';

function calcularAnchoColumnas(data: any[], headers: string[]): { wch: number }[] {
  return headers.map((key) => {
    const maxLength = Math.max(
      key.length,
      ...data.map((row) => {
        const val = row[key];
        return val ? String(val).length : 0;
      })
    );
    return { wch: maxLength + 2 };
  });
}

export function exportToExcel(config: ExcelExportConfig) {
  try {
    if (!config || !config.sheets || config.sheets.length === 0) {
      console.error("❌ Configuración inválida para exportar Excel");
      return;
    }

    const wb = XLSX.utils.book_new();
    const usedSheetNames = new Set<string>();

    config.sheets.forEach((sheet, index) => {
      let { name, data, headers, maxItems } = sheet;

      // Validación básica
      if (!data || !Array.isArray(data)) {
        console.warn(`❗ Datos inválidos en hoja "${name || `Hoja ${index + 1}`}"`);
        return;
      }

      // Limitar cantidad de datos si se pidió
      const limitedData = maxItems ? data.slice(0, maxItems) : data;

      if (!headers || headers.length === 0) {
        headers = limitedData.length > 0 ? Object.keys(limitedData[0]) : [];
      }

      // Construir datos con headers definidos
      const dataWithHeaders = [headers, ...limitedData.map(item =>
        headers!.map(header => item[header] ?? '')
      )];

      const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);

      // Ancho automático de columnas
      worksheet["!cols"] = calcularAnchoColumnas(limitedData, headers);

      // Evitar colisiones de nombres
      let uniqueName = name;
      let suffix = 1;
      while (usedSheetNames.has(uniqueName)) {
        uniqueName = `${name}_${suffix++}`;
      }
      usedSheetNames.add(uniqueName);

      XLSX.utils.book_append_sheet(wb, worksheet, uniqueName);
    });

    const fileName = config.fileName.endsWith('.xlsx')
      ? config.fileName
      : `${config.fileName}.xlsx`;

    XLSX.writeFile(wb, fileName);

    console.info(`✅ Archivo Excel exportado con éxito: ${fileName}`);
  } catch (error) {
    console.error("❌ Error al exportar Excel:", error);
  }
}
