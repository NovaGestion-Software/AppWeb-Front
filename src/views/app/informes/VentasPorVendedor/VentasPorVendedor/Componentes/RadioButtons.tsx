import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import { useVentasPorVendedor } from "../Store/Store";

export default function RadioButtons() {
  const { estaProcesado, checkboxSeleccionados, setCheckboxSeleccionados } = useVentasPorVendedor();

  return (
    <Card className="col-start-11  row-start-2 self-center">
      <RadioGroupFiltro
        className="justify-center gap-3 "
        grupo="grupo1"
        opciones={["Artículo", "Cantidad", "Proveedor",]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />
    </Card>
  );
}
