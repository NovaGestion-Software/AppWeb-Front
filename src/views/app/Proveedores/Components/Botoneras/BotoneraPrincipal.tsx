import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { crearExportConfig } from "@/utils/helpers/botonera";
import { useProveedoresStore } from "../../Store/Store";
import BotoneraDefault from "../../../informes/_components/BotoneraDefault";
import { useIs } from "../../Store/Status/status.selectors";
import { useTabs } from "../../Store/Tabs/Tab.selectors";
import { useOnSalirClick } from "../../Actions/useOnSalirClick";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>;
  disabled?: boolean;
}

export default function BotoneraPrincipal({ className }: BotoneraProps) {
  const {onSalir} = useOnSalirClick()
  const { datosIniciales, id } = useProveedoresStore();
  const { tabs } = useTabs();
  const { isConsulta } = useIs();
  const proveedoresData = datosIniciales ? [datosIniciales] : [];
  const exportConfig = crearExportConfig("datos_proveedores", "Proveedores", proveedoresData);

  return (
    <Card solid={false} className={`${className}  col-start-12 row-start-1 self-start v1536:col-start-12  `}>
      <BotoneraDefault
        multiSelectExcel={false}
        exportConfig={exportConfig}
        itemsDisponibles={[
          { id: tabs[0].id, nombre: "Datos Comerciales" },
          { id: tabs[1].id, nombre: "Datos Impositivos" },
          { id: tabs[2].id, nombre: "Forma de Pago" },
        ]}
        printOptions={({ ids }) => ({
          title: ids.length > 1 ? "Proveedor — Ficha completa" : "Proveedor — Sección",
          pageBreakBetween: ids.length > 1,
          includeStyles: true,
        })}
        containerId={id}
        disabled={!isConsulta}
        handleClean={onSalir}
        disabledExit={false}
      />
    </Card>
  );
}
