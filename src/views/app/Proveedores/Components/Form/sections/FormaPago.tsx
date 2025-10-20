import FieldRow from "../../Shared/FieldRow";
import FormaPagoBlock from "../Blocks/FormaPagoBlock";
import IdentificacionComercial from "../Blocks/IdentificacionComercial";
import { PropsSections } from "./DatosComerciales";

export default function FormaPago({ tabId, active = false }: PropsSections) {
  return (
    <div role="tabpanel" id={tabId} aria-labelledby={tabId.replace("tab-", "")} aria-hidden={!active} className={active ? "block" : "hidden"}>
      <div className="p-10">
        <FieldRow cols={8} rows={2}>
          <IdentificacionComercial variant="basic" />
        </FieldRow>
        <FormaPagoBlock />
      </div>
    </div>
  );
}
