import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { useEffect, useState } from 'react';
import { useFiltros } from '../hooks/useFiltros';
import CheckboxInput from '@/Components/ui/Inputs/Checkbox';

export default function OrdenarPorCheckbox() {
  const { checkboxSeleccionados, setCheckboxSeleccionados, setStockRenderizado } =
    useStockPorSeccion();
  const [disabled, setDisabled] = useState(false);
  const { aplicarFiltros } = useFiltros();

  // Aplicar filtros cada vez que cambie checkboxSeleccionados
  useEffect(() => {
    const datosFiltrados = aplicarFiltros();
    setStockRenderizado(datosFiltrados);
  }, [checkboxSeleccionados]);

  const handleCheckboxChange = (grupo: keyof typeof checkboxSeleccionados, value: string) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? null : value;

    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  return (
    <>
      <div className="flex gap-1 border p-1 rounded-lg bg-white">
        <CheckboxInput
          onChange={() => handleCheckboxChange('grupo4', 'Código')}
          checked={checkboxSeleccionados.grupo4 === 'Código'}
          label="Código"
          disabled={disabled}
          setDisabled={setDisabled}
        />
        <CheckboxInput
          onChange={() => handleCheckboxChange('grupo4', 'Marca')}
          checked={checkboxSeleccionados.grupo4 === 'Marca'}
          label="Marca"
          disabled={disabled}
          setDisabled={setDisabled}
        />
        <CheckboxInput
          onChange={() => handleCheckboxChange('grupo4', 'Descripción')}
          checked={checkboxSeleccionados.grupo4 === 'Descripción'}
          label="Descripción"
          disabled={disabled}
          setDisabled={setDisabled}
        />
      </div>
    </>
  );
}
