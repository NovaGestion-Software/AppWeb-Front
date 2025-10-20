import FieldRow from "../../Shared/FieldRow";
import ContactoComercial from "../Blocks/ContactoComercial";
import FechasMeta from "../Blocks/FechasMeta";
import IdentificacionComercial from "../Blocks/IdentificacionComercial";
import UbicacionComercial from "../Blocks/UbicacionComercial";
export type PropsSections = { tabId: string; active?: boolean };
export default function DatosComerciales({ tabId, active = false }: PropsSections) {
  return (
    <div role="tabpanel" id={tabId} aria-labelledby={tabId.replace("tab-", "")} aria-hidden={!active}    className={active ? "block" : "hidden"}>
      <div className="p-10">
        <FieldRow cols={8} rows={2}>
          <IdentificacionComercial />
          <FechasMeta />
        </FieldRow>
        <FieldRow cols={8} className="gap-y-4 auto-rows-min ">
          <UbicacionComercial />
          <ContactoComercial />
        </FieldRow>
      </div>
    </div>
  );
}
