import { ViewTitle } from "@/frontend-resourses/components";
import DateInput from "./Componentes/DateInput";
import Tabla from "./Componentes/Tabla";
import Botonera from "./Componentes/Botonera";
import { useState } from "react";
import { ListaFiltrosAplicados } from "@/frontend-resourses/components/Complementos/ListaFiltrosAplicados";
import { useIngresosStore } from "./Store/store";

export default function IngresosView() {

  const {sucursalesDisponibles, sucursalesSeleccionadas} = useIngresosStore()
  const [_showUniNegoModal, setShowUniNegoModal] = useState(false);
  // show modal rubros
  const [_showSucursalesModal, setShowSucursalesModal] = useState(false);
  const sucursalesDisponiblesStr = sucursalesDisponibles.map((s) => s.nsucursal);
  const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.nsucursal);

  const propsBotonera = {
    propsShowModal: {
      setShowSucursales: setShowSucursalesModal,
      setShowUniNego: setShowUniNegoModal,
    },
  };

  return (
    <div className="min-h-screen">
      <ViewTitle title="Ingresos" />
      <div className="grid grid-cols-12 grid-rows-6 gap-1 my-1 ml-10 mr-6  ">
        <DateInput className="row-span-1 self-end mb-1" />
        <Tabla className="row-start-2 row-span-4 col-span-10" />
        <Botonera props={propsBotonera} className="row-start-1 self-center  col-start-9 v1536:col-start-8 v1536:ml-12 v1920:col-start-9 " />
        <ListaFiltrosAplicados itemsDisponibles={sucursalesDisponiblesStr} 
        itemsSeleccionados={sucursalesSeleccionadasStr} className="row-start-2 row-span-2  col-span-2 " />
      </div>
    </div>
  );
}
