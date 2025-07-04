import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useRankingClientesCredito } from "../Store/Store";

export default function Date() {
  const { setFechas, estaProcesado, setEstaProcesado, setFecha } = useRankingClientesCredito();
  const propsDatePicker = {
    labelDateInput: true,
    labelDatePicker: "Fecha Recibos",
    setFecha: setFecha,
  };
  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fecha Inicial",
    labelRangePicker2: "Final",
    setFechas: setFechas,
  };


  return (
    <Card className="col-start-1 col-span-3">
      <RangeDatesInput
      onClearData={() => {
        setEstaProcesado(false);
      }}
      conBotones={true}
      variant="both"
      primarySource="range"
      estaProcesado={estaProcesado}
      onFetchData={async (_dates) => {
        setEstaProcesado(true);
      }}
      datePicker={propsDatePicker}
      rangeDatePicker={propsRangePicker}
    />
    </Card>
  );
}
