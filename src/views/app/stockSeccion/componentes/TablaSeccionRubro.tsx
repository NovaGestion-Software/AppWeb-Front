import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { obtenerProductos } from '@/services/ApiPhpService';
import { TablaSecciones, TablaStock1, TableColumn } from '@/types';
import ModalBase from '@/frontend-resourses/components/Modales/ModalBase';
import BusquedaRubros from './BusquedaRubros';
import TablaExpandible from '@/frontend-resourses/components/Tables/TablaExpandible';
import { ExtendedColumn } from '@/frontend-resourses/components/Tables/types';
import { useObtenerProductos } from '../hooks/useObtenerProductos';
import showAlert from '@/frontend-resourses/utils/showAlert';
import { ActionButton } from '@/frontend-resourses/components';
import CheckboxInput from '@/frontend-resourses/components/Inputs/Checkbox';

interface TablaSeccionRubroProps {
  data: TablaSecciones[];
  showRubrosModal: boolean;
  setShowRubrosModal: Dispatch<SetStateAction<boolean>>;
}
export type Data = {
  rubro: string;
  [key: string]: any;
};
type seccionRubros = {
  seccion: string;
  nseccion: string;
};

export default function TablaSeccionRubro({ data, showRubrosModal, setShowRubrosModal }: TablaSeccionRubroProps) {
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false); // habilitar botón confirmar
  const [isCancelEnabled, setIsCancelEnabled] = useState(false); // habilitar botón cancelar
  const subItemsProperty = 'rubros'; // Nombre que contiene los subítems
  const subItemKeyProperty = 'rubro'; // Nombre que identifica la clave única de los subítems
  const subItemLabelProperty = 'nrubro'; // Nombre que identifica la etiqueta de los subítems
  const itemKey = 'seccion';

  const {
    datosRubros,
    setStatus,
    setFooter,
    seccionesSeleccionadas,
    rubrosSeleccionados,
    rubrosTraidos,
    seccionesTraidas,
    rubrosPendientes,
    rubrosPendientesData,

    setRubrosPendientesData,
    setRubrosTraidosData,

    setSeccionesTraidas,
    setTablaStock,
    setRubrosTraidos,
    setRubrosPendientes,
    setRubrosSeleccionados,
    setSeccionesSeleccionadas,
    clearRubrosSeleccionados,
    clearSeccionesSeleccionadas,
    buscado,
    modoNavegacion,
    idsCoincidentes,
    indiceSeleccionado,
  } = useStockPorSeccion();

  // hace falta un cartel que avise que hay rubros que no se trajeron
  // por ahora tiene que ser de no hay informacion sobre el rubro
  // despues con las respuestas diferentes del backend se puede ampliar el mensaje a si no hay info o fue un problema de conexion.

  // tiene que haber un estado previo, peticionado = itemPeticionado, peticionado pero no traido: itemPendiente, traido y mostrado en tabla: itemTraido.

  // columnas
  const SeccionRubrosColumns: Array<ExtendedColumn<seccionRubros>> = [
    { key: 'seccion', label: 'Codigo', minWidth: '80', maxWidth: '110' },
    { key: 'nseccion', label: 'Seccion', minWidth: '80', maxWidth: '400' },
  ];
  const seccionesKeys = Object.keys(seccionesSeleccionadas ?? {}).filter((key) => seccionesSeleccionadas?.[key] === true);
  const seccionesTraidasKeys = Object.keys(seccionesSeleccionadas ?? {}).filter((key) => seccionesSeleccionadas?.[key] === true);

  // Filtrar Elementos Traidos de los seleccionados para pedir.
  const rubrosParaTraer = FiltrarItemsTraidos(rubrosSeleccionados, rubrosTraidos);
  const seccionesParaTraer = FiltrarItemsTraidos(seccionesKeys, seccionesTraidasKeys);
  console.log('seccionesParaTraer - filtro', seccionesParaTraer);

  console.log('seccionesTraidasKeys', seccionesTraidasKeys);
  console.log('seccionesKeys', seccionesKeys);
  // fetch
  const { mutate } = useObtenerProductos({
    rubrosTraidos,
    setRubrosPendientes,
    setRubrosTraidos,
    setSeccionesTraidas,
    setFooter,
    setTablaStock,
    setStatus,
    seccionesParaTraer,
    rubrosParaTraer,
    handleError,
  });
  function handleError() {
    showAlert({
      title: 'Upps!',
      text: `No se encontraron datos para mostrar.`,
      icon: 'info',
      timer: 3000,
    });
  }

  // seteo de disabled para botones segun estado de rubros
  useEffect(() => {
    // Si rubrosSeleccionados tiene contenido, habilitar el botón de confirmar
    if (rubrosSeleccionados.length > 0 && !areArraysEqual(rubrosSeleccionados, rubrosTraidos)) {
      setIsConfirmEnabled(false);
    } else {
      setIsConfirmEnabled(true);
    }

    // Si rubrosTraidos no tiene contenido, deshabilitar el botón de cancelar
    if (rubrosTraidos.length <= 0) {
      setIsCancelEnabled(true);
      // console.log('Deshabilitar cancelar:', rubrosTraidos);
    } else {
      setIsCancelEnabled(false);
    }
  }, [rubrosSeleccionados, rubrosTraidos]);

  // cerrar modal y limpiar rubros y secciones
  const handleCloseModal = () => {
    clearRubrosSeleccionados();
    clearSeccionesSeleccionadas();
    setShowRubrosModal(false);
  };
  const handleModalConfirm = () => {
    mutate();
    setShowRubrosModal(false);
  };
  const [shouldUpdateSelection, setShouldUpdateSelection] = useState(false); 
  const checkAllPending = () => {
    // Verificamos si todos los rubros están seleccionados
    const isChecked = rubrosSeleccionados.length !== rubrosPendientes.length;

    if (isChecked) {
      // Si el checkbox está marcado, seleccionamos todos los rubros
      setShouldUpdateSelection(true);  // Activa la actualización en el hijo
    } else {
      // Si el checkbox está desmarcado, deseleccionamos todos los rubros
      setShouldUpdateSelection(true);  // Activa la actualización en el hijo
    }
  };

  const propsTablaRubros = {
    datosParaTabla: data,
    objectColumns: SeccionRubrosColumns,
    objectStyles: {
      heightContainer: 'h-[30rem] xl:h-[18rem]',
      height: 'auto',
      addTableClass: 'scrollbar-width: none;',
    },
    expandableTable: {
      subItemsProperty: subItemsProperty,
      subItemKeyProperty: subItemKeyProperty,
      subItemLabelProperty: subItemLabelProperty,
      subItemToFetch: rubrosTraidos,
      itemToFetch: seccionesTraidas,
      setItemsSeleccionados: setSeccionesSeleccionadas,
      setSubItemsSeleccionados: setRubrosSeleccionados,
      subItemsSeleccionados: rubrosSeleccionados,
      itemKey: itemKey,
      subItemPending: rubrosPendientes,
      extraCheck: rubrosPendientes,
      shouldUpdateSelection: shouldUpdateSelection,
      setShouldUpdateSelection: setShouldUpdateSelection,
      
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
    },
  };
  // Función que busca los elementos en la estructura de datos dinámica.
  useEffect(() => {
    const nuevosPendientes = buscarEnArray(rubrosPendientes, datosRubros, 'rubros', 'rubro', 'nrubro');
    const traidos = buscarEnArray(rubrosTraidos, datosRubros, 'rubros', 'rubro', 'nrubro');

    const traidosIDs = new Set(traidos.map((item) => item.id));

    setRubrosPendientesData((prevPendientes) => {
      // Combinar los anteriores con los nuevos, evitando duplicados
      const combinados = [...prevPendientes];

      nuevosPendientes.forEach((nuevo) => {
        const yaExiste = combinados.some((p) => p.id === nuevo.id);
        const fueTraido = traidosIDs.has(nuevo.id);
        if (!yaExiste && !fueTraido) {
          combinados.push(nuevo);
        }
      });

      // Remover los que ya fueron traídos
      return combinados.filter((item) => !traidosIDs.has(item.id));
    });

    setRubrosTraidosData(traidos);
  }, [rubrosPendientes, rubrosTraidos, datosRubros]);

  //console.log
  // useEffect(() => {
  //   console.log('rubrosTraidos', rubrosTraidos);
  //   console.log('pendientes', rubrosPendientes);
  //   console.log('tablastokc', tablaStock);
  //   console.log('resultadoPendientes', rubrosPendientesData);
  //   console.log('resultadoTraidos', rubrosTraidosData);
  // }, [rubrosTraidos, rubrosPendientes]);

  // notas estilo: texto pasarlo a primera letra mayuscula de cada palabra.
  // agrandar para acomodar el boton
  // mas espacio a la tabla y al header.


  return (
    <ModalBase
      show={showRubrosModal}
      title="Secciones y Rubros"
      onClose={handleCloseModal}
      onConfirm={handleModalConfirm}
      buttons={true}
      disabled={isConfirmEnabled}
      disabled2={isCancelEnabled}
      classModal="bottom-56 w-3/5 h-1/4 2xl:bottom-0 2xl:w-fit 2xl:h-fit"
    >
      <div className="bg-black p-1">
        <CheckboxInput
          onChange={checkAllPending} // Llamamos a la función sin pasar argumentos
          checked={rubrosSeleccionados.length === rubrosPendientesData.length} // Si todos los rubros están seleccionados, el checkbox será marcado
          disabled={rubrosPendientesData.length === 0} // Deshabilitamos si no hay datos disponibles
        />
      </div>
      <div className="flex flex-col gap-8  2xl:w-fit  p-2  overflow-hidden  h-auto  mx-auto">
        <BusquedaRubros />

        <div>
          <div></div>
        </div>
        <TablaExpandible props={propsTablaRubros} />
      </div>
    </ModalBase>
  );
}

