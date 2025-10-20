import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProveedoresStore } from "@/views/app/Proveedores/Store/Store";

export function useConfirmarSalirReal(redirectTo: string = "/home") {
  const navigate = useNavigate();

  const onConfirmSalir = useCallback(async () => {
    const s = useProveedoresStore.getState();
    if (s.isProcessing) return;

    try {
      s.setProcessing?.(true);
      s.resetAll?.();
      s.setEstado?.("INICIAL" as any); // o EstadoIMAC.INICIAL
      navigate(redirectTo);
    } finally {
      s.setProcessing?.(false);
    }
  }, [navigate, redirectTo]);

  return { onConfirmSalir };
}
