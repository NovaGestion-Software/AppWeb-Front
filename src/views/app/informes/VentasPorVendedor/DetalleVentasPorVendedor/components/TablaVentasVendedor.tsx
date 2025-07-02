import TablaExpandible from "@/frontend-resourses/components/Tables/TablaExpansible/TablaExpandible";
import { VentaPorVendedorColumns } from "../data";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useDetallesVentasPorVendedorStore } from "../store/useVentasPorVendedorStore";

export default function TablaVentasPorVendedor({ className }: { className?: string }) {
  const SeccionRubrosColumns: Array<ExtendedColumn<VentaPorVendedorColumns>> = [
    { key: "vendedorCodigo", label: "Codigo", minWidth: "70", maxWidth: "100" },
    { key: "vendedorNombre", label: "Vendedor", minWidth: "130", maxWidth: "520" },
    { key: "tipo", label: "Unidad", minWidth: "90", maxWidth: "120" },
    { key: "cantidad", label: "Cantidad", minWidth: "80", maxWidth: "520", resaltar: true },
    { key: "importe", label: "Importe $", minWidth: "110", maxWidth: "520", resaltar: true },
    { key: "contadoCantidad", label: "Cant.Cdo", minWidth: "80", maxWidth: "520", resaltar: true },
    { key: "contadoImporte", label: "Cdo $", minWidth: "120", maxWidth: "520", resaltar: true },
    { key: "cuentaCorrienteCantidad", label: "Cant.CC", minWidth: "80", maxWidth: "520", resaltar: true },
    { key: "cuentaCorrienteImporte", label: "CC $", minWidth: "120", maxWidth: "520", resaltar: true },
    { key: "otrosCantidad", label: "Cant.Ot.", minWidth: "80", maxWidth: "520", resaltar: true },
    { key: "otrosImporte", label: "Ot. $", minWidth: "120", maxWidth: "520", resaltar: true },
  ];

  const subItemsProperty = "unidades"; // Nombre que contiene los subítems
  const subItemKeyProperty = "tipo"; // Nombre que identifica la clave única de los subítems
  const subItemLabelProperty = "tipo"; // Nombre que identifica la etiqueta de los subítems
  const itemKey = "vendedorCodigo";
  const {
    setId,
    //data
    ventasPorVendedor,
    // footer
    ventasPorVendedorFooter,
    // status de la vista
    idsCoincidentes,
    // parametros de fetch
    indiceSeleccionado,
    // data.data
    buscado,
    // filtros
    modoNavegacion,
  } = useDetallesVentasPorVendedorStore();
  const propsTablaVXV = {
    datosParaTabla: ventasPorVendedor ?? [],
    objectColumns: SeccionRubrosColumns,
    selectFn: true,
    setIdTabla: setId,
    objectStyles: {
      cursorPointer: true,
      columnasNumber: [2, 3, 4, 5, 6, 7],
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px;",
      widthContainer: "69rem",
      heightContainer: "h-[28rem] 2xl:h-[30rem] rounded-md",
      addRowClass: "",
      height: "auto",
      viewport1536: {
        widthContainer1536px: "70rem",
        addCellClass1536px: "max-height: 80px;",
      },
       viewport1920: {
        widthContainer1920px: "90rem",
        addCellClass1536px: "max-height: 80px;",
      },
    },
    expandableTable: {
      renderMode: "table" as "table",
      subItemsProperty: subItemsProperty,
      subItemKeyProperty: subItemKeyProperty,
      subItemLabelProperty: subItemLabelProperty,
      // setItemsSeleccionados: setSeccionesSeleccionadas,
      // setSubItemsSeleccionados: setRubrosSeleccionados,
      // subItemsSeleccionados: rubrosSeleccionados,
      itemKey: itemKey,
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      keyBusqueda: "vendedorCodigo",
    },
    objectFooter: {
      footer: true,
      datosFooter: ventasPorVendedorFooter[0] ?? [],
      footerHeight: "h-8",
    },
  };

  return (
    <div className={`${className}`}>
      <TablaExpandible props={propsTablaVXV} />
    </div>
  );
}
