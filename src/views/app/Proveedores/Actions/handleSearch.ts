// /views/app/Proveedores/Actions/handleSearch.ts
import { useProovedoresStore } from "@/views/app/Proveedores/Store/Store";
import { repoGetProveedor } from "../Data/Service";
import { EstadoIMAC } from "../Store/Status/types";

export async function handleSearchProveedor(idInput: number | string) {
  const s = useProovedoresStore.getState();

  try {
    s.setProcessing?.(true);

    const id = Number(idInput);
    if (!Number.isFinite(id) || id <= 0) {
      console.log("error");
      return;
    }

    const domain = await repoGetProveedor(id);

    if (!domain) {
      s.resetAll?.();
      s.setMensajeInfo?.("Proveedor no encontrado");
      return;
    }

    // hidratar (si querés, renombrá a hydrateAllSlicesFromDomain)
    s.hydrateAllSlicesFromRow?.(domain as any);

    s.setDatosIniciales?.(domain);
    s.setDatosActuales?.(null);
    s.setEstado?.(EstadoIMAC.CONSULTA);
  } catch (e) {
    console.error("❌ Error buscando proveedor:", e);
  } finally {
    s.setProcessing?.(false);
  }
}
