import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { useEffect, useState } from 'react';
import { useFiltros } from '../hooks/useFiltros';
import CheckboxInput from '@/Components/ui/Inputs/Checkbox';

export default function FiltroPorStock() {
  const { checkboxSeleccionados, setCheckboxSeleccionados, setStockRenderizado } =
    useStockPorSeccion();
  const [disabled, setDisabled] = useState(false);
  const { aplicarFiltros } = useFiltros();
  const handleCheckboxChange = (grupo: keyof typeof checkboxSeleccionados, value: string) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? null : value;

    // Llamar a setCheckboxSeleccionados con los dos argumentos
    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  // Aplicar filtros cada vez que cambie checkboxSeleccionados
  useEffect(() => {
    const datosFiltrados = aplicarFiltros();
    setStockRenderizado(datosFiltrados);
  }, [checkboxSeleccionados]);
  return (
    <div className="flex gap-1 border p-1 rounded-lg ">
      <CheckboxInput
        onChange={() => handleCheckboxChange('grupo2', 'Con Stock')}
        checked={checkboxSeleccionados.grupo2 === 'Con Stock'}
        label="Con Stock"
        disabled={disabled}
        setDisabled={setDisabled}
      />
      <CheckboxInput
        onChange={() => handleCheckboxChange('grupo2', 'Todos')}
        checked={checkboxSeleccionados.grupo2 === 'Todos'}
        label="Todos"
        disabled={disabled}
        setDisabled={setDisabled}
      />
      <CheckboxInput
        onChange={() => handleCheckboxChange('grupo2', 'Negativos')}
        checked={checkboxSeleccionados.grupo2 === 'Negativos'}
        label="Negativos"
        disabled={disabled}
        setDisabled={setDisabled}
      />
    </div>
  );
}
