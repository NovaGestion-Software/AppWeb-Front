import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { ventasCreditoData, ventasCreditoFooter} from "../Data/Data";
import { useVentasCreditoPorCliente,  } from "../Store/Store";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado } = useVentasCreditoPorCliente();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "cliente", label: "Cliente", minWidth: "110", maxWidth: "120", resaltar: true },
    { key: "nombre", label: "Nombre", minWidth: "130", maxWidth: "160" , },
    { key: "nOpera", label: "N. Opera.", minWidth: "110", maxWidth: "140",  },
    { key: "importe", label: "Importe $", minWidth: "120", maxWidth: "160",  },
    { key: "impProm", label: "Imp. Prom. $", minWidth: "120", maxWidth: "160",  },
    { key: "ultiMov", label: "Ult.Mov.", minWidth: "120", maxWidth: "160",  },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? ventasCreditoData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [3,4,5,6,7,8,9,10 ],
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
      datosFooter: estaProcesado ? ventasCreditoFooter[0] : [],
    },

  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-10 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
