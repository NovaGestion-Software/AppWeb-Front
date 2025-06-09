import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import {VentasUnidadNegocioStore } from "../Store/store";
import { ventasUnidadNegocioData } from "../Data/data";

export default function SearchInput({className}: { className?: string;}) {
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
  } = VentasUnidadNegocioStore();

  const propsBusqueda = {
    data: ventasUnidadNegocioData,
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
      itemKey: "cuenta",
      busquedaKeyText: ["nombre"],
      busquedaKeyCode: ["codigo"],
      textLabelProperty: "Nombre",
      codeLabelProperty: "Cuenta",
    },
  };

  return (
      <BusquedaInputs
        props={propsBusqueda}
        className={`${className}`}
      />
  );
}
