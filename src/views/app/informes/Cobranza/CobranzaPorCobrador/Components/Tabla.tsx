import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useCobranzasPorCobrador } from "../Store/Store";
import { cobranzasCobradorData, footer } from "../Data/data";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado,idsCoincidentes,
indiceSeleccionado,
buscado,
modoNavegacion,
indiceGlobal, } = useCobranzasPorCobrador();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "fecha", label: "Fecha", minWidth: "80", maxWidth: "120", resaltar: true,},
    { key: "Tipo", label: "Tipo", minWidth: "80", maxWidth: "220" },
    { key: "recibo", label: "Recibo", minWidth: "100", maxWidth: "140",},
    { key: "telefoncobrador", label: "Cobrador", minWidth: "110", maxWidth: "180",},
    { key: "cuenta", label: "Cuenta", minWidth: "80", maxWidth: "160", },
    { key: "nombre", label: "Nombre", minWidth: "140", maxWidth: "180", resaltar: true },
    { key: "capitalV", label: "Capital V.$", minWidth: "90", maxWidth: "160", resaltar: true },
    { key: "capitalNV", label: "Capital NV $", minWidth: "90", maxWidth: "130", resaltar: true },
    { key: "interesPP", label: "Interés PP $", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "financiacion", label: "Financiación $", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "intMora", label: "Int.Mora $", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "importe", label: "Importe $", minWidth: "90", maxWidth: "120", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? cobranzasCobradorData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [7,8,9,10,11,12,13],
      heightContainer: "18rem",
      
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px; font-size: 0.70rem;",
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
        widthContainer1920px: "89rem",
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
