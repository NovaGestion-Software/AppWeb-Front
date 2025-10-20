// /views/app/Proveedores/Actions/useConfirmarModificacion.ts
import { useCallback } from "react";
import { useProveedoresStore } from "../Store/Store";

// ✅ nuevo repo (DTO out + validación + endpoint grabarDatos.php)
import { repoModificarProveedor } from "../Data/Service/proveedores.repository";
import { ProveedorDomainSchema, REQUIRED_ORDER, type ProveedorDomain } from "../Data/domain/proveedor.domain.schema";
import { useNotifier } from "@/Hooks/useNotifier";
import { EstadoIMAC } from "../Store/Status/types";
import { validateProveedorDomain } from "../Data/domain/validation.core";
import { presentProveedorFormErrors } from "../Store/Form/Slices/validation.ui";
import { requestFocusDOM } from "@/frontend-resourses/Hooks/Focus/requestFocusDOM";

export function useConfirmarModificacion(canConfirmModificacion: boolean) {
  const { notifySuccess, notifyError, confirm } = useNotifier();

  const onConfirmMod = useCallback(async () => {
    if (!canConfirmModificacion) return;

    const s = useProveedoresStore.getState();
    const original: ProveedorDomain | null = s.datosIniciales ?? null;
    const modificado: ProveedorDomain | null = s.datosActuales ?? s.snapshotActualFromSlices?.();

    if (!original || !modificado) {
      await confirm("No hay datos para modificar.", { cancel: false });
      return;
    }

    const id = Number(original.idprovee);
    if (!Number.isFinite(id) || id <= 0) {
      await confirm("ID inválido para modificación.", { title: "ID inválido" });
      return;
    }

    // 🧱 Frontera #1: validar dominio antes de llamar al repo
    const result = validateProveedorDomain(modificado, ProveedorDomainSchema, REQUIRED_ORDER);
    if (!result.ok) {
      const { domId } = presentProveedorFormErrors({
        errors: result.errors,
        firstKey: result.firstKey,
        setErrors: s.setErrors!,
        setActiveTabById: s.setActiveTabId,
        focus: (id) => requestFocusDOM(id, { selectAll: true, scrollIntoView: true }),
      });

      await confirm("Faltan completar campos requeridos.", { title: "Validación", cancel: false });

      // Re-aplicar foco luego de cerrar el modal (deja que desmonte)
      if (domId) {
        setTimeout(() => {
          requestFocusDOM(domId, { selectAll: true, scrollIntoView: true });
        }, 180); // si tu modal cierra en ~180ms; ajustá si usás otro timing
      }

      return; // no llamar repo/api
    }

    try {
      s.setProcessing?.(true);

      const resp = await repoModificarProveedor(id, original, modificado);
      // resp: { ok: boolean; status: number; message?: string; ... }

      if (resp.status === 204) {
        await confirm("No hubo cambios para guardar en este proveedor.", { title: "Sin cambios", cancel: false });
        s.setCambiosPendientes?.(false);
        s.setEstado?.(EstadoIMAC.CONSULTA);
        return;
      }

      if (resp.status === 200 && resp.ok) {
        s.setDatosIniciales?.(modificado);
        s.setDatosActuales?.(null);
        s.setCambiosPendientes?.(false);
        s.clearAllErrors?.(); // limpiar errores al guardar ok
        s.dispatch?.("CONFIRMAR");
        notifySuccess("Cambios guardados correctamente.");
        return;
      }

      await confirm(resp.message ?? "No se pudo modificar el proveedor.", { title: "Error" });
      s.setDatosIniciales?.(original);
    } catch {
      s.setDatosIniciales?.(original);
      notifyError("Ocurrió un error al modificar el proveedor.");
    } finally {
      s.setProcessing?.(false);
    }
  }, [canConfirmModificacion, confirm, notifyError, notifySuccess]);

  return { onConfirmMod };
}
