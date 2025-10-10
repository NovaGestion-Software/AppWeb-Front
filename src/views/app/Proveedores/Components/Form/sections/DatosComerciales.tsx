// import { SimularCargaRetenciones } from "../../devTools/btnfalse";
import FieldRow from "../../Shared/FieldRow";
import ContactoComercial from "../Blocks/ContactoComercial";
import FechasMeta from "../Blocks/FechasMeta";
import IdentificacionComercial from "../Blocks/IdentificacionComercial";
import UbicacionComercial from "../Blocks/UbicacionComercial";

export default function DatosComerciales({ tabId }: { tabId: string }) {
  return (
    <div role="tabpanel" id={tabId} aria-labelledby={tabId.replace("tab-", "")}>
      <div className="p-10">
        <FieldRow cols={8} rows={2}>
          <IdentificacionComercial />
          <FechasMeta />

          {/* <SimularCargaRetenciones /> */}
        </FieldRow>
        <FieldRow cols={8} className="gap-y-4 auto-rows-min ">
          <UbicacionComercial />
          <ContactoComercial />
        </FieldRow>
      </div>
    </div>
  );
}
