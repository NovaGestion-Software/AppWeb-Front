import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useClientesSinOperaciones } from "../Store/Store";
import { FlexibleInputField } from "@/frontend-resourses/components";

export default function Date() {
  const { setFechas, estaProcesado, setEstaProcesado } = useClientesSinOperaciones();

  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fecha Inicial",
    labelRangePicker2: "Final",
    setFechas: setFechas,
  };

  return (
    <Card className="col-start-1 col-span-3 flex gap-4 ">
      <div className="flex flex-col gap-1 border p-1 px-2 rounded-md ">
        <span className="text-red-800 font-semibold text-xs ">Alta de Cliente</span>
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
      <FlexibleInputField label="Días Sin Compras" disabled={estaProcesado} arrows={true} inputType="number" inputWidth="w-16" />
    </Card>
  );
}
