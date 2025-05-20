import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import { TablaSecciones } from "@/types";
import ModalBase from "@/frontend-resourses/components/Modales/ModalBase";
import TablaExpandible from "@/frontend-resourses/components/Tables/TablaExpansible/TablaExpandible";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { useObtenerProductos } from "../hooks/useObtenerProductos";
import showAlert from "@/frontend-resourses/utils/showAlert";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";
import { areArraysEqual, buscarEnArray, FiltrarItemsTraidos } from "@/frontend-resourses/utils/dataManipulation";
import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";

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
  const subItemsProperty = "rubros"; // Nombre que contiene los subítems
  const subItemKeyProperty = "rubro"; // Nombre que identifica la clave única de los subítems
  const subItemLabelProperty = "nrubro"; // Nombre que identifica la etiqueta de los subítems
  const itemKey = "seccion";
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

    //
    setBuscado,
    indiceGlobal,
    setIndiceGlobal,
    setIdsCoincidentes,
    setIndiceSeleccionado,
    ultimoIndiceBusqueda,
    setUltimoIndiceBusqueda,
    setNavegandoCoincidentes,
    setModoNavegacion,

    setRubrosPendientesData,
    setRubrosTraidosData,

    setSeccionesTraidas,
    tablaStock,
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
  const propsBusqueda = {
    data: datosRubros,
    // busqueda
    buscado,
    setBuscado,
    idsCoincidentes,
    indiceSeleccionado,
    setIndiceGlobal,
    setIdsCoincidentes,
    setIndiceSeleccionado,
    ultimoIndiceBusqueda,
    setUltimoIndiceBusqueda,
    setNavegandoCoincidentes,
    setModoNavegacion,
    indiceGlobal,
    modoBusqueda: "anidadas" as "anidadas",
    inputsLength: 1,
    mostrarResultados: true,
    keysBusqueda: {
      subItemsProperty: subItemsProperty,
      subItemKeyProperty: subItemKeyProperty,
      subItemLabelProperty: subItemLabelProperty,
      itemKey: itemKey,
      busquedaKeyText: ["nrubro"],
      textLabelProperty: "Rubro",
    },
  };

  // setear funciones extras de check
  const [updateInstruction, setUpdateInstruction] = useState<null | {
    type: "selectAll" | "selectAllPending" | "clearAll" | "custom";
    payload: string[];
  }>(null);

  // todos los rubros
  const allRubros = datosRubros.flatMap((item) => item.rubros.map((rubroItem) => rubroItem.rubro));

  // hace falta un cartel que avise que hay rubros que no se trajeron
  // por ahora tiene que ser de no hay informacion sobre el rubro
  // despues con las respuestas diferentes del backend se puede ampliar el mensaje a si no hay info o fue un problema de conexion.

  // tiene que haber un estado previo, peticionado = itemPeticionado, peticionado pero no traido: itemPendiente, traido y mostrado en tabla: itemTraido.

  // columnas
  const SeccionRubrosColumns: Array<ExtendedColumn<seccionRubros>> = [
    { key: "seccion", label: "Codigo", minWidth: "90", maxWidth: "160" },
    { key: "nseccion", label: "Seccion", minWidth: "80", maxWidth: "520" },
  ];
  const seccionesKeys = Object.keys(seccionesSeleccionadas ?? {}).filter((key) => seccionesSeleccionadas?.[key] === true);
  const seccionesTraidasKeys = Object.keys(seccionesSeleccionadas ?? {}).filter((key) => seccionesSeleccionadas?.[key] === true);

  // Filtrar Elementos Traidos de los seleccionados para pedir.
  const rubrosParaTraer = FiltrarItemsTraidos(rubrosSeleccionados, rubrosTraidos);

  const seccionesParaTraer = FiltrarItemsTraidos(seccionesKeys, seccionesTraidasKeys);
  // fetch tabla stock
  const { mutate } = useObtenerProductos({
    rubrosTraidos,
    setRubrosPendientes,
    setRubrosTraidos,
    setSeccionesTraidas,
    setFooter,
    tablaStock,
    setTablaStock,
    setStatus,
    seccionesParaTraer,
    rubrosParaTraer,
    handleError,
  });
  function handleError() {
    showAlert({
      title: "Upps!",
      text: `No se encontraron datos para mostrar.`,
      icon: "info",
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
  function handleCloseModal() {
    if (!isCancelEnabled) {
      clearRubrosSeleccionados();
      clearSeccionesSeleccionadas();
      setShowRubrosModal(false);
    }
  }
  function handleModalConfirm() {
    mutate();
    setShowRubrosModal(false);
  }

  // funcion para checkear rubros pendientes
  function checkAllPending() {
    const isChecked = rubrosSeleccionados.length === rubrosPendientesData.length;
    console.log("pendientes", rubrosPendientes);
    setUpdateInstruction({
      type: isChecked ? "clearAll" : "selectAllPending",
      payload: isChecked ? [] : rubrosPendientes,
    });
  }
  // funcion para checkear todos
  function checkAll() {
    const isChecked = rubrosSeleccionados.length === allRubros.length;
    console.log("rubros", rubrosSeleccionados);

    setUpdateInstruction({
      type: isChecked ? "clearAll" : "selectAll",
      payload: isChecked ? [] : allRubros,
    });
  }

  const propsTablaRubros = {
    datosParaTabla: data,
    objectColumns: SeccionRubrosColumns,
    objectStyles: {
      cursorPointer: true,
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px;",
      width: "42rem",
      heightContainer: "h-[28rem] 2xl:h-[30rem] rounded-md",
      height: "auto",
      viewport1536: {
        width: "60rem",
        addCellClass1536px: "max-height: 80px;",
      },
    },
    expandableTable: {
      checkboxItem: true,
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
      updateInstruction: updateInstruction,
      setUpdateInstruction: setUpdateInstruction,
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
    const nuevosPendientes = buscarEnArray(rubrosPendientes, datosRubros, "rubros", "rubro", "nrubro");
    const traidos = buscarEnArray(rubrosTraidos, datosRubros, "rubros", "rubro", "nrubro");

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
      disableAutoClose={true}
      classModal=" w-[50rem] h-[35rem] 2xl:bottom-0 2xl:w-fit 2xl:h-fit"
    >
      <div
        className="flex flex-col gap-4  w-[45rem] px-4
       p-2  overflow-hidden  h-[29rem] 2xl:h-[38rem] mx-auto"
      >
        <BusquedaInputs props={propsBusqueda} className="py-1  w-fit" />

        <div className="flex gap-2 items-center ">
          <CheckboxInput
            label="Seleccionar Todos los Pendientes"
            onChange={checkAllPending} // Llamamos a la función sin pasar argumentos
            checked={rubrosSeleccionados.length === rubrosPendientesData.length} // Si todos los rubros están seleccionados, el checkbox será marcado
            disabled={rubrosPendientesData.length === 0} // Deshabilitamos si no hay datos disponibles
          />
          <CheckboxInput
            label="Seleccionar Todos"
            onChange={checkAll} // Llamamos a la función sin pasar argumentos
            checked={rubrosSeleccionados.length === allRubros.length} // Si todos los rubros están seleccionados, el checkbox será marcado
            disabled={false} // Deshabilitamos si no hay datos disponibles
          />
        </div>
        <TablaExpandible props={propsTablaRubros} />
      </div>
    </ModalBase>
  );
}
