import { FlexibleInputField } from "@/frontend-resourses/components";
import Field from "../../Shared/Field";
import { inputsClass, inputsSelectClass } from "../Config/classes";
import { useDatosComercialesValues, useDatosComercialesActions } from "../../../Store/Form/selectors/datosComerciales.selectors";
import { useCampoComerciales } from "../hooks/useCampoComerciales";
import { UbicacionFieldSchemas as FS } from "@/views/app/Proveedores/Data/formDraft/ubicacion.schema";

export default function UbicacionComercial() {
  const { domicilio1, domicilio2, localidad, cpostal, calle1, calle2, idcodprov, latitud, longitud } = useDatosComercialesValues();

  const { setField } = useDatosComercialesActions();

  // Hooks por campo con validación
  const dom1 = useCampoComerciales("domicilio1", domicilio1, setField, { validator: FS.domicilio1 });
  const dom2 = useCampoComerciales("domicilio2", domicilio2, setField, { validator: FS.domicilio2 });
  const c1 = useCampoComerciales("calle1", calle1, setField, { validator: FS.calle1 });
  const c2 = useCampoComerciales("calle2", calle2, setField, { validator: FS.calle2 });
  const loc = useCampoComerciales("localidad", localidad, setField, { validator: FS.localidad });
  const cp = useCampoComerciales("cpostal", cpostal, setField, { validator: FS.cpostal });

  const prov = useCampoComerciales("idcodprov", idcodprov, setField, {
    parse: (raw) => {
      const n = Number(raw);
      return (Number.isNaN(n) ? 0 : n) as any;
    },
    validator: FS.idcodprov,
  });

  // Lat/Lon con validación de formato y rango
  const lat = useCampoComerciales("latitud", latitud, setField, { validator: FS.latitud });
  const lng = useCampoComerciales("longitud", longitud, setField, { validator: FS.longitud });

  return (
    <>
      <Field label="Domicilio" colSpan={3} required>
        <FlexibleInputField
          value={dom1.value}
          focusId="proveedores:domicilio1"
          disabled={dom1.disabled}
          placeholder="Domicilio (calle y número)"
          labelClassName="hidden"
          inputClassName={inputsClass}
          onChange={dom1.onChange}
          onBlur={dom1.onBlur}
        />
        {dom1.error && <small className="text-red-500">{dom1.error}</small>}
      </Field>

      <Field label="Domicilio (2)" colSpan={3} rowStart={2}>
        <FlexibleInputField value={dom2.value} disabled={dom2.disabled} placeholder="Piso, depto, barrio…" labelClassName="hidden" inputClassName={inputsClass} onChange={dom2.onChange} onBlur={dom2.onBlur} />
        {dom2.error && <small className="text-red-500">{dom2.error}</small>}
      </Field>

      <Field label="Entre calles" rowStart={3} className="space-y-3 mb-4" colSpan={3}>
        <div className="flex flex-row space-x-2">
          <div className="flex-1">
            <FlexibleInputField value={c1.value} disabled={c1.disabled} placeholder="Calle 1" labelClassName="hidden" inputClassName={inputsClass} onChange={c1.onChange} onBlur={c1.onBlur} />
            {c1.error && <small className="text-red-500">{c1.error}</small>}
          </div>
          <div className="flex-1">
            <FlexibleInputField value={c2.value} disabled={c2.disabled} placeholder="Calle 2" labelClassName="hidden" inputClassName={inputsClass} onChange={c2.onChange} onBlur={c2.onBlur} />
            {c2.error && <small className="text-red-500">{c2.error}</small>}
          </div>
        </div>
      </Field>

      <Field label="Localidad" colSpan={2} rowStart={4} required>
        <FlexibleInputField
          value={loc.value}
          disabled={loc.disabled}
          focusId="proveedores:localidad"
          placeholder="Localidad"
          labelClassName="hidden"
          inputClassName={inputsClass}
          onChange={loc.onChange}
          onBlur={loc.onBlur}
        />
        {loc.error && <small className="text-red-500">{loc.error}</small>}
      </Field>

      <Field label="C. Postal" colSpan={1} rowStart={4} required>
        <FlexibleInputField
          value={cp.value}
          disabled={cp.disabled}
          focusId="proveedores:cpostal"
          placeholder="Código Postal"
          labelClassName="hidden"
          inputClassName={inputsClass}
          onChange={cp.onChange}
          onBlur={cp.onBlur}
        />
        {cp.error && <small className="text-red-500">{cp.error}</small>}
      </Field>

      {/*  Provincia (select numérico BE) */}
      <Field label="Provincia" colSpan={3} rowStart={5} required>
        <FlexibleInputField
          inputType="select"
          id="idcodprov"
          name="idcodprov"
          focusId="proveedores:idcodprov"
          value={prov.value}
          disabled={prov.disabled}
          options={[
            { value: "500", label: "Seleccionar" },
            { value: "0", label: "San Juan" },
            { value: "1", label: "Santa Fe" },
            { value: "2", label: "Santa Fe" },
            { value: "3", label: "Buenos Aires" },
          ]}
          onChange={prov.onChange}
          onBlur={prov.onBlur}
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsSelectClass}
          required
        />
        {prov.error && <small className="text-red-500">{prov.error}</small>}
      </Field>

      <Field label="Latitud" rowStart={6} colSpan={1}>
        <FlexibleInputField value={lat.value} placeholder="Latitud" disabled={lat.disabled} labelClassName="hidden" inputClassName={inputsClass} onChange={lat.onChange} onBlur={lat.onBlur} />
        {lat.error && <small className="text-red-500">{lat.error}</small>}
      </Field>

      <Field label="Longitud" rowStart={6} colSpan={1}>
        <FlexibleInputField value={lng.value} placeholder="Longitud" disabled={lng.disabled} labelClassName="hidden" inputClassName={inputsClass} onChange={lng.onChange} onBlur={lng.onBlur} />
        {lng.error && <small className="text-red-500">{lng.error}</small>}
      </Field>
    </>
  );
}
