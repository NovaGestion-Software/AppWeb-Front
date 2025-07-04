import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useDistribucionMensualClientes } from "../Store/Store";
import { distribucionMensualCreditosData, footer } from "../Data/Data";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado, } = useDistribucionMensualClientes();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "mes", label: "Mes", minWidth: "120", maxWidth: "120"},
    { key: "cantidad", label: "Cant.", minWidth: "150", maxWidth: "220", resaltar: true  },
    { key: "importe", label: "Importe", minWidth: "150", maxWidth: "140", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? distribucionMensualCreditosData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [3],
      heightContainer: "18rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 16px;",
      addHeaderCellClass: "padding: 4px 8px 4px 16px;",
      viewport1440: {
        heightContainer1440px: "30rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "30rem",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        heightContainer1920px: "32rem",
      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? footer[0] : [],
    },

  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-5 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
