// /views/app/Proveedores/Actions/useConfirmarAlta.ts
import { useCallback } from "react";
import { useProveedoresStore } from "../Store/Store";
import {
  ProveedorDomainSchema,
  REQUIRED_ORDER,
  type ProveedorDomain,
} from "../Data/domain/proveedor.domain.schema";
import { repoAltaProveedor } from "../Data/Service";
import { manejarErrorAxios } from "@/services/utils/helpers";
import { useNotifier } from "@/Hooks/useNotifier";
import { validateProveedorDomain } from "../Data/domain/validation.core";
import { presentProveedorFormErrors } from "../Store/Form/Slices/validation.ui";
import { requestFocusDOM } from "@/frontend-resourses/Hooks/Focus/requestFocusDOM";


export function useConfirmarAlta(canConfirmAlta: boolean) {
  const { notifySuccess, notifyError, confirm } = useNotifier();

  const onConfirmAlta = useCallback(async () => {
    if (!canConfirmAlta) return;

    const s = useProveedoresStore.getState();
    if (s.isProcessing) return;

    try {
      s.setProcessing?.(true);

      const modificadoMaybe: unknown =
        s.datosActuales ?? s.snapshotActualFromSlices?.();

      if (!modificadoMaybe) {
        await confirm("No hay datos para dar de alta.", { title: "Sin datos", cancel: false });
        return;
      }

      const result = validateProveedorDomain(
        modificadoMaybe as ProveedorDomain,
        ProveedorDomainSchema,
        REQUIRED_ORDER
      );

      if (!result.ok) {
        const { domId } = presentProveedorFormErrors({
          errors: result.errors,
          firstKey: result.firstKey,
          setErrors: s.setErrors!,
          setActiveTabById: s.setActiveTabId,
          focus: (id) => requestFocusDOM(id, { selectAll: true, scrollIntoView: true }),
        });

        await confirm("Faltan completar campos requeridos.", { title: "Validación", cancel: false });

        if (domId) {
          setTimeout(() => {
            requestFocusDOM(domId, { selectAll: true, scrollIntoView: true });
          }, 180);
        }
        return; // 🚫 no llamar al servicio de alta
      }

      const nuevo: ProveedorDomain = modificadoMaybe as ProveedorDomain;

      // Llamada a servicio
      const resp = await repoAltaProveedor(nuevo);
      // resp: { ok: boolean; status: number; message?: string; id? ... }

      if (resp.status === 200 && resp.ok) {
        // Si vino id generado, hidratarlo
        let confirmado: ProveedorDomain = nuevo;
        const genId = Number((resp as any).id);
        if (Number.isFinite(genId)) {
          confirmado = { ...nuevo, idprovee: genId };
        }

        // Snapshots/estado + limpiar errores del form
        s.setDatosIniciales?.(confirmado);
        s.setDatosActuales?.(null);
        s.setCambiosPendientes?.(false);
        s.clearAllErrors?.();
        s.dispatch?.("CONFIRMAR");

        notifySuccess("Proveedor creado correctamente.");
        return;
      }

      if (resp.status === 404) {
        await confirm(resp.message ?? "No se pudo crear el proveedor (404).", { title: "Error" });
        return;
      }

      await confirm(resp.message ?? "No se pudo crear el proveedor.", { title: "Error" });
    } catch (err) {
      manejarErrorAxios(err, "Error al dar de alta el proveedor");
      notifyError("Ocurrió un error al dar de alta el proveedor.");
    } finally {
      s.setProcessing?.(false);
    }
  }, [canConfirmAlta, confirm, notifyError, notifySuccess]);

  return { onConfirmAlta };
}