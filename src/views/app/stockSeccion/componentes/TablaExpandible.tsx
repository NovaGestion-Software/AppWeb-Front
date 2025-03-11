import React, { CSSProperties, useEffect, useRef, useState } from "react";
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
import { ClipLoader } from "react-spinners";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importar íconos de flecha

// Definir la interfaz TableNode basada en la estructura de la respuesta
interface TableNode {
  seccion: string;
  nseccion: string;
  rubros: { rubro: string; nrubro: string }[];
}

interface TableColumn<T> {
  label: string;
  renderCell: (item: T) => React.ReactNode;
  cellProps?: (item: T) => any;
}

interface TablaFooterProps {
  datos?: {
    [key: string]: number | string;
  };
}

const TablaFooter: React.FC<TablaFooterProps> = ({ datos = {} }) => {
  if (!Object.keys(datos).length) return null;

  return (
    <Footer layout={{ fixedHeader: true }}>
      <FooterRow>
        {Object.entries(datos).map(([_, value], index) => (
          <FooterCell key={index}>
            {typeof value === "number" ? value.toLocaleString("es-AR") : value}
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
}

export default function TablaExpandible<T extends TableNode>({
  columnas,
  datosParaTabla,
  estilos,
  footer,
  datosFooter,
  procesado,
}: TableProps<T>) {
  const [isActive, setIsActive] = useState(false);
  const [currentHorario, setCurrentHorario] = useState<TableNode | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme([materialTheme, estilos]);
  const rowHeight = 30;
  const headerHeight = 5;
  const data: Data<TableNode> = {
    nodes: datosParaTabla,
  };
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedRubros, setSelectedRubros] = useState<{ [key: string]: boolean }>({});
  console.log('items', selectedItems)
  console.log('rubros', selectedRubros)

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  const handleExpand = (item: TableNode) => {
    if (expandedIds.includes(item.seccion)) {
      setExpandedIds(expandedIds.filter((id) => id !== item.seccion));
    } else {
      setExpandedIds([...expandedIds, item.seccion]);
    }
  };

  const handleCheckboxChange = (item: TableNode) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item.seccion]: !prev[item.seccion],
    }));
  };

  const handleRubroCheckboxChange = (rubroKey: string) => {
    setSelectedRubros((prev) => ({
      ...prev,
      [rubroKey]: !prev[rubroKey],
    }));
  };

  useEffect(() => {
    if (procesado && datosParaTabla.length > 0 && !currentHorario) {
      const firstItem = datosParaTabla[0];
      setCurrentHorario(firstItem);
      select.fns.onToggleByIdExclusively(firstItem.seccion);
      setIsActive(true);
    }
  }, [procesado, datosParaTabla, select, currentHorario]);

  useEffect(() => {
    if (isActive && tableRef.current) {
      tableRef.current.focus();
    }
  }, [isActive]);

  function onSelectChange(action: any, state: any) {
    const selectedItem = datosParaTabla.find((node) => node.seccion === state.id);
    if (!selectedItem) {
      setCurrentHorario(null);
    } else {
      setCurrentHorario(selectedItem);
    }
  }

  const handleTableClick = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };
  return (
    <div
      className="p-2 w-fit rounded-xl bg-white overflow-auto"
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
                <React.Fragment key={rowIndex}>
                  <Row item={item}>
                    {columnas.map((column, columnIndex) => (
                      <Cell key={columnIndex} {...column.cellProps?.(item)}>
                        {columnIndex === 0 ? (
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span
                              onClick={() => handleExpand(item)}
                              style={{ cursor: "pointer", marginRight: "8px" }}
                            >
                              {expandedIds.includes(item.seccion) ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </span>
                            <input
                              type="checkbox"
                              checked={!!selectedItems[item.seccion]}
                              onChange={() => handleCheckboxChange(item)}
                            />
                            {column.renderCell(item)}
                          </div>
                        ) : (
                          column.renderCell(item)
                        )}
                      </Cell>
                    ))}
                  </Row>

                  {expandedIds.includes(item.seccion) && (
                    <tr
                      style={{
                        display: "grid",
                        gridColumn: "1 / -1",
                        width: "100%",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      <td
                        style={{
                          padding: "8px",
                        }}
                      >
                        <ul style={{ margin: "0", padding: "0" }}>
                          {item.rubros?.map((rubro) => (
                            <li key={rubro.rubro}>
                              <input
                                type="checkbox"
                                checked={!!selectedRubros[rubro.rubro]}
                                onChange={() => handleRubroCheckboxChange(rubro.rubro)}
                              />
                              <strong>{rubro.nrubro}:</strong> {rubro.rubro}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </Body>

            {footer && datosParaTabla && <TablaFooter datos={datosFooter} />}
          </>
        )}
      </Table>
    </div>
  );
}