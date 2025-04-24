import {  useEffect } from "react";
import { useVentasHoraStore } from "@/store/useVentasHoraStore";
import { HighlightMap, VentaPorHora } from "@/types";
import TablaDefault from "@/frontend-resourses/components/Tables/TablaDefault/TablaDefault";
import { extraerMaxIds } from "@/frontend-resourses/components/Tables/TablaDefault/Utils/utils";

// Definicion de estructura de columnas
// interface TableColumn<T> {
//   label: string;
//   renderCell: (item: T) => JSX.Element | number | string;
//   cellProps?: (item: T) => any;
// }

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
  id: string | number;
  hora: string;
  nOperaciones: number | string;
  porcentajeNOperaciones: number | string;
  pares: number | string;
  porcentajePares: number | string;
  importe: string | number;
  porcentajeImporte: number | string;
};

export default function TablaVentaPorHora({
  dataParaTabla,
  isProcessing,
  footer,
  datosFooter,
}: TablaVentaPorHoraProps) {
  const { status } = useVentasHoraStore();

  const VentaXHoraColumns: Array<ExtendedColumn<VentaXHoraCType>> = [
    { key: "hora", label: "Hora", minWidth: "90", maxWidth: "120" },
    {
      key: "nOperaciones",
      label: "N. Opera",
      withCellProps: true,
      resaltar: true,
      minWidth: "100",
      maxWidth: "100",
    },
    {
      key: "porcentajeNOperaciones",
      label: "%",
      withCellProps: true,
      minWidth: "80",
      maxWidth: "80",
    },
    {
      key: "pares",
      label: "Pares",
      withCellProps: true,
      resaltar: true,
      minWidth: "80",
      maxWidth: "80",
    },
    {
      key: "porcentajePares",
      label: "%",
      withCellProps: true,
      minWidth: "80",
      maxWidth: "80",
    },
    {
      key: "importe",
      label: "Importes $",
      withCellProps: true,
      resaltar: true,
      minWidth: "120",
      maxWidth: "180",
    },
    {
      key: "porcentajeImporte",
      label: "%",
      withCellProps: true,
      minWidth: "50",
      maxWidth: "80",
    },
  ];
  // 2.Padre
  const widthBase = "40rem";
  const width1440px = "43rem";
  const width1536px = "42rem";

  // SI hay funcion de resaltar a los de maximos valores:
  // Elementos seleccionados
  type GrupoCustom = "nOperaciones" | "importe" | "pares";
  const seleecionados: GrupoCustom[] = ["nOperaciones", "importe", "pares"];

  // Elementos a resaltar  relacionados
  const highlightMap: HighlightMap<VentaXHoraCType, GrupoCustom> = {
    nOperaciones: ["nOperaciones", "porcentajeNOperaciones"],
    importe: ["importe", "porcentajeImporte"],
    pares: ["pares", "porcentajePares"],
  };

  // extraer ids.
  const maxIds = extraerMaxIds<VentaXHoraCType, GrupoCustom>(
    dataParaTabla,
    seleecionados
  );

  const maxIdsFunction = {
    highlightMap,
    maxIds,
  };

  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [isProcessing]);

  const propsTablaVentaPorHora = {
    datosParaTabla: dataParaTabla,
    objectColumns: VentaXHoraColumns,
    estaProcesado: isProcessing,
    status: status,
    objectStyles: {
      width: widthBase,
      width1440px: width1440px,
      width1536px: width1536px,
    },
    objectFooter: {
      footer: footer,
      datosFooter: datosFooter,
     footerHeight: "h-8",

    },
    maxIdsFunction: maxIdsFunction,
  }
//   <TablaDefault<VentaXHoraCType>
//   objectColumns={}
//   datosParaTabla={}
//   width={widthBase}
//   width1440px={width1440px}
//   width1536px={width1536px}
//   maxIdsFunction={}
//   footer={}
//   datosFooter={datosFooter}
//   procesado={isProcessing}
//   status={status}
// />
  return (
    <div>
    <TablaDefault props={propsTablaVentaPorHora} />
    </div>
  );
}

// funcion sencilla, le pasas una key y un array y de todos los elementos que pertecene a la key va a devolver el que tiene el mayor importe.
// funcion deprecada, devuelve el item entero, se usa solo el id..
// function findMaxByKey(array: VentaPorHora[], key: keyof VentaPorHora): VentaPorHora | null {
//   if (!array || array.length === 0) return null;

//   return array.reduce((maxItem, currentItem) => {
//     const currentValue =
//       typeof currentItem[key] === "string"
//         ? parseFloat(currentItem[key].replace(/\./g, ""))
//         : currentItem[key];

//     const maxValue =
//       typeof maxItem[key] === "string"
//         ? parseFloat(maxItem[key].replace(/\./g, ""))
//         : maxItem[key];

//     return currentValue > maxValue ? currentItem : maxItem;
//   }, array[0]);
// };
// 23/04:
//Si tengo sperando en el componente una parte del objeto a un valor especifico sino de este tipo pero vacio
// const [objectColumns1, setObjectColumns1] = useState(data?.objectColumns ?? {})
// y que data se pase en las props como
// let data = {
//   objectColum: VentaXHoraColumns,
//   estilos: estilosVentaPorHora,
// }
// para lo mismo esperaria de estilos, que tengan el width y height de la tabla, y
// 1.Padre - DataColumns
