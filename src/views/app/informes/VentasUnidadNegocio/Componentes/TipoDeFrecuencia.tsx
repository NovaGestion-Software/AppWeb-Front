import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import { VentasUnidadNegocioStore } from "../Store/store";

export default function TipoDeFrecuencia() {
  const { estaProcesado, checkboxSeleccionados, setCheckboxSeleccionados } = VentasUnidadNegocioStore();

  return (
    <Card className="col-start-8 row-start-3 self-center" >
      <RadioGroupFiltro
        className="justify-center gap-3 "
        grupo="grupo2"
        opciones={["Detalle", "Diario"]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />
    </Card>
  );
}
