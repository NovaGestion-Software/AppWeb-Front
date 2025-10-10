// /Components/Form/blocks/UbicacionComercial.tsx
import { FlexibleInputField } from "@/frontend-resourses/components";
import Field from "../../Shared/Field";
import { useDatosComercialesValues, useDatosComercialesActions } from "../../../Store/Form/selectors/datosComerciales.selectors";
import { useCampoComerciales } from "../hooks/useCampoComerciales";
import { inputsClass, inputsSelectClass } from "../Config/classes";

export default function UbicacionComercial() {
  // Valores BE desde el selector actualizado
  const { domicilio1, domicilio2, localidad, cpostal, calle1, calle2, idcodprov, latitud, longitud } = useDatosComercialesValues();

  const { setField } = useDatosComercialesActions();

  // Hooks por campo (clave BE + valor + setter tipado)
  const dom1 = useCampoComerciales("domicilio1", domicilio1, setField);
  const dom2 = useCampoComerciales("domicilio2", domicilio2 ?? "", setField);
  const c1 = useCampoComerciales("calle1", calle1 ?? "", setField);
  const c2 = useCampoComerciales("calle2", calle2 ?? "", setField);
  const loc = useCampoComerciales("localidad", localidad, setField);
  const cp = useCampoComerciales("cpostal", cpostal, setField);
  const prov = useCampoComerciales(
    "idcodprov",
    idcodprov, // number en la store
    setField, // (k, v) del slice
    (raw) => {
      const n = Number(raw);
      return (Number.isNaN(n) ? 0 : n) as any; // convierte string → number
    }
  );
  const lat = useCampoComerciales("latitud", latitud, setField);
  const lng = useCampoComerciales("longitud", longitud, setField);


  return (
    <>
      <Field label="Domicilio" colSpan={3} required>
        <FlexibleInputField value={dom1.value as string} disabled={dom1.disabled} placeholder="Domicilio (calle y número)" labelClassName="hidden" inputClassName={inputsClass} onChange={dom1.onChange} />
      </Field>

      <Field label="Domicilio (2)" colSpan={3} rowStart={2}>
        <FlexibleInputField value={dom2.value as string} disabled={dom2.disabled} placeholder="Piso, depto, barrio…" labelClassName="hidden" inputClassName={inputsClass} onChange={dom2.onChange} />
      </Field>

      <Field label="Entre calles" rowStart={3} className="space-y-3 mb-4" colSpan={3}>
        <div className="flex flex-row space-x-2">
          <FlexibleInputField value={c1.value as string} disabled={c1.disabled} placeholder="Calle 1" labelClassName="hidden" inputClassName={inputsClass} onChange={c1.onChange} />
          <FlexibleInputField value={c2.value as string} disabled={c2.disabled} placeholder="Calle 2" labelClassName="hidden" inputClassName={inputsClass} onChange={c2.onChange} />
        </div>
      </Field>

      <Field label="Localidad" colSpan={2} rowStart={4} required>
        <FlexibleInputField value={loc.value as string} disabled={loc.disabled} placeholder="Localidad" labelClassName="hidden" inputClassName={inputsClass} onChange={loc.onChange} />
      </Field>

      <Field label="C. Postal" colSpan={1} rowStart={4}>
        <FlexibleInputField value={cp.value as string} disabled={cp.disabled} placeholder="Código Postal" labelClassName="hidden" inputClassName={inputsClass} onChange={cp.onChange} />
      </Field>

      {/* 🧭 Provincia (select numérico BE) */}
      <Field label="Provincia" colSpan={3} rowStart={5} required>
        <FlexibleInputField
          inputType="select"
          id="idcodprov"
          name="idcodprov"
          value={String(idcodprov ?? 0)}
          disabled={prov.disabled}
          options={[
            { value: "0", label: "Seleccionar provincia" },
            { value: "1", label: "San Juan" },
            { value: "2", label: "Santa Fe" },
            { value: "3", label: "Buenos Aires" },
          ]}
          onChange={(value /* string */) => {
            const num = Number(value);
            setField("idcodprov", (Number.isNaN(num) ? 0 : num) as any);
          }}
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsSelectClass}
          required
        />
      </Field>

      <Field label="Latitud" rowStart={6} colSpan={1}>
        <FlexibleInputField value={lat.value as string} placeholder="Latitud" disabled={lat.disabled} labelClassName="hidden" inputClassName={inputsClass} onChange={lat.onChange} />
      </Field>

      <Field label="Longitud" rowStart={6} colSpan={1}>
        <FlexibleInputField value={lng.value as string} placeholder="Longitud" disabled={lng.disabled} labelClassName="hidden" inputClassName={inputsClass} onChange={lng.onChange} />
      </Field>
    </>
  );
}
