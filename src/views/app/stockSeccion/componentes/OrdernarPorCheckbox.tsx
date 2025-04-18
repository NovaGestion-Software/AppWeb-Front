import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";

export default function OrdenarPorCheckbox() {
  const { checkboxSeleccionados, setCheckboxSeleccionados, status } = useStockPorSeccion();


  return (
    <>
    <RadioGroupFiltro grupo="grupo4"
     opciones={['Codigo', 'Descripcion', 'Marca']}  disabled={status === "idle"} 
     checkboxSeleccionados={checkboxSeleccionados} setCheckboxSeleccionados={setCheckboxSeleccionados} />

    </>
  );
}
