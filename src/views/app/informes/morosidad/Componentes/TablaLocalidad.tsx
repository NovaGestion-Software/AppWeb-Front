import {TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useMorosidadStore } from "../Store/store";
import { dataTablaLocalidad } from "../ts/data";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
interface TablaLocalidadProps {
  estaProcesado: boolean;
  className?: string;
}

export default function TablaLocalidad({ estaProcesado, className }: TablaLocalidadProps) {
  const { status } = useMorosidadStore();
  const tablaColumns: Array<ExtendedColumn<any>> = [
    {
      key: "__select__",
      label: "",
      minWidth: "25",
      maxWidth: "60",
    },

    // Columnas normales
    { key: "localidad", label: "Localidad", minWidth: "50", maxWidth: "200" },
    { key: "importe", label: "Importe $", minWidth: "50", maxWidth: "220" },
    { key: "mora", label: "Mora $", minWidth: "50", maxWidth: "220" },
    { key: "cantidad", label: "Cant.", minWidth: "30", maxWidth: "120" },
    { key: "moraPorcentaje", label: "%", minWidth: "30", maxWidth: "220" },
  ];
  const propsTabla = {
    datosParaTabla: estaProcesado ? dataTablaLocalidad : [],
    objectColumns: tablaColumns,
    estaProcesado: estaProcesado,
    status: status,
    checkboxItem: true,
    selectFn: true,
    withTooltip: true,
    objectStyles: {
      withBorder: false,
      InitColumCenter: 3,
      columnasNumber: [3, 4, 5, 6],
      heightContainer: "23.5rem",
      addHeaderCellClass: "font-size: 0.5rem; padding: 10px 5px;",
      addCellClass: "max-height: 25px; font-size: 0.5rem;",
      viewport1440: {
        widthContainer1440px: "",
        addHeaderCellClass1440px: "font-size: 0.7rem; padding: 15px 5px;",
        heightContainer1440px: "37rem",
        addCellClass1440px: "max-height: 35px; font-size: .7rem;",
      },
      viewport1536: {
        heightContainer1536px: "36rem",
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
    <Card
      className={`${className} w-full h-full p-2`}>
      <TablaDefault props={propsTabla} />
    </Card>
  );
}
