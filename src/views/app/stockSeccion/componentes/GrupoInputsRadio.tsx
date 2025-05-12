import FiltrarPorTipo from "./FiltrarPorTipo";
import FiltrarSegunLista from "./FiltrarSegunLista";
import FiltroPorStock from "./FiltroPorStock";
import OrdenarPorCheckbox from "./OrdernarPorCheckbox";

export default function GrupoInputsRadio({className}:{ className?: string}) {
  return (
    <div
      className={`${className} flex gap-2 items-center 
rounded-md`}
    >
      {/**GRUPO 1 */}
      <div className="border p-1 bg-white rounded-md">
        <FiltrarPorTipo />
      </div>
      <div className="border p-1 bg-white rounded-md">
        <OrdenarPorCheckbox />
      </div>
      {/** GRUPO 2 */}
      <div className="border p-1 bg-white rounded-md">
        <FiltroPorStock />
      </div>
      {/**GRUPO 3 -  */}
      <div className="border p-1 bg-white rounded-md v1536:relative v1536:right-1">
        <FiltrarSegunLista />
      </div>
    </div>
  );
}
