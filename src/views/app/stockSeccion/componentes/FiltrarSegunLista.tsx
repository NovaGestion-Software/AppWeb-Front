import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";


export default function FiltrarSegunLista() {
  const { checkboxSeleccionados, setCheckboxSeleccionados , status} = useStockPorSeccion();
  return (
    <RadioGroupFiltro
    grupo="grupo3"
    opciones={['CONTADO', 'LISTA 2', 'LISTA 3']}
    checkboxSeleccionados={checkboxSeleccionados}
    setCheckboxSeleccionados={setCheckboxSeleccionados}
    disabled={status === 'idle'}
  />
  );
}
