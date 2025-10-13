// /views/app/Proveedores/Actions/useConfirmarAlta.ts
import { useCallback } from "react";
import { useProveedoresStore } from "../Store/Store";
import {
  ProveedorDomainSchema,
  type ProveedorDomain,
} from "../Data/domain/proveedor.domain.schema";
import { repoAltaProveedor } from "../Data/Service";
import { manejarErrorAxios } from "@/services/utils/helpers";
import { useNotifier } from "@/Hooks/useNotifier";


export function useConfirmarAlta(canConfirmAlta: boolean) {
  const { notifySuccess, notifyError, confirm } = useNotifier();

  const onConfirmAlta = useCallback(async () => {
    if (!canConfirmAlta) return;

    const s = useProveedoresStore.getState();
    if (s.isProcessing) return;

    try {
      s.setProcessing?.(true);

      const modificadoMaybe: unknown = s.datosActuales ?? s.snapshotActualFromSlices?.();
      if (!modificadoMaybe) {
        await confirm("No hay datos para dar de alta.", "Sin datos");
        return;
      }

      // Validar/normalizar Domain
      const nuevo: ProveedorDomain = ProveedorDomainSchema.parse(modificadoMaybe);

      const resp = await repoAltaProveedor(nuevo);
      // resp: { ok: boolean; status: number; message?: string; id? ... }

      if (resp.status === 200 && resp.ok) {
        // si vino id generado, hidratarlo
        let confirmado: ProveedorDomain = nuevo;
        const genId = Number((resp as any).id);
        if (Number.isFinite(genId)) {
          confirmado = { ...nuevo, idprovee: genId };
        }

        // Snapshots y estado
        s.setDatosIniciales?.(confirmado);
        s.setDatosActuales?.(null);
        s.setCambiosPendientes?.(false);
        s.dispatch?.("CONFIRMAR"); // transición IMAC a post-alta
        notifySuccess("Proveedor creado correctamente.");
        return;
      }

      if (resp.status === 404) {
        // Error desconocido → confirm para forzar lectura
        await confirm(resp.message ?? "No se pudo crear el proveedor (404).", "Error");
        return;
      }

      // Fallback para cualquier otro caso
      await confirm(resp.message ?? "No se pudo crear el proveedor.", "Error");
    } catch (err) {
      manejarErrorAxios(err, "Error al dar de alta el proveedor");
      notifyError("Ocurrió un error al dar de alta el proveedor.");
    } finally {
      s.setProcessing?.(false);
    }
  }, [canConfirmAlta, confirm, notifyError, notifySuccess]);

  return { onConfirmAlta };
}
