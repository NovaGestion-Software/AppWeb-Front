// /Store/Form/Slices/metadatos.selectors.ts
import { useShallow } from "zustand/react/shallow";
import { useProovedoresStore } from "../../Store";
import type { MetadatosData } from "../Slices/metadatos.slice";

/**
 * Selector: valores del slice de metadatos
 * Devuelve sólo las props del slice (sin funciones)
 * 🔹 Usa useShallow para evitar re-render si el shape no cambia
 */
export function useMetadatosValues(): MetadatosData {
  return useProovedoresStore(
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

/**
 * Selector: acciones del slice de metadatos
 * Devuelve sólo las funciones para mutar el slice
 * 🔹 Usa useShallow para mantener refs estables sin rerenders innecesarios
 */
export function useMetadatosActions() {
  return useProovedoresStore(
    useShallow((s) => ({
      setMetadatosField: s.setMetadatosField,
      setMetadatosAll: s.setMetadatosAll,
      resetMetadatos: s.resetMetadatos,
      hydrateFromRow: s.hydrateFromRow,
    }))
  );
}

/**
 * Selector fino por campo — útil si querés subscribirte a uno solo
 * Ej: const fAlta = useMetadatosCampo("f_alta")
 * 🔹 No necesita useShallow (devuelve un valor primitivo/referencia única)
 */
export function useMetadatosCampo<K extends keyof MetadatosData>(key: K) {
  return useProovedoresStore((s) => s[key]);
}
