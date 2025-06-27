import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import { useMovCajaStore } from "../Store/store";

export default function RadioButtons() {
  const { estaProcesado, checkboxSeleccionados, setCheckboxSeleccionados } = useMovCajaStore();

  return (
    <Card className="col-start-1 row-start-2 self-center">
      <RadioGroupFiltro
        className="justify-center gap-3 v1536:gap-1 "
        labelClassName="w-16 m-1 text-xxs v1536:text-xs v1536:w-20 my-2"
        grupo="grupo2"
        opciones={["Todos", "Ventas", "Cob. Cr","Cob. PP","Ingresos","Gastos","Fondos","Vales","Convenios","Gift Card",]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />

    </Card>
  );
}
