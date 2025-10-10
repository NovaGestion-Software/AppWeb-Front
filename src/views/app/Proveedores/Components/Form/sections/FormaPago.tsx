import FieldRow from "../../Shared/FieldRow";
import FormaPagoBlock from "../Blocks/FormaPagoBlock";
import IdentificacionComercial from "../Blocks/IdentificacionComercial";


export default function FormaPago({ tabId }: { tabId: string }) {
  return (
    <div role="tabpanel" id={tabId} aria-labelledby={tabId.replace("tab-", "")}>
      <div className="p-10">
        <FieldRow cols={8} rows={2}>
          <IdentificacionComercial variant="basic" />
        </FieldRow>
      <FormaPagoBlock />
      </div>
    </div>
  );
}
