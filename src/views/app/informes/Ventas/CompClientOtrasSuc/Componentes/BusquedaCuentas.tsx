import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { useCompClientOtrasSucStore } from "../Store/store";
import { comprasClientesData } from "../Data/data";

export default function BusquedaCuentas({className}: { className?: string;}) {
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
  } = useCompClientOtrasSucStore();

  const propsBusqueda = {
    data: comprasClientesData,
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
      busquedaKeyCode: ["cuenta"],
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
