import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useMorosidadStore } from "../Store/store";
import { dataTablaLocalidad } from "../ts/data";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useCallback } from "react";
interface TablaLocalidadProps {
  estaProcesado: boolean;
  className?: string;
}

export default function TablaLocalidad({ estaProcesado, className }: TablaLocalidadProps) {
  const { status } = useMorosidadStore();
  const setTablaId = useMorosidadStore(state => state.setTablaId);

    const setId = useCallback(
      (id: string) => setTablaId('localidad', id),
      [setTablaId]
    );


  const tablaColumns: Array<ExtendedColumn<any>> = [
    {
      key: "__select__",
      label: "",
      minWidth: "25",
      maxWidth: "60",
    },

    // Columnas normales
    { key: "localidad", label: "Localidad", minWidth: "50", maxWidth: "250" },
    { key: "importe", label: "Importe $", minWidth: "50", maxWidth: "250" },
    { key: "mora", label: "Mora $", minWidth: "50", maxWidth: "260" },
    { key: "cantidad", label: "Cant.", minWidth: "30", maxWidth: "270" },
    { key: "moraPorcentaje", label: "%", minWidth: "30", maxWidth: "280" },
  ];
  const propsTabla = {
    datosParaTabla: estaProcesado ? dataTablaLocalidad : [],
    objectColumns: tablaColumns,
    estaProcesado: estaProcesado,
    status: status,
    checkboxItem: true,
    selectFn: true,
    withTooltip: true,
    selectFirst: true,
   setIdTabla: setId,
    objectStyles: {
      withBorder: false,
      InitColumCenter: 3,
      columnasNumber: [3, 4, 5, 6],
      heightContainer: "23.5rem",
      addHeaderCellClass: "font-size: 0.5rem; padding: 10px 5px;",
      addCellClass: "max-height: 25px; font-size: 0.5rem;",
      viewport1440: {
        addHeaderCellClass1440px: "font-size: 0.7rem; padding: 15px 5px;",
        heightContainer1440px: "37rem",
        addCellClass1440px: "max-height: 35px; font-size: .7rem;",
      },
      viewport1536: {
        addCellClass1536px: "max-height: 40px;",
        addHeaderCellClass1536px: "font-size: 0.8rem; padding: 15px 5px;",
      },
      viewport1920: {
        heightContainer1920px: "40.5rem",
      },
    },
  };

  // useEffect(() => {
  //   console.log("id localidad", id);
  // }, [estaProcesado]);

  return (
    <Card className={`${className} w-full h-full p-2`}>
      <TablaDefault props={propsTabla} />
    </Card>
  );
}
