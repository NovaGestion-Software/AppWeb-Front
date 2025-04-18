import { CSSProperties, useEffect, useMemo } from "react";
import { useVentasHoraStore } from "@/store/useVentasHoraStore";
import { VentaPorHora } from "@/types";
import TablaInforme from "@/frontend-resourses/components/Tables/TablaInforme";
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
  withCellProps?: boolean; // 👈 nueva prop opcional
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

  const columnasGrid = "minmax(90px, 120px) minmax(100px, 100px) minmax(80px, 80px) minmax(80px, 80px) minmax(80px, 80px) minmax(50px, 180px) minmax(50px, 80px)";
  const widthBase = "40rem";
  const width1440px = "43rem";
  const width1536px = "42rem";

  const customTheme = TableUtils.generateTableTheme({
    columns: columnasGrid,
    width: widthBase,
    width1440px: width1440px,
    width1536px: width1536px,
    withFooter: false,
    maxHeight: "600px",
  });

  const VentaXHoraColumns: Array<ExtendedColumn<VentaXHoraCType>> = [
    { key: "hora", label: "Hora" },
    { key: "nOperaciones", label: "N. Opera", withCellProps: true },
    { key: "porcentajeOperaciones", label: "%", withCellProps: true },
    { key: "pares", label: "Pares", withCellProps: true },
    { key: "porcentajePares", label: "%", withCellProps: true },
    { key: "importe", label: "Importes $", withCellProps: true },
    { key: "porcentajeImporte", label: "%", withCellProps: true },
  ];

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
        objetcColumns={VentaXHoraColumns}
        footerWidth={widthBase}
        footerWidth1440px={width1440px}
        footerWidth1536px={width1536px}
        footerHeight="h-8"
        columnasGrid={columnasGrid}
        
      />
    </div>
  );
}
