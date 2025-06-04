import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { useCompClientOtrasSucStore } from "../Store/store";
import { dataTablaActividad } from "../../morosidad/ts/data";

export default function BusquedaCuentas({className}: { className?: string;}) {
  const {
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
    data: dataTablaActividad,
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
      itemKey: "seccion",
      busquedaKeyText: ["nseccion"],
      busquedaKeyCode: ["seccion"],
      textLabelProperty: "Seccion",
      codeLabelProperty: "Codigo",
    },
  };

  return (
      <BusquedaInputs
        props={propsBusqueda}
        className={`${className}`}
      />
  );
}
