import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { useEffect, useState } from 'react';
import { useFiltros } from '../hooks/useFiltros';
import CheckboxInput from '@/Components/ui/Inputs/Checkbox';

export default function FiltroPorStock() {
  const [disabled, setDisabled] = useState(false);
  const { checkboxSeleccionados, setCheckboxSeleccionados, setStockRenderizado } =
    useStockPorSeccion();
  const { aplicarFiltros } = useFiltros();

  // Aplicar filtros cada vez que cambie checkboxSeleccionados
  useEffect(() => {
    const datosFiltrados = aplicarFiltros();
    // console.log(datosFiltrados);
    if (datosFiltrados.length > 0) {
      setStockRenderizado(datosFiltrados);
    }
  }, [checkboxSeleccionados]);

  const handleCheckboxChange = (grupo: keyof typeof checkboxSeleccionados, value: string) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? '' : value;

    // Llamar a setCheckboxSeleccionados con los dos argumentos
    setCheckboxSeleccionados(grupo, nuevoValor);
  };

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
