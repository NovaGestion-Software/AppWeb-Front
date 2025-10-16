import FieldRow from "../../Shared/FieldRow";
import IdentificacionComercial from "../Blocks/IdentificacionComercial";
import Retenciones from "../Blocks/Retenciones";
import SituacionFiscal from "../Blocks/SituacionFiscal";
import { PropsSections } from "./DatosComerciales";


export default function DatosComerciales({ tabId, active = false }: PropsSections) {
  return (
    <div role="tabpanel" id={tabId} aria-labelledby={tabId.replace("tab-", "")} aria-hidden={!active}    className={active ? "block" : "hidden"}>
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
