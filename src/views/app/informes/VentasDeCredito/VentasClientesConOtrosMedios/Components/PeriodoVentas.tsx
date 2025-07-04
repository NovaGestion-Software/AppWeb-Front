import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useVentasClientesOtrosMedios } from "../Store/Store";

export default function PeriodoVentas() {
  const { setFechas, estaProcesado, setEstaProcesado } = useVentasClientesOtrosMedios();

  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fecha Inicial",
    labelRangePicker2: "Final",
    setFechas: setFechas,
  };

  return (
    <Card className="col-start-1 col-span-3 flex gap-4  ">
      <div className="flex flex-col gap-1  p-1 px-2 rounded-md   ">
        <span className="text-red-800 font-semibold text-xs ">Periodo de Ventas</span>
        <RangeDatesInput
          onClearData={() => {
            setEstaProcesado(false);
          }}
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
