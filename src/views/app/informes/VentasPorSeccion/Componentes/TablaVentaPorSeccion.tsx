import { TablaDefault } from '@/frontend-resourses/components';
import { ExtendedColumn } from '@/frontend-resourses/components/Tables/types';

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
  const widthBase = '34rem';
  const heightBase = '29rem';
  const heightContainerBase = '29rem';

  const width1440px = '34rem';
  const height1440px = '28rem';
  const heightContainer1440 = '35rem';

  const width1536px = '34rem';
  const height1536px = '28rem';
  const heightContainer1536 = '39rem';

  // // este componente
  // const heightContainerTabla = "38rem";
  // const heightContainerTabla1440 = "48rem";
  // const heightContainerTabla1536 = "44rem";

  // columnas
  const VentaXSeccionColumns: Array<ExtendedColumn<VentaPorSeccionType>> = [
    { key: 'seccion', label: 'Sección', minWidth: '90', maxWidth: '120', resaltar: true },
    { key: 'nseccion', label: 'Detalle', minWidth: '120', maxWidth: '180' },
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

  const propsTablaVentaPorSeccion = {
    datosParaTabla: data,
    objectColumns: VentaXSeccionColumns,
    estaProcesado: estaProcesado,
    status: estaProcesado,
    objectStyles: {
      columnasNumber: [3, 4],
      heightContainer: heightContainerBase,
      width: widthBase,
      height: heightBase,
      addCellClass: 'max-height: 30px;',
      viewport1440: {
        width1440px: width1440px,
        height1440px: height1440px,
        heightContainer1440px: heightContainer1440,
        addCellClass1440px: 'max-height: 40px;',
      },
      viewport1536: {
        height1536px: height1536px,
        width1536px: width1536px,
        heightContainer1536px: heightContainer1536,
      },
    },
    objectFooter: {
      footer: estaProcesado,
      datosFooter: datosFooter,
      footerHeight: 'h-8',
    },
  };
  return (
    <div className={`${className}`}>
      <TablaDefault props={propsTablaVentaPorSeccion} />
    </div>
  );
}
