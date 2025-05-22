import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useCobranzaPorVencimientoStore } from "../store/CobranzaPorVencimientoStore";

interface TablaCxVProps {
  estaProcesado: boolean;
  className?: string;
}
export default function TablaCxV({ estaProcesado, className }: TablaCxVProps) {
  const { status, cobranzaPorVencimiento } = useCobranzaPorVencimientoStore();
  const cobranzaVencimientoColumns: Array<ExtendedColumn<any>> = [
    { key: "concepto", label: "Concepto", minWidth: "120", maxWidth: "200" , resaltar:true,},
    { key: "importe", label: "Importe $", minWidth: "100", maxWidth: "520" },
    { key: "pago", label: "Pago", minWidth: "60", maxWidth: "120" },
    { key: "planPago", label: "Plan Pago", minWidth: "60", maxWidth: "520" },
    { key: "moraBruta", label: "Mora Bruta $", minWidth: "70", maxWidth: "520" },
    { key: "moraBrutaPorcentaje", label: "M.Bruta %", minWidth: "60", maxWidth: "520" },
    { key: "nDebito", label: "N.Débito", minWidth: "60", maxWidth: "520" },
    { key: "moraNeta", label: "Mora Neta $", minWidth: "70", maxWidth: "520" },
    { key: "moraNetaPorcentaje", label: "M.Neta %", minWidth: "60", maxWidth: "520" },
  ];

  const propsTablaVentaPorSeccion = {
    datosParaTabla: estaProcesado ? cobranzaPorVencimiento : [],
    objectColumns: cobranzaVencimientoColumns,
    estaProcesado: estaProcesado,
    status: status,
    selectFn: false,
    objectStyles: {
      columnasNumber: [2,3,4,5,6,7,8,9],
      heightContainer: "8rem",
      widthContainer: "",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px;",
      withoutPadding: true,
      viewport1440: {
        widthContainer1440px: "",
        heightContainer1440px: "",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "9rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "",
      },
    },
  };

  return (
    <div className={`${className}`}>
      <TablaDefault props={propsTablaVentaPorSeccion} />
    </div>
  );
}
