import { useShallow } from "zustand/react/shallow";
import { useProveedoresStore } from "../../Store";

/**
 * Selector: valores de Identificación
 * Se exponen únicamente las props necesarias para la UI.
 */
export const useIdentificacionValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      idprovee: s.idprovee,     // number
      nombre: s.nombre,         // string
      nfantasia: s.nfantasia,   // string | undefined
    }))
  );

/**
 * Selector: acciones de Identificación
 * No se incluyen funciones de hidratación en el slice; la hidratación es global en la Store.
 */
export const useIdentificacionActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setIdprovee: s.setIdprovee,
      setNombre: s.setNombre,
      setNfantasia: s.setNfantasia,
      setIdentificacionAll: s.setIdentificacionAll,
      resetIdentificacion: s.resetIdentificacion,
    }))
  );
