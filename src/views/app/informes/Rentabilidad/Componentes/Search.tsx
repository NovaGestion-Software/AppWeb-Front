import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";

import { useRentabilidadStore } from "../Store/useRentabilidadStore";
import { rentabilidadData } from "../Data/data";

export default function Search({className, data}: { className?: string; data?: any;}) {
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
  } = useRentabilidadStore();
  const propsBusqueda = {
    data: rentabilidadData,
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
      itemKey: "codigo",
      busquedaKeyText: ["descripcion"],
      busquedaKeyCode: ["codigo"],
      textLabelProperty: "Descripción",
      codeLabelProperty: "Código",
    },
  };

  return (
      <BusquedaInputs
        props={propsBusqueda}
        className={`${className} row-start-2 self-center `}
      />
  );
}
