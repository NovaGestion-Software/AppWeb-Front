import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { FechasRango } from "@/frontend-resourses/components/types";
import { useVentasHoraStore } from "../store/useVentasHoraStore";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { useHandleClearData } from "../Utils/useHandleClear";
interface DateInputProps {
  refetch: () => void;
  setConsultaEjecutada: (value: boolean) => void;
}

export default function DateInput({ refetch, setConsultaEjecutada }: DateInputProps) {
  const handleClearData = useHandleClearData();

  //store
  const {
    // estados
    estaProcesado,
    status,
    foco,
    setFechas,
  } = useVentasHoraStore();
  // HANDLE FETCH
  const handleFetchData = async (_dates: FechasRango) => {
    setConsultaEjecutada(true);
    refetch();
    //       console.log("refetch");
  };
  const propsRangePicker = {
    setFechas: setFechas,
  };

  console.log(foco, "foco en DateInput");
  return (
    <Card
      className="col-start-1 col-span-6  
           2xl:col-span-4 2xl:col-start-2 "
    >
      <RangeDatesInput
        conBotones={true}
        textoBotones={{ fetch: "Procesar", clear: "Borrar" }}
        onFetchData={handleFetchData}
        onClearData={handleClearData}
        rangeDatePicker={propsRangePicker}
        estado={status}
        setFocus={foco}
        estaProcesado={estaProcesado}
      />
    </Card>
  );
}
