import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useVentasClientesOtrosMedios } from "../Store/Store";
import { footer, ventasClientesOtrosMediosData } from "../Data/data";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado,idsCoincidentes,
indiceSeleccionado,
buscado,
modoNavegacion,
indiceGlobal, } = useVentasClientesOtrosMedios();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "fecha", label: "Fecha", minWidth: "80", maxWidth: "120", resaltar: true },
    { key: "suc", label: "Suc", minWidth: "60", maxWidth: "220" },
    { key: "comprobante", label: "Comprob", minWidth: "120", maxWidth: "140",  },
    { key: "vende", label: "Vende", minWidth: "80", maxWidth: "130", },
    { key: "cliente", label: "Cliente", minWidth: "70", maxWidth: "160",  },
    { key: "nombre", label: "Nombre", minWidth: "160", maxWidth: "220", },
    { key: "importe", label: "Importe $", minWidth: "90", maxWidth: "160", resaltar: true },
    { key: "efectivo", label: "Efectivo $", minWidth: "90", maxWidth: "130", resaltar: true },
    { key: "cheque", label: "Cheque  $", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "tarjeta", label: "Tarjeta $", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "debito", label: "Débito $", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "otros", label: "Otros $", minWidth: "90", maxWidth: "120", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? ventasClientesOtrosMediosData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [7,8,9,10,11,12],
      heightContainer: "18rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px; font-size: 0.6rem;",
      addHeaderCellClass: "padding: 4px 8px 4px 8px; font-size: 0.6rem;",
      viewport1440: {
        heightContainer1440px: "25rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "30rem",
        widthContainer1536px: "88rem",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        heightContainer1920px: "32rem",
        widthContainer1920px: "100rem",
      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8 text-xxs v1440:text-xs v1536:text-base",
      datosFooter: estaProcesado ? footer[0] : [],
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "fecha",
    },
  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-5 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
