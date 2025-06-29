import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { Botonera } from "../../_components/Botonera";
import { getBotonSucursal } from "@/utils/helpers/botonera";
import { useState } from "react";
import { useMovCajaTotalesStore } from "../Store/store";

export default function BotoneraExtra() {
  const [_show, setShow] = useState<boolean>()
  const {estaProcesado} = useMovCajaTotalesStore()
 const config = [
  getBotonSucursal({
    setVisible: setShow,
    disabled: !estaProcesado,
  }),
];

  return (
    <Card>
      <Botonera config={config} />
    </Card>
  );
}
