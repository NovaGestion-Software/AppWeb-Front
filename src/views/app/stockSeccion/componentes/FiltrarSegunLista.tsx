import { useState } from 'react';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
// import CheckboxInput from '@/Components/ui/Inputs/Checkbox';
import RadioInput from '@/Components/ui/Inputs/RadioInput';

export default function FiltrarSegunLista() {
  const [disabled, setDisabled] = useState(false);

  const { checkboxSeleccionados, setCheckboxSeleccionados } = useStockPorSeccion();
  const handleCheckboxChange = (grupo: keyof typeof checkboxSeleccionados, value: string) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? null : value;

    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  return (
    <div className="flex gap-1 border p-1 rounded-lg bg-white">
      <RadioInput
        onChange={() => handleCheckboxChange('grupo3', 'CONTADO')}
        checked={checkboxSeleccionados.grupo3 === 'CONTADO'}
        disabled={disabled}
        setDisabled={setDisabled}
        label="CONTADO"
      />
      <RadioInput
        onChange={() => handleCheckboxChange('grupo3', 'LISTA 2')}
        checked={checkboxSeleccionados.grupo3 === 'LISTA 2'}
        disabled={disabled}
        setDisabled={setDisabled}
        label="LISTA 2"
      />{' '}
      <RadioInput
        onChange={() => handleCheckboxChange('grupo3', 'LISTA 3')}
        checked={checkboxSeleccionados.grupo3 === 'LISTA 3'}
        disabled={disabled}
        setDisabled={setDisabled}
        label="LISTA 3"
      />
    </div>
  );
}
