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
  const [textoBusqueda, setTextoBusqueda] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);
// el scroll sucede antes de que se habra el item en el la tabla por lo tanto queda fuera de lugar.
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
    // console.log(buscado);
    if (idsCoincidentes.length > 0) {
      setBuscado(true);
    } else {
      setBuscado(false);
    }
  };

  const handleButton = () => {
    if (buscado) {
      setNavegandoCoincidentes(true); // Habilitar la navegación entre idsCoincidentes
      handleSiguienteClick();
    } else {
      handleSearch();
    }
  };
  const buscadoTextoAnterior = useRef<string>("");
  // FUNCION PAR MANEJAR LA NAVEGACION DE LA TABLA POR LA BUSQUEDA, FLECHAS, ENTER Y ESCAPE.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!textoBusqueda.trim()) {
        setBuscado(false);
        setIdsCoincidentes([]);
        return;
      }
      // Activar modo búsqueda
      setModoNavegacion("busqueda");
      setNavegandoCoincidentes(true);

      if (!buscado || textoBusqueda !== buscadoTextoAnterior.current) {
        // Primera búsqueda
        setBuscado(true);
        buscadoTextoAnterior.current = textoBusqueda;
        if (idsCoincidentes.length > 0) {
          setIndiceSeleccionado(0);
          setUltimoIndiceBusqueda(0);
        }
      } else {
        // Navegación entre resultados
        if (idsCoincidentes.length > 0) {
          const nuevoIndice = ((indiceSeleccionado ?? -1) + 1) % idsCoincidentes.length;
          setIndiceSeleccionado(nuevoIndice);
          setUltimoIndiceBusqueda(nuevoIndice);
        }
      }
    } else if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;

      // Navegación global
      let newIndex = indiceGlobal + direction;
      if (newIndex < 0) newIndex = datosRubros.length - 1;
      if (newIndex >= datosRubros.length) newIndex = 0;

      setIndiceGlobal(newIndex);
      setModoNavegacion("normal");
    } else if (event.key === "Escape") {
      event.preventDefault();
      setTextoBusqueda("");
      buscadoTextoAnterior.current = "";
      setBuscado(false);
      setModoNavegacion("normal");
      setNavegandoCoincidentes(false);
    }
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

  return (
    <div className="flex gap-1 items-center border py-1.5 px-2 rounded-lg bg-slate-50  border-black">
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
        onClick={handleButton}
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
