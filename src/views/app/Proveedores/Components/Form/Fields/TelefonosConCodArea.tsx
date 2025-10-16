import { FlexibleInputField } from "@/frontend-resourses/components";
import Field from "../../Shared/Field";
import { useProveedoresStore } from "../../../Store/Store";
import { useFormEpoch } from "../../../Store/Status/status.selectors";

// Tipos de ayuda (asumiendo tus tipos locales)
type CampoLike = {
  value: unknown;
  disabled?: boolean;
  onChange: (v: any) => void;
  onBlur?: () => void;
  error?: string;
};
type ParTelefono = { area: CampoLike; tel: CampoLike };

type TelefonosConCodAreaProps = {
  label?: string;
  inputsClass: string;
  base: ParTelefono;
  v1?: ParTelefono;
  v2?: ParTelefono;
};

export default function TelefonosConCodArea({ label = "Teléfono", inputsClass, base, v1, v2 }: TelefonosConCodAreaProps) {
  const asStr = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
  const formEpoch = useFormEpoch();
  const idprovee = useProveedoresStore((s) => s.datosIniciales?.idprovee ?? 0);

  // Fallbacks seguros si no vienen v1/v2: mantienen layout y evitan undefined
  const noop = () => {};
  const disabledCampo = (value: unknown = ""): CampoLike => ({
    value,
    disabled: true,
    onChange: noop,
    onBlur: noop,
  });
  const v1Safe: ParTelefono = v1 ?? { area: disabledCampo(""), tel: disabledCampo("") };
  const v2Safe: ParTelefono = v2 ?? { area: disabledCampo(""), tel: disabledCampo("") };
  const rowGrid = "grid grid-cols-[minmax(70px,110px)_1fr_auto] gap-2 items-center";

  return (
    <Field label={label} rowStart={3} colStart={5} colSpan={4}>
      <div className="space-y-3 mb-4">
        {/* Base (siempre visible) */}
        <div key={`tel-base-${idprovee}-${formEpoch}`} className={rowGrid}>
          <FlexibleInputField
            value={asStr(base.area.value)}
            disabled={base.area.disabled}
            placeholder="Cod. área"
            labelClassName="hidden"
            inputClassName={`${inputsClass} text-center`}
            onChange={base.area.onChange}
            onBlur={base.area.onBlur}
          />
          <FlexibleInputField
            value={asStr(base.tel.value)}
            disabled={base.tel.disabled}
            placeholder="Teléfono"
            labelClassName="hidden"
            inputClassName={inputsClass}
            onChange={base.tel.onChange}
            onBlur={base.tel.onBlur}
          />
          {/* sin botón en base */}
          <div />
        </div>

        {/* Versión 1 (siempre visible: usa v1 o fallback deshabilitado) */}
        <div key={`tel-v1-${idprovee}-${formEpoch}`} className={rowGrid}>
          <FlexibleInputField
            value={asStr(v1Safe.area.value)}
            disabled={v1Safe.area.disabled}
            placeholder="Cod. área (1)"
            labelClassName="hidden"
            inputClassName={`${inputsClass} text-center`}
            onChange={v1Safe.area.onChange}
            onBlur={v1Safe.area.onBlur}
          />
          <FlexibleInputField
            value={asStr(v1Safe.tel.value)}
            disabled={v1Safe.tel.disabled}
            placeholder="Teléfono (1)"
            labelClassName="hidden"
            inputClassName={inputsClass}
            onChange={v1Safe.tel.onChange}
            onBlur={v1Safe.tel.onBlur}
          />
        </div>

        {/* Versión 2 (siempre visible: usa v2 o fallback deshabilitado) */}
        <div key={`tel-v2-${idprovee}-${formEpoch}`} className={rowGrid}>
          <FlexibleInputField
            value={asStr(v2Safe.area.value)}
            disabled={v2Safe.area.disabled}
            placeholder="Cod. área (2)"
            labelClassName="hidden"
            inputClassName={`${inputsClass} text-center`}
            onChange={v2Safe.area.onChange}
            onBlur={v2Safe.area.onBlur}
          />
          <FlexibleInputField
            value={asStr(v2Safe.tel.value)}
            disabled={v2Safe.tel.disabled}
            placeholder="Teléfono (2)"
            labelClassName="hidden"
            inputClassName={inputsClass}
            onChange={v2Safe.tel.onChange}
            onBlur={v2Safe.tel.onBlur}
          />
        </div>
      </div>
    </Field>
  );
}
