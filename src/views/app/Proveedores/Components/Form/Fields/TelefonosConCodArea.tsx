import { FlexibleInputField } from "@/frontend-resourses/components";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import Field from "../../Shared/Field";
import { useIs, useFormEpoch } from "../../../Store/Status/status.selectors";
import { useProovedoresStore } from "../../../Store/Store";
import clsx from "clsx";

type CampoLike = {
  value: unknown;
  disabled?: boolean;
  onChange: (v: any) => void;
};

type ParTelefono = {
  area: CampoLike;
  tel: CampoLike;
};

interface TelefonosConCodAreaProps {
  label?: string;
  inputsClass: string;
  base: ParTelefono;
  v1?: ParTelefono;
  v2?: ParTelefono;
  clearV1?: () => void;
  clearV2?: () => void;
}

export function TelefonosConCodArea({
  label = "Teléfono",
  inputsClass,
  base,
  v1,
  v2,
  clearV1,
  clearV2,
}: TelefonosConCodAreaProps) {
  const asStr = (v: unknown) =>
    typeof v === "string" ? v : v == null ? "" : String(v);

  // IMAC + epoch para re-montar UI en CONFIRMAR/CANCELAR
  const { isAlta, isModificacion } = useIs();
  const canEdit = isAlta || isModificacion;
  const formEpoch = useFormEpoch();

  const datosActuales = useProovedoresStore((s) => s.datosActuales);
  const datosIniciales = useProovedoresStore((s) => s.datosIniciales);
  const idprovee = useProovedoresStore((s) => s.datosIniciales?.idprovee ?? 0);

  // Fuente para visibilidad/consulta
  const sourceRow = canEdit ? datosActuales : datosIniciales;

  const hasV1Data =
    !!asStr((sourceRow as any)?.codarea1).trim() ||
    !!asStr((sourceRow as any)?.telefono1).trim();

  const hasV2Data =
    !!asStr((sourceRow as any)?.codarea2).trim() ||
    !!asStr((sourceRow as any)?.telefono2).trim();

  // En edición, si las keys existen en datosActuales (aunque estén en ""), mostramos el bloque
  const existsV1Keys =
    !!(datosActuales && ("codarea1" in (datosActuales as any) || "telefono1" in (datosActuales as any)));
  const existsV2Keys =
    !!(datosActuales && ("codarea2" in (datosActuales as any) || "telefono2" in (datosActuales as any)));

  const hasV1 = hasV1Data || (canEdit && existsV1Keys);
  const hasV2 = hasV2Data || (canEdit && existsV2Keys);

  // Estilos de botones: azul habilitado, gris deshabilitado
  const btnClass = (enabled: boolean) =>
    clsx(
      "inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs transition",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      enabled
        ? "text-blue-600 border-blue-300 hover:bg-blue-50"
        : "text-slate-400 border-slate-300 hover:opacity-90"
    );

  const rowGrid =
    "grid grid-cols-[minmax(70px,110px)_1fr_auto] gap-2 items-center";

  // Asegura un objeto editable (si por algo aún no está seteado)
  const ensureEditableRow = () => {
    const s = useProovedoresStore.getState();
    let curr = s.datosActuales as any;
    if (!curr) {
      const base = sourceRow ? structuredClone(sourceRow) : {};
      s.setDatosActuales?.(base as any);
      curr = base;
    }
    return curr;
  };

  // Agregar V1/V2: crea las keys en datosActuales (aunque sea "")
  const addRow1 = () => {
    if (!canEdit) return;
    const s = useProovedoresStore.getState();
    const curr = ensureEditableRow();
    s.setDatosActuales?.({
      ...curr,
      codarea1: asStr(curr.codarea1),
      telefono1: asStr(curr.telefono1),
    });
    s.setCambiosPendientes?.(true);
  };

  const addRow2 = () => {
    if (!canEdit) return;
    const s = useProovedoresStore.getState();
    const curr = ensureEditableRow();
    s.setDatosActuales?.({
      ...curr,
      codarea2: asStr(curr.codarea2),
      telefono2: asStr(curr.telefono2),
    });
    s.setCambiosPendientes?.(true);
  };

  // Quitar V1/V2: limpia valores y mantiene consistencia
  const removeRow1 = () => {
    if (!canEdit) return;
    const s = useProovedoresStore.getState();
    const curr = ensureEditableRow();
    clearV1?.();
    s.setDatosActuales?.({
      ...curr,
      codarea1: "",
      telefono1: "",
    });
    s.setCambiosPendientes?.(true);
  };

  const removeRow2 = () => {
    if (!canEdit) return;
    const s = useProovedoresStore.getState();
    const curr = ensureEditableRow();
    clearV2?.();
    s.setDatosActuales?.({
      ...curr,
      codarea2: "",
      telefono2: "",
    });
    s.setCambiosPendientes?.(true);
  };

  return (
    <Field label={label} rowStart={3} colStart={5} colSpan={4}>
      <div className="space-y-3 mb-4">
        {/* Base */}
        <div
          key={`tel-base-${idprovee}-${formEpoch}`}
          className={rowGrid}
        >
          <FlexibleInputField
            value={asStr(base.area.value)}
            disabled={base.area.disabled}
            placeholder="Cod. área"
            labelClassName="hidden"
            inputClassName={`${inputsClass} text-center`}
            onChange={base.area.onChange}
          />
          <FlexibleInputField
            value={asStr(base.tel.value)}
            disabled={base.tel.disabled}
            placeholder="Teléfono"
            labelClassName="hidden"
            inputClassName={inputsClass}
            onChange={base.tel.onChange}
          />
          <div className="flex items-center gap-1">
            {!hasV1 && v1 && (
              <button
                type="button"
                className={btnClass(canEdit)}
                onClick={addRow1}
                disabled={!canEdit}
                title="Agregar teléfono 1"
              >
                <MdAddCircleOutline size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Versión 1 */}
        {hasV1 && v1 && (
          <div
            key={`tel-v1-${idprovee}-${formEpoch}`}
            className={rowGrid}
          >
            <FlexibleInputField
              value={asStr(v1.area.value)}
              disabled={v1.area.disabled}
              placeholder="Cod. área (1)"
              labelClassName="hidden"
              inputClassName={`${inputsClass} text-center`}
              onChange={v1.area.onChange}
            />
            <FlexibleInputField
              value={asStr(v1.tel.value)}
              disabled={v1.tel.disabled}
              placeholder="Teléfono (1)"
              labelClassName="hidden"
              inputClassName={inputsClass}
              onChange={v1.tel.onChange}
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                className={btnClass(canEdit)}
                onClick={removeRow1}
                disabled={!canEdit}
                title="Quitar teléfono 1"
              >
                <MdRemoveCircleOutline size={16} />
              </button>

              {!hasV2 && v2 && (
                <button
                  type="button"
                  className={btnClass(canEdit)}
                  onClick={addRow2}
                  disabled={!canEdit}
                  title="Agregar teléfono 2"
                >
                  <MdAddCircleOutline size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Versión 2 */}
        {hasV2 && v2 && (
          <div
            key={`tel-v2-${idprovee}-${formEpoch}`}
            className={rowGrid}
          >
            <FlexibleInputField
              value={asStr(v2.area.value)}
              disabled={v2.area.disabled}
              placeholder="Cod. área (2)"
              labelClassName="hidden"
              inputClassName={`${inputsClass} text-center`}
              onChange={v2.area.onChange}
            />
            <FlexibleInputField
              value={asStr(v2.tel.value)}
              disabled={v2.tel.disabled}
              placeholder="Teléfono (2)"
              labelClassName="hidden"
              inputClassName={inputsClass}
              onChange={v2.tel.onChange}
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                className={btnClass(canEdit)}
                onClick={removeRow2}
                disabled={!canEdit}
                title="Quitar teléfono 2"
              >
                <MdRemoveCircleOutline size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </Field>
  );
}
