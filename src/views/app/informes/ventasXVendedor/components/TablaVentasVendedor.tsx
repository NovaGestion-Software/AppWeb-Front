import TablaExpandible from '@/frontend-resourses/components/Tables/TablaExpandible';
import { dataVentaPorVendedor, VentaPorVendedorColumns } from '../data';
import { ExtendedColumn } from '@/frontend-resourses/components/Tables/types';

export default function TablaVentasPorVendedor({className}: {  className?: string;}) {
  const SeccionRubrosColumns: Array<ExtendedColumn<VentaPorVendedorColumns>> = [
    { key: 'vendedorCodigo', label: 'Codigo', minWidth: '70', maxWidth: '100' },
    { key: 'vendedorNombre', label: 'Seccion', minWidth: '130', maxWidth: '520' },
    { key: 'tipo', label: 'Unidad', minWidth: '90', maxWidth: '120' },
    { key: 'cantidad', label: 'Cantidad', minWidth: '80', maxWidth: '520' },
    { key: 'importe', label: 'Importe $', minWidth: '110', maxWidth: '520' },
    { key: 'contadoCantidad', label: 'Cant.Cdo', minWidth: '80', maxWidth: '520' },
    { key: 'contadoImporte', label: 'Cdo $', minWidth: '120', maxWidth: '520' },
    { key: 'cuentaCorrienteCantidad', label: 'Cant.CC', minWidth: '80', maxWidth: '520' },
    { key: 'cuentaCorrienteImporte', label: 'CC $', minWidth: '120', maxWidth: '520' },
    { key: 'otrosCantidad', label: 'Cant.Ot.', minWidth: '80', maxWidth: '520' },
    { key: 'otrosImporte', label: 'Ot. $', minWidth: '120', maxWidth: '520' },
  ];

  const subItemsProperty = 'unidades'; // Nombre que contiene los subítems
  const subItemKeyProperty = 'tipo'; // Nombre que identifica la clave única de los subítems
  const subItemLabelProperty = 'tipo'; // Nombre que identifica la etiqueta de los subítems
  const itemKey = 'vendedorCodigo';
  const propsTablaVXV = {
    datosParaTabla: dataVentaPorVendedor,
    objectColumns: SeccionRubrosColumns,
    objectStyles: {
      columnasNumber: [2,3,4,5,6,7],    
      addCellClass: 'max-height: 45px; padding: 4px 8px 4px 8px;',
      width: '42rem',
      heightContainer: 'h-[28rem] 2xl:h-[30rem] rounded-md',
      height: 'auto',
      viewport1536: {
        width: '60rem',
        addCellClass1536px: 'max-height: 80px;',
      },
    },
    expandableTable: {
      renderMode: 'table' as 'table',
      subItemsProperty: subItemsProperty,
      subItemKeyProperty: subItemKeyProperty,
      subItemLabelProperty: subItemLabelProperty,
      // setItemsSeleccionados: setSeccionesSeleccionadas,
      // setSubItemsSeleccionados: setRubrosSeleccionados,
      // subItemsSeleccionados: rubrosSeleccionados,
      itemKey: itemKey,
    },
    // searchFunction: {
    //   hayFuncionBusqueda: true,
    //   idsCoincidentes: idsCoincidentes,
    //   indiceSeleccionado: indiceSeleccionado ?? undefined,
    //   buscado: buscado,
    //   modoNavegacion: modoNavegacion,
    // },
  };
  return(
    
  <div className={`${className}`}>
     <TablaExpandible props={propsTablaVXV} />
  </div>
  )
}
