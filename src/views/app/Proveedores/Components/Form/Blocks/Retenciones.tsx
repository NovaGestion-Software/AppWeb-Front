import Field from "../../Shared/Field";
import FieldRow from "../../Shared/FieldRow";
import { FlexibleInputField } from "@/frontend-resourses/components";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";
import { useRetencionesArray, useRetencionesActions } from "../../../Store/Form/selectors/datosImpositivos.selectors";
import { useCampoRetencion } from "../hooks/useCampoRetencion";
import { inputsClass } from "../Config/classes";
import { RetencionesFieldSchemas as FS } from "@/views/app/Proveedores/Data/formDraft/retenciones.schema";

// const EMPTY_RETENCIONES = [
//   {
//     id: "IB" as const,
//     regimen: true,
//     exento: false,
//     certificado: "",
//     vigenciaDesde: "",
//     vigenciaHasta: "",
//   },
//   {
//     id: "GAN" as const,
//     regimen: true,
//     exento: false,
//     certificado: "",
//     vigenciaDesde: "",
//     vigenciaHasta: "",
//   },
//   {
//     id: "IVA" as const,
//     regimen: true,
//     exento: true,
//     certificado: "",
//     vigenciaDesde: "",
//     vigenciaHasta: "",
//   },
// ];

export default function Retenciones() {
  const retenciones = useRetencionesArray();
  const { setField } = useRetencionesActions();

  const visibles = retenciones.filter((r) => !!r.regimen || !!r.exento || !!(r.certificado && String(r.certificado).trim()) || !!r.vigenciaDesde || !!r.vigenciaHasta);

  const labelById = { IB: "Ingresos Brutos", GAN: "Ganancias", IVA: "IVA" } as const;

  return (
    <div className="space-y-6 ">
      {visibles.map((r) => {
        const reg = useCampoRetencion(r.id, "regimen", r.regimen, setField);
        const ex = useCampoRetencion(r.id, "exento", r.exento, setField);

        const cert = useCampoRetencion(r.id, "certificado", r.certificado, setField, {
          validator: r.id === "IB" ? FS.nexretbru : r.id === "GAN" ? FS.nexretgan : FS.nexretiva,
        });

        const vDesde = useCampoRetencion(r.id, "vigenciaDesde", r.vigenciaDesde, setField, {
          validator: r.id === "IB" ? FS.fecbru : r.id === "GAN" ? FS.fecgan : FS.feciva,
        });

        const vHasta = useCampoRetencion(r.id, "vigenciaHasta", r.vigenciaHasta, setField, {
          validator: r.id === "IB" ? FS.vtobru : r.id === "GAN" ? FS.vtogan : FS.vtoiva,
        });

        return (
          <div key={r.id} className="rounded-md border border-gray-200 p-3 shadow-sm bg-white/50 hover:bg-white/80 transition-all">
            <h4 className="mb-3 text-sm font-semibold text-red-900">{`Retención de ${labelById[r.id]}`}</h4>

            <FieldRow cols={12} className="gap-3">
              <Field label="Régimen a Aplicar" colSpan={4} >
                <div className="flex space-x-2">
                  <div className=" w-24">
                    <FlexibleInputField
                      inputType="text"
                      value={reg.value as string}
                      onChange={reg.onChange}
                      onBlur={reg.onBlur}
                      disabled={reg.disabled}
                      placeholder="Nº Certificado"
                      labelWidth="w-0"
                      labelClassName="hidden"
                      inputClassName={inputsClass}
                    />
                  </div>
                  <FlexibleInputField
                    inputType="text"
                    value={reg.value as string}
                    onChange={reg.onChange}
                    onBlur={reg.onBlur}
                    disabled={reg.disabled}
                    placeholder="Nº Certificado"
                    labelWidth="w-0"
                    labelClassName="hidden"
                    inputClassName={inputsClass}
                  />
                </div>
              </Field>

              <Field colSpan={2} rowStart={2} className="items-center flex">
                <CheckboxInput label="Sujeto exento de retencion" checked={Boolean(ex.value)} onChangeChecked={(checked: boolean) => ex.onChange(checked)} disabled={ex.disabled} />
              </Field>

              <Field label="Nº Certificado Exención" colSpan={2} rowStart={2}>
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

              <Field label="Vigencia" colSpan={3} rowStart={2}>
                <div className="flex  space-x-2">
                  <div className="flex-1">
                    <FlexibleInputField
                      inputType="date"
                      value={typeof vDesde.value === "string" ? vDesde.value : ""}
                      onChange={vDesde.onChange}
                      onBlur={vDesde.onBlur}
                      disabled={vDesde.disabled}
                      labelWidth="w-0"
                      inputWidth="w-5"
                      labelClassName="hidden"
                      inputClassName={`${inputsClass} w-5 border border-black`}
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
                      inputClassName={`${inputsClass} w-5 border border-black`}
                    />
                    {vHasta.error && <small className="text-red-500">{vHasta.error}</small>}
                  </div>
                </div>
              </Field>
            </FieldRow>
          </div>
        );
      })}
    </div>
  );
}
