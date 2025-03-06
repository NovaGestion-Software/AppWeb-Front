import { CSSProperties, useEffect, useRef, useState } from 'react';
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
  Data,
} from '@table-library/react-table-library/table';
import { getTheme, DEFAULT_OPTIONS } from '@table-library/react-table-library/material-ui';
import { useTheme } from '@table-library/react-table-library/theme';

interface TableNode {
  id: string | number; // ID único para cada fila
}

interface TableColumn<T> {
  label: string;
  renderCell: (item: T) => React.ReactNode;
  cellProps?: (item: T) => any;
}


interface TablaFooterProps {
  datos?: {
    [key: string]: number | string; // Acepta cualquier total sin forzar nombres específicos
  };
}

const TablaFooter: React.FC<TablaFooterProps> = ({ datos = {} }) => {
  if (!Object.keys(datos).length) return null; // No renderiza si `datos` está vacío

  return (
    <Footer layout={{ fixedHeader: true }}>
      <FooterRow>
        {Object.entries(datos).map(([_, value], index) => (
          <FooterCell key={index}>
            {typeof value === 'number' ? value.toLocaleString('es-AR') : value}
          </FooterCell>
        ))}
      </FooterRow>
    </Footer>
  );
};
interface TableProps<T extends TableNode> {
  columnas: TableColumn<T>[];
  datosParaTabla: TableNode[];
  estilos: object;
  getCellProps?: (item: T, column: keyof T | string) => { style: CSSProperties }; // Estilos específicos para cada celda
  footer?: boolean;
  datosFooter?: {};
  procesado: boolean;
}
function TablaInforme<T extends TableNode>({
  columnas,
  datosParaTabla,
  estilos,
  footer,
  datosFooter,
  procesado, // Propiedad para saber si ya fue procesado
}: TableProps<T>) {
  const [currentHorario, setCurrentHorario] = useState<TableNode | null>(null);
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme([materialTheme, estilos]);
  const data: Data<TableNode> = {
    nodes: datosParaTabla, 
  };

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const rowHeight = 30;
  const headerHeight = 5;

  const tableRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  // 👉 Establece la primera fila seleccionada si no hay ninguna y los datos ya están procesados
  useEffect(() => {
    if (procesado && datosParaTabla.length > 0 && !currentHorario) {
      const firstItem = datosParaTabla[0];
      setCurrentHorario(firstItem);
      select.fns.onToggleByIdExclusively(firstItem.id);
      setIsActive(true);
    }
  }, [procesado, datosParaTabla, select, currentHorario]);

  // 👉 Si la tabla está activa, poner foco en ella automáticamente
  useEffect(() => {
    if (isActive && tableRef.current) {
      tableRef.current.focus();
    }
  }, [isActive]);

  // 👉 Manejar la navegación con el teclado en toda la página
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isActive || !currentHorario) return;

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
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, currentHorario, data]);

  // 👉 Activa la tabla cuando se le hace click
  const handleTableClick = () => {
    setIsActive(true);
  };

  // 👉 Desactiva la tabla cuando pierde el foco
  const handleBlur = () => {
    setIsActive(false);
  };

  // 👉 Maneja el scroll de la tabla
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
    const selectedItem = datosParaTabla.find((node) => node.id === state.id);

    if (!selectedItem) {
      setCurrentHorario(null);
    } else {
      setCurrentHorario(selectedItem);
    }
  }

  return (
    <div
      className="p-2 w-fit rounded-xl bg-white"
      id="table-to-print"
      ref={tableRef}
      tabIndex={0}
      onClick={handleTableClick}
      onBlur={handleBlur}
    >
      <Table
        data={{ nodes: datosParaTabla }}
        theme={theme}
        layout={{ fixedHeader: true }}
        select={select}
      >
        {(tableList: T[]) => (
          <>
            <Header>
              <HeaderRow>
                {columnas.map((column, index) => (
                  <HeaderCell key={index}>{column.label}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item, rowIndex) => (
                <Row key={rowIndex} item={item}>
                  {columnas.map((column, columnIndex) => {
                    return (
                      <Cell key={columnIndex} {...column.cellProps?.(item)}>
                        {column.renderCell(item)}
                      </Cell>
                    );
                  })}
                </Row>
              ))}
            </Body>

            {footer && datosParaTabla && <TablaFooter datos={datosFooter} />}
          </>
        )}
      </Table>
    </div>
  );
}


export default TablaInforme;
