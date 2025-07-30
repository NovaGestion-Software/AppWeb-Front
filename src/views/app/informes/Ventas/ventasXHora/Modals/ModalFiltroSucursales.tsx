import ModalFiltro from "@/frontend-resourses/components/Modales/ModalFiltro";
import { SucursalesModal } from "@/types";
import { useVentasHoraStore } from "../store/useVentasHoraStore";
import { FaStoreAlt } from "react-icons/fa";

export default function ModalFiltroSucursales() {
  const { sucursalesDisponibles, sucursalesSeleccionadas, setSucursalesDisponibles, setSucursalesSeleccionadas, showSucursales, setShowSucursales } = useVentasHoraStore();
  // render sucursalesitems prueba
  const renderSucursalesItem = (item: SucursalesModal) => {
    return (
      <>
        {item.nsucursal} - {item.sucursal}
      </>
    );
  };

  return (
    <>
      {/** Modales */}
      <ModalFiltro<SucursalesModal>
        title="Sucursales"
        renderItem={renderSucursalesItem}
        showModal={showSucursales}
        setShowModal={setShowSucursales}
        datos={sucursalesDisponibles}
        itemsDisponibles={sucursalesDisponibles}
        itemsSeleccionados={sucursalesSeleccionadas}
        setItemsDisponibles={setSucursalesDisponibles}
        setItemsSeleccionados={setSucursalesSeleccionadas}
        addIconClassName=" text-white w-14 h-12 m-0 flex items-center justify-center "
        iconReact={<FaStoreAlt size={25} />}
      />
    </>
  );
}
