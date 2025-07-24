import { ListaFiltrosAplicados } from "@/frontend-resourses/components/Complementos/ListaFiltrosAplicados";
import { useVentasHoraStore } from "../store/useVentasHoraStore";

export default function ListaSucursalesFiltradas() {
  const { sucursalesDisponibles, sucursalesSeleccionadas } = useVentasHoraStore();

  // Formateo a array de strings
  const sucursalesDisponiblesStr = sucursalesDisponibles.map((s) => s.nsucursal);
  const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.nsucursal);
  return (
    <>
      <ListaFiltrosAplicados className="w-[29rem] v1440:w-[32rem] v1536:w-[36rem] " itemsDisponibles={sucursalesDisponiblesStr} itemsSeleccionados={sucursalesSeleccionadasStr} />
    </>
  );
}
