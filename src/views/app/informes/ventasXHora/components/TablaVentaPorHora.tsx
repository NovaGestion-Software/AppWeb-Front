import { CSSProperties, useEffect } from "react";
import { useVentasHoraStore } from "@/store/useVentasHoraStore";
import { VentaPorHora } from "@/types";
import TablaInforme from "@/frontend-resourses/components/Tables/TablaDefault/TablaDefault";
import { TableUtils } from "@/frontend-resourses/components/Tables/TableUtils";

// Definicion de estructura de columnas
interface TableColumn<T> {
  label: string;
  renderCell: (item: T) => JSX.Element | number | string;
  cellProps?: (item: T) => any;
}

interface TablaVentaPorHoraProps {
  dataParaTabla: VentaPorHora[];
  isProcessing: boolean;
  footer: boolean;
  datosFooter?: {};
}
type ExtendedColumn<T = any> = {
  key: keyof T;
  label?: string;
  renderCell?: (item: T) => React.ReactNode;
  cellProps?: (item: T) => React.HTMLAttributes<HTMLElement>;
  withCellProps?: boolean;
  minWidth?: string;
  maxWidth?: string;
  resaltar?: boolean;
};

type VentaXHoraCType = {
  id: number;
  hora: string;
  nOperaciones: number;
  porcentajeOperaciones: number;
  pares: number;
  porcentajePares: number;
  importe: string; 
  porcentajeImporte: number;
};

export default function TablaVentaPorHora({
  dataParaTabla,
  isProcessing,
  footer,
  datosFooter,
}: TablaVentaPorHoraProps) {
  const { status } = useVentasHoraStore();
  
  const maxNOperaciones = findMaxByKey(dataParaTabla, "nOperaciones");
  const maxImporte = findMaxByKey(dataParaTabla, "importe");
  const maxPares = findMaxByKey(dataParaTabla, "pares");
  const maxParesId = maxPares ? maxPares.id : null;
  const maxNOperacionesId = maxNOperaciones ? maxNOperaciones.id : null;
  const maxImporteId = maxImporte ? maxImporte.id : null;
  
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [isProcessing]);
  const VentaXHoraColumns: Array<ExtendedColumn<VentaXHoraCType>> = [
    { key: "hora", label: "Hora", minWidth: "90", maxWidth: "120", },
    { key: "nOperaciones", label: "N. Opera", withCellProps: true, resaltar: true, minWidth: "100", maxWidth: "100"},
    { key: "porcentajeOperaciones", label: "%", withCellProps: true, minWidth: "80", maxWidth: "80"},
    { key: "pares", label: "Pares", withCellProps: true , resaltar: true, minWidth: "80", maxWidth: "80"},
    { key: "porcentajePares", label: "%", withCellProps: true , minWidth: "80", maxWidth: "80"},
    { key: "importe", label: "Importes $", withCellProps: true, resaltar:true, minWidth: "120", maxWidth: "180" },
    { key: "porcentajeImporte", label: "%", withCellProps: true, minWidth: "50", maxWidth: "80" },
  ];
  const columnasGrid = TableUtils.applyWidthColumns(VentaXHoraColumns);
  const widthBase = "40rem";
  const width1440px = "43rem";
  const width1536px = "42rem";

  const customTheme = TableUtils.generateTableTheme({
    columns: columnasGrid,
    width: widthBase,
    width1440px: width1440px,
    width1536px: width1536px,
    maxHeight: "600px",
  });



  const COLUMNS = TableUtils.generateTableColumns<VentaXHoraCType>(
    VentaXHoraColumns.map((column) => ({
      ...column,
      cellProps: column.withCellProps
        ? (item) => getCellProps(item, column.key as string)
        : undefined,
    }))
  );

  function findMaxByKey(array: VentaPorHora[], key: keyof VentaPorHora): VentaPorHora | null {
    if (!array || array.length === 0) return null;

    return array.reduce((maxItem, currentItem) => {
      const currentValue =
        typeof currentItem[key] === "string"
          ? parseFloat(currentItem[key].replace(/\./g, ""))
          : currentItem[key];

      const maxValue =
        typeof maxItem[key] === "string"
          ? parseFloat(maxItem[key].replace(/\./g, ""))
          : maxItem[key];

      return currentValue > maxValue ? currentItem : maxItem;
    }, array[0]);
  };


  const getCellProps = (
    item: VentaPorHora,
    column: keyof VentaPorHora | string
  ) => {
    const isMaxNOperaciones = item.id === maxNOperacionesId;
    const isMaxImporte = item.id === maxImporteId;
    const isMaxPares = item.id === maxParesId;

    let style: CSSProperties = {}; // Inicializar el estilo como un objeto vacío

    if (
      (column === "nOperaciones" && isMaxNOperaciones) ||
      (column === "porcentajeOperaciones" && isMaxNOperaciones)
    ) {
      style = { color: "white", fontWeight: "bolder", background: "green" };
    }

    if (
      (column === "importe" && isMaxImporte) ||
      (column === "porcentajeImporte" && isMaxImporte)
    ) {
      style = { color: "white", fontWeight: "bolder", background: "green" };
    }

    if (
      (column === "pares" && isMaxPares) ||
      (column === "porcentajePares" && isMaxPares)
    ) {
      style = { color: "white", fontWeight: "bolder", background: "green" };
    }

    return { style }; // Devolver siempre un objeto con la propiedad 'style'
  };

  return (
    <div>
      <TablaInforme<VentaXHoraCType>
        columnas={COLUMNS}
        datosParaTabla={dataParaTabla}
        estilos={customTheme}
        footer={footer}
        datosFooter={datosFooter}
        procesado={isProcessing}
        status={status}
        objectColumns={VentaXHoraColumns}
        footerWidth={widthBase}
        footerWidth1440px={width1440px}
        footerWidth1536px={width1536px}
        footerHeight="h-8"
        columnasGrid={columnasGrid}
        
      />
    </div>
  );
}
