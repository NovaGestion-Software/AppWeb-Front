import { ViewTitle } from "@/frontend-resourses/components";
import AltaClienteDates from "./Componentes/AltaClienteDates";
import ComprasDates from "./Componentes/ComprasDates";
import BusquedaCuentas from "./Componentes/BusquedaCuentas";
import BusquedaSucursales from "./Componentes/BusquedaSucursales";
import Tabla from "./Componentes/Tabla";
import { useCompClientOtrasSucStore } from "./Store/store";
import Botonera from "./Componentes/Botonera";
import { comprasClientesData } from "./Data/data";

export default function CompClientOtrasSucView() {
  const { estaProcesado } = useCompClientOtrasSucStore();
  return (
    <div className="min-h-svh">
      <ViewTitle title="Compras de Clientes en otras Sucursales" />
      <div
        className="v1440:h-auto h-auto w-auto  ml-4 p-2 gap-2  
        grid2  v1920:mx-8"
      >
        <Botonera estaProcesado data={comprasClientesData} className="col-start-12" />
        <AltaClienteDates className="row-start-2  self-end"  />
        <ComprasDates className="col-start-5 row-start-2 self-end"  />
        <BusquedaCuentas className="row-start-3  self-start" />
        <BusquedaSucursales />
        <Tabla
          estaProcesado={estaProcesado}
          className="row-start-4 row-span-8 col-start-1
         col-span-10"
        />
      </div>
    </div>
  );
}
