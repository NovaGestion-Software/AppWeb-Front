import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import { useArticulosEnPromocion } from "../Store/Store";

export default function RadioButtons() {
  const { estaProcesado, checkboxSeleccionados, setCheckboxSeleccionados } = useArticulosEnPromocion();

  return (
    <Card className="col-start-9  row-start-2 v1920:col-start-7 self-center">
      <RadioGroupFiltro
        className="justify-center gap-3 "
        grupo="grupo1"
        opciones={["Vigentes", "Históricos",]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />
    </Card>
  );
}
