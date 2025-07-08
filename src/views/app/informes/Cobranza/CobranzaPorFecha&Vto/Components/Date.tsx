import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useCobranzasPorFechaYVto } from "../Store/store";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";

export default function Date() {
  const { setFechas, estaProcesado, setEstaProcesado } = useCobranzasPorFechaYVto();

  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fecha Inicial",
    labelRangePicker2: "Fecha Final",
    setFechas: setFechas,
  };

  return (
    <Card className="col-start-1  flex gap-4  ">
      <div className="w-fit text-nowrap   ">
        <CheckboxInput disabled={estaProcesado} checked={false} onChange={() => {}} label={"Completo"} />
      </div>{" "}
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
