import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";


export default function FiltrarPorTipo() {
  const { checkboxSeleccionados, setCheckboxSeleccionados, status } =
    useStockPorSeccion();

  return (
    <RadioGroupFiltro
      grupo="grupo1"
      opciones={['Talles', 'Articulos']}
      checkboxSeleccionados={checkboxSeleccionados}
      setCheckboxSeleccionados={setCheckboxSeleccionados}
      disabled={status === 'idle'}
    />
  );
}
