import { useEffect, useState } from 'react';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { useFiltros } from '../hooks/useFiltros';
// import CheckboxInput from '@/Components/ui/Inputs/Checkbox';
import RadioInput from '@/Components/ui/Inputs/RadioInput';

export default function FiltrarPorTipo() {
  const [disabled, setDisabled] = useState(false);
  const { checkboxSeleccionados, setCheckboxSeleccionados, setStockRenderizado } =
    useStockPorSeccion();
  const { aplicarFiltros } = useFiltros();

  // Aplicar filtros cada vez que cambie checkboxSeleccionados
  useEffect(() => {
    const datosFiltrados = aplicarFiltros();
    if (datosFiltrados.length > 0) {
      setStockRenderizado(datosFiltrados);
    }
  }, [checkboxSeleccionados]);

  const handleCheckboxChange = (grupo: keyof typeof checkboxSeleccionados, value: string) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? '' : value;

    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  return (
    <div className="flex gap-1 border p-1 rounded-lg bg-white">
      <RadioInput
        onChange={() => handleCheckboxChange('grupo1', 'Talles')}
        checked={checkboxSeleccionados.grupo1 === 'Talles'}
        disabled={disabled}
        setDisabled={setDisabled}
        label="Talles"
      />
      <RadioInput
        onChange={() => handleCheckboxChange('grupo1', 'Artículos')}
        checked={checkboxSeleccionados.grupo1 === 'Artículos'}
        disabled={disabled}
        setDisabled={setDisabled}
        label="Artículos"
      />{' '}
    </div>
  );
}
