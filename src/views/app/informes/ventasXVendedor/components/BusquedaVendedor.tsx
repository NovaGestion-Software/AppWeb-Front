import { useEffect, useRef, useState } from 'react';
import showAlert from '@/utils/showAlert';
import FlexibleInputField from '@/Components/ui/Inputs/FlexibleInputs';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import { TbArrowBigRightLinesFilled } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoTrash } from 'react-icons/io5';
import { FiltrosBusqueda, useBusqueda } from '@/frontend-resourses/components/Tables/TablaDefault/Hooks/useBusqueda';
import { useVentasPorVendedorStore } from '../store/useVentasPorVendedorStore';

export default function BusquedaVendedor({ className }: { className?: string }) {
  // tooltip de shortcuts
  const [showHint, setShowHint] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // texto del input de busqueda
  const [textoBusqueda, setTextoBusqueda] = useState<string>('');
  const [codigoBusqueda, setCodigoBusqueda] = useState<string>('');

  // useRef el texto buscado
  const buscadoTextoAnterior = useRef<string>('');
  // estado para deshabilitar
  const [isDisabled, setIsDisabled] = useState(true);

  // store
  const {
    // datos
    ventasPorVendedor,
    // busqueda
    buscado,
    idsCoincidentes,
    indiceSeleccionado,
    setBuscado,
    setIndiceGlobal,
    setIdsCoincidentes,
    setIndiceSeleccionado,
    setUltimoIndiceBusqueda,
    setNavegandoCoincidentes,
    setModoNavegacion,
  } = useVentasPorVendedorStore();
  // La busqueda se realiza en el useEffect con el texto a medida que va escribiendo.
  // Cuando el usuario escribe en el input una busqueda que no va a tener coincidencia ya se le avisa con el boton
  // Al realizar la busqueda con el enter o el click lo que se activa es la navegacion
  const { buscarCoincidenciasAnidadas, extraerIds } = useBusqueda();

  // objeto valores de busqueda
  const filtros: FiltrosBusqueda = {
    codigo: {
      valor: codigoBusqueda,
      keys: ['vendedorCodigo'],
    },
    texto: {
      valor: textoBusqueda,
      keys: ['vendedorNombre'],
    },
  };

  // rubros no activa el expandItem cuando se realiza la primera busqueda
  // despues de haber buscado y borrado.
  // deshabilitar el boton de busqueda si no hay texto.
  useEffect(() => {
    setIsDisabled(textoBusqueda.length === 0);
  }, [textoBusqueda]);

  //Busqueda de coincidencias en Rubros.
  useEffect(() => {
    if (!ventasPorVendedor || ventasPorVendedor.length === 0 || !textoBusqueda.trim()) {
      setIdsCoincidentes([]);
      return;
    }
    const rubrosFiltrados = buscarCoincidenciasAnidadas(ventasPorVendedor, filtros, {
      keySubItems: 'unidades',
      keyIdentificador: 'vendedorCodigo',
    });
    const nuevosIds = extraerIds(rubrosFiltrados, 'vendedorNombre', setIdsCoincidentes);

    // Solo si es una nueva búsqueda (no navegación)
    if (textoBusqueda !== buscadoTextoAnterior.current && nuevosIds.length > 0) {
      setIndiceSeleccionado(0);
      const primerRubro = rubrosFiltrados[0];
      if (primerRubro) {
        setIndiceGlobal(ventasPorVendedor.findIndex((s) => s.vendedorCodigo === primerRubro.parentId));
      }
    }
  }, [textoBusqueda, ventasPorVendedor]);

  const handleSearch = () => {
    const textoLimpio = textoBusqueda.trim();
    buscadoTextoAnterior.current = textoLimpio;
    if (!buscado) {
      setBuscado(true);
      setModoNavegacion('busqueda');
      setNavegandoCoincidentes(true);

      setShowHint(true);
      // Ocultar hint después de 3 segundos
      setTimeout(() => setShowHint(false), 2000);

      // Si hay coincidencias, navegar al primer resultado
      if (idsCoincidentes.length > 0) {
        setIndiceSeleccionado(0);
        setUltimoIndiceBusqueda(0);
      }
    } else {
      setShowHint(true);
      // Ocultar hint después de 3 segundos
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  const handleActionButtonClick = () => {
    // Si no hay búsqueda activa o el texto cambió => nueva búsqueda
    if (!buscado || textoBusqueda.trim() !== buscadoTextoAnterior.current) {
      handleSearch();
    }
    // Si ya hay búsqueda activa => navegar al siguiente
    else {
      handleNextResult();
    }
  };

  const handleNextResult = () => {
    // Solo funciona si hay una búsqueda activa con resultados
    if (buscado && idsCoincidentes.length > 0) {
      const nuevoIndice = indiceSeleccionado === null || indiceSeleccionado === idsCoincidentes.length - 1 ? 0 : indiceSeleccionado + 1;
      setIndiceSeleccionado(nuevoIndice);
      setUltimoIndiceBusqueda(nuevoIndice);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter': {
        event.preventDefault();
        handleSearch();
        break;
      }

      case 'F4': {
        event.preventDefault();
        handleNextResult();
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
    setBuscado(false);
    setIdsCoincidentes([]);
    setIndiceSeleccionado(null);
    setModoNavegacion('normal');
    setNavegandoCoincidentes(false);
    setUltimoIndiceBusqueda(null);
  };

  const handleClean = async () => {
    const result = await showAlert({
      title: '¿Estás seguro?',
      text: 'Todo el progreso se perderá',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí, limpiar todo',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      setBuscado(false);
      setIndiceSeleccionado(0);
      setIdsCoincidentes([]);
      setTextoBusqueda('');
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
    <div className={`${className} flex gap-4 items-center border py-1.5 px-2 rounded-lg bg-slate-50 border-gray-300`}>
      <FlexibleInputField
        key={'codigo'}
        label="Buscar:"
        value={codigoBusqueda || ''}
        placeholder="Código"
        labelWidth="3rem"
        labelClassName={`text-start w-12 text-sm  s ${buscado && 'text-green-500'} `}
        inputClassName="w-24 text-xs"
        containerWidth="w-[12rem]"
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
        placeholder="Nombre o Apellido"
        inputClassName="w-52 text-xs"
        disabled={false}
        containerWidth="w-56 "
        onChange={(value) => {
          if (typeof value === 'string') {
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

      <ActionButton icon={<IoTrash size={15} />} color="red" size="xs" onClick={handleClean} disabled={isDisabled} />

      {buscado && idsCoincidentes.length > 0 && (
        <span className="text-xs text-black px-2">
          Mostrando: {(indiceSeleccionado ?? 0) + 1} de {idsCoincidentes.length}
        </span>
      )}
    </div>
  );
}
