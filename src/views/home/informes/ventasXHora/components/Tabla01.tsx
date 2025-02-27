import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CgBorderStyleSolid } from 'react-icons/cg';
import { HeaderCellSort, SortToggleType, useSort } from '@table-library/react-table-library/sort';
import { useRowSelect } from '@table-library/react-table-library/select';
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  Footer,
  FooterRow,
  FooterCell,
} from '@table-library/react-table-library/table';
import { getTheme, DEFAULT_OPTIONS } from '@table-library/react-table-library/material-ui';
import { useTheme } from '@table-library/react-table-library/theme';
import { DataParaTabla } from '../VentasPorHoraView';
// import { DataFalsa1 } from '../VentaPorHora/js/dataFalsa';

// const FiltroSucursal = ({ sucursales, onChange }) => {
//   return (
//     <div className="flex gap-8 items-center p-2 bg-white rounded-lg">
//       {sucursales.map((sucursal) => (
//         <label className="flex gap-3 items-center" key={sucursal.sucursal}>
//           <input type="checkbox" value={sucursal.sucursal} onChange={onChange} />
//           {sucursal.nsucursal}
//         </label>
//       ))}
//     </div>
//   );
// };
// Definir el tipo de los elementos de la tabla
interface TableNode {
  id: number;
  hora: string;
  nOperaciones: number;
  porcentajeOperaciones: number;
  importe: string;
  porcentajeImporte: number;
}

interface Tabla01Props {
  dataParaTabla: DataParaTabla[];
}

