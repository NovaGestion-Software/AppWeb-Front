import FieldRow from "../../Shared/FieldRow";
import IdentificacionComercial from "../Blocks/IdentificacionComercial";
import Retenciones from "../Blocks/Retenciones";
import SituacionFiscal from "../Blocks/SituacionFiscal";


export default function DatosImpositivos({ tabId }: { tabId: string }) {
  return (
    <div role="tabpanel" id={tabId} aria-labelledby={tabId.replace("tab-", "")}>
      <div className="p-10">
        <FieldRow cols={8} rows={2}>
          <IdentificacionComercial variant="basic" />
        </FieldRow>
        <SituacionFiscal />
        <Retenciones />
      </div>
    </div>
  );
}
