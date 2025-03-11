import { CSSProperties, useEffect } from 'react';
import TablaInforme from '../../_components/TablaInforme';
import { VentaPorHora } from '@/types';

// Definicion de estructura de columnas
interface TableColumn<T> {
  label: string;
  renderCell: (item: T) => JSX.Element | number | string;
  cellProps?: (item: T) => any;
}

interface TablaVentaPorHoraProps {
  datos: VentaPorHora[];
  isProcessing: boolean;
  footer: boolean;
  datosFooter?: {};
}

export default function TablaVentaPorHora({
  datos,
  isProcessing,
  footer,
  datosFooter,
}: TablaVentaPorHoraProps) {
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [isProcessing]);
  const empresa = JSON.parse(localStorage.getItem('_u') || '{}')
    ?.empresa.toString()
    .slice(-2);
  console.log(empresa);
  const customTheme = {
    Table: `
      grid-template-columns: minmax(0px, 0px) minmax(30px, 110px) minmax(40px, 100px) minmax(50px, 80px) minmax(50px, 80px) minmax(50px, 80px) minmax(50px, 150px) minmax(50px, 80px);
      border-radius: 12px;
      width: 680px;
      height: 650px;
      scrollbar-width: thin;
      border: 1px solid black;
      font-variant-numeric: tabular-nums;
      @media (min-width: 1280px) and (max-width: 1380px) {
        height: 500px;
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
      height: 10px;
      &:nth-of-type(n+3) {
        text-align: center;
      }
    `,

    Cell: `
      padding: 8px;
      border-right: 1px solid #ccc;
  
      &:last-child {
        border-right: none;
      }
  
      &:nth-of-type(n+3) {
        text-align: right;
      }
    `,

    FooterCell: `
      position: sticky;
      bottom: 0px;
      padding: 8px;
      border-right: 1px solid #ccc;
      background-color: #fff;
      text-align: right;
  
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
  const maxNOperaciones = findMaxByKey(datos, 'nOperaciones');
  const maxImporte = findMaxByKey(datos, 'importe');
  const maxPares = findMaxByKey(datos, 'pares');
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
      <TablaInforme
        columnas={COLUMNS}
        datosParaTabla={datos}
        estilos={customTheme}
        footer={footer}
        datosFooter={datosFooter}
        procesado={isProcessing}
      />
    </div>
  );
}
