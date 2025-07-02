import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useVentasEnPromocion } from "../Store/Store";
import { ventasEnPromocionData, ventasEnPromocionFooter } from "../Data/Data";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado, idsCoincidentes, indiceSeleccionado, buscado, 
    modoNavegacion, indiceGlobal } = useVentasEnPromocion();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "vende", label: "Vende", minWidth: "80", maxWidth: "110", resaltar: true },
    { key: "nombre", label: "Nombre", minWidth: "180", maxWidth: "280" },
    { key: "codigo", label: "Codigo", minWidth: "100", maxWidth: "110" },
    { key: "descripcion", label: "Descripción", minWidth: "180", maxWidth: "200" },
    { key: "marca", label: "Marca", minWidth: "160", maxWidth: "180" },
    { key: "cantidad", label: "Cant.", minWidth: "80", maxWidth: "130", resaltar: true, },
    { key: "importe", label: "Importe $", minWidth: "100", maxWidth: "130", resaltar: true, },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? ventasEnPromocionData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [7,],
      heightContainer: "24rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 16px;",
      addHeaderCellClass: "padding: 4px 8px 4px 16px;",
      viewport1440: {
        heightContainer1440px: "35rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "35rem",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        heightContainer1920px: "40rem",
      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? ventasEnPromocionFooter[0] : [],
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "vende",
    },
  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-10 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
