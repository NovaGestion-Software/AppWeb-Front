import { VentasUnidadNegocioStore } from "../Store/store";
import TablaArticulos from "./TablaArticulos";
import TablaImportes from "./TablaImportes";

export default function Tabla() {
  const { checkboxSeleccionados } = VentasUnidadNegocioStore();
  return <div className="row-start-4 row-span-full">{checkboxSeleccionados.grupo1 === "Importes" ? <TablaImportes /> : <TablaArticulos />}</div>;
}
