// /Proveedores/Store/Status/status.selectors.ts
import { useProovedoresStore } from "../Store";
import { useShallow } from "zustand/react/shallow";

import { EstadoIMAC } from "./types";

/** Estado actual (enum → primitivo, no requiere shallow) */
export const useEstadoActual = () =>
  useProovedoresStore((s) => s.estado);

/** Flags agrupadas (usa shallow para evitar renders innecesarios por objeto nuevo) */
export const useFlagsEstado = () =>
  useProovedoresStore(
    useShallow((s) => ({
      hayCambiosPendientes: s.hayCambiosPendientes,
      isProcessing: s.isProcessing,
    }))
  );

/** Permisos derivados (booleans → primitivos). Igual usamos shallow por el objeto. */
export const usePermisosIMAC = () =>
  useProovedoresStore(
    useShallow((s) => ({
      canCrear: s.canCrear(),
      canEditar: s.canEditar(),
      canEliminar: s.canEliminar(),
      canConfirmar: s.canConfirmar(),
      canCancelar: s.canCancelar(),
    }))
  );

/** Acciones agrupadas (referencias estables, pero retornamos objeto → usar shallow) */
export const useEstadoActions = () =>
  useProovedoresStore(
    useShallow((s) => ({
      dispatch: s.dispatch,
      setCambiosPendientes: s.setCambiosPendientes,
      setProcessing: s.setProcessing,
      toInicial: s.toInicial,
      toAlta: s.toAlta,
      toModificacion: s.toModificacion,
      toConsulta: s.toConsulta,
    }))
  );

/** Helper estándar para patrón Opción A: estado + dispatch con shallow */
export const useEstadoAndDispatch = () =>
  useProovedoresStore(
    useShallow((s) => ({
      estado: s.estado,
      dispatch: s.dispatch,
    }))
  );

/** Predicados útiles (derivados locales) */
export const useIs = () => {
  const estado = useEstadoActual();
  return {
    isInicial: estado === EstadoIMAC.INICIAL,
    isAlta: estado === EstadoIMAC.ALTA,
    isModificacion: estado === EstadoIMAC.MODIFICACION,
    isConsulta: estado === EstadoIMAC.CONSULTA,
  };
};

/** Derivados para habilitar/deshabilitar campos del formulario */
export const usePermisosCampos = () =>
  useProovedoresStore(
    useShallow((s) => {
      const estado = s.estado as EstadoIMAC;

      // Código habilitado en: INICIAL | CONSULTA
      const canEditCodigo =
        estado === EstadoIMAC.INICIAL || estado === EstadoIMAC.CONSULTA;

      // Resto de campos habilitados en: ALTA | MODIFICACION
      const canEditCampos =
        estado === EstadoIMAC.ALTA || estado === EstadoIMAC.MODIFICACION;

      return { canEditCodigo, canEditCampos };
    })
  );
  

  export const useFormEpoch = () =>
  useProovedoresStore((s) => s.formEpoch);
