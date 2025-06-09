import { ViewTitle } from "@/frontend-resourses/components";
import Botonera from "./Componentes/Botonera";
import { ventasUnidadNegocioData } from "./Data/data";
import Tabla from "./Componentes/Tabla";
import DateInput from "./Componentes/DateInput";
import SearchInput from "./Componentes/SearchInput";
import TipoDeMetrica from "./Componentes/TipoDeMetrica";
import TipoDeFrecuencia from "./Componentes/TipoDeFrecuencia";
import Botonera2 from "./Componentes/Botonera2";

export default function VentasUnidadNegocioView() {
  return (
    <div className="min-h-screen">
      <ViewTitle title="Ventas por Unidad de Negocio" />
      <div className="grid2 gap-1 w-auto h-auto ml-4 p-2"> 
        <Botonera data={ventasUnidadNegocioData} />
        <DateInput className="col-start-1" />
        <SearchInput className="row-start-3" />
        <TipoDeMetrica />
        <TipoDeFrecuencia />
        <Botonera2 />
        <Tabla className="row-start-4 row-span-full" />
      </div>
    </div>
  );
}
