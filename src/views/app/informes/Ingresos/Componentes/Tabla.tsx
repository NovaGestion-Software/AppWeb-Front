import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useIngresosStore } from "../Store/store";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { TablaDefault } from "@/frontend-resourses/components";
import { dataIngresosFooter, dataTablaIngresos } from "../data/data";

export default function Tabla({className}: {className?: string;}) {
  const { status, estaProcesado } = useIngresosStore();

  const tablaColumns: Array<ExtendedColumn<any>> = [
    { key: "fecha", label: "Fecha", minWidth: "50", maxWidth: "100" , resaltar: true,},
    { key: "contado", label: "Contado", minWidth: "50", maxWidth: "220" , resaltar: true,},
    { key: "cobranzaCr", label: "Cobranza Cr.", minWidth: "50", maxWidth: "220" , resaltar: true,},
    { key: "cobranzaPp", label: "Cobranza PP.", minWidth: "30", maxWidth: "120", resaltar: true, },
    { key: "intereses", label: "Intereses", minWidth: "40", maxWidth: "120", resaltar: true, },
    { key: "cheques", label: "Cheques", minWidth: "40", maxWidth: "120" , resaltar: true,},
    { key: "tarjMer", label: "Tarjetas Mer.", minWidth: "40", maxWidth: "120" , resaltar: true,},
    { key: "tarjFin", label: "Tarjetas Fin.", minWidth: "40", maxWidth: "120", resaltar: true, },
    { key: "ctacteMer", label: "Cta. Cte. Mer.", minWidth: "40", maxWidth: "120", resaltar: true, },
    { key: "ctacteFin", label: "Cta. Cte. Fin.", minWidth: "40", maxWidth: "120", resaltar: true, },
    { key: "otros", label: "Otros", minWidth: "40", maxWidth: "120", resaltar: true, },
    { key: "ventTotal", label: "Venta Tot.", minWidth: "40", maxWidth: "120", resaltar: true, },
  ];

  const propsTabla = {
    datosParaTabla: estaProcesado ? dataTablaIngresos : [],
    objectColumns: tablaColumns,
    estaProcesado: estaProcesado,
    status: status,
    checkboxItem: true,
    selectFn: true,
    withTooltip: true,
    objectStyles: {
      withBorder: true,
      InitColumCenter: 1,
      columnasNumber: [2,3, 4, 5, 6,7,8,9,10,11,12],
      heightContainer: "24.4rem",
      addHeaderCellClass: "font-size: 0.5rem;",
      addCellClass: "max-height: 25px; font-size: 0.5rem;",
      viewport1440: {
        widthContainer1440px: "",
        addHeaderCellClass1440px: "font-size: 0.7rem; padding: 15px 5px;",
        heightContainer1440px: "37rem",
        addCellClass1440px: "max-height: 35px; font-size: .7rem;",
      },
      viewport1536: {
        heightContainer1536px: "37rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 40px;",
        addHeaderCellClass1536px: "font-size: 0.8rem; padding: 15px 5px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "40.5rem",
      },
    },
    objectFooter:{
      footer: true,
      footerHeight: "h-7",
      datosFooter: estaProcesado ? dataIngresosFooter[0] : [] 
    }
  };

  return (
    <Card
      padding={false}
      className={`${className} w-full h-full p-1`}>
      <TablaDefault props={propsTabla} />
    </Card>
  );
}
