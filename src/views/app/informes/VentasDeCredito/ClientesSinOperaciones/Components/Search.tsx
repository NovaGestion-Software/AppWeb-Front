import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { useClientesSinOperaciones } from "../Store/Store";
import { clientesSinOperacionesData } from "../Data/Data";

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
  } = useClientesSinOperaciones();

  const propsBusqueda = {
    data: clientesSinOperacionesData,
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
      busquedaKeyCode: ["cuenta"],
      busquedaKeyText: ["nombre"],
      codeLabelProperty: "Cuenta",
      textLabelProperty: "Nombre",
    },
  };

  return <BusquedaInputs props={propsBusqueda} className={`${className} row-start-2 self-center `} />;
}
