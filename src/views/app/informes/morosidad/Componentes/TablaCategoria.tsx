import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useMorosidadStore } from "../Store/store";
import { dataTablaCategoria } from "../ts/data";
import { useCallback, useEffect } from "react";
interface TablaCategoriaProps {
  estaProcesado: boolean;
  className?: string;
}
export default function TablaCategoria({ estaProcesado, className }: TablaCategoriaProps) {
  const { status } = useMorosidadStore();
  const setTablaId = useMorosidadStore(state => state.setTablaId);
  // Prepara la función específica para categoría
  const setId = useCallback(
    (id: string) => setTablaId('categoria', id),
    [setTablaId]
  );

  const tablaColumns: Array<ExtendedColumn<any>> = [
    {
      key: "__select__",
      label: "",
      minWidth: "15",
      maxWidth: "36",
    },
    { key: "categoria", label: "Categoria", minWidth: "50", maxWidth: "85", resaltar: true },
    { key: "importe", label: "Importe $", minWidth: "50", maxWidth: "135" },
    { key: "mora", label: "Mora $", minWidth: "35", maxWidth: "90" },
    { key: "cantidad", label: "Cant.", minWidth: "25", maxWidth: "50" },
    { key: "moraPorcentaje", label: "%", minWidth: "24", maxWidth: "55" },
  ];
   
  const propsTabla = {
    datosParaTabla: estaProcesado ? dataTablaCategoria : [],
    objectColumns: tablaColumns,
    estaProcesado: estaProcesado,
    status: status,
    checkboxItem: true,
    setIdTabla: setId,
    withTooltip: true,
    selectFn: false,
    objectStyles: {
      withBorder: false,
      InitColumCenter: 3,
      columnasNumber: [3, 4, 5, 6],
      heightContainer: "16.5rem",
      widthContainer: "",
      addHeaderCellClass: "font-size: 0.5rem;  padding: 10px 5px; top: -2px;",
      addCellClass: "max-height: 20px; padding: 4px 4px 4px 4px; font-size: 0.5rem;",
      withoutPadding: true,
      viewport1440: {
        addHeaderCellClass1440px: "font-size: 0.7rem; padding: 15px 5px 13px 5px;",
        widthContainer1440px: "",
        heightContainer1440px: "25.5rem",
        addCellClass1440px: "max-height: 30px; font-size: .6rem;",
      },
      viewport1536: {
        heightContainer1536px: "24.6rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 40px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "30rem",
      },
    },
  };

  // useEffect(() => {
  //   console.log("id categoria", id);
  // }, [estaProcesado]);

  return (
    <div
      className={`w-full h-full
     flex flex-col gap-1 bg-white p-1   shadow-sm
      shadow-gray-600 rounded-lg   ${className} `}
    >
      <TablaDefault props={propsTabla} />
    </div>
  );
}
