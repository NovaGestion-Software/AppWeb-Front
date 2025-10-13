// Actions/handleSearch.ts
import { emitirErrorGenerico } from "@/lib/errors/utils/emitirErrorGenerico";
import { useProveedoresStore } from "../Store/Store";
import { repoGetProveedor } from "../Data/Service";
import { EstadoIMAC } from "../Store/Status/types";

export async function handleSearchProveedor(idInput: number | string) {
  const s = useProveedoresStore.getState();

  try {
    s.setProcessing?.(true);

    const id = Number(idInput);
    if (!Number.isFinite(id) || id <= 0) {
      // Validación local: id inválido
      emitirErrorGenerico(
        "PROV",
        "VALIDATION.ID_INVALIDO",
        "Ingresá un código de proveedor válido.",
        "validation",
        "low",
        { idInput }
      );
      return;
    }

    const domain = await repoGetProveedor(id);

    if (!domain) {
      // 200 OK pero sin data → avisar con el mapper PROV
      emitirErrorGenerico(
        "PROV",
        "BUSINESS.SIN_DATOS",
        "No se encontraron proveedores para el criterio.",
        "business",
        "low",
        { criterio: { idprovee: id } }
      );

      // restaurar estado visual coherente
      s.resetAll?.();
      s.setDatosIniciales?.(null);
      s.setDatosActuales?.(null);
      s.setEstado?.(EstadoIMAC.INICIAL); // o CONSUL/INICIAL según tu flujo
      return;
    }

    // ok → hidratar dominio en store
    s.hydrateAllSlicesFromRow?.(domain as any);
    s.setDatosIniciales?.(domain);
    s.setDatosActuales?.(null);
    s.setEstado?.(EstadoIMAC.CONSULTA);
  } catch (e) {
    // Excepción real (network/parsing/etc.)
    // Podés loguear si querés; el mensaje al usuario ya lo generan tus capas de error si usás helpers en catch a nivel superior.
    console.error("❌ Error buscando proveedor:", e);
  } finally {
    s.setProcessing?.(false);
  }
}
