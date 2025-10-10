import Field from "../../Shared/Field";
import FieldRow from "../../Shared/FieldRow";
import { FlexibleInputField } from "@/frontend-resourses/components";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";
import {
  useRetencionesArray,
  useRetencionesActions,
} from "../../../Store/Form/selectors/datosImpositivos.selectors";
import { useCampoRetencion } from "../hooks/useCampoRetencion";
import { inputsClass } from "../Config/classes";

export default function Retenciones() {
  const retenciones = useRetencionesArray(); // [{ id, tipo:boolean, regimen:boolean, exento, certificado, ... }]
  const { setField } = useRetencionesActions();

  // Ocultar cuando "regimen" (o "tipo") es false y no hay otros datos
  const visibles = retenciones.filter(
    r =>
      !!r.regimen || // ← o r.tipo
      !!r.exento ||
      !!(r.certificado && String(r.certificado).trim()) ||
      !!r.vigenciaDesde ||
      !!r.vigenciaHasta
  );

  if (visibles.length === 0) {
    return <p className="text-sm text-gray-500">Sin retenciones registradas</p>;
  }

  const labelById = { IB: "Ingresos Brutos", GAN: "Ganancias", IVA: "IVA" } as const;

  return (
    <div className="space-y-6">
      {visibles.map((r) => {
        const reg    = useCampoRetencion(r.id, "regimen",       r.regimen,       setField);
        const ex     = useCampoRetencion(r.id, "exento",        r.exento,        setField);
        const cert   = useCampoRetencion(r.id, "certificado",   r.certificado,   setField);
        const vDesde = useCampoRetencion(r.id, "vigenciaDesde", r.vigenciaDesde, setField);
        const vHasta = useCampoRetencion(r.id, "vigenciaHasta", r.vigenciaHasta, setField);

        return (
          <div key={r.id} className="rounded-md border border-gray-200 p-3 shadow-sm bg-white/50 hover:bg-white/80 transition-all">
            <h4 className="mb-3 text-sm font-semibold text-red-900">
              {`Retención de ${labelById[r.id]}`}
            </h4>

            <FieldRow cols={12} className="gap-3">
              {/* Régimen (ahora boolean) */}
              <Field label="Aplicar régimen" colSpan={4}>
                <CheckboxInput label="Habilitado" checked={!!reg.value} onChangeChecked={reg.onChange} disabled={reg.disabled} />
              </Field>

              {/* Exento */}
              <Field label="Exento" colSpan={2}>
                <CheckboxInput label="Exento" checked={!!ex.value} onChangeChecked={ex.onChange} disabled={ex.disabled} />
              </Field>

              {/* Nº Certificado */}
              <Field label="Nº Certificado Exención" colSpan={4}>
                <FlexibleInputField
                  inputType="text"
                  value={(cert.value as string) ?? ""}
                  onChange={cert.onChange}
                  disabled={cert.disabled}
                  placeholder="Nº Certificado"
                  labelWidth="w-0"
                  labelClassName="hidden"
                  inputClassName={inputsClass}
                />
              </Field>

              {/* Vigencia */}
              <Field label="Vigencia" colSpan={6} className="flex gap-2">
                <FlexibleInputField inputType="date" value={(vDesde.value as string) ?? ""} onChange={vDesde.onChange} disabled={vDesde.disabled} labelWidth="w-0" labelClassName="hidden" inputClassName={inputsClass} />
                <FlexibleInputField inputType="date" value={(vHasta.value as string) ?? ""} onChange={vHasta.onChange} disabled={vHasta.disabled} labelWidth="w-0" labelClassName="hidden" inputClassName={inputsClass} />
              </Field>
            </FieldRow>
          </div>
        );
      })}
    </div>
  );
}

