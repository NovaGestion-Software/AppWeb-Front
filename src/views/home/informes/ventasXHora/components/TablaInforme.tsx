import { CSSProperties, useEffect, useRef, useState } from "react";
import { useRowSelect } from "@table-library/react-table-library/select";
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
} from "@table-library/react-table-library/table";
import {
  getTheme,
  DEFAULT_OPTIONS,
} from "@table-library/react-table-library/material-ui";
import { useTheme } from "@table-library/react-table-library/theme";

interface TableNode {
  id: string | number; // ID único para cada fila
}

interface TableColumn<T> {
  label: string;
  renderCell: (item: T) => React.ReactNode;
  cellProps?: (item: T) => any;
}

interface TableProps<T extends TableNode> {
  columnas: TableColumn<T>[];
  datosParaTabla: TableNode[];
  estilos: object;
  getCellProps?: (
    item: T,
    column: keyof T | string
  ) => { style: CSSProperties }; // Estilos específicos para cada celda
  footer?: boolean;
  datosFooter?: {};
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
        {Object.entries(datos).map(([key, value], index) => (
          <FooterCell key={index}>
            {typeof value === "number" ? value.toLocaleString("es-AR") : value}
          </FooterCell>
        ))}
      </FooterRow>
    </Footer>
  );
};

function TablaInforme<T extends TableNode>({
  columnas,
  datosParaTabla,
  estilos,
  footer,
  datosFooter,
}: TableProps<T>) {
  const [currentHorario, setCurrentHorario] = useState<TableNode | null>(null);
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme([materialTheme, estilos]);
  const data: Data<TableNode> = {
    nodes: datosParaTabla, // Asegura que esté dentro de un objeto con `nodes`
  };

  // FUNCION PARA SELECCIONAR Y NAVEGAR CON TECLADO EN LA TABLA.
  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const rowHeight = 30;
  const headerHeight = 5;

  const tableRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false); // Indica si esta tabla es la activa

  useEffect(() => {
    const tableElement = tableRef.current;
    if (!tableElement) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isActive || !currentHorario) return; // Solo afecta la tabla activa

      const currentIndex = data.nodes.findIndex(
        (node) => node.id === currentHorario.id
      );
      let newIndex = currentIndex;

      if (event.key === "ArrowDown" && currentIndex < data.nodes.length - 1) {
        event.preventDefault();
        newIndex = currentIndex + 1;
      } else if (event.key === "ArrowUp" && currentIndex > 0) {
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

      if (event.key === "Enter" && currentHorario) {
        console.log("Submitting form for:", currentHorario);
      }
    };

    // Agregar eventos de teclado SOLO cuando la tabla está activa
    tableElement.addEventListener("keydown", handleKeyDown);

    return () => {
      tableElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, currentHorario, data]);

  const handleTableClick = () => {
    setIsActive(true);
  };

  // Manejar pérdida de foco para desactivar eventos
  const handleBlur = () => {
    setIsActive(false);
  };

  // MANTENER EL FOCO AL NAVEGAR EN LA TABLA.
  useEffect(() => {
    const tableContainer = document.querySelector(".table");
    if (tableContainer) {
      const maxScroll =
        tableContainer.scrollHeight - tableContainer.clientHeight;
      const adjustedScrollPosition = Math.min(scrollPosition, maxScroll);

      tableContainer.scrollTo({
        top: adjustedScrollPosition,
        behavior: "smooth",
      });
    }
  }, [scrollPosition]);

  // FUNCION PARA SELECCIONAR
  function onSelectChange(action: any, state: any) {
    console.log(action);
    console.log(state);

    const selectedItem = data.nodes.find((node) => node.id === state.id);

    if (!selectedItem) {
      console.log("Cliente Deseleccionado.");
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
              {/* {...select} */}
              {tableList.map((item, rowIndex) => (
                <Row key={rowIndex} item={item}>
                  {columnas.map((column, columnIndex) => {
                    return (
                      <Cell key={columnIndex} {...column.cellProps?.(item)}>
                        {column.renderCell(item)}{" "}
                        {/* Aquí pasamos `item` a `renderCell` correctamente */}
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
