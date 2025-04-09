import { useEffect, useRef, useState } from "react";
import { useStockPorSeccion } from "../store/useStockPorSeccion";
import showAlert from "@/utils/showAlert";
import FlexibleInputField from "@/Components/ui/Inputs/FlexibleInputs";
import ActionButton from "@/Components/ui/Buttons/ActionButton";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { IoTrash } from "react-icons/io5";

export default function BusquedaRubros() {
  const [showHint, setShowHint] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [textoBusqueda, setTextoBusqueda] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);
// cuando borro la busqueda deja el primer item abierto y seleccionado el primer sub item.

// en los estilos de la tabla puedo hacer que eliminamos el border derecho de la tabla pero a los ultimos elementos de las row le sumamos un borde black a la derecha.
// a la tabla le falta paginacion.
  const {
    idsCoincidentes,
    setBuscado,
    setIdsCoincidentes,
    navegandoCoincidentes,
    setIndiceSeleccionado,
    setNavegandoCoincidentes,
    setModoNavegacion,
    setUltimoIndiceBusqueda,
    indiceSeleccionado,
    buscado,
    setIndiceGlobal,
    indiceGlobal,
    datosRubros,
  } = useStockPorSeccion();

  useEffect(() => {
    setIsDisabled(textoBusqueda.length === 0);
  }, [textoBusqueda]);

  useEffect(() => {
    if (textoBusqueda.length <= 0) {
      setBuscado(false);
    }
  }, [idsCoincidentes]);

  //Busqueda de coincidencias en Rubros
  useEffect(() => {
    if (!datosRubros || datosRubros.length === 0) return;
    // 1. Filtramos las secciones y rubros que coincidan con la búsqueda
    const rubrosFiltrados = datosRubros.flatMap((seccion) =>
      seccion.rubros
        .filter((rubro) => {
          const matchesTexto = rubro.nrubro
            .toLowerCase()
            .includes(textoBusqueda.toLowerCase());
          return matchesTexto;
        })
        .map((rubro) => ({
          ...rubro,
          parentId: seccion.seccion,
        }))
    );

    // 2. Extraemos los códigos de los rubros coincidentes
    const ids = rubrosFiltrados.map((rubro) => rubro.rubro);

    // 3. Actualizamos los IDs coincidentes
    setIdsCoincidentes(ids);

    // 4. Si estamos navegando entre coincidencias, seleccionamos el primer índice
    if (navegandoCoincidentes && ids.length > 0) {
      setIndiceSeleccionado(null);

      // 5. Expandir automáticamente el item principal del primer subitem coincidente
      const primerRubro = rubrosFiltrados[0];
      if (primerRubro) {
        setIndiceGlobal(
          datosRubros.findIndex(
            (seccion) => seccion.seccion === primerRubro.parentId
          )
        );
      }
    }
  }, [textoBusqueda, datosRubros, navegandoCoincidentes]);

  const handleSiguienteClick = () => {
    if (idsCoincidentes.length > 0) {
      console.log("indce seleccionado", indiceSeleccionado);
      const nuevoIndice = ((indiceSeleccionado ?? -1) + 1) % idsCoincidentes.length;
      console.log(idsCoincidentes);
      console.log(nuevoIndice);
      setIndiceSeleccionado(nuevoIndice);
    }
  };

  const handleSearch = () => {
    if (textoBusqueda.trim()) {
      setModoNavegacion("busqueda");
      setNavegandoCoincidentes(true);
      setBuscado(true);
      buscadoTextoAnterior.current = textoBusqueda;
      
      if (idsCoincidentes.length > 0) {
        setIndiceSeleccionado(0);
        setUltimoIndiceBusqueda(0);
      }
    } else {
      setBuscado(false);
      setIdsCoincidentes([]);
    }
  };

  const handleActionButtonClick = () => {
    if (!buscado || textoBusqueda !== buscadoTextoAnterior.current) {
      // Ejecutar búsqueda (como Enter)
      handleSearch();
    } else {
      // Navegar al siguiente (como F4)
      if (idsCoincidentes.length > 0) {
        const nuevoIndice = ((indiceSeleccionado ?? -1) + 1) % idsCoincidentes.length;
        setIndiceSeleccionado(nuevoIndice);
        setUltimoIndiceBusqueda(nuevoIndice);
      }
    }
  };
  const buscadoTextoAnterior = useRef<string>("");

  const handleNextResult = () => {
    if (buscado && idsCoincidentes.length > 0) {
      const nuevoIndice = ((indiceSeleccionado ?? -1) + 1) % idsCoincidentes.length;
      setIndiceSeleccionado(nuevoIndice);
      setUltimoIndiceBusqueda(nuevoIndice);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter': {
        event.preventDefault();
        
        // Caso 1: Campo vacío → Limpiar búsqueda
        if (!textoBusqueda.trim()) {
          setBuscado(false);
          setIdsCoincidentes([]);
          return;
        }
  
        // Caso 2: Nueva búsqueda o texto modificado → Ejecutar búsqueda
        if (!buscado || textoBusqueda !== buscadoTextoAnterior.current) {
          handleSearch();
        }
        break;
      }
  
      case 'F4': {
        event.preventDefault();
        
        // Solo navegar si hay una búsqueda activa con resultados
        if (buscado && idsCoincidentes.length > 0) {
          handleNextResult();
        }
        break;
      }
  
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
  
        // Navegación global en la tabla
        const newIndex = Math.max(0, Math.min(datosRubros.length - 1, indiceGlobal + direction));
        setIndiceGlobal(newIndex);
        
        setModoNavegacion('normal');
        break;
      }
  
      case 'Escape': {
        event.preventDefault();
        resetBusqueda();
        break;
      }
  
      default:
        break;
    }
  };
  
  // Función auxiliar para reset (usada en Escape)
  const resetBusqueda = () => {
    setTextoBusqueda('');
    buscadoTextoAnterior.current = '';
    setBuscado(false);
    setModoNavegacion('normal');
    setNavegandoCoincidentes(false);
  };

  const handleClean = async () => {
    const result = await showAlert({
      title: "¿Estás seguro?",
      text: "Todo el progreso se perderá",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí, limpiar todo",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setBuscado(false);
      setIndiceSeleccionado(0);
      setIdsCoincidentes([]);
      setTextoBusqueda("");
    }
  };


  const handleFocus = () => {
    setShowHint(true);
    timeoutRef.current = setTimeout(() => {
      setShowHint(false);
    }, 3000); // se oculta a los 3 segundos
  };

  const handleBlur = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowHint(false); // se oculta si pierde el foco antes
  };


  return (
    <div className="flex gap-4 items-center border py-1.5 px-2 rounded-lg bg-slate-50 border-gray-300">
      <FlexibleInputField
        value={textoBusqueda || ""}
        placeholder="Descripción o Marca"
        inputClassName="w-52 text-xs"
        disabled={false}
        containerWidth="w-56 "
        onChange={(value) => {
          if (typeof value === "string") {
            setTextoBusqueda(value);
          }
        }}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        showHint={showHint}
        mensajeTooltip="Presiona Enter para buscar y F4 para navegar entre los resultados."
      />
 
      <ActionButton
        icon={
          // Si hay texto de búsqueda (texto)
          textoBusqueda.trim().length > 0 ? (
            // Verificamos si hay coincidencias
            idsCoincidentes.length > 0 ? (
              buscado ? (
                <TbArrowBigRightLinesFilled size={15} /> // Icono cuando ya se ejecutó la búsqueda con resultados
              ) : (
                <BiSearch size={15} /> // Icono normal mientras se escribe (pero hay coincidencias)
              )
            ) : (
              <FiAlertTriangle size={15} color="white" /> // Icono de error cuando no hay coincidencias
            )
          ) : (
            <BiSearch size={15} /> // Icono normal cuando no hay texto de búsqueda
          )
        }
        color="blue"
        size="xs"
        onClick={handleActionButtonClick}
        disabled={isDisabled}
      />

      <ActionButton
        icon={<IoTrash size={15} />}
        color="red"
        size="xs"
        onClick={handleClean}
        disabled={isDisabled}
      />

      {buscado && idsCoincidentes.length > 0 && (
        <span className="text-xs text-black px-2">
          Mostrando: {(indiceSeleccionado ?? 0) + 1} de {idsCoincidentes.length}
        </span>
      )}
    </div>
  );
}
