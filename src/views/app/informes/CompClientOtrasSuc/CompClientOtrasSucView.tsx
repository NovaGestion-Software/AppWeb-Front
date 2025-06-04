import { ViewTitle } from "@/frontend-resourses/components";
import AltaClienteDates from "./Componentes/AltaClienteDates";
import ComprasDates from "./Componentes/ComprasDates";
import BusquedaCuentas from "./Componentes/BusquedaCuentas";
import BusquedaSucursales from "./Componentes/BusquedaSucursales";

export default function CompClientOtrasSucView() {
  return (
    <div className="min-h-svh">
      <ViewTitle title="Compras de Clientes en otras Sucursales" />
      <div
        className="v1440:h-auto h-auto w-auto  ml-4 p-2 gap-2  
        grid2  v1920:mx-8"
      >
        <AltaClienteDates className="row-start-3  self-end" />
        <ComprasDates className="col-start-5 row-start-3 self-end" />
        <BusquedaCuentas className="row-start-4  self-start" />
        <BusquedaSucursales />
      </div>
    </div>
  );
}
