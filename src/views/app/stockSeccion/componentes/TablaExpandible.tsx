import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { useRowSelect } from '@table-library/react-table-library/select';
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
} from '@table-library/react-table-library/table';
import { getTheme, DEFAULT_OPTIONS } from '@table-library/react-table-library/material-ui';
import { useTheme } from '@table-library/react-table-library/theme';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importar íconos de flecha
import { TableColumn } from '@/types';
import CheckboxInput from '@/Components/ui/Inputs/Checkbox';

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
}: TableProps<T>) {
  const [isActive, setIsActive] = useState(false);
  const [currentHorario, setCurrentHorario] = useState<TableNode | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme([materialTheme, estilos]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [localSelectedItems, setLocalSelectedItems] = useState<{ [key: string]: boolean }>({});
  const [localSelectedSubItems, setLocalSelectedSubItems] = useState<string[]>([]);

  // console.log(localSelectedItems, localSelectedSubItems);
  // console.log(itemsStore, localSelectedSubItems);
  // console.log(localSelectedSubItems);

  const data: Data<TableNode> = { nodes: datosParaTabla };
  // FUNC ROWSELECT
  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  const elementosCoincidentes = localSelectedSubItems.filter((item) =>
    subItemToFetch.includes(String(item))
  );

  // FUNC SELECCIONAR LA PRIMERA FILA AL RENDERIZAR DATOS.
  useEffect(() => {
    if (procesado && datosParaTabla.length > 0 && !currentHorario) {
      const firstItem = datosParaTabla[0];
      setCurrentHorario(firstItem);
      select.fns.onToggleByIdExclusively(firstItem.seccion);
      setIsActive(true);
    }
  }, [procesado, datosParaTabla, select, currentHorario]);

  // FOCUS EN TABLA
  useEffect(() => {
    if (isActive && tableRef.current) {
      tableRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    // Si hay rubros (subitems) guardados en la store, los seteamos en el estado local
    if (subItemToFetch.length > 0) {
      setLocalSelectedSubItems(subItemToFetch);
    }

    // Si hay secciones (items) guardadas en la store, los seteamos en el estado local
    if (itemToFetch && Object.keys(itemToFetch).length > 0) {
      setLocalSelectedItems(itemToFetch);
    }
  }, [subItemToFetch, itemToFetch]);

  // use efffect para actualizar la store de items seleccionados
  useEffect(() => {
    setItemsStore(localSelectedItems);
  }, [localSelectedItems]); // Sincronizar store cuando cambie el estado local

  useEffect(() => {
    setSubItemsStore(localSelectedSubItems);
  }, [localSelectedSubItems]); // Sincronizar store cuando cambie el estado local

  // FUNC SELECCIONAR
  function onSelectChange(action: any, state: any) {
    console.log(action);
    const selectedItem = datosParaTabla.find((node) => node.seccion === state.id);
    if (!selectedItem) {
      setCurrentHorario(null);
    } else {
      setCurrentHorario(selectedItem);
    }
  }

  // FUNCION PARA EXANDIR LA TABLA
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
    const isSelected = !localSelectedItems[item.seccion]; // Verificar si se está marcando o desmarcando

    // Actualizar el estado del ítem principal
    setLocalSelectedItems((prev) => {
      const updatedItems = {
        ...prev,
        [item.seccion]: isSelected,
      };

      setItemsStore(updatedItems); // Guardar en la store
      return updatedItems;
    });

    // // Seleccionar los sub items al seleccionar el ITEM
    // const subItemsDeLaSeccion =
    //   item[subItemsProperty]?.map(
    //     (subItem: any) => subItem[subItemKeyProperty]
    //   ) || [];

    // // Actualizar el estado de los subítems
    // setLocalSelectedSubItems((prev) => {
    //   let newSelectedSubItems;

    //   if (isSelected) {
    //     // Si el ítem principal está seleccionado, agregar todos los subítems
    //     newSelectedSubItems = [...prev, ...subItemsDeLaSeccion];
    //   } else {
    //     // Si el ítem principal está deseleccionado, eliminar todos los subítems
    //     newSelectedSubItems = prev.filter(
    //       (subItemKey) => !subItemsDeLaSeccion.includes(subItemKey)
    //     );
    //   }

    //   newSelectedSubItems = [...new Set(newSelectedSubItems)]; // Eliminar duplicados

    //   setSubItemsStore(newSelectedSubItems); // Guardar en la store
    //   return newSelectedSubItems; // Actualizar el estado local
    // });
  };

  const handleCheckboxSubItems = (subItemKey: string, item: T) => {
    setLocalSelectedSubItems((prev) => {
      const newSelectedSubItems = prev.includes(subItemKey)
        ? prev.filter((item) => item !== subItemKey) // Si ya está, lo quitamos
        : [...prev, subItemKey]; // Si no está, lo agregamos

      // Verificar si al menos un subítem está seleccionado
      const isAnySubItemSelected = newSelectedSubItems.length > 0;

      // Si al menos un subítem está seleccionado, seleccionamos el ítem principal
      setLocalSelectedItems((prev) => ({
        ...prev,
        [item.seccion]: isAnySubItemSelected,
      }));
      // Una buena idea es aca pasarle como prop el seteador de store generico que usemos asi al llamar la tabla vamos a tener que poner solamente el seteador correspondiente.-
      //  setSeccionesSeleccionadas(localSelectedItems);
      //setRubrosSeleccionados(localSelectedSubItems);
      // console.log("Subítem seleccionado:", subItemKey);
      // console.log("Nuevo estado de subítems:", rubrosSeleccionados);

      return newSelectedSubItems;
    });
  };

  // habilitar o deshabilitar boton de confirmacion
  // useEffect(() => {
  //   const hasSelectedItems = Object.values(localSelectedItems).some(
  //     (value) => value === true
  //   );
  //   const hasSelectedSubItems = localSelectedSubItems.length > 0;

  //   if (hasSelectedItems || hasSelectedSubItems) {
  //     //   console.log('items seleccionados', localSelectedItems, localSelectedSubItems);
  //     setConfirm(false);
  //   } else {
  //     console.log("no hay");
  //     setConfirm(true);
  //   }
  // }, [localSelectedItems, localSelectedSubItems]);

  // ${
  //   (rubrosSeleccionados ?? []).includes(
  //     String(subItem[subItemKeyProperty])
  //   )
  //     ? "called"
  //     : ""
  // }

  return (
    <div
      className="p-2 w-fit rounded-xl bg-white overflow-auto border border-black"
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
                          <div className="flex items-center">
                            <CheckboxInput
                              onChange={() => handleCheckboxItems(item)}
                              checked={!!localSelectedItems[item.seccion]}
                              disabled={!!itemToFetch?.[item.seccion]}
                            />
                            {column.renderCell(item)}
                          </div>
                        ) : (
                          <div
                            className="flex items-center justify-between"
                            onClick={() => handleExpand(item)}
                          >
                            {column.renderCell(item)}
                            <span
                              onClick={() => handleExpand(item)}
                              className="cursor-pointer right-4 relative"
                            >
                              {expandedIds.includes(item.seccion) ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </span>
                          </div>
                        )}
                      </Cell>
                    ))}
                  </Row>

                  {/* Fila expandible con transición */}
                  <tr className="grid col-span-full w-full ">
                    <td colSpan={columnas.length} className="">
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedIds.includes(item.seccion) ? 'max-h-full' : 'max-h-0'
                        }`}
                      >
                        <ul>
                          {item[subItemsProperty]?.map((subItem: any) => {
                            return (
                              <li
                                onClick={() =>
                                  handleCheckboxSubItems(subItem[subItemKeyProperty], item)
                                }
                                className={`flex gap-2 py-1 items-center justify-start text-sm  border-t-2 pl-8
                               ${
                                 elementosCoincidentes.includes(subItem[subItemKeyProperty])
                                   ? 'line-through text-gray-500 bg-indigo-50 hover:cursor-default '
                                   : ' bg-slate-200  hover:bg-blue-200   cursor-pointer'
                               }
                              border-slate-400`}
                                key={subItem[subItemKeyProperty]}
                              >
                                <div className="ml-2">
                                  <CheckboxInput
                                    onChange={() => {}}
                                    checked={localSelectedSubItems.includes(
                                      subItem[subItemKeyProperty]
                                    )}
                                    disabled={
                                      elementosCoincidentes.includes(subItem[subItemKeyProperty])
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                                <strong>{subItem[subItemLabelProperty]}</strong>
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

            {/* {footer && datosParaTabla && <TablaFooter datos={datosFooter} />} */}
          </>
        )}
      </Table>
    </div>
  );
}
