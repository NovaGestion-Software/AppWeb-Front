// /views/app/Proveedores/Actions/useConfirmarModificacion.ts
import { useCallback } from "react";
import { useProovedoresStore } from "../Store/Store";
import { manejarErrorAxios } from "@/services/ApiPhpService";

// ✅ nuevo repo (DTO out + validación + endpoint grabarDatos.php)
import { repoModificarProveedor } from "../Data/Service/proveedores.repository";
import type { ProveedorDomain } from "../Data/domain/proveedor.domain.schema";

export function useConfirmarModificacion(canConfirmModificacion: boolean) {
  const onConfirmMod = useCallback(async () => {
    if (!canConfirmModificacion) return;

    const s = useProovedoresStore.getState();

    // Domain (UI) — snapshots actuales del formulario
    const original: ProveedorDomain | null = s.datosIniciales ?? null;
    // si no guardaste un "actual", podés construirlo desde los slices
    const modificado: ProveedorDomain | null =
      s.datosActuales ?? s.snapshotActualFromSlices?.();

    if (!original || !modificado) {
      console.warn("No hay datos para modificar");
      return;
    }

    const id = Number(original.idprovee);
    if (!Number.isFinite(id) || id <= 0) {
      console.warn("ID inválido para modificación");
      return;
    }

    try {
      console.log("CONFIRMAR (MODIFICACIÓN) → enviando payload (Domain)", {
        original,
        modificado,
      });

      // 🔁 Repo arma DTO OUT (x2), valida con Zod y hace POST a grabarDatos.php
      const response = await repoModificarProveedor(id, original, modificado);

      console.log("🟢 Respuesta repoModificarProveedor:", response);

      if (response?.ok) {
        // Sincronizá snapshots tras confirmar
        s.setDatosIniciales?.(modificado);
        s.setDatosActuales?.(null);
        s.setCambiosPendientes?.(false);
        s.dispatch?.("CONFIRMAR"); // o tu transición IMAC equivalente
      } else {
        console.error("❌ Error en respuesta modificar:", response?.message);
        // Volvemos a dejar el snapshot inicial por seguridad
        s.setDatosIniciales?.(original);
      }
    } catch (err) {
      manejarErrorAxios(err, "Error al modificar proveedor");
      // rollback suave del snapshot inicial
      s.setDatosIniciales?.(original);
    }
  }, [canConfirmModificacion]);

  return { onConfirmMod };
}
