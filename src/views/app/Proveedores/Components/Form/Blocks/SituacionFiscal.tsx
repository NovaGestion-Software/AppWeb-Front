import Field from "../../Shared/Field";
import FieldRow from "../../Shared/FieldRow";
import { FlexibleInputField } from "@/frontend-resourses/components";
import { useSituacionFiscalValues } from "../../../Store/Form/selectors/datosImpositivos.selectors";
import { useCampoImpositivo } from "../hooks/useCampoImpositivo"; // asegúrate que el archivo/export se llame igual
import { inputsClass, inputsSelectClass } from "../Config/classes";
import { useProovedoresStore } from "../../../Store/Store";

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
  const setImpositivosField = useProovedoresStore((s) => s.setDatosImpositivosField);

  // Hooks por campo (con parse para selects numéricos)
  const ct = useCampoImpositivo(
    "idctrib",
    idctrib,
    setImpositivosField as any,
    (raw) => (Number.isNaN(Number(raw)) ? 1 : (Number(raw) as any)) // default 1=RI si viene vacío
  );

  const td = useCampoImpositivo(
    "idtdoc",
    idtdoc,
    setImpositivosField as any,
    (raw) => (Number.isNaN(Number(raw)) ? 0 : (Number(raw) as any)) // default 0=CUIT
  );

  const cuitH = useCampoImpositivo("cuit", cuit, setImpositivosField as any);
  const ib = useCampoImpositivo("ibruto", ibruto, setImpositivosField as any);

  // Opciones BE
  const COND_TRIB_OPTS = [
    { label: "Resp. Inscripto", value: "1" },
    { label: "Exento",          value: "2" },
    { label: "Cat. 3",          value: "3" }, // placeholder
    { label: "Cat. 4",          value: "4" }, // placeholder
  ];

  const DOC_OPTS = [
    { label: "CUIT", value: "0" },
    { label: "CUIL", value: "1" },
    { label: "DNI",  value: "2" },
  ];

  return (
    <FieldRow cols={12} className="gap-3">
      {/* Condición Tributaria (numérica BE) */}
      <Field label="Cond. Trib." colSpan={showTipoDoc ? 4 : 5} required>
        <FlexibleInputField
          inputType="select"
          options={COND_TRIB_OPTS}
          value={String(ct.value ?? 1)}                // select espera string
          onChange={ct.onChange}                       // hook parsea string→number
          disabled={ct.disabled}
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsSelectClass}
        />
      </Field>

      {/* Tipo Doc (numérico BE) */}
      {showTipoDoc && (
        <Field label="Tipo Doc." colSpan={2}>
          <FlexibleInputField
            inputType="select"
            options={DOC_OPTS}
            value={String(td.value ?? 0)}              // 0=CUIT
            onChange={td.onChange}                     // parsea string→number
            disabled={td.disabled}
            labelWidth="w-0"
            labelClassName="hidden"
            inputClassName={inputsSelectClass}
          />
        </Field>
      )}

      {/* CUIT */}
      <Field label="CUIT" colSpan={showTipoDoc ? 3 : 4} required>
        <FlexibleInputField
          inputType="text"
          value={(cuitH.value as string) ?? ""}
          onChange={cuitH.onChange}
          placeholder="XX-XXXXXXXX-X"
          disabled={cuitH.disabled}
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsClass}
        />
      </Field>

      {/* Ingresos Brutos */}
      <Field label="Ing. Brutos" colSpan={showTipoDoc ? 3 : 3} required>
        <FlexibleInputField
          inputType="text"
          value={(ib.value as string) ?? ""}
          onChange={ib.onChange}
          placeholder="Padrón / Nº IB"
          disabled={ib.disabled}
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsClass}
        />
      </Field>
    </FieldRow>
  );
}
