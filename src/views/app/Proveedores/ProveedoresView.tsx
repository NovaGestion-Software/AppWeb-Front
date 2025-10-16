import { ViewTitle } from "@/frontend-resourses/components";
import BotoneraPrincipal from "./Components/Botoneras/BotoneraPrincipal";
import BotoneraSecundaria from "./Components/Botoneras/BotoneraSecundaria";
import ProovedorForm from "./Components/Form/ProovedorForm";
import { useEffect } from "react";
import { registerProveedorErrorMappers } from "@/lib/errors/mappers/proveedores.mapper";
import { useEscapeEnProveedores } from "./Hooks/useEscapeEnProveedores";
import { useRegisterUnsavedGuard } from "@/Hooks/useRegisterUnsavedGuard";
import { useIs } from "./Store/Status/status.selectors";
import { useProveedoresStore } from "./Store/Store";

export default function ProvedoresView() {
  const { isModificacion } = useIs();
  const resetAll = useProveedoresStore((s) => s.resetAll);
  useEscapeEnProveedores();
  useRegisterUnsavedGuard({
    when: isModificacion,
    onDiscard: resetAll,
  });

  useEffect(() => {
    registerProveedorErrorMappers();
  }, []);

  return (
    <div>
      <ViewTitle title="Proveedores" />
      <div className="grid2 gap-1 px-6 py-2 bg-white">
        <BotoneraPrincipal />
        <BotoneraSecundaria />
        {/* <BotoneraTest /> */}
        <ProovedorForm />
      </div>
    </div>
  );
}
