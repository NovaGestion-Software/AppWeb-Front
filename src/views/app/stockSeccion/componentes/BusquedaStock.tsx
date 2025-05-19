import { useEffect,  useState } from 'react';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
//import showAlert from '@/utils/showAlert';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import FlexibleInputField from '@/Components/ui/Inputs/FlexibleInputs';
import { TbArrowBigRightLinesFilled } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';
import { FiAlertTriangle } from 'react-icons/fi';
// import { IoTrash } from 'react-icons/io5';
import { FiltrosBusqueda, useBusqueda } from '@/frontend-resourses/components/Tables/Hooks/useBusqueda';

export default function BusquedaStock({className}: {className?: string;}) {
  
  // funciones de busqueda
  const { buscarCoincidencias, agruparPorKey, extraerIds } = useBusqueda();
    // store
    const {
      // estado
      status,
      // datos
      productos,
      // busqueda
      buscado,
      setBuscado,
      
      indiceSeleccionado,
      setIndiceSeleccionado,
      modoNavegacion,
      setModoNavegacion,
      indiceGlobal,
      setIndiceGlobal,
      idsCoincidentes,
      setIdsCoincidentes,
      //navegacion
      setNavegandoCoincidentes,
      setUltimoIndiceBusqueda,
    } = useStockPorSeccion();
  
  
  // valores de busqueda
  const [codigoBusqueda, setCodigoBusqueda] = useState<string>('');
  const [textoBusqueda, setTextoBusqueda] = useState<string>('');
  // tooltip de shortcuts
  // const [showHint, setShowHint] = useState(false);
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // estado para deshabilitar
  const [isDisabled, setIsDisabled] = useState(true);


  // puede ser  una prop?
  // objeto valores de busqueda 
  const filtros: FiltrosBusqueda = {
    codigo: {
      valor: codigoBusqueda,
      keys: ['codigo'],
    },
    texto: {
      valor: textoBusqueda,
      keys: ['descripcion', 'nmarca'],
    },
  };

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

  // busqueda .
  useEffect(() => {
    if (!productos) return;
    const productosFiltrados = buscarCoincidencias(productos, filtros);

    const resultadosAgrupados = agruparPorKey(productosFiltrados, 'codigo');
    extraerIds(resultadosAgrupados, 'codigo', setIdsCoincidentes);
  }, [codigoBusqueda, textoBusqueda, productos]);
  // input 1: key: string, label: string, value: valorBusqueda, placeholder: string,
  // input 2: value: valorBusqueda, placeholder: string.
  // onChange: compartido

  // inicia la busqueda
  const handleSearch = () => {
    if (idsCoincidentes.length > 0) {
      setBuscado(true);
    }
  };

  // navegacion en resultados con click.
  const handleNextResult = () => {
    if (idsCoincidentes.length > 0) {
      const nuevoIndice = ((indiceSeleccionado ?? 0) + 1) % idsCoincidentes.length;
      setIndiceSeleccionado(nuevoIndice);
    }
  };

  // boton de renderizado. Dispara la funcion segun el estado de buscado
  const handleActionButtonClick = () => {
    // Se utiliza handleActionButtonClick para comprobar si la busqueda ya esta iniciada, y si lo esta se avance al siguiente elemento.
    if (buscado) {
      setNavegandoCoincidentes(true);
      handleNextResult();
    } else {
      handleSearch();
    }
  };

  // FUNCION PAR MANEJAR LA NAVEGACION DE LA TABLA POR LA BUSQUEDA, FLECHAS, ENTER Y ESCAPE.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!codigoBusqueda && !textoBusqueda) return;

      console.log('indiceGlobal', indiceGlobal);
      // Siempre activar modo búsqueda al presionar Enter
      setModoNavegacion('busqueda');
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
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      // Obtener el índice actual en el array completo
      let currentIndex = 0;
      if (buscado && modoNavegacion === 'busqueda' && idsCoincidentes.length > 0) {
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
      setModoNavegacion('normal');

      // Si el nuevo elemento está en los resultados de búsqueda, actualizar último índice
      if (buscado) {
        const newId = productos[newIndex]?.codigo;
        const matchIndex = idsCoincidentes.findIndex((id) => id === newId);
        if (matchIndex >= 0) {
          setUltimoIndiceBusqueda(matchIndex);
        }
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setCodigoBusqueda('');
      setTextoBusqueda('');
      setBuscado(false);
      setModoNavegacion('normal');
      setNavegandoCoincidentes(false);
    }
  };

  // limpiar busqueda
  // const handleClean = async () => {
  //   const result = await showAlert({
  //     title: '¿Estás seguro?',
  //     text: 'Todo el progreso se perderá',
  //     icon: 'warning',
  //     showConfirmButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Sí, limpiar todo',
  //     cancelButtonText: 'Cancelar',
  //   });

  //   if (result.isConfirmed) {
  //     setBuscado(false);
  //     setIndiceSeleccionado(0);
  //     setIdsCoincidentes([]);
  //     setCodigoBusqueda('');
  //     setTextoBusqueda('');
  //   }
  // };

  return (
    <div className={`${className} flex gap-2 items-center border py-1.5 px-3 rounded-md`}>
      <FlexibleInputField
        key={'codigo'}
        label="Buscar:"
        value={codigoBusqueda || ''}
        placeholder="Código"
        labelWidth="3rem"
        labelClassName={`text-start w-12 text-sm  s ${buscado && 'text-green-500'} `}
        inputClassName="w-24 text-xs"
        containerWidth="w-[12rem]"
        disabled={status === 'idle'}
        onChange={(value) => {
          if (typeof value === 'string') {
            setCodigoBusqueda(value);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <FlexibleInputField
        value={textoBusqueda || ''}
        placeholder="Descripción o Marca"
        inputClassName="w-52 text-xs"
        disabled={status === 'idle'}
        containerWidth="w-56 "
        onChange={(value) => {
          if (typeof value === 'string') {
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
        onClick={handleActionButtonClick}
        disabled={isDisabled}
      />

      {/* <ActionButton icon={<IoTrash size={15} />} color="red" size="xs" onClick={handleClean}
       disabled={isDisabled} /> */}
    </div>
  );
}
