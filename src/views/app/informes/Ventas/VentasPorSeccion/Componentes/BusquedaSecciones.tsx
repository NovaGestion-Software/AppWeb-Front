import { useEffect, useState } from 'react';
import { TbArrowBigRightLinesFilled } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';
import { FiAlertTriangle } from 'react-icons/fi';
import { FiltrosBusqueda, useBusqueda } from '@/frontend-resourses/components/Tables/Hooks/useBusqueda';
import { useVentasPorSeccionStore } from '../useVentasPorSeccionStore';
import { ActionButton, FlexibleInputField } from '@/frontend-resourses/components';

export default function BusquedaSecciones({ className }: { className?: string }) {
  // funciones de busqueda
  const { buscarCoincidencias, extraerIds } = useBusqueda();
  // store
  const {
    // estado
    // datos
    secciones,
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
  } = useVentasPorSeccionStore();
  // valores de busqueda
  const [codigoBusqueda, setCodigoBusqueda] = useState<string>('');
  const [textoBusqueda, setTextoBusqueda] = useState<string>('');
  // tooltip de shortcuts
  //   const [showHint, setShowHint] = useState(false);
  //   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // estado para deshabilitar
  const [_isDisabled, setIsDisabled] = useState(true);
  // objeto valores de busqueda
  const filtros: FiltrosBusqueda = {
    codigo: {
      valor: codigoBusqueda,
      keys: ['seccion'],
    },
    texto: {
      valor: textoBusqueda,
      keys: ['nseccion'],
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
    if (!secciones) return;
    const productosFiltrados = buscarCoincidencias(secciones, filtros);
    extraerIds(productosFiltrados, 'seccion', setIdsCoincidentes);
  }, [codigoBusqueda, textoBusqueda, secciones]);

  const handleSearch = () => {
    // si al hacer click hay indCoincidentes, entonces se hace la busqueda.
    // si al hacer click no hay idsCoincidentes, se setea en falso:
    //    Es decir que cuando este buscando pero no haya coincidencias resetea buscado.
    // funciona para no tener que deshabilitar el boton y desactivar el click
    // el usuario entra en modo busqueda.
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

      // Siempre activar modo búsqueda al presionar Enter
      setModoNavegacion('busqueda');
      setNavegandoCoincidentes(true);

      if (!buscado) {
        // Primera búsqueda
        setBuscado(true);
        if (idsCoincidentes.length > 0) {
            console.log('frst', indiceSeleccionado)
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

    // lugar donde tenes que usar secciones por productos, se podra pasar por props?

    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      // Obtener el índice actual en el array completo
      let currentIndex = 0;
      if (buscado && modoNavegacion === 'busqueda' && idsCoincidentes.length > 0) {
        // Si estamos en modo búsqueda, usar el ID actual para encontrar la posición global
        const currentId = indiceSeleccionado !== null ? idsCoincidentes[indiceSeleccionado] : undefined;
        currentIndex = secciones.findIndex((p) => p.codigo === currentId);
      } else {
        // Si estamos en modo normal, usar el índice global directamente
        currentIndex = indiceGlobal;
      }

      // Calcular nuevo índice
      let newIndex = currentIndex + direction;
      if (newIndex < 0) newIndex = secciones.length - 1;
      if (newIndex >= secciones.length) newIndex = 0;

      setIndiceGlobal(newIndex);
      setModoNavegacion('normal');

      // Si el nuevo elemento está en los resultados de búsqueda, actualizar último índice
      if (buscado) {
        const newId = secciones[newIndex]?.codigo;
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

  // de store necesito :
  // buscado, setBuscado,
  // indiceSeleccionado,  setIndiceSeleccionado,
  // modoNavegacion, setModoNavegacion,
  //  indiceGlobal, setIndiceGloabl,
  // IdsCoincidentes, setIdsCoincidentes,
  // setNavegacionCoincidentes, setUltimoIndiceBusqueda
  return (
    <div className={`${className} flex gap-1 items-center
     border py-1.5 px-2 rounded-lg bg-slate-50 v1536:gap-8 v1920:gap-12`}>
      <FlexibleInputField
        key={'codigo'}
        label="Buscar:"
        value={codigoBusqueda || ''}
        placeholder="Código"
        labelWidth="3rem"
        labelClassName={`text-start w-12 text-sm pl-1 ${buscado && 'text-green-500'} `}
        inputClassName="w-24 text-xs v1440:h-8 v1536:h-10 v1536:w-36 v1536:text-base   v1920:w-[11rem]"
        containerWidth="w-[12rem] v1920:w-[14rem]"
        disabled={false}
        onChange={(value) => {
          if (typeof value === 'string') {
            setCodigoBusqueda(value);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <FlexibleInputField
        value={textoBusqueda || ''}
        placeholder="Sección"
        inputClassName="w-52 text-xs v1440:h-8 v1536:h-10 v1536:w-60 v1536:text-base v1920:w-[19rem]"
        disabled={false}
        containerWidth="w-56 v1920:w-[18rem] "
        onChange={(value) => {
          if (typeof value === 'string') {
            setTextoBusqueda(value);
          }
        }}
        onKeyDown={handleKeyDown}
      />

      <ActionButton
        addClassName='h-6 w-10 v1440:h-8 v1440:w-12 v1536:h-10 v1536:w-16 v1920:w-24'
        addIconClassName=''
        color="blue"
        onClick={handleActionButtonClick}
        disabled={false}
         icon={
          // Si hay texto de búsqueda (código o texto)
          codigoBusqueda.trim().length > 0 || textoBusqueda.trim().length > 0 ? (
            // Verificamos si hay coincidencias
            idsCoincidentes.length > 0 ? (
              buscado ? (
                <TbArrowBigRightLinesFilled className='h-4 w-4 v1536:h-6 v1536:w-6 '/> // Icono cuando ya se ejecutó la búsqueda con resultados
              ) : (
                <BiSearch className='h-12 w-12'/> // Icono normal mientras se escribe (pero hay coincidencias)
              )
            ) : (
              <FiAlertTriangle className='h-4 w-4 v1536:h-6 v1536:w-6 ' color="white" /> // Icono de error cuando no hay coincidencias
            )
          ) : (
            <BiSearch className='h-4 w-4 v1536:h-6 v1536:w-6 ' /> // Icono normal cuando no hay texto de búsqueda
          )
        }
      />
   
   {/* <ActionButton icon={<IoTrash size={15} />} color="red" size="xs" onClick={handleClean} disabled={isDisabled} />
     */}
    </div>
  );
}
