// /BotoneraSecundaria.tsx
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { Botonera } from "../../../informes/_components/Botonera";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { useEstadoActions, usePermisosIMAC } from "@/views/app/Proveedores/Store/Status/status.selectors";
import { MdAddCircleOutline, } from "react-icons/md";
import { useProovedoresStore } from "../../Store/Store";
import { requestFocusDOM } from "@/frontend-resourses/Hooks/Focus/requestFocusDOM";
import { useTabsActions } from "../../Store/Tabs/Tab.selectors";
import { buttonsClass } from "../Form/Config/classes";


export default function BotoneraSecundaria() {
  const { dispatch } = useEstadoActions();
  const { canCrear, } = usePermisosIMAC();
  const { setActiveTabIndex } = useTabsActions();

  const onAgregar = () => {
    const s = useProovedoresStore.getState();

    // 1) Dejamos TODO en blanco con los defaults de cada slice
    // (Identificación, Comerciales, Impositivos, Retenciones, Forma de pago, etc.)
    s.resetAll?.();

    // 2) Snapshots: en ALTA no hay origen BE → inicial = null, actual = null
    // (los inputs leen de los slices; el snapshot lo usamos para comparaciones/guardado)
    s.setDatosIniciales?.(null);
    s.setDatosActuales?.(null);

    // 3) Estado de edición / flags
    s.setCambiosPendientes?.(false);
    setActiveTabIndex(0);
    requestFocusDOM("proovedores:nombre", { selectAll: true, scrollIntoView: true });
    dispatch("CREAR");
  };



  const config: BotoneraConfig[] = [
    {
      type: "simple",
      icon: <MdAddCircleOutline size={14} />,
      color: "blue",
      text: "Agregar",
      onClick: onAgregar,
      disabled: !canCrear,
      addClassName: buttonsClass,
    },

  ];

  return (
    <Card solid={false } className="col-start-10  self-center">
      <Botonera config={config} />
    </Card>
  );
}
