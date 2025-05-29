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

// Componente contenedor
const Card = ({ children, className }: {children?: React.ReactNode, className?: string;}) => 
<div className={`${className} bg-white p-1 rounded-lg overflow-hidden shadow-sm shadow-gray-600`}>{children}</div>;

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
        className="v1440:h-auto w-auto  ml-4 p-2 gap-2  
        grid12  v1920:mx-8"
      >
        <RadioGroupFiltro
          className="text-[0.5rem] col-span-3 row-start-1 w-fit gap-0 px-2 items-center h-8
          v1440:h-10 v1440:mt-3"
          grupo="grupo1"
          opciones={["Fecha Emisión", "Vencimiento"]}
          checkboxSeleccionados={checkboxSeleccionados}
          setCheckboxSeleccionados={setCheckboxSeleccionados}
          disabled={estaProcesado}
          labelClassName="text-[0.5rem] w-[4.5rem] v1440:text-[0.6rem] v1440:w-[5.5rem]    "
          inputClassName="w-2.5 h-2.5"
        />

        <RangeDatesInput
          className=" bg-white  col-start-1 col-span-7 w-fit px-1 
          row-start-2   
          v1440: v1440:col-start-1 v1440:mt-2 v1536:px-2  "
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
        <Card className="col-start-7 col-span-3  flex gap-3 w-fit
           v1440:h-10 rounded-lg  items-center 
          v1440:col-start-8 v1440:mt-3 row-start-1 
         v1536:mt-0 v1536:h-14 v1536:col-start-9">
          <ShowModalButtons
            estaProcesado={estaProcesado}
            className="flex gap-1 "
            props={propsShowModales}
          />
        </Card>

        <Botonera
          className="bg-white w-fit p-1 px-2 h-8
          col-span-3 col-start-11 
          v1440:col-start-[15] v1440:col-span-2 v1440:row-start-1  v1440:h-11 v1440:mt-2
          v1536:col-start-[14] v1536:-ml-6 v1536:px-4 v1536:mt-0   "
          data={exampleData}
          disabled={!estaProcesado}
          estaProcesado={estaProcesado}
          handleClean={handleClearData}
        />
        <TablaLocalidad
          estaProcesado={estaProcesado}
          className="row-start-4 row-span-10 col-span-4 col-start-1 
        v1440:col-span-5  v1440:col-start-1 v1920:row-span-12 v1920:row-start-4  "
        />
        <TablaCategoria
          estaProcesado={estaProcesado}
          className="row-start-4 row-span-7 col-span-3 col-start-5
        v1440:col-span-4 v1440:col-start-6  v1920:row-span-9 v1920:row-start-4"
        />
        <TablaRango
          estaProcesado={estaProcesado}
          className="row-start-3 row-span-6 col-span-4 col-start-8
        v1440:col-span-5 v1440:col-start-10 v1920:row-span-8  v1920:row-start-3"
        />
        <TablaActividad
          estaProcesado={estaProcesado}
          className="row-start-9 row-span-5 col-span-4 col-start-8
        v1440:col-span-5 v1440:col-start-10 v1920:row-start-11"
        />

        <Totales
          className="rounded-lg  col-start-5 col-span-3  
        row-start-11 row-span-3 h-fit pb-1 w-fit
        v1440:col-span-4 v1440:col-start-6
        v1440:row-start-11  v1440:row-span-3   
        v1536:col-start-6 v1920:row-start-13 v1536:pb-2 "
          // principales={estaProcesado ? totalesProps.principales : []}
          extras={totalesProps.extras}
        />

        <RadioGroupFiltro
          className="text-xs col-start-12  col-span-1 row-start-3  
          row-span-2 h-fit flex-col w-fit p-2 justify-start
          v1440:col-start-[15] v1440:col-span-2 "
          grupo="grupo2"
          opciones={["Todos", "Sólo Morosos"]}
          checkboxSeleccionados={checkboxSeleccionados}
          setCheckboxSeleccionados={setCheckboxSeleccionados}
          disabled={!estaProcesado}
          labelClassName="text-[0.5rem] w-[4.5rem]  v1440:text-xs v1440:w-[8rem] "
          inputClassName="w-2.5 h-2.5 -mr-1 v1440:w-3 v1440:h-3 v1440:mr-1"
        />
        <RadioGroupFiltro
          className="text-xs col-start-12 col-span-1 row-start-5 row-span-2
            w-fit h-fit p-2 pr-0.5 flex-col 
          justify-start
          v1440:col-start-[15]  v1920:row-start-4 "
          grupo="grupo3"
          opciones={["% Mora Total", "Mora Seleccionado"]}
          checkboxSeleccionados={checkboxSeleccionados}
          setCheckboxSeleccionados={setCheckboxSeleccionados}
          disabled={!estaProcesado}
          labelClassName="text-[0.5rem] w-[5.4rem] v1440:text-xs v1440:w-[9rem]   "
          inputClassName="w-2.5 h-2.5 -mr-1 v1440:w-3 v1440:h-3 v1440:mr-1  "
        />
        <ContadorCuotas
          disabled={!estaProcesado}
          className="col-start-12 row-start-7 my-1
        v1440:col-start-[16] v1440:col-span-1  v1920:col-start-[15] v1920:row-start-5"
        />

        <TotalesVert
          className="row-start-8 col-start-12 row-span-6 p-1 
        rounded-md shadow-md shadow-gray-600 w-[5.8rem] bg-white 
        v1440:col-start-[15] v1440:col-span-2 v1440:w-full v1440:row-span-4 
        v1536:row-span-7 v1536:h-fit v1536:py-3 v1920:row-start-11 v1920:col-span-2 v1920:w-fit v1920:p-3 "
          items={totalesVertProps}
        />
      </div>
    </div>
  );
}
