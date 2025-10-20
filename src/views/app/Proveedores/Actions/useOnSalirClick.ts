import { useCallback } from "react";
import { useConfirmarSalirReal } from "./useConfirmarSalirReal";
import { useNotifier } from "@/Hooks/useNotifier";

export function useOnSalirClick(redirectTo: string = "/home") {
  const { confirm } = useNotifier();
  const { onConfirmSalir } = useConfirmarSalirReal(redirectTo);

  const onSalir = useCallback(async (e?: React.MouseEvent | React.KeyboardEvent) => {
    // Blindaje contra navegación implícita
    if (e) {
      if ("preventDefault" in e) e.preventDefault();
      if ("stopPropagation" in e) e.stopPropagation();
    }

    console.log('first')
    const ok = await confirm("¿Seguro que querés salir?", { title: "Salir" });
    if (!ok) return;
    // Acción real: reset + navigate
    await onConfirmSalir();
  }, [confirm, onConfirmSalir]);

  return { onSalir };
}
