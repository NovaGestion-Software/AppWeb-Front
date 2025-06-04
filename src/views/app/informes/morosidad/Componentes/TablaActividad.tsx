import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import {  useMorosidadStore } from "../Store/store";
import { dataTablaActividad } from "../ts/data";
import { useCallback } from "react";
interface TablaActividadProps {
  estaProcesado: boolean;
  className?: string;
}
export default function TablaActividad({ estaProcesado, className }: TablaActividadProps) {
  const { status } = useMorosidadStore();
  const setTablaId = useMorosidadStore(state => state.setTablaId);

    const setId = useCallback(
      (id: string) => setTablaId('actividad', id),
      [setTablaId]
    );

  const tablaColumns: Array<ExtendedColumn<any>> = [
    {
      key: "__select__",
      label: "",
      minWidth: "15",
      maxWidth: "36",
    },

    { key: "actividad", label: "Actividad", minWidth: "70", maxWidth: "200", resaltar: true },
    { key: "importe", label: "Importe $", minWidth: "50", maxWidth: "520" },
    { key: "mora", label: "Mora $", minWidth: "50", maxWidth: "520" },
    { key: "cantidad", label: "Cant.", minWidth: "30", maxWidth: "120" },
    { key: "moraPorcentaje", label: "%", minWidth: "20", maxWidth: "520" },
  ];

  const propsTabla = {
    datosParaTabla: estaProcesado ? dataTablaActividad : [],
    objectColumns: tablaColumns,
    estaProcesado: estaProcesado,
    setIdTabla: setId,
    status: status,
    selectFn: false,
    checkboxItem: true,
    withTooltip: true,
    objectStyles: {
      withBorder: false,
      InitColumCenter: 3,
      columnasNumber: [3, 4, 5, 6],
      heightContainer: "11.5rem",
      widthContainer: "",
      addHeaderCellClass: "font-size: 0.5rem;  padding: 5px 5px;   ",
      addCellClass: "max-height: 20px; padding: 4px 4px 4px 4px; font-size: 0.6rem;",
      withoutPadding: true,
      viewport1440: {
        widthContainer1440px: "",
        heightContainer1440px: "18rem",
        addCellClass1440px: "max-height: 30px;",
         addHeaderCellClass1440px: "font-size: 0.6rem; padding: 12px 5px 10px 5px;",

      },
      viewport1536: {
        heightContainer1536px: "17.5rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 40px;",
         addHeaderCellClass1536px: "font-size: 0.8rem; padding: 15px 15px 15px 10px;",

      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "16.5rem",
      },
    },
  };
// useEffect(() =>{
//   console.log("idActividad", id)
// },[estaProcesado])

  return (
    <div
      className={`w-full h-full
     flex flex-col gap-1  bg-white p-1 shadow-sm
      shadow-gray-600 rounded-lg   ${className}`}
    >
      <TablaDefault props={propsTabla} />
    </div>
  );
}
