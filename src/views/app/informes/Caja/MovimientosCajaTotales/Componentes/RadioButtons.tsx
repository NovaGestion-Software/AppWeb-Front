import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import { useMovCajaTotalesStore } from "../Store/store";

export default function RadioButtons() {
  const { estaProcesado, checkboxSeleccionados, setCheckboxSeleccionados } = useMovCajaTotalesStore();

  return (
    <Card className="col-start-1 row-start-2 self-center">
      <RadioGroupFiltro
        className="justify-center gap-3 v1536:gap-1 "
        labelClassName="w-16 m-1 text-xxs v1536:text-xs v1536:w-20 my-2"
        inputClassName="w-3 h-3 v1536:w-4 v1920:w-5 v1536:h-4 v1920:h-5"
        grupo="grupo2"
        opciones={["Todos", "Ventas", "Cob. Cr","Cob. PP","Ingresos","Gastos","Fondos","Vales","Convenios","Gift Card",]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />
    </Card>
  );
}
