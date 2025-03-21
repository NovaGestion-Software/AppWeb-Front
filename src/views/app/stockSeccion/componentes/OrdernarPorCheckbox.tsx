import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { useEffect, useState } from 'react';
import { useFiltros } from '../hooks/useFiltros';
// import CheckboxInput from '@/Components/ui/Inputs/Checkbox';
import RadioInput from '@/Components/ui/Inputs/RadioInput';

export default function OrdenarPorCheckbox() {
  const { tablaStock, checkboxSeleccionados, setCheckboxSeleccionados, setStockRenderizado } =
    useStockPorSeccion();
  const [disabled, setDisabled] = useState(false);
  const { aplicarFiltros } = useFiltros();

  // Aplicar filtros cada vez que cambie checkboxSeleccionados
  useEffect(() => {
    const datosFiltrados = aplicarFiltros();
    setStockRenderizado(datosFiltrados);
  }, [checkboxSeleccionados]);

  useEffect(() => {
    if (tablaStock.length > 0) {
      setCheckboxSeleccionados('grupo1', 'Talles');
      setCheckboxSeleccionados('grupo2', 'Todos');
      setCheckboxSeleccionados('grupo3', 'CONTADO');
      setCheckboxSeleccionados('grupo4', 'Descripción');
    }
  }, [tablaStock]);

  const handleCheckboxChange = (grupo: keyof typeof checkboxSeleccionados, value: string) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? null : value;

    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  // console.log(checkboxSeleccionados);

  return (
    <>
      <div className="flex gap-1 border p-1 rounded-lg bg-white">
        <RadioInput
          onChange={() => handleCheckboxChange('grupo4', 'Código')}
          checked={checkboxSeleccionados.grupo4 === 'Código'}
          label="Código"
          disabled={disabled}
          setDisabled={setDisabled}
        />
        <RadioInput
          onChange={() => handleCheckboxChange('grupo4', 'Descripción')}
          checked={checkboxSeleccionados.grupo4 === 'Descripción'}
          label="Descripción"
          disabled={disabled}
          setDisabled={setDisabled}
        />
        <RadioInput
          onChange={() => handleCheckboxChange('grupo4', 'Marca')}
          checked={checkboxSeleccionados.grupo4 === 'Marca'}
          label="Marca"
          disabled={disabled}
          setDisabled={setDisabled}
        />
      </div>
    </>
  );
}
