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
// import { useVentasHoraStore } from '@/store/useVentasHoraStore';
import { ClipLoader } from 'react-spinners';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { Status, TableColumn, TableNode } from '@/types';

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
  getCellProps?: (item: T, column: keyof T | string) => { style: CSSProperties };
  footer?: boolean;
  datosFooter?: {};
  procesado: boolean;
  status?: Status;
  idsCoincidentes?: (string | number)[]; // Prop opcional
  indiceSeleccionado?: number; // Prop opcional
}

export default function TablaInforme<T extends TableNode>({
  columnas,
  datosParaTabla,
  estilos,
  footer,
  datosFooter,
  procesado,
  status,
  idsCoincidentes = [], // Valor por defecto: array vacío
  indiceSeleccionado = -1,
}: TableProps<T>) {
  //console.log('Datos recibidos en TablaInforme:', datosParaTabla);

  const [isActive, setIsActive] = useState(false);
  const [currentHorario, setCurrentHorario] = useState<TableNode | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  // const { status } = useVentasHoraStore();
  const { buscado, modoNavegacion, setUltimoIndiceBusqueda, indiceGlobal} = useStockPorSeccion();

  const tableRef = useRef<HTMLDivElement | null>(null);
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme([materialTheme, estilos]);
  const rowHeight = 30;
  const headerHeight = 5;
  const data: Data<TableNode> = {
    nodes: datosParaTabla,
  };
  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });
  // console.log(datosParaTabla[0]);
  //  Establece la primera fila seleccionada si no hay ninguna y los datos ya están procesados
  useEffect(() => {
    if (procesado && datosParaTabla.length > 0 && !currentHorario) {
      const firstItem = datosParaTabla[0];
      // console.log(firstItem);
      setCurrentHorario(firstItem);
      select.fns.onToggleByIdExclusively(firstItem.id);
      setIsActive(true);
    }
  }, [procesado, datosParaTabla, select, currentHorario]);

  // console.log(currentHorario);
  //  Si la tabla está activa, poner foco en ella automáticamente
  useEffect(() => {
    if (isActive && tableRef.current) {
      tableRef.current.focus();
    }
  }, [isActive]);

  //  Manejar la navegación con el teclado en toda la página
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

  //  Maneja el scroll de la tabla
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

  // console.log(datosParaTabla);
  // SELECCION POR BUSQUEDA
// Nuevo useEffect para manejar navegación global
useEffect(() => {
  if (modoNavegacion === 'normal' && indiceGlobal >= 0) {
    const itemSeleccionado = datosParaTabla[indiceGlobal];
    if (itemSeleccionado && itemSeleccionado.id !== currentHorario?.id) {
      setCurrentHorario(itemSeleccionado);
      select.fns.onToggleByIdExclusively(itemSeleccionado.id);
      
      // Scroll
      const newScrollPosition = indiceGlobal * rowHeight + headerHeight;
      setScrollPosition(newScrollPosition);
    }
  }
}, [indiceGlobal, modoNavegacion, datosParaTabla]);


// Mantén el efecto existente para búsqueda
useEffect(() => {
  if (buscado && modoNavegacion === 'busqueda' && idsCoincidentes.length > 0) {
    const idSeleccionado = idsCoincidentes[indiceSeleccionado];
    const itemSeleccionado = datosParaTabla.find(item => item.codigo === idSeleccionado);
    
    if (itemSeleccionado && itemSeleccionado.id !== currentHorario?.id) {
      setCurrentHorario(itemSeleccionado);
      select.fns.onToggleByIdExclusively(itemSeleccionado.id);
      
      // Scroll
      const itemIndex = datosParaTabla.findIndex(item => item.codigo === idSeleccionado);
      if (itemIndex >= 0) {
        const newScrollPosition = itemIndex * rowHeight + headerHeight;
        setScrollPosition(newScrollPosition);
      }
    }
  }
}, [indiceSeleccionado, buscado, modoNavegacion, idsCoincidentes, datosParaTabla]);

  // Efecto adicional para sincronización cuando cambian los datos
  useEffect(() => {
    if (buscado && modoNavegacion === 'busqueda' && idsCoincidentes.length > 0) {
      const idActual = currentHorario?.codigo;
      if (idActual && idsCoincidentes.includes(idActual)) {
        setUltimoIndiceBusqueda(idsCoincidentes.indexOf(idActual));
      }
    }
  }, [datosParaTabla]);
  // console.log(idsCoincidentes);
  // console.log(indiceSeleccionado);
  // Añadir este nuevo efecto para manejar selección manual (click)
useEffect(() => {
  if (!procesado || !currentHorario) return;

  const { setIndiceGlobal } = useStockPorSeccion();
  
  // Cuando se selecciona manualmente, actualizar indiceGlobal
  const newIndex = datosParaTabla.findIndex(item => item.id === currentHorario.id);
  if (newIndex >= 0) {
    setIndiceGlobal(newIndex);
  }
}, [currentHorario, datosParaTabla, procesado]);

  function onSelectChange(action: any, state: any) {
    console.log(action);
    const selectedItem = datosParaTabla.find((node) => node.id === state.id);
    // console.log(action);
    if (!selectedItem) {
      setCurrentHorario(null);
    } else {
      setCurrentHorario(selectedItem);
    }
  }

  const handleTableClick = () => {
    setIsActive(true);
  };

  // Manejar pérdida de foco para desactivar eventos
  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div
      className="p-2 w-fit  rounded-xl bg-white"
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
              {status === 'pending' && (
                <div className="absolute inset-0 flex justify-center items-center z-10">
                  <div className="flex flex-col items-center">
                    <ClipLoader color="#36d7b7" size={50} speedMultiplier={0.5} />
                    <p className="mt-2 text-gray-600">Cargando...</p>
                  </div>
                </div>
              )}

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
