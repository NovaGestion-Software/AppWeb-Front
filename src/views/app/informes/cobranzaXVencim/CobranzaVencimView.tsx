import { ViewTitle } from "@/frontend-resourses/components";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { useCobranzaPorVencimientoStore } from "./store/CobranzaPorVencimientoStore";
import { FechasRango } from "@/frontend-resourses/components/types";
import { useEffect, useState } from "react";
import Botonera from "./Complementos/Botonera";
import TablaCxV from "./Complementos/Tabla";
import { data, dataFalsa } from "./ts/data";
import Totales from "./Complementos/Totales";
import { ListaFiltrosAplicados } from "@/frontend-resourses/components/Complementos/ListaFiltrosAplicados";
import { extraerItems } from "@/frontend-resourses/utils/dataManipulation";
import GraficoDeTorta from "./Complementos/GraficoDeTorta";

export default function CobranzaVencimView() {
  const {
    status,
    setFechas,
    // data
    setCobranzaPorVencimiento,
    sucursalesDisponibles,
    sucursalesSeleccionadas,
    setSucursalesDisponibles,
    setSucursalesSeleccionadas,
  } = useCobranzaPorVencimientoStore();
  const [estaProcesado, setEstaProcesado] = useState(false);

  // Formateo a array de strings
  const sucursalesDisponiblesStr = sucursalesDisponibles.map((s) => s.sucursal);
  const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.sucursal);

  // SETEAR FILTROS.
  useEffect(() => {
    if (estaProcesado) {
      //  setEstaProcesado(true);
      extraerItems({
        data: dataFalsa,
        itemsKeysGroup: { sucursal: "sucursal" },
        itemsSeleccionados: sucursalesSeleccionadas,
        setItemsDisponibles: setSucursalesDisponibles,
        setItemsSeleccionados: setSucursalesSeleccionadas,
      });
    }

    console.log(sucursalesDisponibles);
  }, [estaProcesado]);

  async function handleFetchData(_dates: FechasRango): Promise<void> {
    try {
      setCobranzaPorVencimiento(data);
      setEstaProcesado(true);
      //   mutate(dates);
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al obtener los datos");
      //   setFoco(true);
    }
  }
  const handleClearData = () => {
    setCobranzaPorVencimiento([]);
    setEstaProcesado(false);
  };
  const exampleData: Record<string, any>[] = [
    { id: 1, nombre: "Lucas", edad: 30 },
    { id: 2, nombre: "Sofía", activo: true },
    { id: 3, nombre: "Tomás", notas: [10, 9, 8] },
  ];

  const totalesProps = {
    principales: [
      {
        titulo: "Importe Total",
        icono: "💰",
        valor: 13160073.0,
      },
      {
        titulo: " Cobrado",
        icono: "💵",
        valor: 886042141203,
      },

      {
        titulo: "Mora Neta",
        icono: "📆",
        valor: 12504.6,
        mostrarPorcentaje: true,
        porcentaje: 32.67,
      },
      {
        titulo: "Int. Mora",
        icono: "🔁",
        valor: 1250412.06,
      },
      {
        titulo: "Mora Bruta",
        icono: "⚠️",
        valor: 429912470.1,
        mostrarPorcentaje: true,
        porcentaje: 32.67,
      },
      {
        titulo: "No Vencido",
        icono: "🕝",
        valor: 0,
      },
    ],
    extras: [
      {
        titulo: "Bonificado",
        icono: "🎁",
        valor: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <ViewTitle title="Cobranza por Vencimiento" />
      <div
        className="h-screen w-auto ml-3 gap-4 p-4 pb-0 pr-0
          grid grid-cols-12 grid-rows-12 
          v1440:grid-cols-11 "
      >
        <RangeDatesInput
          className="col-span-6 col-start-2 w-[30rem] 
              v1440:w-[38rem] v1440:col-start-2 v1440:py-6  bg-white p-2"
          textoBotones={{ fetch: "Procesar", clear: "Borrar" }}
          conBotones={true}
          estado={status}
          setFechas={setFechas}
          showPresets={true}
          onClearData={handleClearData}
          onFetchData={handleFetchData}
          estaProcesado={estaProcesado}
        />

        <Botonera
          data={exampleData}
          className="bg-white w-fit p-2
                            col-span-3 col-start-9 
                            v1440:col-start-9 v1440:-ml-9
                            v1536:col-start-8 v1536:-ml-6 v1536:px-4 "
          disabled={!estaProcesado}
          estaProcesado={estaProcesado}
          handleClean={handleClearData}
        />

        <TablaCxV
          className="w-full h-full p-1 rounded-lg bg-white overflow-hidden shadow-md  shadow-gray-400 
                  col-start-2 col-span-10 row-span-3   
                  v1440:col-start-2 v1440:col-span-9 v1440:row-start-2 v1440:row-span-2
                  v1536:row-span-3 v1536:h-fit 
                  v1920:col-start-2  "
          estaProcesado={estaProcesado}
        />
        <Totales
          className="rounded-lg  col-start-2 col-span-6  
        row-start-5 row-span-7 w-fit
        v1440:col-span-5 v1440:col-start-2
        v1440:row-start-4  v1440:row-span-5  
        v1536:row-start-5 v1536:row-span-6 "
          principales={estaProcesado ? totalesProps.principales : []}
          extras={estaProcesado ? totalesProps.extras : []}
        />
        <ListaFiltrosAplicados
          className="col-span-4 row-start-5 rounded-lg row-span-3 h-full
          v1440:row-start-4
          v1536:row-start-5  "
          itemsDisponibles={estaProcesado ? sucursalesDisponiblesStr : []}
          itemsSeleccionados={estaProcesado ? sucursalesSeleccionadasStr : []}
        />

        <GraficoDeTorta
          estaProcesado={estaProcesado}
          className="bg-white w-full rounded-lg  overflow-hidden h-full
        row-start-8  row-span-4 col-span-4
        v1440:row-start-7
        v1536:row-start-8"
        />
      </div>
    </div>
  );
}
