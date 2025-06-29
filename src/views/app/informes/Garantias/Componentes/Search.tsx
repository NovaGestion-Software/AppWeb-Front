import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { useGarantiasStore } from "../Store/store";
import { garantiasData } from "../Data/Data";


export default function Search({className, }: { className?: string; data?: any;}) {
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
  } = useGarantiasStore();
  const propsBusqueda = {
    data: garantiasData,
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
      busquedaKeyCode: ["fecha"],
      busquedaKeyText: ["nombre"],
      codeLabelProperty: "Fecha",
      textLabelProperty: "Nombre",
    },
  };

  return (
      <BusquedaInputs
        props={propsBusqueda}
        className={`${className} row-start-2 self-center `}
      />
  );
}
