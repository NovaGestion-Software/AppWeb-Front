import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { articulosPromocionData, articulosPromocionFooter } from "../Data/data";
import { useArticulosEnPromocion } from "../Store/Store";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado, idsCoincidentes, indiceSeleccionado, buscado, modoNavegacion, indiceGlobal } = useArticulosEnPromocion();

  const tableColumns: Array<ExtendedColumn<any>> = [
    { key: "codigo", label: "Código", minWidth: "50", maxWidth: "110", resaltar: true },
    { key: "descripcion", label: "Descripción", minWidth: "180", maxWidth: "280" },
    { key: "marca", label: "Marca", minWidth: "100", maxWidth: "110" },
    { key: "precio", label: "Precio", minWidth: "80", maxWidth: "90" },
    { key: "stock", label: "Stock", minWidth: "60", maxWidth: "80" },
    { key: "dateInit", label: "Fec.Incial", minWidth: "100", maxWidth: "130" },
    { key: "dateFin", label: "Fec.Final", minWidth: "100", maxWidth: "130" },
    { key: "suc", label: "Suc", minWidth: "70", maxWidth: "90",  },
    { key: "sel", label: "Sel", minWidth: "60", maxWidth: "60" },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? articulosPromocionData : [],
    objectColumns: tableColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [4,5,],
      heightContainer: "24rem",
      widthContainer: "56rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 16px;",
      addHeaderCellClass: "padding: 4px 8px 4px 16px;",
      viewport1440: {
        widthContainer1440px: "59rem",
        heightContainer1440px: "35rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "35rem",
        widthContainer1536px: "63rem",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "40rem",
      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? articulosPromocionFooter[0] : [],
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "codigo",
    },
  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-10 `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
