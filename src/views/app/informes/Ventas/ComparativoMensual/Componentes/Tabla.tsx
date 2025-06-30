import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { TablaDefault } from "@/frontend-resourses/components";
import { useComparativoMensual } from "../Store/Store";
import { comparativoVentasData } from "../Data/Data";

export default function Tabla({ className }: { className?: string }) {
  const { status, estaProcesado, setId } = useComparativoMensual();

  const tablaColumns: Array<ExtendedColumn<any>> = [
    { key: "dia", label: "Dia", minWidth: "50", maxWidth: "100" },
    { key: "comparativoPrincipal", label: "05-2025", minWidth: "100", maxWidth: "220" },
    { key: "comparativoUno", label: "05-2024", minWidth: "100", maxWidth: "220" },
    { key: "porcentajeComparativoUno", label: "%", minWidth: "100", maxWidth: "220" },
    { key: "comparativoUnDos", label: "05-2023", minWidth: "100", maxWidth: "220" },
    { key: "porcentajeComparativoDos", label: "%", minWidth: "100", maxWidth: "220" },
    { key: "comparativoTres", label: "05-2022", minWidth: "100", maxWidth: "220" },
    { key: "porcentajeComparativoTres", label: "%", minWidth: "100", maxWidth: "220" },
    { key: "comparativoCuatro", label: "05-2021", minWidth: "100", maxWidth: "220" },
    { key: "porcentajeComparativoCuatro", label: "%", minWidth: "100", maxWidth: "220" },
    { key: "comparativoCinco", label: "05-2020", minWidth: "100", maxWidth: "220" },
    { key: "porcentajeComparativoCinco", label: "%", minWidth: "100", maxWidth: "220" },
  ];

  const propsTabla = {
    datosParaTabla: estaProcesado ? comparativoVentasData : [],
    objectColumns: tablaColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    objectStyles: {
      withBorder: true,
      InitColumCenter: 1,
      columnasNumber: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      heightContainer: "24.4rem",
      addHeaderCellClass: "font-size: 0.5rem;",
      addCellClass: "max-height: 25px; font-size: 0.5rem;",
      viewport1440: {
        widthContainer1440px: "",
        addHeaderCellClass1440px: "font-size: 0.7rem; padding: 15px 5px;",
        heightContainer1440px: "37rem",
        addCellClass1440px: "max-height: 35px; font-size: .7rem;",
      },
      viewport1536: {
        heightContainer1536px: "37rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 40px;",
        addHeaderCellClass1536px: "font-size: 0.8rem; padding: 15px 5px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "40.5rem",
      },
    },
  };

  return (
    <Card padding={false} className={`${className} row-start-2 col-span-full  p-1`}>
      <TablaDefault props={propsTabla} />
    </Card>
  );
}
