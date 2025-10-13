// /Store/Form/selectors/datosComerciales.selectors.ts
import { useShallow } from "zustand/react/shallow";
import { useProveedoresStore } from "../../Store";

/** Valores agrupados SOLO de Datos Comerciales (Ubicación + Contacto) */
export const useDatosComercialesValues = () =>
  useProveedoresStore(
    useShallow((s) => ({
      // Ubicación (claves BE)
      domicilio1: s.domicilio1,
      domicilio2: s.domicilio2,
      localidad: s.localidad,
      cpostal: s.cpostal,
      calle1: s.calle1,
      calle2: s.calle2,
      idcodprov: s.idcodprov,
      latitud: s.latitud,
      longitud: s.longitud,

      // Contacto (claves BE)
      codarea: s.codarea,
      telefono: s.telefono,
      codarea1: s.codarea1,
      telefono1: s.telefono1,
      codarea2: s.codarea2,
      telefono2: s.telefono2,
      email: s.email,
      fax: s.fax,

    }))
  );

/** Acciones agrupadas (Datos Comerciales) */
export const useDatosComercialesActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setField: s.setDatosComercialesField,
      setAll: s.setDatosComercialesAll,
      resetDatosComerciales: s.resetDatosComerciales,
      hydrateFromRow: s.hydrateFromRow, // si usás hidratación por sección
    }))
  );

/** Hooks granulares que ANTES estaban acá pero ahora viven en Metadatos */
export const useInhabilitado = () => useProveedoresStore((s) => s.inha);       // boolean (0/1 → bool)
export const useFechaAlta   = () => useProveedoresStore((s) => s.f_alta);      // string | undefined
