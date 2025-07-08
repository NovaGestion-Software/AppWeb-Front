import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import { useCobranzasPorFechaYVto,  } from "../Store/store";

export default function RadioButtons() {
  const { estaProcesado, checkboxSeleccionados, setCheckboxSeleccionados } = useCobranzasPorFechaYVto();

  return (
    <Card className="col-start-10 row-start-2 self-center ">
      <RadioGroupFiltro
        className="justify-center gap-3 v1536:gap-1 "
        labelClassName="w-16  last-of-type:w-28  m-1 text-xxs v1536:text-xs v1536:w-20 my-2"
        grupo="grupo1"
        opciones={["Todos", "Créditos", "Cta. Cte.", "Plan de Pago" ]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />
 <RadioGroupFiltro
        className="justify-center gap-3 v1536:gap-1 "
        labelClassName="w-16 last text-xxs v1536:text-xs v1536:w-20 my-2"
        grupo="grupo2"
        opciones={["Diario", "Semanal", "Mensual", "Anual" ]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      /> <RadioGroupFiltro
        className="justify-center gap-3 v1536:gap-1 "
        labelClassName="w-20 m-1 text-xxs v1536:text-xs v1536:w-20 my-2"
        grupo="grupo3"
        opciones={["Con Anticipo", "Sin Anticipo", ]}
        checkboxSeleccionados={checkboxSeleccionados}
        setCheckboxSeleccionados={setCheckboxSeleccionados}
        disabled={!estaProcesado}
      />
    </Card>
  );
}
