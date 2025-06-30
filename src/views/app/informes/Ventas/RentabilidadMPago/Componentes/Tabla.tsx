import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useRentabilidadMPStore } from "../Store/useRentabilidadMPagoStore";
import { rentabilidadMPData, rentabilidadMPFooter } from "../Data/data";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado, idsCoincidentes, indiceSeleccionado, buscado, modoNavegacion, indiceGlobal } = useRentabilidadMPStore();

  const rentabilidadMPColumns: Array<ExtendedColumn<any>> = [
    { key: "fondo", label: "Fondo", minWidth: "110", maxWidth: "140", resaltar: true },
    { key: "detalle", label: "Detalle", minWidth: "120", maxWidth: "160" },
    { key: "costo", label: "Costo", minWidth: "120", maxWidth: "220", resaltar: true },
    { key: "venta", label: "Venta", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "utilidad", label: "Utilidad", minWidth: "80", maxWidth: "100", resaltar: true },
    { key: "porcentaje", label: "%", minWidth: "90", maxWidth: "120", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? rentabilidadMPData : [],
    objectColumns: rentabilidadMPColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [3, 4, 5, 6, 7],
      heightContainer: "24rem",
      widthContainer: "",
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
      datosFooter: estaProcesado ? rentabilidadMPFooter[0] : [],
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "fondo",
    },
  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-10 `}>
    
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
