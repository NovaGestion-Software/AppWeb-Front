import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { useCompClientOtrasSucStore } from "../Store/store";

export default function ComprasDates({className} : { className?: string}) {
  const { setFechas } = useCompClientOtrasSucStore();

    const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Compras entre:",
    setFechas: setFechas,
  };
    
  return <Card className={` ${className}`}>
    <RangeDatesInput
      onClearData={() => {}}
      onFetchData={async (dates) => {}}
      rangeDatePicker={propsRangePicker}
      conBotones={true}
      
    />
  </Card>;
}
