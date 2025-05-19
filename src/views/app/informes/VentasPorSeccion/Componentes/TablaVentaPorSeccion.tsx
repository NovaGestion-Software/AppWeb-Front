import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useVentasPorSeccionStore } from "../useVentasPorSeccionStore";

export type VentaPorSeccionType = {
  id: string | number;
  seccion: string;
  nseccion: string;
  importe: string | number;
  porcentajeImporte: number | string;
};

interface TablaVentaPorHoraProps {
  data: VentaPorSeccionType[];
  estaProcesado: boolean;
  datosFooter?: {};
  className?: string;
}
export function TablaVentaPorSeccion({ data, 
  estaProcesado, datosFooter, className }: 
  TablaVentaPorHoraProps) {
  // estilos

  const height1440px = "28rem";

  // // este componente
  // const heightContainerTabla = "38rem";
  // const heightContainerTabla1440 = "48rem";
  // const heightContainerTabla1536 = "44rem";

  const { idsCoincidentes, indiceSeleccionado, buscado, modoNavegacion, indiceGlobal } = useVentasPorSeccionStore();

  // columnas
  const VentaXSeccionColumns: Array<ExtendedColumn<VentaPorSeccionType>> = [
    { key: "seccion", label: "Sección", minWidth: "90", maxWidth: "130", resaltar: true },
    { key: "nseccion", label: "Detalle", minWidth: "180", maxWidth: "420" },
    {
      key: "importe",
      label: "Importes $",
      withCellProps: true,
      resaltar: true,
      minWidth: "110",
      maxWidth: "230",
    },
    {
      key: "porcentajeImporte",
      label: "%",
      withCellProps: true,
      minWidth: "50",
      maxWidth: "110",
    },
  ];

  // useEffect(() => {
  //   console.log('idsCoincidentes', idsCoincidentes);
  //   console.log('buscado', buscado);
  //   console.log('indiceSeleccionado', indiceSeleccionado);
  // }, [idsCoincidentes, indiceSeleccionado, buscado]);
  const propsTablaVentaPorSeccion = {
    datosParaTabla: data,
    objectColumns: VentaXSeccionColumns,
    estaProcesado: estaProcesado,
    status: estaProcesado,
    selectFn: true,
    objectStyles: {
      columnasNumber: [3, 4],
      heightContainer: "26.4rem",
      widthContainer: "35.5rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px;",
      withoutPadding: true,
      viewport1440: {
        widthContainer1440px: "41rem",
        height1440px: height1440px,
        heightContainer1440px: "38rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "36.8rem",
        widthContainer1536px: "43.8rem",
      },
      viewport1920: {
        widthContainer1920px: "55.5rem",
        heightContainer1920px: "40.5rem"
      },
    },
    objectFooter: {
      footer: true,
      datosFooter: datosFooter,
      footerHeight: "h-8",
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "seccion",
    },
  };
  return (
    <div className={`${className}`}>
      <TablaDefault props={propsTablaVentaPorSeccion} />
    </div>
  );
}
