import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useCompClientOtrasSucStore } from "../Store/store";
import { comprasClientesData, comprasClientesDataFooter } from "../Data/data";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";

interface TablaProps {
  estaProcesado: boolean;
  className?: string;
}

export default function Tabla({ estaProcesado, className }: TablaProps) {
  const { status, setId } = useCompClientOtrasSucStore();

  const cobranzasColumns: Array<ExtendedColumn<any>> = [
    { key: "cuenta", label: "Cuenta", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "nombre", label: "Nombre", minWidth: "90", maxWidth: "220", },
    { key: "localidad", label: "Localidad", minWidth: "90", maxWidth: "120",  },
    { key: "ultCSuc", label: "Ult.C. Suc.", minWidth: "90", maxWidth: "120",  },
    { key: "opera", label: "Opera", minWidth: "90", maxWidth: "220", resaltar: true },
    { key: "importe", label: "importe", minWidth: "90", maxWidth: "220", resaltar: true },
    { key: "ultCOtr", label: "Ult.C. Otr.", minWidth: "80", maxWidth: "220", },
    { key: "opera2", label: "Opera", minWidth: "80", maxWidth: "220", resaltar: true },
    { key: "importe2", label: "Importe $", minWidth: "80", maxWidth: "220", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? comprasClientesData : [],
    objectColumns: cobranzasColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: false,
    objectStyles: {
      columnasNumber: [ 3, 4, 5, 6, 7, 8, 9, 10],
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
    objectFooter:{
        footer: true,
        footerHeight: "h-8",
        datosFooter: estaProcesado ? comprasClientesDataFooter[0] : [],
    }
  };

  return (
    <Card   className={`${className} `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
