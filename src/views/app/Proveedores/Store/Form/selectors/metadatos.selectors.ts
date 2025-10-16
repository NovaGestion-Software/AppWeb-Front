import { useShallow } from "zustand/react/shallow";
import { useProveedoresStore } from "../../Store";
import type { MetadatosData } from "../Slices/metadatos.slice";

/** Valores del slice de metadatos */
export function useMetadatosValues(): MetadatosData {
  return useProveedoresStore(
    useShallow((s) => ({
      inha: s.inha,
      idnodo: s.idnodo,
      icambio: s.icambio,
      ncambio: s.ncambio,
      usuario_a: s.usuario_a,
      usuario_m: s.usuario_m,
      usuario_b: s.usuario_b,
      f_alta: s.f_alta,
      f_modi: s.f_modi,
      f_baja: s.f_baja,
    }))
  );
}

/** Acciones del slice de metadatos */
export function useMetadatosActions() {
  return useProveedoresStore(
    useShallow((s) => ({
      setMetadatosField: s.setMetadatosField,
      setMetadatosAll: s.setMetadatosAll,
      resetMetadatos: s.resetMetadatos,
    }))
  );
}

/** Selector fino por campo — suscripción granular */
export function useMetadatosCampo<K extends keyof MetadatosData>(key: K) {
  return useProveedoresStore((s) => s[key]);
}
