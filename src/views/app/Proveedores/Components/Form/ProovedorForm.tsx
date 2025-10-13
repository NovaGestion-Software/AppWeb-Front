import { useEffect } from "react";
import { useTabs } from "../../Store/Tabs/Tab.selectors";
import FolderTabs from "../Tabs/FolderTabs";
import DatosComerciales from "./sections/DatosComerciales";
import DatosImpositivos from "./sections/DatosImpositivos";
import FormaPago from "./sections/FormaPago";
import { requestFocusDOM } from "@/frontend-resourses/Hooks/Focus/requestFocusDOM";
import BotoneraTerciaria from "../Botoneras/BotoneraTerciaria";

/**
 * Orquesta las secciones del proveedor en tabs.
 * Se deja listo para integrar validación y submit más adelante.
 */
export default function ProovedorForm() {
  const { tabs, activeTabIndex } = useTabs();
  useEffect(() => {
    // Al montar la vista → enfocar el input
    requestFocusDOM("proovedores:idprovee", { selectAll: true, scrollIntoView: true });
  }, []);
  return (
    <section className="mx-6 mt-4  col-span-full row-start-2">
      <FolderTabs />

      <div
        className="rounded-b-lg border-t-0   p-4 
             bg-gradient-to-r from-white min-h-screen via-slate-100 to-white shadow-sm"
      >
        <BotoneraTerciaria />

        {activeTabIndex === 0 && <DatosComerciales tabId={tabs[0].id} />}
        {activeTabIndex === 1 && <DatosImpositivos tabId={tabs[1].id} />}
        {activeTabIndex === 2 && <FormaPago tabId={tabs[2].id} />}
      </div>
    </section>
  );
}
