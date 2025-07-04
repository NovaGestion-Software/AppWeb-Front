import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { footerVentasPorLocalidad, ventasPorLocalidadData} from "../Data/Data";
import { useVentasLocalidad } from "../Store/Store";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado } = useVentasLocalidad();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "codigo", label: "Código", minWidth: "70", maxWidth: "120",},
    { key: "localidad", label: "Localidad", minWidth: "120", maxWidth: "150" , resaltar: true,},
    { key: "contado", label: "Contado $", minWidth: "90", maxWidth: "150", resaltar: true, },
    { key: "tarjeta", label: "Tarjeta $", minWidth: "90", maxWidth: "160", resaltar: true, },
    { key: "credito", label: "Crédito $", minWidth: "90", maxWidth: "150" , resaltar: true,},
    { key: "Otros", label: "Otros $", minWidth: "90", maxWidth: "150", resaltar: true, },
    { key: "noCompraAP", label: "No Compra AP $", minWidth: "120", maxWidth: "155", resaltar: true, },
    { key: "noCompraRZ", label: "No Compra RZ $", minWidth: "120", maxWidth: "150", resaltar: true, },
    { key: "operacion", label: "Operacion", minWidth: "80", maxWidth: "155", resaltar: true, },
    { key: "operacionAP", label: "Opera AP", minWidth: "70", maxWidth: "155", resaltar: true, },
    { key: "operacionRZ", label: "Opera RZ", minWidth: "70", maxWidth: "155", resaltar: true, },
    { key: "nue", label: "Nue", minWidth: "70", maxWidth: "120", resaltar: true, },
    { key: "nuexi", label: "Exi", minWidth: "70", maxWidth: "120", resaltar: true, },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? ventasPorLocalidadData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [3,4,5,6,7,8,9,10,11,12,13 ],
      heightContainer: "24rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px;",
      addHeaderCellClass: "padding: 4px 8px 4px 16px; font-size: 0.575rem; font-weight: 500;",
      viewport1440: {
        heightContainer1440px: "35rem",
        addCellClass1440px: "max-height: 40px;",
        addHeaderCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "35rem",
        addCellClass1536px: "max-height: 60px;",
        addHeaderCellClass1536px: "font-size: 0.875rem;",
        widthContainer1536px: "85rem;"

      },
      viewport1920: {
        heightContainer1920px: "40rem",
        widthContainer1920px: "100rem;"

      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? footerVentasPorLocalidad[0] : [],
    },

  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-10 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
