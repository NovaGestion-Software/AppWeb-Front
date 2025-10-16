import { useShallow } from "zustand/react/shallow";
import { useProveedoresStore } from "../../Store";

/** Valores agrupados SOLO de Datos Comerciales (Ubicación + Contacto) */
export const useDatosComercialesValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      // Ubicación
      domicilio1: s.domicilio1,
      domicilio2: s.domicilio2,
      localidad: s.localidad,
      cpostal: s.cpostal,
      calle1: s.calle1,
      calle2: s.calle2,
      latitud: s.latitud,
      longitud: s.longitud,
      idcodprov: s.idcodprov,

      // Contacto
      codarea: s.codarea,
      telefono: s.telefono,
      codarea1: s.codarea1,
      telefono1: s.telefono1,
      codarea2: s.codarea2,
      telefono2: s.telefono2,
      email: s.email,
    }))
  );

/** Acciones agrupadas (Datos Comerciales) */
export const useDatosComercialesActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setField: s.setDatosComercialesField,
      setAll: s.setDatosComercialesAll,
      resetDatosComerciales: s.resetDatosComerciales,
    }))
  );
