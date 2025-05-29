import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useMorosidadStore } from "../Store/store";
import { dataTablaRango } from "../ts/data";
interface TablaRangoProps {
  estaProcesado: boolean;
  className?: string;
}
export default function TablaRango({ estaProcesado, className }: TablaRangoProps) {
  const { status } = useMorosidadStore();

  const tablaColumns: Array<ExtendedColumn<any>> = [
    {
      key: "__select__",
      label: "",
      minWidth: "25",
      maxWidth: "60",
    },
    { key: "rango", label: "Rango", minWidth: "60", maxWidth: "200", resaltar: true },
    { key: "importe", label: "Importe $", minWidth: "60", maxWidth: "520" },
    { key: "mora", label: "Mora $", minWidth: "60", maxWidth: "120" },
    { key: "cantidad", label: "Cant.", minWidth: "40", maxWidth: "120" },
    { key: "moraPorcentaje", label: "%", minWidth: "40", maxWidth: "520" },
  ];

  const propsTabla = {
    datosParaTabla: estaProcesado ? dataTablaRango : [],
    objectColumns: tablaColumns,
    estaProcesado: estaProcesado,
    status: status,
    selectFn: true,
       withTooltip: true,
    checkboxItem: true,
    objectStyles: {
      InitColumCenter: 3,
      withBorder: false,
      columnasNumber: [3, 4, 5, 6],
      heightContainer: "13.5rem",
      widthContainer: "",
      addHeaderCellClass: "font-size: 0.5rem; ",
      addCellClass: "max-height: 20px;  font-size: 0.5rem;",
      withoutPadding: false,
      viewport1440: {
        widthContainer1440px: "",
        heightContainer1440px: "22rem",
        addHeaderCellClass1440px: "font-size: 0.7rem; padding: 15px 5px;",
        addCellClass1440px: "max-height: 30px; font-size: 0.625rem;",
      },
      viewport1536: {
        heightContainer1536px: "21rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "26.5rem",
      },
    },
  };

  return (
    <div
      className={`w-full h-full
     flex flex-col gap-1 bg-white p-1 pt-2 shadow-sm
      shadow-gray-300 rounded-lg   ${className}`}
    >
      <TablaDefault props={propsTabla} />
    </div>
  );
}
