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
  Data,
  TableNode,
} from "@table-library/react-table-library/table";
import { getTheme, DEFAULT_OPTIONS } from "@table-library/react-table-library/material-ui";
import { useTheme } from "@table-library/react-table-library/theme";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importar íconos de flecha
import { TableColumn } from "@/types";
import CheckboxInput from "@/Components/ui/Inputs/Checkbox";

interface TableProps<T extends TableNode> {
  columnas: TableColumn<T>[];
  datosParaTabla: T[];
  estilos: object;
  getCellProps?: (item: T, column: keyof T | string) => { style: CSSProperties };
  procesado: boolean;
  subItemsProperty: string;
  subItemKeyProperty: string;
  subItemLabelProperty: string;
  itemToFetch: { [key: string]: boolean } | null;

  setItemsStore: (data: { [key: string]: boolean }) => void;
  setSubItemsStore: (data: string[]) => void;

  subItemToFetch: string[];
  onSubmit: (selectedItems: { [key: string]: boolean }, selectedSubItems: string[]) => void;
  buscado: boolean;
  modoNavegacion: string;
  indiceSeleccionado: number;
  idsCoincidentes: (string | number)[];
}

export default function TablaExpandible<T extends TableNode>({
  columnas,
  datosParaTabla,
  estilos,
  procesado,
  subItemsProperty,
  subItemKeyProperty,
  subItemLabelProperty,
  subItemToFetch,
  itemToFetch,
  setItemsStore,
  setSubItemsStore,
  buscado,
  modoNavegacion,
  idsCoincidentes,
  indiceSeleccionado,
}: TableProps<T>) {
  const [isActive, setIsActive] = useState(false);
  const [currentHorario, setCurrentHorario] = useState<TableNode | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme([materialTheme, estilos]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [localSelectedItems, setLocalSelectedItems] = useState<{[key: string]: boolean;}>({});
  const [localSelectedSubItems, setLocalSelectedSubItems] = useState<string[]>([]);

  const lastNavigatedId = useRef<string | number | null>(null);
  const data: Data<TableNode> = { nodes: datosParaTabla };
  const select = useRowSelect(data, { onChange: onSelectChange });
  const elementosCoincidentes = localSelectedSubItems.filter((item) => subItemToFetch.includes(String(item)));

  // Efecto para manejar el scroll y resaltado durante la navegación
  useEffect(() => {
    if (!buscado || modoNavegacion !== "busqueda" || !idsCoincidentes.length || indiceSeleccionado < 0) return;
    const targetRubroId = idsCoincidentes[indiceSeleccionado];
    if (lastNavigatedId.current === targetRubroId) return;
    const seccionContenedora = datosParaTabla.find((seccion) =>
      seccion[subItemsProperty]?.some((rubro: any) => rubro[subItemKeyProperty] === targetRubroId)
    );

    if (seccionContenedora) {
      setExpandedIds([seccionContenedora.seccion]);

      // Intentar el scroll hasta 3 veces con retry
      let intentos = 0;
      const maxIntentos = 3;
      const intervalId = setInterval(() => {
        const element = document.querySelector(`[data-rubro-id="${targetRubroId}"]`);
        intentos++;

        // Dentro del efecto de navegación:
        if (element) {
          clearInterval(intervalId);

          // Scroll al elemento
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          // Resaltado temporal
          element.classList.add("bg-green-500");
          setTimeout(() => {
            element.classList.remove("bg-green-500");
          }, 1000);

          lastNavigatedId.current = targetRubroId;
        }
      else if (intentos >= maxIntentos) {
          clearInterval(intervalId);
        }
      }, 350); // Chequea cada 350ms (ajustable)
    }
  }, [indiceSeleccionado, buscado, modoNavegacion, idsCoincidentes, datosParaTabla]);
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

  useEffect(() => {
    if (subItemToFetch.length > 0) {
      setLocalSelectedSubItems(subItemToFetch);
    }
    if (itemToFetch && Object.keys(itemToFetch).length > 0) {
      setLocalSelectedItems(itemToFetch);
    }
  }, [subItemToFetch, itemToFetch]);

  useEffect(() => {
    setItemsStore(localSelectedItems);
  }, [localSelectedItems]);

  useEffect(() => {
    setSubItemsStore(localSelectedSubItems);
  }, [localSelectedSubItems]);

  function onSelectChange(action: any, state: any) {
    console.log("action", action);
    const selectedItem = datosParaTabla.find((node) => node.seccion === state.id);
    if (!selectedItem) {
      setCurrentHorario(null);
    } else {
      setCurrentHorario(selectedItem);
    }
  }

  const handleExpand = (item: T) => {
    if (expandedIds.includes(item.seccion)) {
      setExpandedIds(expandedIds.filter((id) => id !== item.seccion));
    } else {
      setExpandedIds([...expandedIds, item.seccion]);
    }
  };

  const handleTableClick = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleCheckboxItems = (item: T) => {
    const isSelected = !localSelectedItems[item.seccion];
    setLocalSelectedItems((prev) => {
      const updatedItems = {
        ...prev,
        [item.seccion]: isSelected,
      };
      setItemsStore(updatedItems);
      return updatedItems;
    });
  };

  const handleCheckboxSubItems = (subItemKey: string, item: T) => {
    setLocalSelectedSubItems((prev) => {
      const newSelectedSubItems = prev.includes(subItemKey)
        ? prev.filter((item) => item !== subItemKey)
        : [...prev, subItemKey];

      setLocalSelectedItems((prevItems) => ({
        ...prevItems,
        [item.seccion]: newSelectedSubItems.some((id) =>
          item[subItemsProperty]?.some((subItem: any) => subItem[subItemKeyProperty] === id)
        ),
      }));
      return newSelectedSubItems;
    });
  };

  return (
    <div
      className="p-2 w-fit rounded-xl bg-white overflow-auto border border-black mr-4"
      id="table-to-print"
      ref={tableRef}
      tabIndex={0}
      onClick={handleTableClick}
      onBlur={handleBlur}
    >
      <Table data={{ nodes: datosParaTabla }} theme={theme} layout={{ fixedHeader: true }} select={select}>
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
                          <div className="flex items-center">
                            <CheckboxInput
                              onChange={() => handleCheckboxItems(item)}
                              checked={!!localSelectedItems[item.seccion]}
                              disabled={!!itemToFetch?.[item.seccion]}
                            />
                            {column.renderCell(item)}
                          </div>
                        ) : (
                          <div className="flex items-center justify-between" onClick={() => handleExpand(item)}>
                            {column.renderCell(item)}
                            <span onClick={() => handleExpand(item)} className="cursor-pointer right-4 relative">
                              {expandedIds.includes(item.seccion) ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                          </div>
                        )}
                      </Cell>
                    ))}
                  </Row>

                  <tr className="grid col-span-full w-full">
                    <td colSpan={columnas.length} className="">
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedIds.includes(item.seccion) ? "max-h-full" : "max-h-0"
                        }`}
                      >
                        <ul>
                          {item[subItemsProperty]?.map((subItem: any) => {
                            const isCoincidente = buscado && idsCoincidentes.includes(subItem[subItemKeyProperty]);
                            const isMatch = buscado && idsCoincidentes.includes(subItem[subItemKeyProperty]);
                            const matchIndex = isMatch
                              ? idsCoincidentes.indexOf(subItem[subItemKeyProperty]) + 1
                              : null;
                            return (
                              <li
                                data-rubro-id={subItem[subItemKeyProperty]}
                                className={`
                                  ${isCoincidente ? "bg-green-400 hover:bg-green-500" : "bg-blue-200 hover:bg-blue-300"}
                                  flex gap-2 py-1 items-center justify-start text-sm border-t-2 pl-8
                                   cursor-pointer relative
                                  ${
                                    elementosCoincidentes.includes(subItem[subItemKeyProperty])
                                      ? "line-through text-gray-500"
                                      : ""
                                  }

                               
                                `}
                                key={subItem[subItemKeyProperty]}
                                onClick={() => handleCheckboxSubItems(subItem[subItemKeyProperty], item)}
                              >
                                <div className="ml-2">
                                  <CheckboxInput
                                    onChange={() => {}}
                                    checked={localSelectedSubItems.includes(subItem[subItemKeyProperty])}
                                    disabled={elementosCoincidentes.includes(subItem[subItemKeyProperty])}
                                  />
                                </div>
                                <strong>{subItem[subItemLabelProperty]}</strong>
                                {isMatch && (
                                  <span className="absolute left-0 w-6 text-center text-xs font-bold text-black">
                                    {matchIndex}
                                  </span>
                                )}
                                {isCoincidente && <span className="absolute right-4 text-red-500">🔍</span>}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
}
