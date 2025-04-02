import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { useEffect, useState } from 'react';
import { useFiltros } from '../hooks/useFiltros';
// import CheckboxInput from '@/Components/ui/Inputs/Checkbox';
import RadioInput from '@/Components/ui/Inputs/RadioInput';

export default function OrdenarPorCheckbox() {
  const { tablaStock, checkboxSeleccionados, setCheckboxSeleccionados, setProductos, setStockRenderizado } =
    useStockPorSeccion();
  const [disabled, setDisabled] = useState(false);
  // const { aplicarFiltros } = useFiltros();

  // // Aplicar filtros cada vez que cambie checkboxSeleccionados
  // useEffect(() => {
  //   const datosFiltrados = aplicarFiltros();
  //   //setStockRenderizado(datosFiltrados);
  //   setProductos(datosFiltrados)
  // //  setStockRenderizado(datosFiltrados)
  // }, [checkboxSeleccionados.grupo4]);

 

  const handleCheckboxChange = (grupo: keyof typeof checkboxSeleccionados, value: string) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? null : value;
    setCheckboxSeleccionados(grupo, nuevoValor);
  };


  return (
    <>
      <div className="flex gap-1 border p-1 rounded-lg bg-white">
        <RadioInput
          onChange={() => handleCheckboxChange('grupo4', 'Codigo')}
          checked={checkboxSeleccionados.grupo4 === 'Codigo'}
          label="Código"
          disabled={disabled}
          setDisabled={setDisabled}
        />
        <RadioInput
          onChange={() => handleCheckboxChange('grupo4', 'Descripcion')}
          checked={checkboxSeleccionados.grupo4 === 'Descripcion'}
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
