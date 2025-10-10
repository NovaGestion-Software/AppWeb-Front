import { FlexibleInputField } from "@/frontend-resourses/components";
import Field from "../../Shared/Field";
import { useDatosComercialesValues, useDatosComercialesActions } from "../../../Store/Form/selectors/datosComerciales.selectors";
import { useCampoComerciales } from "../hooks/useCampoComerciales";
import { inputsClass } from "../Config/classes";
import { TelefonosConCodArea } from "../Fields/TelefonosConCodArea";


export default function ContactoComercial() {
  const {
    telefono, codarea,
    telefono1, codarea1,
    telefono2, codarea2,
    email, fax,
  } = useDatosComercialesValues();

  const { setField } = useDatosComercialesActions();

  // Hooks individuales (mantienen sincronía con datosActuales si está editable)
  const mail = useCampoComerciales("email", email, setField);
  const fax1 = useCampoComerciales("fax", fax, setField);

  // Tel base
  const area0 = useCampoComerciales("codarea", codarea, setField);
  const tel0  = useCampoComerciales("telefono", telefono, setField);

  // Tel v1
  const area1 = useCampoComerciales("codarea1", codarea1, setField);
  const telv1 = useCampoComerciales("telefono1", telefono1, setField);

  // Tel v2
  const area2 = useCampoComerciales("codarea2", codarea2, setField);
  const telv2 = useCampoComerciales("telefono2", telefono2, setField);

  const clearV1 = () => {
    setField("codarea1", "");
    setField("telefono1", "");
  };
  const clearV2 = () => {
    setField("codarea2", "");
    setField("telefono2", "");
  };

  return (
    <>
      {/* Email */}
      <Field label="Email" colStart={5} colSpan={4}>
        <FlexibleInputField
          value={mail.value as string}
          disabled={mail.disabled}
          placeholder="correo@ejemplo.com"
          labelClassName="hidden"
          inputClassName={inputsClass}
          onChange={mail.onChange}
        />
      </Field>

      {/* Teléfonos con código de área (componente hijo) */}
      <TelefonosConCodArea
        label="Teléfono"
        inputsClass={inputsClass}
        base={{ area: area0, tel: tel0 }}
        v1={{ area: area1, tel: telv1 }}
        v2={{ area: area2, tel: telv2 }}
        clearV1={clearV1}
        clearV2={clearV2}
      />

      {/* Fax */}
      <Field label="Fax" colStart={5} colSpan={4}>
        <FlexibleInputField
          value={fax1.value as string}
          disabled={fax1.disabled}
          placeholder="Fax"
          labelClassName="hidden"
          inputClassName={inputsClass}
          onChange={fax1.onChange}
        />
      </Field>
    </>
  );
}
