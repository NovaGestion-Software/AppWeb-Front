import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { useRentabilidadMPStore } from "../Store/useRentabilidadMPagoStore";
import { rentabilidadMPData } from "../Data/data";

export default function Search({ className, data }: { className?: string; data?: any }) {
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
  } = useRentabilidadMPStore();

  const propsBusqueda = {
    data: rentabilidadMPData,
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
      itemKey: "fondo",
      busquedaKeyText: ["detalle"],
      busquedaKeyCode: ["fondo"],
      textLabelProperty: "Detalle",
      codeLabelProperty: "fondo",
    },
  };

  return <BusquedaInputs props={propsBusqueda} className={`${className} row-start-2 `} />;
}
