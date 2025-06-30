import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { useIngresosStore } from "../Store/store";
import { FechasRango } from "@/frontend-resourses/components/types";

export default function DateInput({className}: {className?: string;}) {
  const { status, setFechas, setEstaProcesado, estaProcesado } = useIngresosStore();


  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Fecha Inicial",
    labelRangePicker2: "Fecha Final",
    setFechas: setFechas,
  };

    async function handleFetchData(_dates: FechasRango): Promise<void> {
      try {
        setEstaProcesado(true);
      } catch (error) {
        console.error("Error en la petición:", error);
        alert("Error al obtener los datos");
      }
    }
    const handleClearData = () => {
      setEstaProcesado(false);
    };

  return (
    <Card
      className={`${className}`}>
      <RangeDatesInput
        conBotones={true}
        estado={status}
        rangeDatePicker={propsRangePicker}
        showPresets={true}
        onClearData={handleClearData}
        onFetchData={handleFetchData}
        estaProcesado={estaProcesado}
        primarySource="range"
      />
    </Card>
  );
}
