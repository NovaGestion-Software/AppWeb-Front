import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { FunctionComponent, useState } from "react";
import ShowModalsButtons from "./ShowModalsButtons";
import { VentasUnidadNegocioStore } from "../Store/store";

interface Botonera2Props {}

const Botonera2: FunctionComponent<Botonera2Props> = () => {
  const { estaProcesado } = VentasUnidadNegocioStore();
  // show modals de filtros
  const [_showUniNego, setShowUniNego] = useState(false);
  const [_showClientes, setShowClientes] = useState(false);
  // show modal rubros
  const [_showSucursales, setShowSucursales] = useState(true);

  const propsShowModales = {
    propsShowModal: {
      setShowUniNego: setShowUniNego,
      setShowSucursales: setShowSucursales,
      setShowClientes: setShowClientes,
    },
  };
  return (
    <Card className="col-start-8">
      <ShowModalsButtons estaProcesado={estaProcesado} className="flex gap-1 " props={propsShowModales} />
    </Card>
  );
};

export default Botonera2;
