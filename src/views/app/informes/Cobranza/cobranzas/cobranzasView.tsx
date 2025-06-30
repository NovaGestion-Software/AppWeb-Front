import { ViewTitle } from "@/frontend-resourses/components";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { useState } from "react";
import { useCobranzasStore } from "./store/store";
import { FechasRango } from "@/frontend-resourses/components/types";
import Botonera from "./Componentes/Botonera";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import Tabla from "./Componentes/Tabla";
import { data } from "./ts/data";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";

export default function CobranzasView() {
  const {
    status,
    // fechas
    setFechas,
    // data
    setCobranzas,
    // filtros
    // sucursalesDisponibles, sucursalesSeleccionadas,
    // setSucursalesDisponibles, setSucursalesSeleccionadas,
    checkboxSeleccionados,
    setCheckboxSeleccionados,
  } = useCobranzasStore();
  const [estaProcesado, setEstaProcesado] = useState(false);

  // Formateo a array de strings
  // const sucursalesDisponiblesStr = sucursalesDisponibles.map((s) => s.sucursal);
  // const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.sucursal);

  async function handleFetchData(_dates: FechasRango): Promise<void> {
    try {
      setCobranzas(data);
      setEstaProcesado(true);
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al obtener los datos");
    }
  }
  const handleClearData = () => {
    setEstaProcesado(false);
    setCobranzas([]);
  };

  const exampleData: Record<string, any>[] = [
    { id: 1, nombre: "Lucas", edad: 30 },
    { id: 2, nombre: "Sofía", activo: true },
    { id: 3, nombre: "Tomás", notas: [10, 9, 8] },
  ];

  const propsRangePicker = {
    setFechas: setFechas,
    rangeClassName: "v1536:w-56",
  };
  return (
    <div className="min-h-screen">
      <ViewTitle title="Cobranzas" />
      <div
        className="h-screen w-auto ml-3 mr-2 gap-4 p-4 pb-0 pr-0
          grid grid-cols-12 grid-rows-12 
          v1440:grid-cols-11"
      >
        <Card className=" py-[0px] col-span-5 col-start-1 w-[30rem]
                    v1440:w-[32rem] v1440:col-start-1 v1440:col-span-4 v1440:py-1
                    v1536:col-span-5 v1536:w-[33rem] v1536:py-[0px] v1920:py-[2px] ">
          <RangeDatesInput
            textoBotones={{ fetch: "Procesar", clear: "Borrar" }}
            conBotones={true}
            estado={status}
            showPresets={true}
            rangeDatePicker={propsRangePicker}
            onClearData={handleClearData}
            onFetchData={handleFetchData}
            estaProcesado={estaProcesado}
            variant="range"
            primarySource="range"
          />
        </Card>
        <Card
          className="p-2 h-10 py-2.5 col-span-4 col-start-6 row-start-1 
          v1440:col-start-5 v1440:ml-10  v1440:w-[25rem] v1440:py-3.5  
          v1536:-ml-20 v1536:col-start-6 v1536:py-[17px]  v1920:py-5"
        >
          <RadioGroupFiltro
            className="justify-center gap-3 "
            grupo="grupo1"
            opciones={["Todos", "Crédito", "Cta.Cte.", "Plan de Pago"]}
            checkboxSeleccionados={checkboxSeleccionados}
            setCheckboxSeleccionados={setCheckboxSeleccionados}
            disabled={!estaProcesado}
          />
        </Card>

        <Botonera
          data={exampleData}
          className="bg-white w-fit h-10 p-2
                                    col-span-3 col-start-10  row-start-1
                                    v1440:col-start-9 v1440:col-span-3  v1440:py-6 v1440:ml-16  
                                    v1536:col-start-9 v1536:-ml-6 v1536:py-7 "
          disabled={!estaProcesado}
          estaProcesado={estaProcesado}
          handleClean={handleClearData}
        />

        <Tabla className="col-start-1 row-start-2 col-span-12 row-span-10 px-2 bg-white p-1 rounded-lg" estaProcesado={estaProcesado} />
      </div>
    </div>
  );
}
