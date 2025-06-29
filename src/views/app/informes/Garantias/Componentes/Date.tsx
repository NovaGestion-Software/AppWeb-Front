import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useGarantiasStore } from "../Store/store";

export default function Date() {
  const { setFechas, estaProcesado, setEstaProcesado } = useGarantiasStore();

  const propsRangePicker = {
    setFechas: setFechas,
  };

  return (
    <Card className="col-start-1 col-span-3">
      <RangeDatesInput
      onClearData={() => {
        setEstaProcesado(false);
      }}
      conBotones={true}
      estaProcesado={estaProcesado}
      onFetchData={async (_dates) => {
        setEstaProcesado(true);
      }}
      rangeDatePicker={propsRangePicker}
    />
    </Card>
  );
}
