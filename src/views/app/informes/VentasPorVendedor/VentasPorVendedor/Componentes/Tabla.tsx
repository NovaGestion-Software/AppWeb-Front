import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { TablaDefault } from "@/frontend-resourses/components";
import { useVentasPorVendedor } from "../Store/Store";
import { ventasPorVendedorData, ventasPorVendedorFooter } from "../Data/Data";

export default function Tabla({ className }: { className?: string }) {
  const { status, estaProcesado, setId, idsCoincidentes, indiceSeleccionado, buscado, modoNavegacion, indiceGlobal } = useVentasPorVendedor();

  const tablaColumns: Array<ExtendedColumn<any>> = [
    { key: "vende", label: "Vende", minWidth: "80", maxWidth: "120", resaltar: true },
    { key: "nombre", label: "Nombre", minWidth: "100", maxWidth: "220" },
    { key: "codigo", label: "Código", minWidth: "100", maxWidth: "220" },
    { key: "descripcion", label: "Descripcion", minWidth: "100", maxWidth: "220" },
    { key: "marca", label: "Marca", minWidth: "100", maxWidth: "220" },
    { key: "cantidad", label: "Cant.", minWidth: "100", maxWidth: "220" , resaltar: true},
    { key: "importe", label: "Importe $", minWidth: "100", maxWidth: "220", resaltar: true },
  ];

  const propsTabla = {
    datosParaTabla: estaProcesado ? ventasPorVendedorData : [],
    objectColumns: tablaColumns,
    estaProcesado: estaProcesado,
    status: status,
    selectFn: true,
    setIdTabla: setId,
    objectStyles: {
      withBorder: true,
      InitColumCenter: 1,
      columnasNumber: [ 6, 7,],
      heightContainer: "24.4rem",
      addHeaderCellClass: "font-size: 0.5rem;",
      addCellClass: "min-height: 25px; font-size: 0.6rem;",
      viewport1440: {
        widthContainer1440px: "",
        addHeaderCellClass1440px: "font-size: 0.7rem; padding: 15px 5px;",
        heightContainer1440px: "37rem",
        addCellClass1440px: "max-height: 35px; font-size: .7rem; padding: 5px 10px;",
      },
      viewport1536: {
        heightContainer1536px: "37rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 40px; padding: 15px 15px;",
        addHeaderCellClass1536px: "font-size: 0.8rem; padding: 15px 5px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "40.5rem",
      },
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
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? ventasPorVendedorFooter[0] : [],
    },
  };

  return (
    <Card padding={false} className={`${className} row-start-3 col-span-full  p-1`}>
      <TablaDefault props={propsTabla} />
    </Card>
  );
}
