import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { ventasPorCondicionData, ventasPorCondicionFooter } from "../Data/data";
import { useVentasPorCondicionStore } from "../Store/useVentasPorCondicionStore";
import BotoneraTabla from "./BotoneraTabla";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado, idsCoincidentes, indiceSeleccionado, buscado, modoNavegacion, indiceGlobal } = useVentasPorCondicionStore();

  const ventasPorCondicionColumns: Array<ExtendedColumn<any>> = [
    { key: "fecha", label: "Fecha", minWidth: "80", maxWidth: "140", resaltar: true },
    { key: "sucursal", label: "Sucursal", minWidth: "100", maxWidth: "160" },
    { key: "codb", label: "Co/Db $", minWidth: "65", maxWidth: "130", resaltar: true },
    { key: "codbCant", label: "N° Ope.", minWidth: "40", maxWidth: "130", resaltar: true },
    { key: "taMuBilMer", label: "Ta/Mu/Bil Mer.$", minWidth: "70", maxWidth: "180", resaltar: true },
    { key: "taMuBilMerCant", label: "N° Ope.", minWidth: "40", maxWidth: "120", resaltar: true },
    { key: "taMuBilFin", label: "Ta/Mu/Bil Fin.$", minWidth: "70", maxWidth: "180", resaltar: true },
    { key: "taMuBilFinCant", label: "N° Ope.", minWidth: "40", maxWidth: "140", resaltar: true },
    { key: "credMer", label: "Crédito Mer.$", minWidth: "70", maxWidth: "180", resaltar: true },
    { key: "credMerCant", label: "N° Ope.", minWidth: "40", maxWidth: "100", resaltar: true },
    { key: "credFin", label: "Crédito Fin.$", minWidth: "70", maxWidth: "180", resaltar: true },
    { key: "credFinCant", label: "N° Ope.", minWidth: "40", maxWidth: "100", resaltar: true },
    { key: "chTrCC", label: "Ch/Tr/CC $", minWidth: "90", maxWidth: "180", resaltar: true },
    { key: "chTrCCCant", label: "N° Ope.", minWidth: "40", maxWidth: "100", resaltar: true },
    { key: "total", label: "Total", minWidth: "70", maxWidth: "140", resaltar: true },
    { key: "operacion", label: "Operacion", minWidth: "90", maxWidth: "140", resaltar: true },
    { key: "valorPromedio", label: "$ Promedio", minWidth: "90", maxWidth: "140", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? ventasPorCondicionData : [],
    objectColumns: ventasPorCondicionColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    withTooltip: true,
    objectStyles: {
      columnasNumber: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17],
      heightContainer: "24rem",
      widthContainer: "72rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 12px; font-size: 10px;",
      addHeaderCellClass: "font-size: 10px;",
      viewport1440: {
        widthContainer1440px: "82rem",
        heightContainer1440px: "35rem",
        addCellClass1440px: "max-height: 40px; font-size: 0.8rem;",
      },
      viewport1536: {
        heightContainer1536px: "35rem",
        widthContainer1536px: "88rem",
        addHeaderCellClass1536px: "font-size: 0.7rem;",
        addCellClass1536px: "max-height: 60px; font-size: 0.8rem;",
      },
      viewport1920: {
        widthContainer1920px: "110rem",
        heightContainer1920px: "40rem",
        addHeaderCellClass1920px: "font-size: 0.9rem; min-height: 40px;",
        addCellClass1920px: "max-height: 80px; font-size: 0.9rem;",


      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? ventasPorCondicionFooter[0] : [],
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
    <Card className={`${className} row-start-3 col-auto row-span-10 pb-2`}>
      <div className="flex  justify-end m-1">
        <BotoneraTabla />
      </div>{" "}
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
