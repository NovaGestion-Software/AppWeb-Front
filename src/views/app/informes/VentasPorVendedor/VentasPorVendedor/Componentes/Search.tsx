import BusquedaInputs from "@/frontend-resourses/components/Tables/Busqueda/BusquedaInputs";
import { useVentasPorVendedor } from "../Store/Store";
import { ventasPorVendedorData } from "../Data/Data";

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
  } = useVentasPorVendedor();
  const propsBusqueda = {
    data: ventasPorVendedorData,
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
      busquedaKeyText: ["descripcion", "nombre"],
      busquedaKeyCode: ["codigo",],
      textLabelProperty: "Nombre o Descripción",
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
