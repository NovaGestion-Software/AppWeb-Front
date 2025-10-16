// /views/app/Proveedores/Components/Form/sections/FormaPagoBlock.tsx
import FlexibleInputField from "@/frontend-resourses/components/Inputs/FlexibleInputField";
import { useCampoFormaPago } from "../hooks/useCampoFormaPago";
import { useFormaPagoActions, useFormaPagoValues } from "../../../Store/Form/selectors/formaPago.selectors";
import FieldRow from "../../Shared/FieldRow";
import Field from "../../Shared/Field";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";
import { inputsClass } from "../Config/classes";

import { FormaPagoFieldSchemas as FS } from "@/views/app/Proveedores/Data/formDraft/formaPago.schema";

export default function FormaPagoBlock() {
  const { fpago, dias_v, dias_e, dias_p, f_pesos, f_dolares, obs } = useFormaPagoValues();
  const { setField } = useFormaPagoActions();

  // Hooks por campo (tipados por dominio) con validación (onBlur) y guards sticky
  const fpagoH   = useCampoFormaPago("fpago",     fpago,     setField, { validator: FS.fpago });
  const diasVH   = useCampoFormaPago("dias_v",    dias_v,    setField, { validator: FS.dias_v });
  const diasEH   = useCampoFormaPago("dias_e",    dias_e,    setField, { validator: FS.dias_e });
  const diasPH   = useCampoFormaPago("dias_p",    dias_p,    setField, { validator: FS.dias_p });
  const pesosH   = useCampoFormaPago("f_pesos",   f_pesos,   setField, { validator: FS.f_pesos });
  const dolaresH = useCampoFormaPago("f_dolares", f_dolares, setField, { validator: FS.f_dolares });
  const obsH     = useCampoFormaPago("obs",       obs ?? "", setField, { validator: FS.obs });

  return (
    <div className="space-y-3">
      <FieldRow>
        <Field label="Forma habitual de pago" colSpan={4}>
          <FlexibleInputField
            inputType="text"
            value={typeof fpagoH.value === "string" ? fpagoH.value : String(fpagoH.value ?? "")}
            disabled={fpagoH.disabled}
            onChange={fpagoH.onChange}
            onBlur={fpagoH.onBlur}
            inputClassName={inputsClass}
            placeholder="EFECTIVO / TRANSFERENCIA / CHEQUE / ..."
          />
          {fpagoH.error && <small className="text-red-500">{fpagoH.error}</small>}
        </Field>
      </FieldRow>

      <FieldRow className="items-center">
        <Field label="Frecuencia de visitas (días)" colSpan={1}>
          <FlexibleInputField
            inputType="number"
            min={0}
            value={typeof diasVH.value === "string" ? diasVH.value : String(diasVH.value ?? "")}
            disabled={diasVH.disabled}
            onChange={diasVH.onChange}
            onBlur={diasVH.onBlur}
            inputClassName={inputsClass}
          />
          {diasVH.error && <small className="text-red-500">{diasVH.error}</small>}
        </Field>

        <Field label="Demora de entregas (días)" colSpan={1}>
          <FlexibleInputField
            inputType="number"
            min={0}
            value={typeof diasEH.value === "string" ? diasEH.value : String(diasEH.value ?? "")}
            disabled={diasEH.disabled}
            onChange={diasEH.onChange}
            onBlur={diasEH.onBlur}
            inputClassName={inputsClass}
          />
          {diasEH.error && <small className="text-red-500">{diasEH.error}</small>}
        </Field>

        <Field label="Plazo de pago (días)" className="h-full space-y-5" colSpan={1}>
          <FlexibleInputField
            inputType="number"
            min={0}
            value={typeof diasPH.value === "string" ? diasPH.value : String(diasPH.value ?? "")}
            disabled={diasPH.disabled}
            onChange={diasPH.onChange}
            onBlur={diasPH.onBlur}
            inputClassName={inputsClass}
          />
          {diasPH.error && <small className="text-red-500">{diasPH.error}</small>}
        </Field>
      </FieldRow>

      <FieldRow>
        <Field label=" " colSpan={6}>
          <CheckboxInput
            label="Facturación en pesos"
            checked={Boolean(pesosH.value)}
            onChangeChecked={(checked: boolean) => pesosH.onChange(checked)} // pasa boolean directo
            onBlur={() => pesosH.onBlur?.()}
            disabled={pesosH.disabled}
            className="label:opacity-100"
          />
          {pesosH.error && <small className="text-red-500">{pesosH.error}</small>}
        </Field>
      </FieldRow>

      <FieldRow>
        <Field label=" " colSpan={6}>
          <CheckboxInput
            label="Facturación en dólares"
            checked={Boolean(dolaresH.value)}
            onChangeChecked={(checked: boolean) => dolaresH.onChange(checked)} // pasa boolean directo
            onBlur={() => dolaresH.onBlur?.()}
            disabled={dolaresH.disabled}
          />
          {dolaresH.error && <small className="text-red-500">{dolaresH.error}</small>}
        </Field>
      </FieldRow>

      <FieldRow>
        <Field label="Observaciones" colSpan={6}>
          <FlexibleInputField
            inputType="textarea"
            value={typeof obsH.value === "string" ? obsH.value : String(obsH.value ?? "")}
            disabled={obsH.disabled}
            onChange={obsH.onChange}
            onBlur={obsH.onBlur}
            inputClassName={inputsClass}
            placeholder="Notas adicionales…"
          />
          {obsH.error && <small className="text-red-500">{obsH.error}</small>}
        </Field>
      </FieldRow>
    </div>
  );
}
