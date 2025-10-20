// /views/app/Proveedores/Components/Form/Blocks/IdentificacionComercial.tsx
import { FlexibleInputField } from "@/frontend-resourses/components";
import Field from "../../Shared/Field";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";
import CodigoField from "../Fields/CodigoField";
import { useIdentificacionValues, useIdentificacionActions } from "../../../Store/Form/selectors/identificacion.selectors";
import { usePermisosCampos } from "../../../Store/Status/status.selectors";
import { useProveedoresStore } from "../../../Store/Store";
import { useEditarActuales } from "../hooks/useEditarActuales";
import { useCampoIdentificacion } from "../hooks/useCampoIdentificacion";
import { inputsClass } from "../Config/classes";

import { IdentificacionFieldSchemas as FS } from "@/views/app/Proveedores/Data/formDraft/identificacion.schema";
import { useTabs } from "../../../Store/Tabs/Tab.selectors";

export type IdentVariant = "full" | "basic";

export default function IdentificacionComercial({ variant = "full" }: { variant?: IdentVariant }) {
  const { canEditCampos, canEditCodigo } = usePermisosCampos();
  const { activeTabIndex } = useTabs();

  const { nombre: nombreSlice, nfantasia: nfantasiaSlice } = useIdentificacionValues();
  const { setNombre, setNfantasia } = useIdentificacionActions();

  const inhaSlice = useProveedoresStore((s) => s.inha);
  const setMetadatosField = useProveedoresStore((s) => s.setMetadatosField);

  const { isEditable, updateActuales } = useEditarActuales();
  const actuales = useProveedoresStore((s) => s.datosActuales);

  // Estado boolean inhabilitado
  const inhabilitado = isEditable && actuales ? !!actuales.inha : !!inhaSlice;

  // Hooks controlados por campo
  const nombreH = useCampoIdentificacion("nombre", nombreSlice, setNombre, { validator: FS?.nombre });
  const nfH = useCampoIdentificacion("nfantasia", nfantasiaSlice ?? "", setNfantasia, { validator: FS?.nfantasia });

  // Errores del slice de formulario (prioridad sobre el error local del hook)
  const errorNombreSlice = useProveedoresStore((s) => s.errors.nombre);
  const errorNfSlice = useProveedoresStore((s) => s.errors.nfantasia);

  // Resolución de mensaje visible (prioridad: slice > hook)
  const nombreError = errorNombreSlice ?? nombreH.error;
  const nfError = errorNfSlice ?? nfH.error;

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
              setMetadatosField("inha", checked); // clave alineada al backend
              if (isEditable) updateActuales({ inha: checked });
            }}
          />
        </Field>
      )}

      <Field label="Razón social" rowStart={2} colSpan={2} required>
        <FlexibleInputField
          value={nombreH.value}
          focusId="proveedores:nombre"
          placeholder="Razón social"
          labelWidth="w-0"
          labelClassName="hidden"
          inputClassName={inputsClass}
          disabled={!canEditCampos || activeTabIndex !== 0}
          onChange={nombreH.onChange}
          onBlur={nombreH.onBlur}
          aria-invalid={!!nombreError}
          aria-describedby={nombreError ? "proveedores:nombre-error" : undefined}
        />
        {nombreError && (
          <small id="proveedores:nombre-error" role="alert" className="text-red-500">
            {nombreError}
          </small>
        )}
      </Field>

      {variant === "full" && (
        <Field label="Nombre de Fantasía" rowStart={3} colSpan={2} required>
          <FlexibleInputField
            value={nfH.value}
            focusId="proveedores:nfantasia"
            placeholder="Nombre de Fantasía"
            labelWidth="w-0"
            labelClassName="hidden"
            inputClassName={inputsClass}
            disabled={!canEditCampos}
            onChange={nfH.onChange}
            onBlur={nfH.onBlur}
            aria-invalid={!!nfError}
            aria-describedby={nfError ? "proveedores:nfantasia-error" : undefined}
          />
          {nfError && (
            <small id="proveedores:nfantasia-error" role="alert" className="text-red-500">
              {nfError}
            </small>
          )}
        </Field>
      )}
    </>
  );
}
