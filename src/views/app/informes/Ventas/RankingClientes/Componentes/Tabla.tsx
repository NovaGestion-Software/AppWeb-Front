import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { rankingClientesData, rankingClientesFooter } from "../Data/data";
import { useRankingClientesStore } from "../Store/useRankingClientesStore";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado, idsCoincidentes, indiceSeleccionado, buscado, modoNavegacion, indiceGlobal } = useRankingClientesStore();

  const rankingClientesColumns: Array<ExtendedColumn<any>> = [
    { key: "cliente", label: "Cliente", minWidth: "80", maxWidth: "140", resaltar: true },
    { key: "nombre", label: "Nombre", minWidth: "150", maxWidth: "180" },
    { key: "nOpera", label: "N° Ope.", minWidth: "80", maxWidth: "120", resaltar: true },
    { key: "porcentajeOpera", label: "% Ope.", minWidth: "90", maxWidth: "120", },
    { key: "importe", label: "Importe", minWidth: "100", maxWidth: "160", resaltar: true },
    { key: "porcentajeImporte", label: "% Imp.", minWidth: "90", maxWidth: "120",  },
    { key: "valorPromedio", label: "$ Promedio", minWidth: "90", maxWidth: "140", resaltar: true },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? rankingClientesData : [],
    objectColumns: rankingClientesColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [3, 4, 5, 6, 7],
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
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? rankingClientesFooter[0] : [],
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "cliente",
    },
  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-10 `}>
    
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
