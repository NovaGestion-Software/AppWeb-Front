// /views/app/Proveedores/Actions/useConfirmarModificacion.ts
import { useCallback } from "react";
import { useProveedoresStore } from "../Store/Store";

// ✅ nuevo repo (DTO out + validación + endpoint grabarDatos.php)
import { repoModificarProveedor } from "../Data/Service/proveedores.repository";
import type { ProveedorDomain } from "../Data/domain/proveedor.domain.schema";
import { manejarErrorAxios } from "@/services/utils/helpers";
import { useNotifier } from "@/Hooks/useNotifier";
import { EstadoIMAC } from "../Store/Status/types";


export function useConfirmarModificacion(canConfirmModificacion: boolean) {
  const { notifySuccess, notifyError, confirm } = useNotifier();

  const onConfirmMod = useCallback(async () => {
    if (!canConfirmModificacion) return;

    const s = useProveedoresStore.getState();
    const original: ProveedorDomain | null = s.datosIniciales ?? null;
    const modificado: ProveedorDomain | null =
      s.datosActuales ?? s.snapshotActualFromSlices?.();

    if (!original || !modificado) {
      await confirm("No hay datos para modificar.",{cancel:false,});
      return;
    }

    const id = Number(original.idprovee);
    if (!Number.isFinite(id) || id <= 0) {
      await confirm("ID inválido para modificación.", {title:"ID inválido"});
      return;
    }

    try {
      s.setProcessing?.(true);

      const resp = await repoModificarProveedor(id, original, modificado);
      // resp: { ok: boolean; status: number; message?: string; ... }

      if (resp.status === 204) {
        // Modificación sin cambios → confirm para forzar lectura
        await confirm("No hubo cambios para guardar en este proveedor.", {title:"Sin cambios", cancel:false});
        // Estado: no tocamos snapshots, limpiamos “pendientes” y quedamos en CONSULTA
        s.setCambiosPendientes?.(false);
        s.setEstado?.(EstadoIMAC.CONSULTA);
        return;
      }

      if (resp.status === 200 && resp.ok) {
        // Éxito → sincronizar snapshots + transición IMAC + toast
        s.setDatosIniciales?.(modificado);
        s.setDatosActuales?.(null);
        s.setCambiosPendientes?.(false);
        s.dispatch?.("CONFIRMAR");
        notifySuccess("Cambios guardados correctamente.");
        return;
      }

      // Otros estados (o ok=false) → confirm como error legible
      await confirm(resp.message ?? "No se pudo modificar el proveedor.", {title: "Error"});
      // rollback suave de snapshots
      s.setDatosIniciales?.(original);
    } catch (err) {
      manejarErrorAxios(err, "Error al modificar proveedor");
      s.setDatosIniciales?.(original);
      notifyError("Ocurrió un error al modificar el proveedor.");
    } finally {
      s.setProcessing?.(false);
    }
  }, [canConfirmModificacion, confirm, notifyError, notifySuccess]);

  return { onConfirmMod };
}
