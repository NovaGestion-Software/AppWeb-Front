import { useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import { GiBroom } from "react-icons/gi";
import { FlexibleInputField } from "@/frontend-resourses/components";
import { IdentVariant } from "../Blocks/IdentificacionComercial";
import { inputDisabledClass } from "../Config/classes";

import { useProveedoresStore } from "../../../Store/Store";
import { useIdentificacionValues, useIdentificacionActions } from "../../../Store/Form/selectors/identificacion.selectors";


import { requestFocusDOM } from "@/frontend-resourses/Hooks/Focus/requestFocusDOM";
import { handleSearchProveedor } from "../../../Actions/handleSearch";

export default function CodigoField({ disabled = false, variant = "full" }: { disabled?: boolean; variant?: IdentVariant }) {
  // idprovee viene del slice Identificación (BE)
  const { idprovee } = useIdentificacionValues();
  const { setIdprovee } = useIdentificacionActions();


  const resetAll = useProveedoresStore((s) => s.resetAll);

  // habilita búsqueda si hay id válido, no está deshabilitado y estamos en "full"
  const canSearch = !!idprovee && idprovee > 0 && !disabled && variant === "full";


  const handleClear = useCallback(() => {
    resetAll?.();
    setIdprovee?.(0 as any);
    requestFocusDOM("proveedores:idprovee", { selectAll: true, scrollIntoView: true });
  }, [resetAll, setIdprovee]);

  const btnEnableClass = "cursor-pointer hover:bg-slate-800 hover:scale-105 transition-all duration-300 active:scale-95 hover:text-white";

  return (
    <div className="flex items-center gap-2">
      <FlexibleInputField
        inputType="number"
        value={String(idprovee ?? 0)} // FlexibleInputField (number) espera string
        focusId="proveedores:idprovee"
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
          if (e.key === "Enter" && variant === "full") handleSearchProveedor(idprovee);
        }}
      />

      {variant === "full" && (
        <button
          type="button"
          aria-label="Buscar por código"
          onClick={() => handleSearchProveedor(idprovee)}
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
