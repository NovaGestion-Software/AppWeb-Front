import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useDistribucionMensualClientes } from "../Store/Store";

export default function Date() {
  const { setFechas, estaProcesado, setEstaProcesado } = useDistribucionMensualClientes();

  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fecha Inicial",
    labelRangePicker2: "Fecha Final",
    setFechas: setFechas,
  };

  return (
    <Card className="col-start-1 col-span-3 flex gap-4 ">
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
