import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useRankingClientesCredito } from "../Store/Store";
import { footerRankingCreditosClientes, rankingClientesCreditosData } from "../Data/Data";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado } = useRankingClientesCredito();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "cuenta", label: "Cuenta", minWidth: "110", maxWidth: "120", resaltar: true },
    { key: "nombre", label: "Nombre", minWidth: "180", maxWidth: "200" , },
    { key: "cancelados", label: "Cancelados", minWidth: "110", maxWidth: "140",resaltar: true,  },
    { key: "noVencidos", label: "No Vencidos", minWidth: "120", maxWidth: "180", resaltar: true, },
    { key: "morosos", label: "Morosos", minWidth: "120", maxWidth: "160",  resaltar: true,},
    { key: "total", label: "Total", minWidth: "120", maxWidth: "160", resaltar: true, },
    { key: "promedio", label: "Promedio $", minWidth: "120", maxWidth: "160", },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? rankingClientesCreditosData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [3,4,5,],
      heightContainer: "18rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 16px;",
      addHeaderCellClass: "padding: 4px 8px 4px 16px;",
      viewport1440: {
        heightContainer1440px: "25rem",
        widthContainer1440px: "55rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "30rem",
        widthContainer1536px: "58rem",
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
      datosFooter: estaProcesado ? footerRankingCreditosClientes[0] : [],
    },

  };

  return (
    <Card className={`${className} row-start-2 col-auto row-span-5 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
