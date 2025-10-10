// /views/app/Proveedores/Components/Botonera/BotoneraDB.tsx
import { useCallback } from "react";
import clsx from "clsx";
import { BsDatabaseAdd, BsDatabaseCheck, BsDatabaseX } from "react-icons/bs";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

import { Botonera } from "@/views/app/informes/_components/Botonera";
import type { BotoneraConfig } from "@/types/ButtonConfig";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useFlagsEstado, useIs, usePermisosIMAC } from "../../Store/Status/status.selectors";
import { useProovedoresStore } from "../../Store/Store";
import { useConfirmarModificacion } from "../../Actions/useConfirmarModificacion";
import { EstadoIMAC } from "../../Store/Status/types";
import { buttonsClass } from "../Form/Config/classes";
import { useConfirmarAlta } from "../../Actions/useConfirmarAlta";
import { requestFocusDOM } from "@/frontend-resourses/Hooks/Focus/requestFocusDOM";
import { useTabsActions } from "../../Store/Tabs/Tab.selectors";

type Props = {
  className?: string;
};

export default function BotoneraTerciaria({ className }: Props) {
  // Estado IMAC
  const { isAlta, isModificacion, isConsulta } = useIs();
  const { isProcessing } = useFlagsEstado();
  const { canEditar, canEliminar } = usePermisosIMAC();

  const { setActiveTabIndex } = useTabsActions()

  // Datos
  const datosIniciales = useProovedoresStore((s) => s.datosIniciales);
  const datosActuales = useProovedoresStore((s) => s.datosActuales);

  // Disponibilidades
  const canConfirmAlta = isAlta;
  const canConfirmModificacion = isModificacion && !!datosActuales && !isProcessing;
  const canCancel = (isAlta || isModificacion) && !isProcessing;

  // ✅ onConfirmMod viene del hook (usa modificarProveedor(obj1, obj2) y sincroniza la store)
  const { onConfirmMod } = useConfirmarModificacion(canConfirmModificacion);

  // Acción: confirmar alta (por ahora local; ajustar cuando haya endpoint de alta)
  const { onConfirmAlta } = useConfirmarAlta(canConfirmAlta);

  // Acción: cancelar (alta/mod)
  const onCancel = useCallback(async () => {
    const s = useProovedoresStore.getState();
    const estado = s.estado as EstadoIMAC;

    if (estado === EstadoIMAC.ALTA) {
      console.log("⛔ Cancelar ALTA → resetAll()");
      s.resetAll?.();
      s.bumpFormEpoch?.(); // 👈 remonta UI
      return;
    }

    if (estado === EstadoIMAC.MODIFICACION) {
      console.log("⛔ Cancelar MODIFICACIÓN → rehidratar desde datosIniciales");

      if (s.datosIniciales) {
        await s.hydrateAllSlicesFromRow(s.datosIniciales); // 1) rehidratar slices
      }

      s.setDatosActuales?.(null); // 2) borrar buffer de edición
      s.setCambiosPendientes?.(false); // 3) limpiar flag
      s.bumpFormEpoch?.(); // 4) remonta UI (clave!)
      s.dispatch?.("CANCELAR"); // 5) transiciona IMAC
    }
  }, []);

  // Acción: MODIFICAR (pasar a estado de edición)
  const onModificar = useCallback(() => {
    const s = useProovedoresStore.getState();
    if (!s.datosIniciales) {
      console.warn("✏️ MODIFICACIÓN: no hay datosIniciales para clonar");
      return;
    }
    
    // Se clona snapshot de trabajo para edición
    s.setDatosActuales?.(structuredClone(s.datosIniciales));
    s.setCambiosPendientes?.(false);
    setActiveTabIndex(0);
    requestFocusDOM("proovedores:nombre", { selectAll: true, scrollIntoView: true });
    s.dispatch?.("EDITAR");
  }, []);

  // Acción: ELIMINAR (reset vista, no DB)
  const onEliminar = useCallback(() => {
    const s = useProovedoresStore.getState();
    s.resetAll?.();
    console.log("🧹 Reset de vista completado");
  }, []);

  // Disponibilidades extras para Modificar/Eliminar (vista)
  const canModificar = !!datosIniciales && canEditar && isConsulta && !isProcessing;
  const canEliminarVista = canEliminar && !isProcessing;

  // Guardar: único botón con texto dinámico
  const saveText = isAlta ? "Guardar Proveedor" : "Guardar Cambios";
  const saveOnClick = isAlta ? onConfirmAlta : onConfirmMod;
  const saveDisabled = isAlta ? !canConfirmAlta : !canConfirmModificacion;

  // Botonera unificada
  const config: BotoneraConfig[] = [
    {
      type: "simple",
      icon: <MdEdit size={18} />,
      color: "blue",
      text: "Editar",
      onClick: onModificar,
      disabled: !canModificar,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <MdDeleteOutline size={18} />,
      color: "blue",
      text: "Eliminar",
      onClick: onEliminar,
      disabled: !canEliminarVista,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: isAlta ? <BsDatabaseAdd size={18} /> : <BsDatabaseCheck size={18} />,
      color: isAlta ? "green" : "blue",
      text: saveText,
      onClick: saveOnClick,
      disabled: saveDisabled,
      addClassName: buttonsClass,
    },
    {
      type: "simple",
      icon: <BsDatabaseX size={18} />,
      color: "red",
      text: "Descartar Cambios",
      onClick: onCancel,
      disabled: !canCancel,
      addClassName: buttonsClass,
    },
  ];

  return (
    <div className="flex items-center gap-2 justify-end py-1 px-2 bg-gray-200/50 rounded-sm">
      <Card solid={false} className={clsx("flex items-center justify-end self-center", className)}>
        <Botonera config={config} />
      </Card>
    </div>
  );
}
