import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useGarantiasStore } from "../Store/store";
import { garantiasData, garantiasFooter } from "../Data/Data";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado, idsCoincidentes, indiceSeleccionado, buscado, modoNavegacion, indiceGlobal } = useGarantiasStore();

  const garantiasColumns: Array<ExtendedColumn<any>> = [
    { key: "fecha", label: "Fecha", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "garantia", label: "Garantía", minWidth: "80", maxWidth: "100" },
    { key: "vende", label: "Vende", minWidth: "60", maxWidth: "90" },
    { key: "cliente", label: "Cliente", minWidth: "80", maxWidth: "100" },
    { key: "nombre", label: "Nombre", minWidth: "150", maxWidth: "250" },
    { key: "suc", label: "Suc.", minWidth: "60", maxWidth: "70" },
    { key: "comprob", label: "Comprobante", minWidth: "130", maxWidth: "160" },
    { key: "importe", label: "Importe $", minWidth: "80", maxWidth: "100", resaltar: true, },
    { key: "mes", label: "Mes", minWidth: "70", maxWidth: "70" },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? garantiasData : [],
    objectColumns: garantiasColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [8],
      heightContainer: "24rem",
      widthContainer: "56rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 16px;",
      addHeaderCellClass: "padding: 4px 8px 4px 16px;",
      viewport1440: {
        widthContainer1440px: "60rem",
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
      datosFooter: estaProcesado ? garantiasFooter[0] : [],
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "fecha",
    },
  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-10 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
