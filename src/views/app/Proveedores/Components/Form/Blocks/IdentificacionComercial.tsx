import { FlexibleInputField } from "@/frontend-resourses/components";
import Field from "../../Shared/Field";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";
import CodigoField from "../Fields/CodigoField";

import { useIdentificacionValues, useIdentificacionActions } from "../../../Store/Form/selectors/identificacion.selectors";
import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProovedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "../hooks/useEditarActuales";
import { inputsClass } from "../Config/classes";

export type IdentVariant = "full" | "basic";

export default function IdentificacionComercial({ variant = "full" }: { variant?: IdentVariant }) {
  const { canEditCampos, canEditCodigo } = usePermisosCampos();

  // Identificación (BE keys)
  const { nombre: nombreSlice, nfantasia: nfantasiaSlice } = useIdentificacionValues();
  const { setNombre, setNfantasia } = useIdentificacionActions();

  // Metadatos (BE keys) — inhabilitado ahora es `inha`
  const inhaSlice = useProovedoresStore((s) => s.inha);
  const setMetadatosField = useProovedoresStore((s) => s.setMetadatosField);

  const { isEditable, updateActuales } = useEditarActuales();
  const actuales = useProovedoresStore((s) => s.datosActuales);

  // Valores efectivos (si estamos en modo “editar actuales”, priorizamos snapshot)
  const nombre = isEditable && actuales ? actuales.nombre ?? nombreSlice : nombreSlice;
  const nfantasia = isEditable && actuales ? actuales.nfantasia ?? nfantasiaSlice : nfantasiaSlice;
  const inhabilitado = isEditable && actuales ? !!actuales.inha : !!inhaSlice;

  return (
    <>
      <Field label="Código" colSpan={2} required>
        <CodigoField disabled={!canEditCodigo} variant={variant} />
      </Field>

      {variant === "full" && (
        <Field colSpan={1} rowStart={1} colStart={4} className="place-content-center">
          <CheckboxInput
            label="Inhabilitado"
            checked={inhabilitado}
            disabled={!canEditCampos}
            onChangeChecked={(checked) => {
              setMetadatosField("inha", checked); // BE key
              if (isEditable) updateActuales({ inha: checked });
            }}
          />
        </Field>
      )}

      <Field label="Razón social" rowStart={2} colSpan={2} required>
        <FlexibleInputField
          value={nombre}
          focusId="proovedores:nombre" // BE key
          placeholder="Razón social"
          labelWidth="w-0"
          
          labelClassName="hidden"
          inputClassName={inputsClass}
          disabled={!canEditCampos}
          onChange={(v) => {
            setNombre(v); // BE setter
            if (isEditable) updateActuales({ nombre: v });
          }}
        />
      </Field>

      {variant === "full" && (
        <Field label="Nombre de Fantasía" rowStart={3} colSpan={2} required>
          <FlexibleInputField
            value={nfantasia ?? ""}
            focusId="nfantasia" // BE key
            placeholder="Nombre de Fantasía"
            labelWidth="w-0"
            labelClassName="hidden"
            inputClassName={inputsClass}
            disabled={!canEditCampos}
            onChange={(v) => {
              setNfantasia(v); // BE setter
              if (isEditable) updateActuales({ nfantasia: v });
            }}
          />
        </Field>
      )}
    </>
  );
}
