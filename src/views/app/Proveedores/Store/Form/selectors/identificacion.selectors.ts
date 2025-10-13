// /Store/Form/selectors/identificacion.selectors.ts
import { useShallow } from "zustand/react/shallow";
import { useProveedoresStore } from "../../Store";

// 🔎 Valores agrupados (BE keys)
export const useIdentificacionValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      idprovee: s.idprovee,     // number
      nombre: s.nombre,         // string (TrimmedStr)
      nfantasia: s.nfantasia,   // string | undefined
    }))
  );

// 🛠️ Acciones agrupadas (BE keys)
export const useIdentificacionActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setIdprovee: s.setIdprovee,
      setNombre: s.setNombre,
      setNfantasia: s.setNfantasia,
      setIdentificacionAll: s.setIdentificacionAll,
      resetIdentificacion: s.resetIdentificacion,
      // Si tu slice expone hidratación por sección, dejalo:
      hydrateFromRow: s.hydrateFromRow, // <- quitalo si no lo usás
    }))
  );
