import { ViewTitle } from "@/frontend-resourses/components";
import ShowModalButtons from "./Componentes/ShowModalButtons";
import { useState } from "react";
import { useMorosidadStore } from "./Store/store";
import Botonera from "./Componentes/Botonera";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import { FechasRango } from "@/frontend-resourses/components/types";
import TablaLocalidad from "./Componentes/TablaLocalidad";
import TablaCategoria from "./Componentes/TablaCategoria";
import TablaRango from "./Componentes/TablaRango";
import TablaActividad from "./Componentes/TablaActividad";
import Totales from "../cobranzaXVencim/Complementos/Totales";
import RadioGroupFiltro from "@/frontend-resourses/components/Inputs/RadioGroupFiltros";
import TotalesVert from "./Componentes/Totales";
import ContadorCuotas from "./Componentes/ContadorCuotas";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";


export default function MorosidadView() {
  const { status, setFechas, setFecha, checkboxSeleccionados, setCheckboxSeleccionados } = useMorosidadStore();
  const [estaProcesado, setEstaProcesado] = useState(false);

  // show modals de filtros
  const [_showPlanesModal, setShowPlanesModal] = useState(false);
  const [_showClientesModal, setShowClientesModal] = useState(false);
  // show modal rubros
  const [_showSucursalesModal, setShowSucursalesModal] = useState(true);

  const propsShowModales = {
    propsShowModal: {
      setShowPlanes: setShowPlanesModal,
      setShowSucursales: setShowSucursalesModal,
      setShowClientes: setShowClientesModal,
    },
    status: status,
  };
  const exampleData: Record<string, any>[] = [
    { id: 1, nombre: "Lucas", edad: 30 },
    { id: 2, nombre: "Sofía", activo: true },
    { id: 3, nombre: "Tomás", notas: [10, 9, 8] },
  ];
  async function handleFetchData(_dates: FechasRango): Promise<void> {
    try {
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

  const totalesProps = {
    extras: [
      {
        titulo: "Emitido",
        icono: "💰",
        valor: estaProcesado ? 13160073.0 : 0,
      },
      {
        titulo: "Cobrado",
        icono: "💵",
        valor: estaProcesado ? 886042141203 : 0,
      },
      {
        titulo: "Mora Bruta",
        icono: "📆",
        valor: estaProcesado ? 12504.6 : 0,
        mostrarPorcentaje: true,
        porcentaje: estaProcesado ? 32.67 : 0,
      },
    ],
  };

  const totalesVertProps = [
    {
      title: "Emitido $",
      value: estaProcesado ? "1222312132151.00" : "",
    },
    {
      title: "Cobrado $",
      value: estaProcesado ? "1222312132151.00" : "",
    },
    {
      title: "Mora Bruta $",
      value: estaProcesado ? "1222312132151.00" : "",
      hasPercentage: true,
      percentageValue: estaProcesado ? "5.2" : "0",
    },
    {
      title: "No Vencido $",
      value: estaProcesado ? "1222312132151.00" : "",
    },
  ];

  const propsDatePicker = {
    labelDateInput: true,
    labelDatePicker: "Fecha Recibos",
    setFecha: setFecha,
  };
  const propsRangePicker = {
    labelRangeInput: true,
    labelRangePicker: "Vto Inicial",
    labelRangePicker2: "Vto Final",
    setFechas: setFechas,
  };

  return (
    <div className="min-h-screen">
      <ViewTitle title="Morosidad" />
      <div
        className="v1440:h-auto h-auto w-auto  ml-4 p-2 gap-2  
        grid12  v1920:mx-8"
      >
        <Card
          className="col-start-2 col-span-3 row-start-1 w-fit gap-0 px-2 items-center h-8 mb-3
          v1440:h-10 v1440:mt-0 v1440:col-start-1  "
        >
          <RadioGroupFiltro
            grupo="grupo1"
            className="w-[] gap-"
            opciones={["Fecha Emisión", "Vencimiento"]}
            checkboxSeleccionados={checkboxSeleccionados}
            setCheckboxSeleccionados={setCheckboxSeleccionados}
            disabled={estaProcesado}
            labelClassName=" w-fit mx-1 text-xxs v1440:w-[6.5rem] v1440:py-2 v1440:text-xs    "
            inputClassName="w-2.5 h-2.5"
          />
        </Card>

        <Card
          className=" col-start-2 col-span-7 row-start-1    mt-7
          v1440:row-start- v1440:col-start-1 v1440:mt-11  v1536:px-2"
        >
          <RangeDatesInput
            conBotones={true}
            estado={status}
            datePicker={propsDatePicker}
            rangeDatePicker={propsRangePicker}
            showPresets={true}
            onClearData={handleClearData}
            onFetchData={handleFetchData}
            estaProcesado={estaProcesado}
            primarySource="range"
            variant="both"
          />
        </Card>

        <Card
          className="col-start-9 py-1.5 col-span-3  flex gap-3 w-fit
           v1440:h-10 rounded-lg  items-center 
          v1440:col-start-11 v1440:mt-3 row-start-1 
         v1536:mt-0 v1536:h-12 v1536:col-start-9 v1920:col-start-10"
        >
          <ShowModalButtons estaProcesado={estaProcesado} className="flex gap-1 " props={propsShowModales} />
       
        </Card>

        <Card
          className="col-span-3 col-start-12 
          v1440:col-start-[15] v1440:col-span-2 v1440:row-start-1  v1440:h-10 v1440:mt-3 v1440:
          v1536:col-start-[14] v1536:-ml-6 v1536:px-4 v1536:mt-0 v1536:h-fit v1920:py-1.5  "
        >
          <Botonera data={exampleData} disabled={!estaProcesado} estaProcesado={estaProcesado} handleClean={handleClearData} />
        </Card>

        <TablaLocalidad
          estaProcesado={estaProcesado}
          className="row-start-4 row-span-10 col-span-4 col-start-2 
        v1440:col-span-5  v1440:col-start-1 v1920:row-span-12 v1920:row-start-4  "
        />
        <TablaCategoria
          estaProcesado={estaProcesado}
          className="row-start-4 row-span-7 col-span-3 col-start-6
        v1440:col-span-4 v1440:col-start-6  v1920:row-span-9 v1920:row-start-4"
        />
        <TablaRango
          estaProcesado={estaProcesado}
          className="row-start-3 row-span-6 col-span-4 col-start-9
        v1440:col-span-5 v1440:col-start-10 v1920:row-span-8  v1920:row-start-3"
        />
        <TablaActividad
          estaProcesado={estaProcesado}
          className="row-start-9 row-span-5 col-span-4 col-start-9
        v1440:col-span-5 v1440:col-start-10 v1920:row-start-11"
        />
        

        <Totales
          className="rounded-lg  col-start-6 col-span-3   
        row-start-11 row-span-3 h-fit pb-1 w-fit
        v1440:col-span-4 v1440:col-start-6
        v1440:row-start-11  v1440:row-span-3   
        v1536:col-start-6 v1920:row-start-13 v1536:pb-2 "
          // principales={estaProcesado ? totalesProps.principales : []}
          extras={totalesProps.extras}
        />

        <Card className="col-start-13  col-span-1 row-start-3 row-span-2 v1440:col-start-[15] v1440:col-span-2">
          <RadioGroupFiltro
            className=" flex-col justify-start  "
            grupo="grupo2"
            opciones={["Todos", "Sólo Morosos"]}
            checkboxSeleccionados={checkboxSeleccionados}
            setCheckboxSeleccionados={setCheckboxSeleccionados}
            disabled={!estaProcesado}
            labelClassName="text-xxs w-[5rem]  v1440:text-xs v1440:w-[8rem] "
            inputClassName="w-2.5 h-2.5 -mr-1 v1440:w-3 v1440:h-3 v1440:mr-1"
          />
        </Card>

        <Card className="col-start-13 col-span-1 row-start-4 row-span-2 mt-6 v1440:col-start-[15]  v1920:row-start-4 ">
          <RadioGroupFiltro
            className=" p-2 pr-0.5 flex-col justify-start "
            grupo="grupo3"
            opciones={["% Mora Total", "Mora Seleccionado"]}
            checkboxSeleccionados={checkboxSeleccionados}
            setCheckboxSeleccionados={setCheckboxSeleccionados}
            disabled={!estaProcesado}
            labelClassName="text-xxs w-[6rem] v1440:text-xs v1440:w-[9rem]   "
            inputClassName="w-2.5 h-2.5 -mr-1 v1440:w-3 v1440:h-3 v1440:mr-1  "
          />
        </Card>

        <ContadorCuotas
          disabled={!estaProcesado}
          className="col-start-13 row-start-7 my-1
        v1440:col-start-[16] v1440:col-span-1  v1920:col-start-[15] v1920:row-start-6"
        />

        <TotalesVert
          className="row-start-8 col-start-13 row-span-6   w-[5.8rem]
        v1440:col-start-[15] v1440:col-span-2 v1440:w-full v1440:row-span-4 
        v1536:row-span-7 v1536:h-fit v1536:py-3 v1920:row-start-11 v1920:col-span-2 v1920:w-fit v1920:p-3 "
          items={totalesVertProps}
        />
      </div>
    </div>
  );
}
