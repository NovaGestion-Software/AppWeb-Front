import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";
import { useFormaPagoActions, useFormaPagoValues } from "../../../Store/Form/selectors/formaPago.selectors";
import Field from "../../Shared/Field";
import FieldRow from "../../Shared/FieldRow";
import { FlexibleInputField } from "@/frontend-resourses/components";
import { useCampoFormaPago } from "../hooks/useCampoFormaPago";
import { inputsClass } from "../Config/classes";

export default function FormaPagoBlock() {
  const { fpago, dias_v, dias_e, dias_p, f_pesos, f_dolares, obs } = useFormaPagoValues();
  const { setField } = useFormaPagoActions();

  // Hooks por campo
  const fpagoH   = useCampoFormaPago("fpago", fpago, setField);
  const diasVH   = useCampoFormaPago("dias_v", dias_v, setField, (raw) => Number(raw || 0) as any);
  const diasEH   = useCampoFormaPago("dias_e", dias_e, setField, (raw) => Number(raw || 0) as any);
  const diasPH   = useCampoFormaPago("dias_p", dias_p, setField, (raw) => Number(raw || 0) as any);
  const pesosH   = useCampoFormaPago("f_pesos", f_pesos, setField);     // boolean
  const dolaresH = useCampoFormaPago("f_dolares", f_dolares, setField); // boolean
  const obsH     = useCampoFormaPago("obs", obs ?? "", setField);       // string | undefined

  return (
    <div className="space-y-3">
      <FieldRow>
        <Field label="Forma habitual de pago" colSpan={4}>
          <FlexibleInputField
            inputType="text"
            value={(fpagoH.value as string) ?? ""}
            disabled={fpagoH.disabled}
            onChange={fpagoH.onChange}
            inputClassName={inputsClass}
            placeholder="EFECTIVO / TRANSFERENCIA / CHEQUE / ..."
          />
        </Field>
      </FieldRow>

      <FieldRow className=" items-center">
        <Field label="Frecuencia de visitas (días)" colSpan={1}>
          <FlexibleInputField
            inputType="number"
            value={String(diasVH.value ?? 0)}
            disabled={diasVH.disabled}
            min={0}
            onChange={diasVH.onChange} // parsea a number en el hook
            inputClassName={inputsClass}
          />
        </Field>

        <Field label="Demora de entregas (días)" colSpan={1}>
          <FlexibleInputField
            inputType="number"
            value={String(diasEH.value ?? 0)}
            disabled={diasEH.disabled}
            min={0}
            onChange={diasEH.onChange}
            inputClassName={inputsClass}
          />
        </Field>

        <Field label="Plazo de pago (días)" className="h-full space-y-5" colSpan={1}>
          <FlexibleInputField
            inputType="number"
            value={String(diasPH.value ?? 0)}
            disabled={diasPH.disabled}
            min={0}
            onChange={diasPH.onChange}
            inputClassName={inputsClass}
          />
        </Field>
      </FieldRow>

      <FieldRow>
        <Field label=" " colSpan={6}>
          <CheckboxInput
            label="Facturación en pesos"
            checked={!!pesosH.value}
            onChangeChecked={(checked) => pesosH.onChange(checked)}
            disabled={pesosH.disabled}
            className="label:opacity-100"
          />
        </Field>
      </FieldRow>

      <FieldRow>
        <Field label=" " colSpan={6}>
          <CheckboxInput
            label="Facturación en dólares"
            checked={!!dolaresH.value}
            onChangeChecked={(checked) => dolaresH.onChange(checked)}
            disabled={dolaresH.disabled}
          />
        </Field>
      </FieldRow>

      <FieldRow>
        <Field label="Observaciones" colSpan={6}>
          <FlexibleInputField
            inputType="textarea"
            value={(obsH.value as string) ?? ""}
            disabled={obsH.disabled}
            onChange={obsH.onChange}
            inputClassName={inputsClass}
            placeholder="Notas adicionales…"
          />
        </Field>
      </FieldRow>
    </div>
  );
}
