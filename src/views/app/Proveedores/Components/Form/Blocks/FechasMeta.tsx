// /Components/Form/blocks/FechasMeta.tsx
import { FlexibleInputField } from "@/frontend-resourses/components";
import Field from "../../Shared/Field";
import { useCampoMetadatos } from "../hooks/useCampoMetadatos";
import { useMetadatosActions, useMetadatosValues } from "../../../Store/Form/selectors/metadatos.selectors";
import { inputsClass } from "../Config/classes";

function toDateInputValue(s?: string) {
  // Acepta "YYYY-MM-DD" o "YYYY-MM-DDTHH:mm:ss" o "YYYY-MM-DD HH:mm:ss"
  if (!s) return "";
  // si viene con tiempo, me quedo con la parte de la fecha
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(s);
  return m ? m[1] : "";
}

export default function FechasMeta() {
  const { f_alta } = useMetadatosValues();
  const { setMetadatosField } = useMetadatosActions();

  const vAlta = useCampoMetadatos("f_alta", f_alta, setMetadatosField);

  return (
    <Field label="Fecha Alta" colSpan={1} colStart={6} >
      <FlexibleInputField
        inputType="date"
       value={toDateInputValue(vAlta.value as string | undefined)}
        onChange={vAlta.onChange}
        disabled={vAlta.disabled}
        labelWidth="w-0"
        labelClassName="hidden"
        inputClassName={inputsClass}
      />
    </Field>
  );
}
