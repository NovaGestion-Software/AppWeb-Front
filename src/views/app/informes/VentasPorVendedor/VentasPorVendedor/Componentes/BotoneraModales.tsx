import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { getBotonSucursal } from "@/utils/helpers/botonera";
import { useState } from "react";
import { Botonera } from "../../../_components/Botonera";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { MdReceiptLong } from "react-icons/md";
import { useVentasPorVendedor } from "../Store/Store";

export default function BotoneraModales() {
  const [_show, setShow] = useState<boolean>();
  const { estaProcesado, setEstaProcesado } = useVentasPorVendedor();
  const buttonsClass = `h-6 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm`;

  const config: BotoneraConfig[] = [
    getBotonSucursal({
      setVisible: setShow,
      disabled: !estaProcesado,
    }),
    {
      type: "simple",
      icon: <MdReceiptLong size={12} />,
      color: "blue",
      text: "Uni. Negocio",
      onClick: () => setEstaProcesado(true),
      disabled: !estaProcesado,
      addClassName: `${buttonsClass} w-28 v1536:w-40`,
    },
  ];

  return (
    <Card className="col-start-9 v1536:col-start-8 self-center">
      <Botonera config={config} />
    </Card>
  );
}
