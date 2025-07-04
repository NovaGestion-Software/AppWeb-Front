import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { getBotonSucursal } from "@/utils/helpers/botonera";
import { useState } from "react";
import { Botonera } from "../../../_components/Botonera";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { useVentasClientesOtrosMedios } from "../Store/Store";

export default function BotoneraModales() {
  const [_show, setShow] = useState<boolean>();
  const { estaProcesado, } = useVentasClientesOtrosMedios();

  const config: BotoneraConfig[] = [
    getBotonSucursal({
      setVisible: setShow,
      disabled: !estaProcesado,
    }),
  ];

  return (
    <Card className="col-start-11 relative right-5 v1536:right-0 v1536:col-start-10  self-start">
      <Botonera config={config} />
    </Card>
  );
}
