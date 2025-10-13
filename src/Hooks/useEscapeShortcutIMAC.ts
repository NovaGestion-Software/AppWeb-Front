// /hooks/useEscapeFlowIMAC.ts
import { useEffect } from "react";
import { EstadoIMAC } from "@/views/app/Proveedores/Store/Status/types";

type AsyncOrSync = void | Promise<void>;

export type UseEscapeFlowIMACProps<Row = unknown> = {
  /** Estado actual del flujo IMAC */
  estado: EstadoIMAC;

  /** Navegar a home cuando estado === INICIAL */
  onGoHome: () => void;

  /** Transiciones IMAC explícitas */
  toInicial: () => void;
  toConsulta: () => void;

  /** Operaciones para revertir/limpiar (opcionales si tu vista no las necesita) */
  resetAll?: () => void;                                // cancelar ALTA → limpiar todo
  getDatosIniciales?: () => Row | null | undefined;     // fuente para rehidratar
  hydrateFromRow?: (row: Row) => AsyncOrSync;           // rehidratar slices
  setDatosActuales?: (v: Row | null) => void;           // limpiar buffer edición
  setCambiosPendientes?: (v: boolean) => void;          // limpiar flag cambios
  bumpFormEpoch?: () => void;                           // forzar remonte UI
onConsultaToInicial?: () => void; 
  /** Habilitar/Deshabilitar listener */
  enabled?: boolean;
};

export function useEscapeFlowIMAC<Row = unknown>({
  estado,
  onGoHome,
  toInicial,
  toConsulta,
  resetAll,
  getDatosIniciales,
  hydrateFromRow,
  setDatosActuales,
  setCambiosPendientes,
  bumpFormEpoch,
   onConsultaToInicial,
  enabled = true,
}: UseEscapeFlowIMACProps<Row>) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      switch (estado) {
        case EstadoIMAC.INICIAL: {
          // INICIAL → home
          resetAll?.();
          onGoHome();
          break;
        }
        case EstadoIMAC.ALTA: {
          // ALTA → descartar alta y volver a INICIAL
          resetAll?.();
          toInicial();
          break;
        }
        case EstadoIMAC.MODIFICACION: {
          // MODIFICACIÓN → rehidratar y volver a CONSULTA
          const row = getDatosIniciales?.();
          if (row && hydrateFromRow) {
            await hydrateFromRow(row); 
          }
          setDatosActuales?.(null);       
          setCambiosPendientes?.(false); 

          toConsulta();                    
          break;
        }
        case EstadoIMAC.CONSULTA: {
          onConsultaToInicial?.();
          toInicial();
          resetAll?.();

          break;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    estado,
    onGoHome,
    toInicial,
    toConsulta,
    resetAll,
    getDatosIniciales,
    hydrateFromRow,
    setDatosActuales,
     onConsultaToInicial,
    setCambiosPendientes,
    bumpFormEpoch,
    enabled,
  ]);
}
