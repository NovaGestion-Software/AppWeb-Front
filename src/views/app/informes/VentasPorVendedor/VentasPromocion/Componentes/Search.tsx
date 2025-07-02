import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { ventasEnPromocionData } from "../Data/Data";
import { useVentasEnPromocion } from "../Store/Store";

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
  } = useVentasEnPromocion();
  const propsBusqueda = {
    data: ventasEnPromocionData,
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
      itemKey: "vende",
      busquedaKeyCode: ["vende"],
      busquedaKeyText: ["nombre"],
      codeLabelProperty: "Vende",
      textLabelProperty: "Nombre",
    },
  };

  return <BusquedaInputs props={propsBusqueda} className={`${className} row-start-2 self-center `} />;
}
