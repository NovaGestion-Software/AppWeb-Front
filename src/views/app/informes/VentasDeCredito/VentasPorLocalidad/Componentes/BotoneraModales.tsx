import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { getBotonSucursal } from "@/utils/helpers/botonera";
import { useState } from "react";
import { Botonera } from "../../../_components/Botonera";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { useVentasEnCredito } from "../Store/Store";

export default function BotoneraModales() {
  const [_show, setShow] = useState<boolean>();
  const { estaProcesado, } = useVentasEnCredito();

  const config: BotoneraConfig[] = [
    getBotonSucursal({
      setVisible: setShow,
      disabled: !estaProcesado,
    }),
  ];

  return (
    <Card className="col-start-9 v1536:col-start-8 self-center">
      <Botonera config={config} />
    </Card>
  );
}
