import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useCobranzasPorFechaEmision } from "../Store/store";
import { cobranzasPorFechaEmisionData } from "../Data/data";

interface TablaProps {
  className?: string;
}
export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado } = useCobranzasPorFechaEmision();
  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "concepto", label: "Concepto", minWidth: "100", maxWidth: "200", resaltar: true },
    { key: "importe", label: "Importe $", minWidth: "90", maxWidth: "120" },
    { key: "pago", label: "Pago", minWidth: "90", maxWidth: "120" },
    { key: "planPago", label: "Plan Pago", minWidth: "95", maxWidth: "120" },
    { key: "moraBruta", label: "Mora Bruta $", minWidth: "105", maxWidth: "120" },
    { key: "moraBrutaPorcentaje", label: "M.Bruta %", minWidth: "80", maxWidth: "120" },
    { key: "nDebito", label: "N.Débito", minWidth: "95", maxWidth: "120" },
    { key: "nDebito", label: "N.Débito PP", minWidth: "95", maxWidth: "520" },
    { key: "moraNeta", label: "Mora Neta $", minWidth: "100", maxWidth: "520" },
    { key: "moraNetaPorcentaje", label: "M.Neta %", minWidth: "80", maxWidth: "520" },
  ];

  const propsTablaVentaPorSeccion = {
    datosParaTabla: estaProcesado ? cobranzasPorFechaEmisionData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    selectFn: false,
    setIdTabla: setId,
    objectStyles: {
      columnasNumber: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      heightContainer: "15rem",
      widthContainer: "",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px;",
      withoutPadding: false,
      viewport1440: {
        widthContainer1440px: "",
        heightContainer1440px: "24rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "26rem",
      },
    },
  };

  return (
    <div className={`${className} col-span-12 row-start-2 col-start-1`}>
      <TablaDefault props={propsTablaVentaPorSeccion} />
    </div>
  );
}
