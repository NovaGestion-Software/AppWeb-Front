import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";

export default function FiltroPorStock() {
  const { checkboxSeleccionados, setCheckboxSeleccionados,status } =
    useStockPorSeccion();

  return (
    <RadioGroupFiltro grupo="grupo2"
    opciones={['Todos', 'Con Stock', 'Negativos']}  disabled={status === "idle"} 
    checkboxSeleccionados={checkboxSeleccionados} setCheckboxSeleccionados={setCheckboxSeleccionados} />
  );
}
