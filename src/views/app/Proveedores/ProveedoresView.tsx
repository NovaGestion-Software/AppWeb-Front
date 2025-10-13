import { ViewTitle } from "@/frontend-resourses/components";
import BotoneraPrincipal from "./Components/Botoneras/BotoneraPrincipal";
import BotoneraSecundaria from "./Components/Botoneras/BotoneraSecundaria";
import ProovedorForm from "./Components/Form/ProovedorForm";
import { useEffect } from "react";
import { registerProveedorErrorMappers } from "@/lib/errors/mappers/proveedores.mapper";
import { useEscapeEnProveedores } from "./Hooks/useEscapeEnProveedores";

export default function ProvedoresView() {

useEscapeEnProveedores()

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
