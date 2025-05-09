import { TablaDefault } from '@/frontend-resourses/components';
import { ExtendedColumn } from '@/frontend-resourses/components/Tables/types';
import { useVentasPorSeccionStore } from '../useVentasPorSeccionStore';

export type VentaPorSeccionType = {
  id: string | number;
  seccion: string;
  nseccion: string;
  importe: string | number;
  porcentajeImporte: number | string;
};

interface TablaVentaPorHoraProps {
  data: VentaPorSeccionType[];
  estaProcesado: boolean;
  datosFooter?: {};
  className?: string;
}
export function TablaVentaPorSeccion({ data, estaProcesado, datosFooter, className }: TablaVentaPorHoraProps) {
  // estilos

  const height1440px = '28rem';
  const heightContainer1440 = '35rem';


  // // este componente
  // const heightContainerTabla = "38rem";
  // const heightContainerTabla1440 = "48rem";
  // const heightContainerTabla1536 = "44rem";

  const { idsCoincidentes, indiceSeleccionado, buscado, modoNavegacion, indiceGlobal } = useVentasPorSeccionStore();

  // columnas
  const VentaXSeccionColumns: Array<ExtendedColumn<VentaPorSeccionType>> = [
    { key: 'seccion', label: 'Sección', minWidth: '90', maxWidth: '120', resaltar: true },
    { key: 'nseccion', label: 'Detalle', minWidth: '180', maxWidth: '240' },
    {
      key: 'importe',
      label: 'Importes $',
      withCellProps: true,
      resaltar: true,
      minWidth: '110',
      maxWidth: '180',
    },
    {
      key: 'porcentajeImporte',
      label: '%',
      withCellProps: true,
      minWidth: '50',
      maxWidth: '80',
    },
  ];

  // useEffect(() => {
  //   console.log('idsCoincidentes', idsCoincidentes);
  //   console.log('buscado', buscado);
  //   console.log('indiceSeleccionado', indiceSeleccionado);
  // }, [idsCoincidentes, indiceSeleccionado, buscado]);
  const propsTablaVentaPorSeccion = {
    datosParaTabla: data,
    objectColumns: VentaXSeccionColumns,
    estaProcesado: estaProcesado,
    status: estaProcesado,
    objectStyles: {
      columnasNumber: [3, 4],
      heightContainer: "27rem",
      widthContainer: '33rem',
      addCellClass: 'max-height: 45px; padding: 4px 8px 4px 8px;',
      withoutPadding: true,
      viewport1440: {
        widthContainer1440px: "38rem",
        height1440px: height1440px,
        heightContainer1440px: heightContainer1440,
        addCellClass1440px: 'max-height: 40px;',
      },
      viewport1536: {
        heightContainer1536px: "38rem",
      },
    },
    objectFooter: {
      footer: estaProcesado,
      datosFooter: datosFooter,
      footerHeight: 'h-8',
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      indiceGlobal: indiceGlobal,
      keyBusqueda: "seccion"
    },
  };
  return (
    <div className={`${className}`}>
      <TablaDefault props={propsTablaVentaPorSeccion} />
    </div>
  );
}
