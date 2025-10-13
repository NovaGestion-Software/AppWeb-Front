// /views/app/Proveedores/Actions/useConfirmarEliminar.ts
import { useCallback } from "react";
import { useProveedoresStore } from "../Store/Store";
import type { ProveedorDomain } from "../Data/domain/proveedor.domain.schema";
import { repoEliminarProveedor } from "../Data/Service/proveedores.repository";
import { manejarErrorAxios } from "@/services/utils/helpers";
import { useNotifier } from "@/Hooks/useNotifier";
import { EstadoIMAC } from "../Store/Status/types";

export function useConfirmarEliminar(requireConfirm: boolean = true) {
  const { confirm, notifySuccess, notifyError } = useNotifier();

  const onConfirmEliminar = useCallback(async () => {
    const s = useProveedoresStore.getState();
    if (s.isProcessing) return;

    const original: ProveedorDomain | null = s.datosIniciales ?? null;
    if (!original) {
      await confirm("No hay un proveedor seleccionado para eliminar.", {title:"Sin datos"});
      return;
    }

    const id = Number(original.idprovee);
    if (!Number.isFinite(id) || id <= 0) {
      await confirm("ID inválido para eliminar.", {title:"ID inválido"});
      return;
    }

    // 🔸 confirmación interna (solo si requireConfirm === true)
    if (requireConfirm) {
      const acepto = await confirm("¿Seguro que querés eliminar este proveedor?", {title: "Eliminar"});
      if (!acepto) return;
    }

    try {
      s.setProcessing?.(true);

      const resp = await repoEliminarProveedor(id, original);
      if (resp.status === 200 && resp.ok) {
        s.resetAll?.();
        s.setEstado?.(EstadoIMAC.INICIAL);
        notifySuccess("Proveedor eliminado correctamente.");
        return;
      }

      if (resp.status === 404) {
        await confirm(resp.message ?? "No se pudo eliminar el proveedor (404).", {title:"Error"});
        return;
      }

      await confirm(resp.message ?? "No se pudo eliminar el proveedor.", {title:"Error"});
    } catch (err) {
      manejarErrorAxios(err, "Error al eliminar el proveedor");
      notifyError("Ocurrió un error al eliminar el proveedor.");
    } finally {
      s.setProcessing?.(false);
    }
  }, [confirm, notifyError, notifySuccess, requireConfirm]);

  return { onConfirmEliminar };
}
