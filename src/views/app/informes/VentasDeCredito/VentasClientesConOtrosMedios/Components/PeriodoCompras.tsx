import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useVentasClientesOtrosMedios } from "../Store/Store";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";

export default function PeriodoCompras() {
  const { setFechas, estaProcesado, setEstaProcesado } = useVentasClientesOtrosMedios();

  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fecha Inicial",
    labelRangePicker2: "Final",
    setFechas: setFechas,
  };

  return (
    <Card className="col-start-5 v1536:col-start-5 col-span-3 flex gap-4 ">
      <div className="flex flex-col gap-1  px-2 rounded-md my-0.5 ">
        <div className="flex gap-12 justify-between items-center">
          <span className="text-red-800 text-nowrap font-semibold text-xs ">Clientes que Compraron en Crédito en periodo:</span>
          <div className="w-fit text-nowrap   ">
            <CheckboxInput disabled={estaProcesado} checked={false} onChange={() => {}} label={"Cualquier Periodo"} />
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
