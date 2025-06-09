import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { VentasUnidadNegocioStore } from "../Store/store";
import { ventasUnidadNegocioData, ventasUnidadNegocioFooterData } from "../Data/data";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado } = VentasUnidadNegocioStore();

  const cobranzasColumns: Array<ExtendedColumn<any>> = [
    { key: "codigo", label: "Codigo", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "nombre", label: "Nombre", minWidth: "120", maxWidth: "220", },
    { key: "marca", label: "Marca", minWidth: "120", maxWidth: "120",  },
    { key: "unidad", label: "Unidad", minWidth: "90", maxWidth: "120",  },
    { key: "cantidad", label: "Cantidad", minWidth: "90", maxWidth: "220", resaltar: true },
    { key: "importe", label: "importe", minWidth: "130", maxWidth: "220", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? ventasUnidadNegocioData : [],
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
        datosFooter: estaProcesado ? ventasUnidadNegocioFooterData[0] : [],
    }
  };

  return (
    <Card   className={`${className} `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
