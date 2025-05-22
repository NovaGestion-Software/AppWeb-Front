import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { data } from "../ts/data";
import { useCobranzasStore } from "../store/store";

interface TablaProps {
  estaProcesado: boolean;
  className?: string;
}

export default function Tabla({ estaProcesado, className }: TablaProps) {
  const { status, cobranzas } = useCobranzasStore();

  const cobranzasColumns: Array<ExtendedColumn<any>> = [
    { key: "fecha", label: "Fecha", minWidth: "90", maxWidth: "200",  },
    { key: "cantidad", label: "Cant.", minWidth: "50", maxWidth: "520", resaltar: true },
    { key: "importeE", label: "Imp. Efe $", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "importeD", label: "Imp. Déb $", minWidth: "90", maxWidth: "520", resaltar: true },
    { key: "importeT", label: "Imp. Tar $", minWidth: "90", maxWidth: "520", resaltar: true },
    { key: "importeO", label: "Imp. Ot $", minWidth: "90", maxWidth: "520", resaltar: true },
    { key: "interesE", label: "Int. Ef $", minWidth: "80", maxWidth: "520", resaltar: true },
    { key: "interesD", label: "Int. Déb $", minWidth: "80", maxWidth: "520", resaltar: true },
    { key: "interesB", label: "Int. Bil $", minWidth: "80", maxWidth: "520", resaltar: true },
    { key: "interesT", label: "Int. Tar $", minWidth: "80", maxWidth: "520", resaltar: true },
    { key: "interesO", label: "Int. Ot $", minWidth: "80", maxWidth: "520", resaltar: true },
    { key: "financiacion", label: "Financiación", minWidth: "95", maxWidth: "520", resaltar: true },
    { key: "descuentos", label: "Descuentos", minWidth: "90", maxWidth: "520", resaltar: true },
    { key: "impTotal", label: "Imp. Total", minWidth: "80", maxWidth: "520", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: cobranzas,
    objectColumns: cobranzasColumns,
    estaProcesado: estaProcesado,
    status: status,
    selectFn: false,
    objectStyles: {
      columnasNumber: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      heightContainer: "30rem",
      widthContainer: "",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 12px;",
      withoutPadding: true,
      viewport1440: {
        widthContainer1440px: "",
        heightContainer1440px: "43rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "41rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "45rem",
      },
    },
    objectFooter:{
        footer: true,
        footerHeight: "h-8",
        datosFooter: estaProcesado ? data[9] : [],
    }
  };

  return (
    <div className={`${className} `}>
      <TablaDefault props={tablaProps} />
    </div>
  );
}
