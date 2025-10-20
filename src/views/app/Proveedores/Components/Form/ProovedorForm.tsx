import { useEffect } from "react";
import { useTabs } from "../../Store/Tabs/Tab.selectors";
import FolderTabs from "../Tabs/FolderTabs";
import DatosComerciales from "./sections/DatosComerciales";
import DatosImpositivos from "./sections/DatosImpositivos";
import FormaPago from "./sections/FormaPago";
import { requestFocusDOM } from "@/frontend-resourses/Hooks/Focus/requestFocusDOM";
import BotoneraTerciaria from "../Botoneras/BotoneraTerciaria";
import { useProveedoresStore } from "../../Store/Store";

/**
 * Orquesta las secciones del proveedor en tabs.
 */
export default function ProovedorForm() {
  const { tabs, activeTabIndex } = useTabs();
  const { setId } = useProveedoresStore();
  useEffect(() => {
    // Al montar la vista → enfocar el input
    requestFocusDOM("proveedores:idprovee", { selectAll: true, scrollIntoView: true });
    setId("provedores:form");
  }, []);
  return (
    <section className="mx-6 mt-4  col-span-full row-start-2">
      <FolderTabs />

      <div
        id="provedores:form"
        className="rounded-b-lg border-t-0   p-4 
             bg-gradient-to-r from-white min-h-screen via-slate-100 to-white shadow-sm"
      >
        <BotoneraTerciaria />

        <DatosComerciales tabId={tabs[0].id} active={activeTabIndex === 0} />
        <DatosImpositivos tabId={tabs[1].id} active={activeTabIndex === 1} />
        <FormaPago tabId={tabs[2].id} active={activeTabIndex === 2} />
      </div>
    </section>
  );
}
