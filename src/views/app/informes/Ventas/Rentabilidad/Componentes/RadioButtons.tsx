import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import { useRentabilidadStore } from "../Store/useRentabilidadStore";

export default function RadioButtons() {
  const { estaProcesado, checkboxSeleccionados, setCheckboxSeleccionados } = useRentabilidadStore();

  return (
    <Card className="col-start-10 col-span-3 row-start-2 self-center">
      <RadioGroupFiltro
        className="justify-center gap-3 "
        grupo="grupo2"
        opciones={["Artículo+Talle", "Artículo"]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />

      <RadioGroupFiltro
        className="justify-center gap-3 "
        grupo="grupo1"
        opciones={["Artículo", "Rubro", "Sección", "Marca"]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />
    </Card>
  );
}
