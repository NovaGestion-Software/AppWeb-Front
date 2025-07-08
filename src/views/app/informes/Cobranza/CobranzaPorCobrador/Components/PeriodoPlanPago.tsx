import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useCobranzasPorCobrador } from "../Store/Store";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";

export default function PeriodoPlanPago() {
  const { setFechas, estaProcesado, setEstaProcesado } = useCobranzasPorCobrador();

  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fecha Inicial",
    labelRangePicker2: "Final",
    setFechas: setFechas,
  };

  return (
    <Card className="col-start-5 col-span-3 flex gap-4  ">
      <div className="flex flex-col gap-1  p-1 px-2 rounded-md   ">
        <div className="flex gap-12 justify-between items-center">
          <span className="text-red-800 font-semibold text-xs ">Plan de Pago hecho entre:</span>
          <div className="w-fit text-nowrap   ">
            <CheckboxInput disabled={estaProcesado} checked={false} 
            onChange={() => {}} label={"Completo"} />
          </div>{" "}
        </div>
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
      </div>
    </Card>
  );
}
