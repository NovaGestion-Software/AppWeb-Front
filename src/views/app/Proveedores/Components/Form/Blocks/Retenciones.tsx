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

// ✅ validators de formDraft
import { RetencionesFieldSchemas as FS } from "@/views/app/Proveedores/Data/formDraft/retenciones.schema";

export default function Retenciones() {
  const retenciones = useRetencionesArray();
  const { setField } = useRetencionesActions();

  const visibles = retenciones.filter(
    (r) =>
      !!r.regimen ||
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
        const reg    = useCampoRetencion(r.id, "regimen",       r.regimen,       setField /* checkbox */);
        const ex     = useCampoRetencion(r.id, "exento",        r.exento,        setField /* checkbox */);

        // certificado + fechas con validator
        const cert   = useCampoRetencion(
          r.id,
          "certificado",
          r.certificado,
          setField,
          {
            validator:
              r.id === "IB"  ? FS.nexretbru :
              r.id === "GAN" ? FS.nexretgan :
                                FS.nexretiva
          }
        );

        const vDesde = useCampoRetencion(
          r.id,
          "vigenciaDesde",
          r.vigenciaDesde,
          setField,
          {
            validator:
              r.id === "IB"  ? FS.fecbru :
              r.id === "GAN" ? FS.fecgan :
                                FS.feciva
          }
        );

        const vHasta = useCampoRetencion(
          r.id,
          "vigenciaHasta",
          r.vigenciaHasta,
          setField,
          {
            validator:
              r.id === "IB"  ? FS.vtobru :
              r.id === "GAN" ? FS.vtogan :
                                FS.vtoiva
          }
        );

        return (
          <div
            key={r.id}
            className="rounded-md border border-gray-200 p-3 shadow-sm bg-white/50 hover:bg-white/80 transition-all"
          >
            <h4 className="mb-3 text-sm font-semibold text-red-900">
              {`Retención de ${labelById[r.id]}`}
            </h4>

            <FieldRow cols={12} className="gap-3">
              <Field label="Aplicar régimen" colSpan={4}>
                <CheckboxInput
                  label="Habilitado"
                  checked={Boolean(reg.value)}
                  onChangeChecked={(checked: boolean) => reg.onChange(checked)}
                  disabled={reg.disabled}
                />
              </Field>

              <Field label="Exento" colSpan={2}>
                <CheckboxInput
                  label="Exento"
                  checked={Boolean(ex.value)}
                  onChangeChecked={(checked: boolean) => ex.onChange(checked)}
                  disabled={ex.disabled}
                />
              </Field>

              <Field label="Nº Certificado Exención" colSpan={4}>
                <FlexibleInputField
                  inputType="text"
                  value={typeof cert.value === "string" ? cert.value : ""}
                  onChange={cert.onChange}
                  onBlur={cert.onBlur}
                  disabled={cert.disabled}
                  placeholder="Nº Certificado"
                  labelWidth="w-0"
                  labelClassName="hidden"
                  inputClassName={inputsClass}
                />
                {cert.error && <small className="text-red-500">{cert.error}</small>}
              </Field>

              <Field label="Vigencia" colSpan={6} className="flex gap-2">
                <div className="flex-1">
                  <FlexibleInputField
                    inputType="date"
                    value={typeof vDesde.value === "string" ? vDesde.value : ""}
                    onChange={vDesde.onChange}
                    onBlur={vDesde.onBlur}
                    disabled={vDesde.disabled}
                    labelWidth="w-0"
                    labelClassName="hidden"
                    inputClassName={inputsClass}
                  />
                  {vDesde.error && <small className="text-red-500">{vDesde.error}</small>}
                </div>
                <div className="flex-1">
                  <FlexibleInputField
                    inputType="date"
                    value={typeof vHasta.value === "string" ? vHasta.value : ""}
                    onChange={vHasta.onChange}
                    onBlur={vHasta.onBlur}
                    disabled={vHasta.disabled}
                    labelWidth="w-0"
                    labelClassName="hidden"
                    inputClassName={inputsClass}
                  />
                  {vHasta.error && <small className="text-red-500">{vHasta.error}</small>}
                </div>
              </Field>
            </FieldRow>
          </div>
        );
      })}
    </div>
  );
}
