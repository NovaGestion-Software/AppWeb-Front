import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { useVentasPorCondicionStore } from "../Store/useVentasPorCondicionStore";
import { ventasPorCondicionData } from "../Data/data";

export default function Search({ className }: { className?: string; data?: any }) {
  const {
    estaProcesado,
    // filtros
    buscado,
    setBuscado,
    idsCoincidentes,
    indiceSeleccionado,
    setIndiceGlobal,
    setIdsCoincidentes,
    setIndiceSeleccionado,
    ultimoIndiceBusqueda,
    setUltimoIndiceBusqueda,
    setNavegandoCoincidentes,
    indiceGlobal,
    setModoNavegacion,
  } = useVentasPorCondicionStore();

  const propsBusqueda = {
    data: ventasPorCondicionData,
    disabled: !estaProcesado,
    // busqueda
    buscado,
    setBuscado,
    idsCoincidentes,
    indiceSeleccionado,
    setIndiceGlobal,
    setIdsCoincidentes,
    setIndiceSeleccionado,
    ultimoIndiceBusqueda,
    setUltimoIndiceBusqueda,
    setNavegandoCoincidentes,
    indiceGlobal,
    setModoNavegacion,
    inputsLength: 2,
    modoBusqueda: "simple" as "simple",
    keysBusqueda: {
      itemKey: "fecha",
      busquedaKeyText: ["sucursal"],
      busquedaKeyCode: ["fecha"],
      textLabelProperty: "Sucursal",
      codeLabelProperty: "Fecha",
    },
  };

  return <BusquedaInputs props={propsBusqueda} className={`${className} row-start-2 `} />;
}
