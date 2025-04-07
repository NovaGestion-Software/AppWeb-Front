import { CSSProperties, useEffect } from 'react';
import { useVentasHoraStore } from '@/store/useVentasHoraStore';
import { VentaPorHora } from '@/types';
import TablaInforme from '../../_components/TablaInforme';

// Definicion de estructura de columnas
interface TableColumn<T> {
  label: string;
  renderCell: (item: T) => JSX.Element | number | string;
  cellProps?: (item: T) => any;
}

interface TablaVentaPorHoraProps {
  dataParaTabla: VentaPorHora[];
  isProcessing: boolean;
  footer: boolean;
  datosFooter?: {};
}

export default function TablaVentaPorHora({
  dataParaTabla,
  isProcessing,
  footer,
  datosFooter,
}: TablaVentaPorHoraProps) {
  const { status } = useVentasHoraStore();
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [isProcessing]);
  // const empresa = JSON.parse(localStorage.getItem('_u') || '{}')
  //   ?.empresa.toString()
  //   .slice(-2);
  // console.log(empresa);
  const customTheme = {
    Table: `
      grid-template-columns: minmax(0px, 0px) minmax(90px, 90px) minmax(100px, 100px) minmax(80px, 80px) minmax(80px, 80px) minmax(80px, 80px) minmax(50px, 180px) minmax(50px, 80px);
      border-radius: 12px;
      width: 680px;
      height: 600px;
      scrollbar-width: thin;
      border: 1px solid black;
      font-variant-numeric: tabular-nums;
      @media (min-width: 1280px) and (max-width: 1380px) {
        height: 500px;
      }
      @media (min-width: 1536px) {
      width: 790px;
      height: 780px;
      grid-template-columns: 
        minmax(0px, 0px) 
        minmax(100px, 100px) 
        minmax(100px, 100px) 
        minmax(100px, 100px) 
        minmax(100px, 100px) 
        minmax(100px, 100px) 
        minmax(80px, 200px)
        minmax(80px, 100px);
      }
    `,

    Row: `
      &:nth-of-type(odd) { background-color: #fff; }
      &:nth-of-type(even) { background-color: #eaf5fd; }
      
      &.row-select-single-selected { background-color: #CAE0BC !important; }
      border-bottom: 1px solid #ccc;
    `,

    HeaderCell: `
      background: #2973B2;
      color: white;
      min-height: 23px;
      height: 23px;
      font-size: 13px;
      padding: 12px;
      &:nth-of-type(n+3) {
        text-align: center;
      }
    `,

    Cell: `
      padding: 0.5px 4px;
      border-right: 1px solid #ccc;
      max-height: 30px;

      &:last-child {
        border-right: none;
      }
  
      &:nth-of-type(n+3) {
        text-align: right;
      }

       @media (min-width: 1536px) {
        padding: 5px;
        font-size: 15px;
       }
    `,

    FooterCell: `
      position: sticky;
      bottom: 0px;
      padding: 2px;
      border-right: 1px solid #ccc;
      background-color: #fff;
      text-align: right;
      max-height: 30px;

      @media (min-width: 1536px) {
        padding: 6px;
        font-size: 15px;
      }
      &:last-child {
        border-right: none;
      }
  
      &:nth-of-type(3) {
        border-right: 1px solid black;
        background-color: #A5C9FF;
        font-weight: bold;
      }
  
      &:nth-of-type(5) {
        border-right: 1px solid black;
        background-color: #A5C9FF;
        font-weight: bold;
      }
  
      &:nth-of-type(7) {
        border-right: 1px solid black;
        background-color: #A5C9FF;
        font-weight: bold;
      }
    `,
  };

  // COLUMNAS DE TABLA
  const COLUMNS: TableColumn<VentaPorHora>[] = [
    {
      label: '',
      renderCell: (item: VentaPorHora) => item.id,
    },
    {
      label: 'Hora',
      renderCell: (item: VentaPorHora) => item.hora,
    },
    {
      label: 'N. Opera',
      renderCell: (item: VentaPorHora) => item.nOperaciones,
      cellProps: (item: VentaPorHora) => getCellProps(item, 'nOperaciones'),
    },
    {
      label: '%',
      renderCell: (item: VentaPorHora) => item.porcentajeOperaciones,
      cellProps: (item: VentaPorHora) => getCellProps(item, 'porcentajeOperaciones'),
    },
    {
      label: 'Pares',
      renderCell: (item: VentaPorHora) => item.pares,
      cellProps: (item: VentaPorHora) => getCellProps(item, 'pares'),
    },
    {
      label: '%',
      renderCell: (item: VentaPorHora) => item.porcentajePares,
      cellProps: (item: VentaPorHora) => getCellProps(item, 'porcentajePares'),
    },
    {
      label: 'Importes $',
      renderCell: (item: VentaPorHora) => item.importe,
      cellProps: (item: VentaPorHora) => getCellProps(item, 'importe'),
    },
    {
      label: '%',
      renderCell: (item: VentaPorHora) => item.porcentajeImporte,
      cellProps: (item: VentaPorHora) => getCellProps(item, 'porcentajeImporte'),
    },
  ];

  const findMaxByKey = (array: VentaPorHora[], key: keyof VentaPorHora) => {
    if (!array || array.length === 0) return null;

    return array.reduce((maxItem, currentItem) => {
      const currentValue =
        typeof currentItem[key] === 'string'
          ? parseFloat(currentItem[key].replace(/\./g, ''))
          : currentItem[key];

      const maxValue =
        typeof maxItem[key] === 'string'
          ? parseFloat(maxItem[key].replace(/\./g, ''))
          : maxItem[key];

      return currentValue > maxValue ? currentItem : maxItem;
    }, array[0]);
  };

  const maxNOperaciones = findMaxByKey(dataParaTabla, 'nOperaciones');
  const maxImporte = findMaxByKey(dataParaTabla, 'importe');
  const maxPares = findMaxByKey(dataParaTabla, 'pares');
  const maxParesId = maxPares ? maxPares.id : null;
  const maxNOperacionesId = maxNOperaciones ? maxNOperaciones.id : null;
  const maxImporteId = maxImporte ? maxImporte.id : null;

  const getCellProps = (item: VentaPorHora, column: keyof VentaPorHora | string) => {
    const isMaxNOperaciones = item.id === maxNOperacionesId;
    const isMaxImporte = item.id === maxImporteId;
    const isMaxPares = item.id === maxParesId;

    let style: CSSProperties = {}; // Inicializar el estilo como un objeto vacío

    if (
      (column === 'nOperaciones' && isMaxNOperaciones) ||
      (column === 'porcentajeOperaciones' && isMaxNOperaciones)
    ) {
      style = { color: 'white', fontWeight: 'bolder', background: 'green' };
    }

    if (
      (column === 'importe' && isMaxImporte) ||
      (column === 'porcentajeImporte' && isMaxImporte)
    ) {
      style = { color: 'white', fontWeight: 'bolder', background: 'green' };
    }

    if ((column === 'pares' && isMaxPares) || (column === 'porcentajePares' && isMaxPares)) {
      style = { color: 'white', fontWeight: 'bolder', background: 'green' };
    }

    return { style }; // Devolver siempre un objeto con la propiedad 'style'
  };

  return (
    <div>
      <TablaInforme<VentaPorHora>
        columnas={COLUMNS}
        datosParaTabla={dataParaTabla}
        estilos={customTheme}
        footer={footer}
        datosFooter={datosFooter}
        procesado={isProcessing}
        status={status}
      />
    </div>
  );
}
