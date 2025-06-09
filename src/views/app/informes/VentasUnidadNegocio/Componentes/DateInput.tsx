import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { VentasUnidadNegocioStore } from "../Store/store";

export default function DateInput({ className }: { className?: string }) {
  const { setFechas, estaProcesado, setEstaProcesado } = VentasUnidadNegocioStore();

  const propsRangePicker = {
    setFechas: setFechas,
  };

  return (
    <Card className={` ${className}`}>
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
