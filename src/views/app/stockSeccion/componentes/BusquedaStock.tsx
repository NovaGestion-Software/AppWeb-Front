import { useEffect, useRef, useState } from 'react';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { TbArrowBigRightLinesFilled } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';
import { IoTrash } from 'react-icons/io5';
import FlexibleInputField from '@/Components/ui/Inputs/FlexibleInputs';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import showAlert from '@/utils/showAlert';

export default function BusquedaStock({ data }: any) {
  const [codigoBusqueda, setCodigoBusqueda] = useState<string>('');
  const [textoBusqueda, setTextoBusqueda] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(true);
  const tablaRef = useRef<HTMLTableElement | null>(null);

  const {
    buscado,
    setBuscado,
    indiceSeleccionado,
    setIndiceSeleccionado,
    idsCoincidentes,
    setIdsCoincidentes,
    stockRenderizado,
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
  } = useStockPorSeccion();

  useEffect(() => {}, [data]);

  useEffect(() => {
    setIsDisabled(codigoBusqueda.length === 0 && textoBusqueda.length === 0);
  }, [codigoBusqueda, textoBusqueda]);

  useEffect(() => {
    if (codigoBusqueda.length <= 0 && textoBusqueda.length <= 0) {
      setBuscado(false);
    }
  }, [idsCoincidentes]);

  useEffect(() => {
    // Filtramos solo los productos que contienen código, marca y descripción
    const filtered = stockRenderizado
    .flatMap((rubro: any) => rubro.productos)
    .filter((producto: any) => producto && producto.codigo && producto.nombre && producto.marca)
    .filter((producto: any) => {
      const matchesCodigo = producto.codigo.includes(codigoBusqueda);
      const matchesTexto =
        producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
        producto.marca.toLowerCase().includes(textoBusqueda.toLowerCase());
      return matchesCodigo && matchesTexto;
    });
  

    const ids = filtered.map((producto: any) => producto.codigo); // Aquí se toma el `codigo` del producto como el ID

    // console.log(ids);

    setIdsCoincidentes(ids);
    setIndiceSeleccionado(0); // Resetear la selección al primer ítem de la lista filtrada
  }, [codigoBusqueda, textoBusqueda, stockRenderizado]);

  const handleSiguienteClick = () => {
    if (idsCoincidentes.length > 0) {
      console.log(indiceSeleccionado);
      const nuevoIndice = (indiceSeleccionado + 1) % idsCoincidentes.length;
      // console.log(idsCoincidentes);
      // console.log(nuevoIndice);
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
      handleSiguienteClick();
    } else {
      handleSearch();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Verificar si alguno de los inputs tiene contenido
      if (codigoBusqueda || textoBusqueda) {
        event.preventDefault(); // Evitar el comportamiento por defecto de Enter
        handleButton(); // Ejecutar la función handleButton
      }
    } else if (event.key === 'Escape') {
      // Verificar si alguno de los inputs tiene contenido
      if (codigoBusqueda || textoBusqueda) {
        event.preventDefault(); // Evitar el comportamiento por defecto de Enter
        setCodigoBusqueda('');
        setTextoBusqueda('');
        console.log(tablaRef);
        setTimeout(() => {
          tablaRef.current?.focus();
        }, 0);
      }
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); // Evitar el comportamiento por defecto de las flechas

      // Determinar la dirección de la navegación
      const direction = event.key === 'ArrowDown' ? 1 : -1;

      // Calcular el nuevo índice
      let newIndex;
      if (buscado && idsCoincidentes.length > 0) {
        // Navegar dentro de los ítems coincidentes
        newIndex = indiceSeleccionado + direction;
        if (newIndex < 0) newIndex = idsCoincidentes.length - 1; // Ir al último si es menor que 0
        if (newIndex >= idsCoincidentes.length) newIndex = 0; // Ir al primero si es mayor que el límite
      } else {
        // Navegar por la tabla completa
        newIndex = indiceSeleccionado + direction;
        if (newIndex < 0) newIndex = stockRenderizado.length - 1; // Ir al último si es menor que 0
        if (newIndex >= stockRenderizado.length) newIndex = 0; // Ir al primero si es mayor que el límite
      }

      // Actualizar el índice seleccionado
      setIndiceSeleccionado(newIndex);
    }
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
      setTablaStock([]);
      setStockRenderizado([]);
      setSeccionesSeleccionadas({});
      setSeccionesToFetch({});
      setRubrosSeleccionados([]);
      setRubrosToFetch([]);
      setStatus('idle');
      setFooter(false);
      setCodigoBusqueda('');
      setTextoBusqueda('');

      setCheckboxSeleccionados('grupo1', null);
      setCheckboxSeleccionados('grupo2', null);
      setCheckboxSeleccionados('grupo3', null);
      setCheckboxSeleccionados('grupo4', null);
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
        key={'codigo'}
        label="Buscar:"
        value={codigoBusqueda || ''}
        placeholder="Código"
        labelWidth="3rem"
        labelClassName="text-start w-12 text-sm "
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
        placeholder="Descripción o Marca"
        inputClassName="w-52 text-xs"
        disabled={false}
        containerWidth="w-56 "
        onChange={(value) => {
          if (typeof value === 'string') {
            setTextoBusqueda(value);
          }
        }}
        onKeyDown={handleKeyDown}
      />

      <ActionButton
        icon={buscado ? <TbArrowBigRightLinesFilled size={15} /> : <BiSearch size={15} />}
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
    </div>
  );
}
