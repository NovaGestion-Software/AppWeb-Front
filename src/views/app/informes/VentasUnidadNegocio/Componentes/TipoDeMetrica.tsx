import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import { VentasUnidadNegocioStore } from "../Store/store";

export default function TipoDeMetrica() {
  const { estaProcesado, checkboxSeleccionados, setCheckboxSeleccionados } = VentasUnidadNegocioStore();

  return (
    <Card className=" col-start-7 row-start-3 self-center" >
      <RadioGroupFiltro
        className="justify-center gap-3 "
        grupo="grupo1"
        opciones={["Importes", "Articulos"]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />
    </Card>
  );
}