// fn obtener faltantes y presentes en data.
export function idItemsEnData<T extends Record<string, any>>(rubrosSeleccionados: string[], data: T[], key: keyof T): { faltantes: string[]; presentes: string[] } {
  const valoresEnData = new Set(data.map((item) => String(item[key])));

  const faltantes = new Set<string>();
  const presentes = new Set<string>();

  for (const valor of rubrosSeleccionados) {
    if (valoresEnData.has(valor)) {
      presentes.add(valor);
    } else {
      faltantes.add(valor);
    }
  }

  return {
    faltantes: Array.from(faltantes),
    presentes: Array.from(presentes),
  };
}

// fn para no pedir items ya traidos
export function FiltrarItemsTraidos(itemsSeleccionados: string[], itemsTraidos: string[]): string[] {
  // Si no hay rubros traídos, devolvemos todos los seleccionados como pendientes
  if (!itemsTraidos || itemsTraidos.length === 0) {
    return itemsSeleccionados;
  }

  // Filtramos los items seleccionados que NO están en los items traídos
  const resultado = itemsSeleccionados.filter((item) => !itemsTraidos.includes(item));

  return resultado;
}

// fn para buscar y extraer nombre e id de los rubros en base a un array de ids.
interface Item {
  [key: string]: string; // Esto permitirá tener cualquier clave con un valor de tipo string
}
export function buscarEnArray(
  ItemsParaBuscar: string[], // Array con los rubros a buscar
  data: any[], // Datos a buscar dentro
  contenedorKey: string, // Clave para acceder a la lista de rubros dentro de cada sección
  itemProp1Key: string, // Clave que indica el ID (ej. rubro, pelota)
  itemProp2Key: string // Clave que indica el nombre (ej. nrubro, npelota)
) {
  return data.flatMap((contenedor) =>
    contenedor[contenedorKey] // Accede a la lista dinámica de rubros usando la clave rubrosKey
      .filter((item: Item) => ItemsParaBuscar.includes(item[itemProp1Key])) // Filtra los rubros que coinciden con el array rubrosParaBuscar
      .map((item: Item) => ({
        id: item[itemProp1Key], // Obtiene el ID usando rubroKey
        nombre: item[itemProp2Key], // Obtiene el nombre usando nombreKey
      }))
  );
}

// Función para comparar si dos arrays son iguales (independientemente del orden)
export function areArraysEqual(array1: any[], array2: any[]) {
  if (array1.length !== array2.length) return false;
  return array1.every((item) => array2.includes(item));
}
