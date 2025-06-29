import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { crearExportConfig, getBotonSucursal } from "@/utils/helpers/botonera";
import BotoneraDefault from "../../_components/BotoneraDefault";
import { useGarantiasStore } from "../Store/store";
import { garantiasData } from "../Data/Data";
import { useState } from "react";
import { Botonera } from "../../_components/Botonera";

interface BotoneraProps {
  className?: string;
  datosParaFooter?: Record<string, any>; // Opcional
  disabled?: boolean;
  handleClean?: () => void; // Función opcional para limpiar
}

export default function BotoneraPrincipal({ className, handleClean }: BotoneraProps) {
  const { id, estaProcesado } = useGarantiasStore();
  const [_show, setShow] = useState<boolean>();
  const exportConfig = crearExportConfig("informe_garantias", "garantias", garantiasData);
  const config = [
    getBotonSucursal({
      setVisible: setShow,
      disabled: !estaProcesado,
    }),
  ];
  return (
    <Card className={`${className} flex flex-row items-center gap-3 col-start-11 row-start-1 self-center v1536:col-start-11  `}>
      <Botonera config={config} />
      <BotoneraDefault exportConfig={exportConfig} containerId={id} disabled={!estaProcesado} handleClean={handleClean} />
    </Card>
  );
}
