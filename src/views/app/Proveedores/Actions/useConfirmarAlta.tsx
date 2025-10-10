// /views/app/Proveedores/Actions/useConfirmarAlta.ts
import { useCallback } from "react";
import { useProovedoresStore } from "../Store/Store";
import { manejarErrorAxios } from "@/services/ApiPhpService";
import {
  ProveedorDomainSchema,
  type ProveedorDomain,
} from "../Data/domain/proveedor.domain.schema";
import { repoAltaProveedor } from "../Data/Service";

export function useConfirmarAlta(canConfirmAlta: boolean) {
  const onConfirmAlta = useCallback(async () => {
    if (!canConfirmAlta) return;

    const s = useProovedoresStore.getState();

    // Evitar doble submit si por algún motivo ya está procesando
    if (s.isProcessing) return;

    try {
      s.setProcessing?.(true);

      // Tomamos el “modificado” desde actuales o construimos snapshot desde los slices
      const modificadoMaybe: unknown =
        s.datosActuales ?? s.snapshotActualFromSlices?.();

      if (!modificadoMaybe) {
        console.warn("No hay datos para alta");
        return;
      }

      // Validar/normalizar a Domain aquí (evita discrepancias de tipos)
      const nuevo: ProveedorDomain = ProveedorDomainSchema.parse(modificadoMaybe);

      console.log("CONFIRMAR (ALTA) → enviando payload (Domain)", { nuevo });

      // Repo: Domain -> DTO OUT -> valida (Zod) -> POST grabarDatos.php (A)
      const response = await repoAltaProveedor(nuevo);

      console.log("🟢 Respuesta repoAltaProveedor:", response);

      // Si el backend devuelve el id generado, actualizamos el snapshot en store
      let confirmado: ProveedorDomain = nuevo;
      if (response?.id && Number.isFinite(Number(response.id))) {
        confirmado = { ...nuevo, idprovee: Number(response.id) };
      }

      // Snapshots y flags
      s.setDatosIniciales?.(confirmado);
      s.setDatosActuales?.(null);
      s.setCambiosPendientes?.(false);
      s.dispatch?.("CONFIRMAR"); // o transición IMAC que uses
    } catch (err) {
      manejarErrorAxios(err, "Error al dar de alta el proveedor");
      // No tocamos snapshots si falló
    } finally {
      s.setProcessing?.(false);
    }
  }, [canConfirmAlta]);

  return { onConfirmAlta };
}
