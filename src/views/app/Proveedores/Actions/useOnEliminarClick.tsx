import { useCallback } from "react";
import { useConfirmarEliminar } from "./useConfirmarEliminar";
import { useNotifier } from "@/Hooks/useNotifier";

export function useOnEliminarClick() {
  const { confirm } = useNotifier();
  // ⚠️ pasamos requireConfirm = false para que el hook no vuelva a pedir confirmación
  const { onConfirmEliminar } = useConfirmarEliminar(false);

  const onEliminar = useCallback(async () => {
    const ok = await confirm("¿Seguro que querés eliminar este proveed1241241241or?", "Eliminar");
    if (!ok) return;
    await onConfirmEliminar(); // corre la eliminación real
  }, [confirm, onConfirmEliminar]);

  return { onEliminar };
}
