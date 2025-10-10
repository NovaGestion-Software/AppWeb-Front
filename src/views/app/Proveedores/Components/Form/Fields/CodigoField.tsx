// /Proovedores/Components/Form/Fields/CodigoField.tsx
import { useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import { GiBroom } from "react-icons/gi";
import { FlexibleInputField } from "@/frontend-resourses/components";
import { IdentVariant } from "../Blocks/IdentificacionComercial";
import { inputDisabledClass } from "../Config/classes";

import { useProovedoresStore } from "../../../Store/Store";
import { useIdentificacionValues, useIdentificacionActions } from "../../../Store/Form/selectors/identificacion.selectors";

// ⛔️ Sacar este import viejo
// import { getProveedorById } from "../../../Data/Service/proovedores.services";

// ✅ Nuevo repo (usa DTOs + mappers)
import { EstadoIMAC } from "../../../Store/Status/types";
import { repoGetProveedor } from "../../../Data/Service";

export default function CodigoField({ disabled = false, variant = "full" }: { disabled?: boolean; variant?: IdentVariant }) {
  // idprovee viene del slice Identificación (BE)
  const { idprovee } = useIdentificacionValues();
  const { setIdprovee } = useIdentificacionActions();

  // helpers del store
  const setProcessing = useProovedoresStore((s) => s.setProcessing);
  const hydrateAllSlicesFromRow = useProovedoresStore((s) => s.hydrateAllSlicesFromRow);
  const setDatosIniciales = useProovedoresStore((s) => s.setDatosIniciales);
  const setDatosActuales = useProovedoresStore((s) => s.setDatosActuales);

  const resetAll = useProovedoresStore((s) => s.resetAll);
  const setEstado = useProovedoresStore((s) => s.setEstado);

  // habilita búsqueda si hay id válido, no está deshabilitado y estamos en "full"
  const canSearch = !!idprovee && idprovee > 0 && !disabled && variant === "full";

  const handleSearch = useCallback(async () => {
    if (!canSearch) return;

    try {
      setProcessing?.(true);

      const id = Number(idprovee);
      if (!Number.isFinite(id) || id <= 0) {
        // si querés, podés limpiar o sólo salir
        return;
      }

      // 🔎 nuevo fetch (repo → api → dto.in → mapper → domain)
      const domain = await repoGetProveedor(id);

      if (!domain) {
        // no encontrado
        resetAll?.();
        return;
      }

      // 💧 hidratar todos los slices con el Domain (mismas claves que BE, tipos adaptados)
      await useProovedoresStore.getState().hydrateAllSlicesFromDomain(domain);

      // snapshots: inicial = domain; actual = null (modo consulta)
      setDatosIniciales?.(domain as any);
      setDatosActuales?.(null);

      setEstado?.(EstadoIMAC.CONSULTA);
      console.log("✅ Proveedor cargado:", id);
    } catch (e) {
      console.error("❌ Error buscando proveedor:", e);
    } finally {
      setProcessing?.(false);
    }
  }, [canSearch, idprovee, setProcessing, resetAll, setDatosIniciales, setDatosActuales, setEstado, hydrateAllSlicesFromRow]);

  const handleClear = useCallback(() => {
    resetAll?.();
    setIdprovee?.(0 as any);
  }, [resetAll, setIdprovee]);

  const btnEnableClass = "cursor-pointer hover:bg-slate-800 hover:scale-105 transition-all duration-300 active:scale-95 hover:text-white";

  return (
    <div className="flex items-center gap-2">
      <FlexibleInputField
        inputType="number"
        value={String(idprovee ?? 0)} // FlexibleInputField (number) espera string
        focusId="proovedores:idprovee"
        placeholder="ID Proveedor"
        labelWidth="w-0"
        labelClassName="hidden"
        inputClassName={`w-full rounded border px-2 py-1 bg-gray-100 ${inputDisabledClass}`}
        disabled={disabled || variant !== "full"}
        onChange={(raw) => {
          const n = Number(raw);
          setIdprovee(Number.isNaN(n) ? (0 as any) : (n as any));
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && variant === "full") handleSearch();
        }}
      />

      {variant === "full" && (
        <button
          type="button"
          aria-label="Buscar por código"
          onClick={handleSearch}
          disabled={!canSearch}
          className={["grid h-9 w-12 place-items-center rounded border ", canSearch ? btnEnableClass : "cursor-not-allowed opacity-60"].join(" ")}
        >
          <IoSearch size={16} />
        </button>
      )}

      {variant === "full" && (
        <button
          type="button"
          aria-label="Limpiar"
          onClick={handleClear}
          disabled={!canSearch && !(idprovee && idprovee > 0)}
          className={["grid h-9 w-12 place-items-center rounded border ", canSearch || (idprovee && idprovee > 0) ? btnEnableClass : "cursor-not-allowed opacity-60"].join(" ")}
        >
          <GiBroom size={16} />
        </button>
      )}
    </div>
  );
}
