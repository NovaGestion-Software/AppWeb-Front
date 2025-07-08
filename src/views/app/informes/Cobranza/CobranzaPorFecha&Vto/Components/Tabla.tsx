import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { cobranzaPorFechaYVtoData, footer } from "../Data/data";
import { useCobranzasPorFechaYVto } from "../Store/store";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado } = useCobranzasPorFechaYVto();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "fecha", label: "Fecha", minWidth: "90", maxWidth: "180",},
    { key: "cantidad", label: "Cant.", minWidth: "80", maxWidth: "120",resaltar:true, },
    { key: "importe", label: "Importe $", minWidth: "100", maxWidth: "140",resaltar:true,},
    { key: "interes", label: "Interés", minWidth: "110", maxWidth: "180",resaltar:true,},
    { key: "financiacion", label: "Financiación", minWidth: "100", maxWidth: "160",resaltar:true, },
    { key: "importeTotal", label: "Imp.Total", minWidth: "140", maxWidth: "180", resaltar: true },
    { key: "importePorcentaje", label: "%", minWidth: "90", maxWidth: "160", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? cobranzaPorFechaYVtoData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [2,3,4,5,6,7],
      heightContainer: "18rem",
      
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px; font-size: 0.70rem;",
      addHeaderCellClass: "padding: 4px 8px 4px 16px;",
      viewport1440: {
        heightContainer1440px: "25rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "30rem",
        widthContainer1536px: "50rem",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        heightContainer1920px: "32rem",
        widthContainer1920px: "60rem",
      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? footer[0] : [],
    },

  };

  return (
    <Card className={`${className} row-start-2 col-auto row-span-5 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
