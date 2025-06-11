import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { FechasRango } from "@/frontend-resourses/components/types";
import { useVentasHoraStore } from "../store/useVentasHoraStore";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { handleClearData } from "../Utils/funciones";

export default function DateInput() {
  //store
  const {
    // estados
    estaProcesado,
    status,
    //   setStatus,
    // foco
    foco,
    // dates

    setFechas,
  } = useVentasHoraStore();
  // HANDLE FETCH
  const handleFetchData = async (_dates: FechasRango) => {
    // try {
    //   mutate(dates);
    //   console.log("mutate");
    // } catch (error) {
    //   console.error("Error en la petición:", error);
    //   alert("Error al obtener los datos");
    //   setFoco(true);
    // }
    // refetch();
    //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                setEstaProcesado(true);
    console.log("refetch");
  };
  const propsRangePicker = {
    setFechas: setFechas,
  };

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
