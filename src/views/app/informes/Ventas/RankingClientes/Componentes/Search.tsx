import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { useRankingClientesStore } from "../Store/useRankingClientesStore";
import { rankingClientesData } from "../Data/data";

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
  } = useRankingClientesStore();

  const propsBusqueda = {
    data: rankingClientesData,
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
      itemKey: "cliente",
      busquedaKeyText: ["nombre"],
      busquedaKeyCode: ["cliente"],
      textLabelProperty: "Nombre",
      codeLabelProperty: "Cliente",
    },
  };

  return <BusquedaInputs props={propsBusqueda} className={`${className} row-start-2 `} />;
}
