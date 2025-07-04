import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { useVentasClientesOtrosMedios } from "../Store/Store";
import { ventasClientesOtrosMediosData } from "../Data/data";

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
  } = useVentasClientesOtrosMedios();

  const propsBusqueda = {
    data: ventasClientesOtrosMediosData,
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

  return <BusquedaInputs props={propsBusqueda} className={`${className} row-start-2 self-center `} />;
}
