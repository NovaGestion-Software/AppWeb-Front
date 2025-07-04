import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useClientesSinOperaciones } from "../Store/Store";
import { clientesSinOperacionesData, footer } from "../Data/Data";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado,idsCoincidentes,
indiceSeleccionado,
buscado,
modoNavegacion,
indiceGlobal, } = useClientesSinOperaciones();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "cuenta", label: "Cuenta", minWidth: "80", maxWidth: "120", resaltar: true },
    { key: "nombre", label: "Nombre", minWidth: "180", maxWidth: "220" },
    { key: "area", label: "Area", minWidth: "110", maxWidth: "140", resaltar: true },
    { key: "telefono", label: "Teléfono", minWidth: "120", maxWidth: "160", resaltar: true },
    { key: "dom1", label: "Domicilio1", minWidth: "120", maxWidth: "160", resaltar: true },
    { key: "dom2", label: "Domicilio2", minWidth: "120", maxWidth: "160", resaltar: true },
    { key: "localidad", label: "Localidad", minWidth: "120", maxWidth: "160", resaltar: true },
    { key: "fecAlta", label: "Fec.Alta", minWidth: "100", maxWidth: "130", resaltar: true },
    { key: "fecComp", label: "Fec.Compra", minWidth: "100", maxWidth: "120", resaltar: true },
    { key: "fecCon", label: "Fec.Con.", minWidth: "100", maxWidth: "120", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? clientesSinOperacionesData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [],
      heightContainer: "18rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 16px;",
      addHeaderCellClass: "padding: 4px 8px 4px 16px;",
      viewport1440: {
        heightContainer1440px: "25rem",
        widthContainer1440px: "75rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "30rem",
        widthContainer1536px: "88rem",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        heightContainer1920px: "32rem",
        widthContainer1920px: "85rem",
      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? footer[0] : [],
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "cuenta",
    },
  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-5 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