export default function Tabla01({ dataParaTabla }: Tabla01Props) {
  // ESTILOS DE TABLA
  const customTheme = {
    Table: `
      grid-template-columns: minmax(30px, 40px) minmax(30px, 150px) minmax(40px, 120px) minmax(50px, 80px) minmax(50px, 150px) minmax(50px, 80px);
      border-radius: 12px;
      width: 620px;
      scrollbar-width: thin;
      border: 1px solid black;
    `,

    Row: `
      &:nth-of-type(odd) { background-color: #fff; }
      &:nth-of-type(even) { background-color: #eaf5fd; }
      &:hover { background-color: #CAE0BC; }
      &.row-select-single-selected { background-color: #84ceeb !important; }
      border-bottom: 1px solid #ccc;
    `,

    HeaderCell: `
      background: #2973B2;
      color: white;
      height: 10px;
    `,

    Cell: `
      padding: 8px;
      border-right: 1px solid #ccc;

      &:last-child {
        border-right: none;
      }

      /* Alinear texto a la derecha para todas las columnas excepto la primera y la segunda */
      &:nth-child(n+3) {
        text-align: right;
      }
    `,

    FooterCell: `
    padding: 8px;
    border-right: 1px solid #ccc; /* Borde normal para todas las celdas */
    background-color: #fff; /* Fondo normal para todas las celdas */
    text-align: right; /* Alinear texto a la derecha */

    &:last-child {
      border-right: none; /* Eliminar borde de la última celda */
    }

    /* Estilos específicos para las celdas de nOperaciones e importe */
    &:nth-child(3) {
      border-right: 1px solid black; /* Borde negro */
      background-color: #A5C9FF; /* Fondo distintivo (gris claro) */
      font-weight: bold; /* Texto en negrita */
    }

    &:nth-child(5) {
      border-right: 1px solid black; /* Borde negro */
      background-color: #A5C9FF; /* Fondo distintivo (gris claro) */
      font-weight: bold; /* Texto en negrita */
    }
  `,
  };
  const [currentHorario, setCurrentHorario] = useState<TableNode | null>(null);
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme([materialTheme, customTheme]);

  // INFO FALSA
  //   const dataFalsa = [
  //     {
  //       id: 1,
  //       hora: '09:30 / 10:00',
  //       nOperaciones: 45,
  //       porcentajeOperaciones: 2.98,
  //       importe: 950000.0,
  //       porcentajeImporte: 4.85,
  //     },
  //     {
  //       id: 2,
  //       hora: '10:00 / 10:30',
  //       nOperaciones: 72,
  //       porcentajeOperaciones: 5.75,
  //       importe: 1850320.0,
  //       porcentajeImporte: 6.12,
  //     },
  //     {
  //       id: 3,
  //       hora: '10:30 / 11:00',
  //       nOperaciones: 90,
  //       porcentajeOperaciones: 8.1,
  //       importe: 2420000.0,
  //       porcentajeImporte: 7.35,
  //     },
  //     {
  //       id: 4,
  //       hora: '11:00 / 11:30',
  //       nOperaciones: 63,
  //       porcentajeOperaciones: 6.3,
  //       importe: 2020000.0,
  //       porcentajeImporte: 5.98,
  //     },
  //     {
  //       id: 5,
  //       hora: '11:30 / 12:00',
  //       nOperaciones: 55,
  //       porcentajeOperaciones: 5.1,
  //       importe: 1650000.0,
  //       porcentajeImporte: 4.89,
  //     },
  //     {
  //       id: 6,
  //       hora: '12:00 / 12:30',
  //       nOperaciones: 50,
  //       porcentajeOperaciones: 4.75,
  //       importe: 1400500.0,
  //       porcentajeImporte: 4.1,
  //     },
  //     {
  //       id: 7,
  //       hora: '12:30 / 13:00',
  //       nOperaciones: 42,
  //       porcentajeOperaciones: 3.8,
  //       importe: 1120300.0,
  //       porcentajeImporte: 3.25,
  //     },
  //     {
  //       id: 8,
  //       hora: '13:00 / 13:30',
  //       nOperaciones: 30,
  //       porcentajeOperaciones: 2.9,
  //       importe: 850200.0,
  //       porcentajeImporte: 2.55,
  //     },
  //     {
  //       id: 9,
  //       hora: '13:30 / 14:00',
  //       nOperaciones: 20,
  //       porcentajeOperaciones: 1.95,
  //       importe: 620500.0,
  //       porcentajeImporte: 1.8,
  //     },
  //     {
  //       id: 10,
  //       hora: '14:00 / 14:30',
  //       nOperaciones: 15,
  //       porcentajeOperaciones: 1.2,
  //       importe: 400100.0,
  //       porcentajeImporte: 1.1,
  //     },
  //     {
  //       id: 11,
  //       hora: '14:30 / 15:00',
  //       nOperaciones: 10,
  //       porcentajeOperaciones: 0.9,
  //       importe: 300400.0,
  //       porcentajeImporte: 0.85,
  //     },
  //     {
  //       id: 12,
  //       hora: '15:00 / 15:30',
  //       nOperaciones: 8,
  //       porcentajeOperaciones: 0.75,
  //       importe: 250700.0,
  //       porcentajeImporte: 0.7,
  //     },
  //     {
  //       id: 13,
  //       hora: '15:30 / 16:00',
  //       nOperaciones: 5,
  //       porcentajeOperaciones: 0.5,
  //       importe: 150900.0,
  //       porcentajeImporte: 0.45,
  //     },
  //     {
  //       id: 14,
  //       hora: '16:00 / 16:30',
  //       nOperaciones: 3,
  //       porcentajeOperaciones: 0.3,
  //       importe: 100500.0,
  //       porcentajeImporte: 0.25,
  //     },
  //     {
  //       id: 15,
  //       hora: '16:30 / 17:00',
  //       nOperaciones: 2,
  //       porcentajeOperaciones: 0.2,
  //       importe: 80200.0,
  //       porcentajeImporte: 0.15,
  //     },
  //     {
  //       id: 16,
  //       hora: '17:00 / 17:30',
  //       nOperaciones: 1,
  //       porcentajeOperaciones: 0.1,
  //       importe: 50000.0,
  //       porcentajeImporte: 0.1,
  //     },
  //   ];

  // FUNCION PARA ENCONTRAR EL MONTO MAYOR.
  const findMaxByKey = (array: TableNode[], key: keyof TableNode) => {
    if (!array || array.length === 0) return null;
    return array.reduce((maxItem, currentItem) => {
      return currentItem[key] > maxItem[key] ? currentItem : maxItem;
    });
  };

  // // Encontrar el elemento con el mayor número de operaciones
  const maxNOperaciones = findMaxByKey(dataParaTabla, 'nOperaciones');
  //console.log("Elemento con más operaciones:", maxNOperaciones?.id);

  // // Encontrar el elemento con el mayor importe
  const maxImporte = findMaxByKey(dataParaTabla, 'importe');
  //console.log("Elemento con mayor importe:", maxImporte?.id);

  // // Extraer los IDs de los elementos máximos
  const maxNOperacionesId = maxNOperaciones ? maxNOperaciones.id : null;
  const maxImporteId = maxImporte ? maxImporte.id : null;

  // // Función para aplicar estilos condicionales a las celdas
  const getCellProps = (item: TableNode, column: string) => {
    const isMaxNOperaciones = item.id === maxNOperacionesId;
    const isMaxImporte = item.id === maxImporteId;

    // Aplicar estilos condicionales basados en la columna
    if (column === 'nOperaciones' && isMaxNOperaciones) {
      return { style: { color: 'orange', fontWeight: 'bold' } }; // Texto rojo y negrita
    }

    if (column === 'importe' && isMaxImporte) {
      return { style: { color: 'green', fontWeight: 'bold' } }; // Texto verde y negrita
    }

    return {}; // Sin estilos adicionales
  };

  // COLUMNAS DE TABLA
  const COLUMNS = [
    {
      label: '',
      renderCell: (item: TableNode) => item.id,
    },
    {
      label: 'Hora',
      renderCell: (item: TableNode) => item.hora,
      sortKey: 'hora',
    },
    {
      label: 'N. Opera',
      renderCell: (item: TableNode) => item.nOperaciones,
      cellProps: (item: any) => getCellProps(item, 'nOperaciones'),
      sortKey: 'nOperaciones',
    },
    {
      label: '%',
      renderCell: (item: TableNode) => item.porcentajeOperaciones,
    },
    {
      label: 'Importes',
      renderCell: (item: TableNode) => item.importe,
      cellProps: (item: any) => getCellProps(item, 'importe'),
      sortKey: 'importe',
    },
    {
      label: '%',
      renderCell: (item: TableNode) => item.porcentajeImporte,
    },
  ];

  // console.log('data para tabla', dataParaTabla)

  // MAPEO DE INFO EN LA TABLA/NODES
  const nodes: TableNode[] = dataParaTabla.map((hora: any) => ({
    id: hora.id,
    hora: hora.hora,
    nOperaciones: hora.nOperaciones,
    porcentajeOperaciones: hora.porcentajeOperaciones,
    importe: hora.importe,
    porcentajeImporte: hora.porcentajeImporte,
  }));

  // FUNCION PARA EL RE ORDENAMIENTO DE TABLA
  const sort = useSort<TableNode>(
    { nodes },
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: <CgBorderStyleSolid />,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortToggleType: SortToggleType.AlternateWithReset,
      sortFns: {
        nOperaciones: (array) => array.sort((a, b) => a.nOperaciones - b.nOperaciones),
      },
    }
  );

  const data = { nodes };

  // FUNCION PARA SELECCIONAR Y NAVEGAR CON TECLADO EN LA TABLA.
  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const rowHeight = 30;
  const headerHeight = 5;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!currentHorario) return;

      const currentIndex = data.nodes.findIndex((node) => node.id === currentHorario.id);
      let newIndex = currentIndex;

      if (event.key === 'ArrowDown' && currentIndex < data.nodes.length - 1) {
        event.preventDefault();
        newIndex = currentIndex + 1;
      } else if (event.key === 'ArrowUp' && currentIndex > 0) {
        event.preventDefault();
        newIndex = currentIndex - 1;
      }

      if (newIndex !== currentIndex) {
        const newHorario = data.nodes[newIndex];
        setCurrentHorario(newHorario);
        select.fns.onToggleByIdExclusively(newHorario.id);

        const newScrollPosition = newIndex * rowHeight + headerHeight;
        setScrollPosition(newScrollPosition);
      }

      if (event.key === 'Enter' && currentHorario) {
        console.log('Submitting form for:', currentHorario);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentHorario, data.nodes]);

  useEffect(() => {
    const tableContainer = document.querySelector('.table');
    if (tableContainer) {
      const maxScroll = tableContainer.scrollHeight - tableContainer.clientHeight;
      const adjustedScrollPosition = Math.min(scrollPosition, maxScroll);

      tableContainer.scrollTo({
        top: adjustedScrollPosition,
        behavior: 'smooth',
      });
    }
  }, [scrollPosition]);

  function onSelectChange(action: any, state: any) {
    console.log(action);
    console.log(state);

    const selectedItem = data.nodes.find((node) => node.id === state.id);

    if (!selectedItem) {
      console.log('Cliente Deseleccionado.');
      setCurrentHorario(null);
    } else {
      setCurrentHorario(selectedItem);
    }
  }

  function onSortChange(action: any, state: any) {
    console.log(action, state);
  }
  // const handleFiltroChange = (e) => {
  //   const sucursal = e.target.value;
  //   setSucursalesSeleccionadas((prev) =>
  //     prev.includes(sucursal)
  //       ? prev.filter((s) => s !== sucursal)
  //       : [...prev, sucursal]
  //   );
  // };

  // Calcular los totales
  const totalImporte = nodes.reduce(
    (sum, item) => sum + parseFloat(item.importe.replace(/\./g, '')),
    0
  );
  const totalOperaciones = nodes.reduce((sum, item) => sum + item.nOperaciones, 0);

  return (
    <div className="p-2 w-fit rounded-xl bg-white" id="table-to-print">
      {/* <FiltroSucursal sucursales={data1} onChange={handleFiltroChange} /> */}

      <Table
        data={data}
        theme={theme}
        layout={{ fixedHeader: true }}
        sort={sort} // Pasar el estado de ordenamiento
        select={select} // Pasar el estado de selección
      >
        {(tableList: TableNode[]) => (
          <>
            <Header>
              <HeaderRow>
                {COLUMNS.map((column, index) =>
                  column.sortKey ? ( // Si tiene sortKey, usar HeaderCellSort
                    <HeaderCellSort key={index} sortKey={column.sortKey}>
                      {column.label}
                    </HeaderCellSort>
                  ) : (
                    // Si no tiene sortKey, usar HeaderCell normal
                    <HeaderCell key={index}>{column.label}</HeaderCell>
                  )
                )}
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item} {...select}>
                  {COLUMNS.map((column, index) => (
                    <Cell key={index} {...column.cellProps?.(item)}>
                      {column.renderCell(item)}
                    </Cell>
                  ))}
                </Row>
              ))}
            </Body>
            <Footer>
              <FooterRow>
                <FooterCell></FooterCell> {/* Celda vacía para la columna ID */}
                <FooterCell></FooterCell> {/* Celda vacía para la columna Hora */}
                <FooterCell>{totalOperaciones}</FooterCell>
                <FooterCell></FooterCell> {/* Celda vacía para la columna % Operaciones */}
                <FooterCell>{totalImporte.toLocaleString('es-AR')}</FooterCell>
                <FooterCell></FooterCell> {/* Celda vacía para la columna % Importe */}
              </FooterRow>
            </Footer>
          </>
        )}
      </Table>
    </div>
  );
}
