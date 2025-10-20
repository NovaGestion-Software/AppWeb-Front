import Field from "../../Shared/Field";
import FieldRow from "../../Shared/FieldRow";
import { FlexibleInputField } from "@/frontend-resourses/components";

import { useSituacionFiscalValues } from "../../../Store/Form/selectors/datosImpositivos.selectors";
import { useCampoImpositivo } from "../hooks/useCampoImpositivo";
import { inputsClass, inputsSelectClass } from "../Config/classes";
import { useProveedoresStore } from "../../../Store/Store";
import { DatosImpositivosFieldSchemas as FS } from "@/views/app/Proveedores/Data/formDraft/datosImpositivos.schema";

/**
 * Bloque de situación fiscal del contribuyente.
 * Contiene condición tributaria, tipo y número de documento, e ingresos brutos.
 */
export default function SituacionFiscal({
  showTipoDoc = true,
}: {
  /** Si es false, oculta el selector Tipo Doc y muestra solo CUIT. */
  showTipoDoc?: boolean;
}) {
  // Valores actuales (BE)
  const { idctrib, idtdoc, cuit, ibruto } = useSituacionFiscalValues();

  // Setter genérico del slice impositivo (BE)
  const setImpositivosField = useProveedoresStore((s) => s.setDatosImpositivosField);

  // Hooks por campo (con parse para selects numéricos y validación por campo)
  const ct = useCampoImpositivo("idctrib", idctrib, setImpositivosField as any, {
    parse: (raw) => (Number.isNaN(Number(raw)) ? 1 : (Number(raw) as any)),
    validator: FS.idctrib,
  });

  const td = useCampoImpositivo("idtdoc", idtdoc, setImpositivosField as any, {
    parse: (raw) => (Number.isNaN(Number(raw)) ? 0 : (Number(raw) as any)), // 0 = CUIT
    validator: FS.idtdoc,
  });

  const cuitH = useCampoImpositivo("cuit", cuit, setImpositivosField as any, {
    validator: FS.cuit,
  });

  const ib = useCampoImpositivo("ibruto", ibruto, setImpositivosField as any, {
    validator: FS.ibruto,
  });

  // Opciones BE (string para el <select>)
  const COND_TRIB_OPTS = [
    { label: "Resp. Inscripto", value: "1" },
    { label: "Exento", value: "2" },
    { label: "Cat. 3", value: "3" },
    { label: "Cat. 4", value: "4" },
  ];

  const DOC_OPTS = [
    { label: "CUIT", value: "0" },
    { label: "CUIL", value: "1" },
    { label: "DNI", value: "2" },
  ];

  return (
    <FieldRow cols={12} className="gap-3">
      {/* Condición Tributaria  */}
      <Field label="Cond. Trib." colSpan={4} required>
        <FlexibleInputField
          inputType="select"
          options={COND_TRIB_OPTS}
          focusId="proveedores:idcodprov"
          value={ct.value}
          onChange={ct.onChange}
          onBlur={ct.onBlur}
          disabled={ct.disabled}
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsSelectClass}
        />
        {ct.error && <small className="text-red-500">{ct.error}</small>}
      </Field>

      {/* Tipo Doc (numérico BE) */}
      <Field label="Tipo Doc." colSpan={2}>
        <FlexibleInputField
          inputType="select"
          focusId="proveedores:idtdoc"
          options={DOC_OPTS}
          value={td.value}
          onChange={td.onChange}
          onBlur={td.onBlur}
          disabled={td.disabled}
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsSelectClass}
        />
        {td.error && <small className="text-red-500">{td.error}</small>}
      </Field>

      {/* CUIT */}
      <Field label="CUIT" colSpan={showTipoDoc ? 3 : 4} required>
        <FlexibleInputField
          inputType="text"
          focusId="proveedores:cuit"
          value={cuitH.value}
          onChange={cuitH.onChange}
          onBlur={cuitH.onBlur}
          placeholder="XX-XXXXXXXX-X"
          disabled={cuitH.disabled}
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsClass}
        />
        {cuitH.error && <small className="text-red-500">{cuitH.error}</small>}
      </Field>

      {/* Ingresos Brutos */}
      <Field label="Ing. Brutos" colSpan={showTipoDoc ? 3 : 3} required>
        <FlexibleInputField
          inputType="text"
          value={ib.value}
          focusId="proveedores:ibruto"
          onChange={ib.onChange}
          onBlur={ib.onBlur}
          placeholder="Padrón / Nº IB"
          disabled={ib.disabled}
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsClass}
        />
        {ib.error && <small className="text-red-500">{ib.error}</small>}
      </Field>
    </FieldRow>
  );
}
