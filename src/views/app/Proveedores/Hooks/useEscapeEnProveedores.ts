import { useNavigate } from "react-router-dom";
import { useProveedoresStore } from "../Store/Store";
import { useEstadoActual } from "../Store/Status/status.selectors";
import { useEscapeFlowIMAC } from "@/Hooks/useEscapeShortcutIMAC";
import { requestFocusDOM } from "@/frontend-resourses/Hooks/Focus/requestFocusDOM";

export function useEscapeEnProveedores() {
  const navigate = useNavigate();
  const estado = useEstadoActual();

  const s = useProveedoresStore.getState();
  useEscapeFlowIMAC({
    estado,
    onGoHome: () => navigate("/home"),

    toInicial: () => s.toInicial?.(),
    toConsulta: () => s.toConsulta?.(),

   onConsultaToInicial: () => {
      // Esperar al ciclo de render siguiente para asegurar existencia del input
      requestAnimationFrame(() => {
        requestFocusDOM("proveedores:idprovee", {
          selectAll: true,
          scrollIntoView: true,
        });
      });
    },
    resetAll: () => s.resetAll?.(),
    getDatosIniciales: () => s.datosIniciales,
    hydrateFromRow: (row) => s.hydrateAllSlicesFromRow?.(row),
    setDatosActuales: (v) => s.setDatosActuales?.(v),
    setCambiosPendientes: (v) => s.setCambiosPendientes?.(v),
    bumpFormEpoch: () => s.bumpFormEpoch?.(),
  });
}
