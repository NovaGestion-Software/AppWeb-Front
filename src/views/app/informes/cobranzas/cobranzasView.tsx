import { ViewTitle } from "@/frontend-resourses/components";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { useState } from "react";
import { useCobranzasStore } from "./store/store";
import { FechasRango } from "@/frontend-resourses/components/types";
import Botonera from "./Componentes/Botonera";
import GrupoInputsRadio from "../../stockSeccion/componentes/GrupoInputsRadio";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import Tabla from "./Componentes/Tabla";

export default function CobranzasView() {
  const { status, setFechas, sucursalesDisponibles, sucursalesSeleccionadas, setSucursalesDisponibles, setSucursalesSeleccionadas, 
    checkboxSeleccionados, setCheckboxSeleccionados } = useCobranzasStore();
  const [estaProcesado, setEstaProcesado] = useState(false);

  // Formateo a array de strings
  const sucursalesDisponiblesStr = sucursalesDisponibles.map((s) => s.sucursal);
  const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.sucursal);

  async function handleFetchData(_dates: FechasRango): Promise<void> {
    try {
      //  console.log('fechas en handle', dates)
      setEstaProcesado(true);
      //   mutate(dates);
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al obtener los datos");
      //   setFoco(true);
    }
  }
  const handleClearData = () => {
    setEstaProcesado(false);
  };

  const exampleData: Record<string, any>[] = [
    { id: 1, nombre: "Lucas", edad: 30 },
    { id: 2, nombre: "Sofía", activo: true },
    { id: 3, nombre: "Tomás", notas: [10, 9, 8] },
  ];
  return (
    <div className="min-h-screen">
      <ViewTitle title="Cobranzas" />
      <div
        className="h-screen w-auto ml-3 gap-4 p-4 pb-0 pr-0
          grid grid-cols-12 grid-rows-12 
          v1440:grid-cols-11"
      >
        <RangeDatesInput
          className="col-span-5 col-start-1 w-[30rem]  bg-white p-2 
                    v1440:w-[38rem] v1440:col-start-2 v1440:py-6 "
          textoBotones={{ fetch: "Procesar", clear: "Borrar" }}
          conBotones={true}
          estado={status}
          setFechas={setFechas}
          showPresets={true}
          onClearData={handleClearData}
          onFetchData={handleFetchData}
          estaProcesado={estaProcesado}
        />

        <RadioGroupFiltro
          className="justify-center gap-3 p-2 h-10 col-span-4 col-start-6 row-start-1"
          grupo="grupo1"
          opciones={["Todos", "Crédito", "Cta.Cte.", "Plan de Pago"]}
          checkboxSeleccionados={checkboxSeleccionados}
          setCheckboxSeleccionados={setCheckboxSeleccionados}
          disabled={false}
        />

        <Botonera
          data={exampleData}
          className="bg-white w-fit p-2
                                    col-span-3 col-start-10  row-start-1
                                    v1440:col-start-9 v1440:-ml-9
                                    v1536:col-start-8 v1536:-ml-6 "
          disabled={false}
          estaProcesado={estaProcesado}
          handleClean={handleClearData}
        />

        <Tabla className="col-start-1 row-start-2 col-span-12 row-span-10 px-2" estaProcesado={estaProcesado} />
      </div>
    </div>
  );
}
