import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { useCompClientOtrasSucStore } from "../Store/store";

export default function AltaClienteDates({className} : { className?: string}) {
  const { setFechasAlta } = useCompClientOtrasSucStore();

    const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fechas Alta Cliente",
    setFechas: setFechasAlta,
  };
    
  return <Card className={` ${className}`}>
    <RangeDatesInput
      onClearData={() => {}}
      onFetchData={async (_dates) => {}}
      rangeDatePicker={propsRangePicker}
    />
  </Card>;
}
