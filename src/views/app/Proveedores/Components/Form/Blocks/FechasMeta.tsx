// /Components/Form/blocks/FechasMeta.tsx
import { FlexibleInputField } from "@/frontend-resourses/components";
import Field from "../../Shared/Field";
import { useCampoMetadatos } from "../hooks/useCampoMetadatos";
import { useMetadatosActions, useMetadatosValues } from "../../../Store/Form/selectors/metadatos.selectors";
import { inputsClass } from "../Config/classes";

/** Normaliza a valor para <input type="date">: "YYYY-MM-DD" o "" */
function toDateInputValue(s?: string) {
  if (!s) return "";
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(s); // soporta "YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ss" o "YYYY-MM-DD HH:mm:ss"
  return m ? m[1] : "";
}

export default function FechasMeta() {
  const { f_alta } = useMetadatosValues();
  const { setMetadatosField } = useMetadatosActions();

  // Campo fecha de alta (normalmente de solo lectura)
  const vAlta = useCampoMetadatos("f_alta", f_alta, setMetadatosField, {
    // Si alguna vez quisieras permitir edición y convertir "YYYY-MM-DD" → "YYYY-MM-DDTHH:mm:ss":
    parse: (raw) => {
      const s = typeof raw === "string" ? raw : raw?.target?.value ?? "";
      // si viene vacío, mantener undefined
      if (!s) return undefined as any;
      // construir ISO-like sin TZ con medianoche
      return (`${s}T00:00:00` as any);
    },
  });

  return (
    <Field label="Fecha Alta" colSpan={1} colStart={6}>
      <FlexibleInputField
        inputType="date"
        value={toDateInputValue(vAlta.value as string | undefined)}
        onChange={vAlta.onChange}
        disabled={true}              
        labelWidth="w-0"
        labelClassName="hidden"
        inputClassName={inputsClass}
      />
    </Field>
  );
}
