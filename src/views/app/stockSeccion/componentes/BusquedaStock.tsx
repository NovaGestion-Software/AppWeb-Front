import { useEffect, useState } from "react";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";
import FlexibleInputField from "@/Components/ui/Inputs/FlexibleInputs";
import ActionButton from "@/Components/ui/Buttons/ActionButton";
import showAlert from "@/utils/showAlert";
import { FiAlertTriangle } from "react-icons/fi";
import { useBusqueda } from "@/frontend-resourses/components/Tables/ejemplo/TablaDefault/Hooks/useBusqueda";

export default function BusquedaStock() {
  const [codigoBusqueda, setCodigoBusqueda] = useState<string>("");
  // texto de busqueda tiene que aceptar el texto o el codigo, pensar en que sea un solo parametro a la vez
  // sino la funcion de busqueda tiene que tener en cuenta si tengo uno o varios parametros de busqueda.
  // Porque? Porque ahora espera un parametro y no puedo usarla para filtrar el valor del input del codigo y de marca o descripcion
  const [textoBusqueda, setTextoBusqueda] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    status,
    productos,
    buscado,
    setBuscado,
    navegandoCoincidentes,
    setNavegandoCoincidentes,
    setIndiceGlobal,
    modoNavegacion,
    indiceGlobal,
    setModoNavegacion,
    setUltimoIndiceBusqueda,
    indiceSeleccionado,
    setIndiceSeleccionado,
    idsCoincidentes,
    setIdsCoincidentes,
    setTablaStock,
    setStockRenderizado,
    setSeccionesSeleccionadas,
    setRubrosSeleccionados,
    setSeccionesToFetch,
    setRubrosToFetch,
    setStatus,
    setCheckboxSeleccionados,
    setMarcasDisponibles,
    setMarcasSeleccionadas,
    setTemporadasDisponibles,
    setTemporadasSeleccionadas,
    setDepositosDisponibles,
    setDepositosSeleccionados,
    setFooter,
    setProductos,
  } = useStockPorSeccion();

  // seteador del disabled
  useEffect(() => {
    setIsDisabled(codigoBusqueda.length === 0 && textoBusqueda.length === 0);
  }, [codigoBusqueda, textoBusqueda]);

  // Reseteo de buscado cuando no hay texto de búsqueda
  useEffect(() => {
    if (codigoBusqueda.length <= 0 && textoBusqueda.length <= 0) {
      setBuscado(false);
    }
  }, [idsCoincidentes]);

  const { buscarCoincidencias, agruparPorKey, extraerIds } = useBusqueda();
  useEffect(() => {
    if (!productos) return;
    // un parametro seria el array de productos
    // el segundo parametro seria las key de los items de productos que se van a usar para la busqueda
    // el otro parametro seria el codigoBusqueda y el textoBusqueda

    const productosFiltrados = buscarCoincidencias(productos, textoBusqueda, ["codigo", "descripcion", "nmarca"]);
    console.log("productosFiltrados", productosFiltrados);
    console.log("textobusqueda", textoBusqueda);
    const resultadosAgrupados = agruparPorKey(productosFiltrados, "codigo");
   // console.log("resultados agrupados", resultadosAgrupados);
    extraerIds(resultadosAgrupados, "codigo", setIdsCoincidentes);
  }, [codigoBusqueda, textoBusqueda, productos, navegandoCoincidentes]);

  const handleSiguienteClick = () => {
    if (idsCoincidentes.length > 0) {
      const nuevoIndice = ((indiceSeleccionado ?? 0) + 1) % idsCoincidentes.length;
      setIndiceSeleccionado(nuevoIndice);
    }
  };

  const handleSearch = () => {
    // si al hacer click hay indCoincidentes, entonces se hace la busqueda.
    // si al hacer click no hay idsCoincidentes, se setea en falso.
    // funciona para no tener que deshabilitar el boton y desactivar el click.
    if (idsCoincidentes.length > 0) {
      setBuscado(true);
    } else {
      setBuscado(false);
    }
  };

  // Se utiliza handleButton para que si la busqueda ya esta iniciada se avance al siguiente elemento.
  const handleButton = () => {
    if (buscado) {
      setNavegandoCoincidentes(true);
      handleSiguienteClick();
    } else {
      handleSearch();
    }
  };

  // FUNCION PAR MANEJAR LA NAVEGACION DE LA TABLA POR LA BUSQUEDA, FLECHAS, ENTER Y ESCAPE.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!codigoBusqueda && !textoBusqueda) return;

      console.log("indiceGlobal", indiceGlobal);
      // Siempre activar modo búsqueda al presionar Enter
      setModoNavegacion("busqueda");
      setNavegandoCoincidentes(true);

      if (!buscado) {
        // Primera búsqueda
        setBuscado(true);
        if (idsCoincidentes.length > 0) {
          setIndiceSeleccionado(0);
          setUltimoIndiceBusqueda(0);
        }
      } else {
        // Navegación entre resultados
        if (idsCoincidentes.length > 0) {
          const nuevoIndice = ((indiceSeleccionado ?? 0) + 1) % idsCoincidentes.length;
          setIndiceSeleccionado(nuevoIndice);
          setUltimoIndiceBusqueda(nuevoIndice);
        }
      }
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setCodigoBusqueda("");
      setTextoBusqueda("");
      setBuscado(false);
      setModoNavegacion("normal");
      setNavegandoCoincidentes(false);
    } else if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      // Obtener el índice actual en el array completo
      let currentIndex = 0;
      if (buscado && modoNavegacion === "busqueda" && idsCoincidentes.length > 0) {
        // Si estamos en modo búsqueda, usar el ID actual para encontrar la posición global
        const currentId = indiceSeleccionado !== null ? idsCoincidentes[indiceSeleccionado] : undefined;
        currentIndex = productos.findIndex((p) => p.codigo === currentId);
      } else {
        // Si estamos en modo normal, usar el índice global directamente
        currentIndex = indiceGlobal;
      }

      // Calcular nuevo índice
      let newIndex = currentIndex + direction;
      if (newIndex < 0) newIndex = productos.length - 1;
      if (newIndex >= productos.length) newIndex = 0;

      setIndiceGlobal(newIndex);
      console.log("indiceGlobal new index", newIndex);
      console.log("indiceGlobal", indiceGlobal);
      setModoNavegacion("normal");

      // Si el nuevo elemento está en los resultados de búsqueda, actualizar último índice
      if (buscado) {
        const newId = productos[newIndex]?.codigo;
        const matchIndex = idsCoincidentes.findIndex((id) => id === newId);
        if (matchIndex >= 0) {
          setUltimoIndiceBusqueda(matchIndex);
        }
      }
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
      setTablaStock([]);
      setProductos([]);
      setStockRenderizado([]);
      setSeccionesSeleccionadas({});
      setSeccionesToFetch({});
      setRubrosSeleccionados([]);
      setRubrosToFetch([]);
      setStatus("idle");
      setFooter(false);
      setCodigoBusqueda("");
      setTextoBusqueda("");

      setCheckboxSeleccionados("grupo1", null);
      setCheckboxSeleccionados("grupo2", null);
      setCheckboxSeleccionados("grupo3", null);
      setCheckboxSeleccionados("grupo4", null);
      setMarcasDisponibles([]);
      setMarcasSeleccionadas([]);
      setTemporadasDisponibles([]);
      setTemporadasSeleccionadas([]);
      setDepositosDisponibles([]);
      setDepositosSeleccionados([]);
    }
  };

  return (
    <div className="flex gap-1 items-center border py-1.5 px-2 rounded-lg bg-slate-50">
      <FlexibleInputField
        key={"codigo"}
        label="Buscar:"
        value={codigoBusqueda || ""}
        placeholder="Código"
        labelWidth="3rem"
        labelClassName="text-start w-12 text-sm "
        inputClassName="w-24 text-xs"
        containerWidth="w-[12rem]"
        disabled={status === "idle"}
        onChange={(value) => {
          if (typeof value === "string") {
            setCodigoBusqueda(value);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <FlexibleInputField
        value={textoBusqueda || ""}
        placeholder="Descripción o Marca"
        inputClassName="w-52 text-xs"
        disabled={status === "idle"}
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
          // Si hay texto de búsqueda (código o texto)
          codigoBusqueda.trim().length > 0 || textoBusqueda.trim().length > 0 ? (
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

      <ActionButton icon={<IoTrash size={15} />} color="red" size="xs" onClick={handleClean} disabled={isDisabled} />
    </div>
  );
}
