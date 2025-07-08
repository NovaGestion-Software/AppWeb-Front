import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useCobranzasPorFechaEmision } from "../Store/store";

export default function Date() {
  const { setFechas, estaProcesado, setEstaProcesado, setFecha, } = useCobranzasPorFechaEmision();

  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fecha Inicial",
    labelRangePicker2: "Fecha Final",
    setFechas: setFechas,
  };

  
  const propsDatePicker = {
    labelDateInput: true,
    labelDatePicker: "Fecha Recibos",
    setFechas: setFecha,
  };
  return (
    <Card className="col-start-1  flex gap-4  ">
        <RangeDatesInput
          onClearData={() => {
            setEstaProcesado(false);
          }}
          conBotones={true}
          datePicker={propsDatePicker}
          estaProcesado={estaProcesado}
          primarySource="range"
          variant="both"
          onFetchData={async (_dates) => {
            setEstaProcesado(true);
          }}
          rangeDatePicker={propsRangePicker}
        />
    </Card>
  );
}
