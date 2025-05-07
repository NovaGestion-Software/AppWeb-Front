import {  useEffect } from "react";
import { useVentasHoraStore } from "@/views/app/informes/ventasXHora/store/useVentasHoraStore";
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
  horaini: string;
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
  datosFooter,
}: TablaVentaPorHoraProps) {
  const { status } = useVentasHoraStore();

  const VentaXHoraColumns: Array<ExtendedColumn<VentaXHoraCType>> = [
    { key: "horaini", label: "Hora", minWidth: "90", maxWidth: "120" },
    {
      key: "nOperaciones",
      label: "N. Opera",
      withCellProps: true,
      resaltar: true,
      minWidth: "50",
      maxWidth: "100",
    },
    {
      key: "porcentajeNOperaciones",
      label: "%",
      withCellProps: true,
      minWidth: "50",
      maxWidth: "80",
    },
    {
      key: "pares",
      label: "Pares",
      withCellProps: true,
      resaltar: true,
      minWidth: "50",
      maxWidth: "80",
    },
    {
      key: "porcentajePares",
      label: "%",
      withCellProps: true,
      minWidth: "50",
      maxWidth: "80",
    },
    {
      key: "importe",
      label: "Importes $",
      withCellProps: true,
      resaltar: true,
      minWidth: "110",
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
  const heightBase = "31rem";
  const heightContainerBase = "31rem";
  
  const height1440px = "45rem";
  const width1440px = "44rem";
  const heightContainer1440 = "45rem";

  const width1536px = "44rem";
  const height1536px = "40rem";
  const heightContainer1536 = "40rem";

  // este componente
  const heightContainerTabla = "33.6rem";
  const heightContainerTabla1440 = "48rem";
  const heightContainerTabla1536 = "44rem";
  
  

  // SI hay funcion de resaltar a los de maximos valores:
  // Elementos seleccionados
  type GrupoCustom = "nOperaciones" | "importe" | "pares";
  const seleccionados: GrupoCustom[] = ["nOperaciones", "importe", "pares"];

  // Elementos a resaltar  relacionados
  const highlightMap: HighlightMap<VentaXHoraCType, GrupoCustom> = {
    nOperaciones: ["nOperaciones", "porcentajeNOperaciones"],
    importe: ["importe", "porcentajeImporte"],
    pares: ["pares", "porcentajePares"],
  };

  // extraer ids.
  const maxIds = extraerMaxIds<VentaXHoraCType, GrupoCustom>(
    dataParaTabla,
    seleccionados
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
      columnasNumber: [2,3,4,5,6,7],
      heightContainer: heightContainerBase,
      width: widthBase,
      height: heightBase,
      addCellClass: "max-height: 30px;",
      viewport1440: {
        width1440px: width1440px,
        height1440px: height1440px,
        heightContainer1440px: heightContainer1440,
        addCellClass1440px: "max-height: 40px;",

      },
      viewport1536: {
        height1536px: height1536px,
        width1536px: width1536px,
        heightContainer1536px: heightContainer1536,

      },
    },
    objectFooter: {
      footer: isProcessing,
      datosFooter: datosFooter,
     footerHeight: "h-8",

    },
    maxIdsFunction: maxIdsFunction,
  }
  const styleContainer = `
  #container {
    height: ${heightContainerTabla};
  }

  @media (min-width: 1440px) {
    #container {
      height: ${heightContainerTabla1440};
    }
  }

  @media (min-width: 1536px) {
    #container {
      height: ${heightContainerTabla1536};
    }
  }
`;

  return (
    <div className={` w-full xl:w-fit`} id="container">
      <style>{styleContainer}</style>
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
