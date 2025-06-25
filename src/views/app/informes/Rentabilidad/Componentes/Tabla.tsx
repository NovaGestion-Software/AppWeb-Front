import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useRentabilidadStore } from "../Store/useRentabilidadStore";
import { rentabilidadData, rentabilidadFooter } from "../Data/data";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado, idsCoincidentes, indiceSeleccionado, buscado, modoNavegacion, indiceGlobal } = useRentabilidadStore();

  const rentabilidadColumns: Array<ExtendedColumn<any>> = [
    { key: "codigo", label: "Código", minWidth: "90", maxWidth: "100", resaltar: true },
    { key: "talle", label: "Talle", minWidth: "50", maxWidth: "60" },
    { key: "descripcion", label: "Descripción", minWidth: "120", maxWidth: "220" },
    { key: "marca", label: "Marca", minWidth: "90", maxWidth: "120" },
    { key: "cantidad", label: "Cantidad", minWidth: "80", maxWidth: "100", resaltar: true },
    { key: "costo", label: "Costo", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "venta", label: "Venta", minWidth: "100", maxWidth: "120", resaltar: true },
    { key: "utilidad", label: "Utilidad", minWidth: "100", maxWidth: "120", resaltar: true },
    { key: "porcentaje", label: "%", minWidth: "90", maxWidth: "100", resaltar: true },
    { key: "costoNeto", label: "Costo $", minWidth: "100", maxWidth: "120" },
    { key: "fecha", label: "Fecha", minWidth: "90", maxWidth: "110" },
    { key: "fCosto", label: "F.Costo", minWidth: "90", maxWidth: "110" },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? rentabilidadData : [],
    objectColumns: rentabilidadColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [3, 4, 5, 6, 7, 8, 9, 10],
      heightContainer: "24rem",
      widthContainer: "70rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 12px;",
      withoutPadding: true,
      viewport1440: {
        widthContainer1440px: "",
        heightContainer1440px: "35rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "35rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "40rem",
      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? rentabilidadFooter[0] : [],
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "codigo",
    },
  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-10 `}>
      <div className="flex justify-end m-1">
        <CheckboxInput checked={false} onChange={() => {}} label={"Separado por costo"} />
      </div>{" "}
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
