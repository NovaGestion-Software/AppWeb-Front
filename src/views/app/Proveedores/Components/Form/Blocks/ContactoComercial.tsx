import { FlexibleInputField } from "@/frontend-resourses/components";
import Field from "../../Shared/Field";
import { inputsClass } from "../Config/classes";
import { useDatosComercialesValues, useDatosComercialesActions } from "../../../Store/Form/selectors/datosComerciales.selectors";
import { useCampoComerciales } from "../hooks/useCampoComerciales";
import { ContactoFieldSchemas as FS } from "@/views/app/Proveedores/Data/formDraft/contacto.schema";
import TelefonosConCodArea from "../Fields/TelefonosConCodArea";

export default function ContactoComercial() {
  const {
    telefono, codarea,
    telefono1, codarea1,
    telefono2, codarea2,
    email,
  } = useDatosComercialesValues();

  const { setField } = useDatosComercialesActions();

  // Email (con validación onBlur)
  const mail = useCampoComerciales("email", email, setField, {
    validator: FS.email,
  });

  // Helpers de parse: solo dígitos (conservamos string en store)
  const digitsOnly = (raw: string) => raw.replace(/\D+/g, "") as any;

  // Tel base
  const area0 = useCampoComerciales("codarea",  codarea,  setField, { validator: FS.codarea,  parse: digitsOnly });
  const tel0  = useCampoComerciales("telefono", telefono, setField, { validator: FS.telefono, parse: digitsOnly });

  // Tel v1
  const area1 = useCampoComerciales("codarea1",  codarea1,  setField, { validator: FS.codarea1,  parse: digitsOnly });
  const telv1 = useCampoComerciales("telefono1", telefono1, setField, { validator: FS.telefono1, parse: digitsOnly });

  // Tel v2
  const area2 = useCampoComerciales("codarea2",  codarea2,  setField, { validator: FS.codarea2,  parse: digitsOnly });
  const telv2 = useCampoComerciales("telefono2", telefono2, setField, { validator: FS.telefono2, parse: digitsOnly });

  return (
    <>
      {/* Email */}
      <Field label="Email" colStart={5} colSpan={4}>
        <FlexibleInputField
          value={mail.value}
          disabled={mail.disabled}
          placeholder="correo@ejemplo.com"
          labelClassName="hidden"
          inputClassName={inputsClass}
          onChange={mail.onChange}
          onBlur={mail.onBlur}
        />
        {mail.error && <small className="text-red-500">{mail.error}</small>}
      </Field>

      {/* Teléfonos con código de área (componente hijo) */}
      <TelefonosConCodArea
        label="Teléfono"
        inputsClass={inputsClass}
        base={{ area: area0, tel: tel0 }}
        v1={{ area: area1, tel: telv1 }}
        v2={{ area: area2, tel: telv2 }}
      />
    </>
  );
}
