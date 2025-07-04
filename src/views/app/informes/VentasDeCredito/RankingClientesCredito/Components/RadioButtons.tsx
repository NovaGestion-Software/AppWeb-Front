import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import { useRankingClientesCredito } from "../Store/Store";

export default function RadioButtons() {
  const { estaProcesado, checkboxSeleccionados, setCheckboxSeleccionados } = useRankingClientesCredito();

  return (
    <Card className="col-start-11 row-span-2 v1920:col-start-9 row-start-2 self-center">
      <RadioGroupFiltro
        className=" flex flex-col"
        grupo="grupo1"
        labelClassName="w-24"
        opciones={["Cancelados", "Total", "Importe", "Nombre", "Cuenta"]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />
    </Card>
  );
}
