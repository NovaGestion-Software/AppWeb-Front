import { TablaDefault } from "@/frontend-resourses/components";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";

export default function Tabla({ data, footer }: { data: any, footer: any }) {
  const ventas: Array<ExtendedColumn<any>> = [
    { key: "nseccion", label: "Seccion", minWidth: "110", maxWidth: "200" },
    { key: "venta", label: "Venta $", minWidth: "90", maxWidth: "220", resaltar: true },
    { key: "porcentaje", label: "%", minWidth: "90", maxWidth: "120",},
    { key: "porcentajeNeto", label: "% Neto", minWidth: "90", maxWidth: "120", resaltar: true },
  ];


  const tablaProps = {
    datosParaTabla: data,
    objectColumns: ventas,
    estaProcesado: true,
    objectStyles: {
      columnasNumber: [2, 3, 4],
      heightContainer: "30rem",
      widthContainer: "30rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 12px;",
      withoutPadding: false,
      viewport1440: {
        widthContainer1440px: "",
        heightContainer1440px: "34rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "36rem",
        widthContainer1536px: "35rem",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        widthContainer1920px: "40rem",
        heightContainer1920px: "45rem",
      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: footer,
    },
  };

  return (
    <Card className="rounded-t-none">
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
