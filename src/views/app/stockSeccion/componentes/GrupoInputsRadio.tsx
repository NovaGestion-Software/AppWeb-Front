import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import FiltrarPorTipo from "./FiltrarPorTipo";
import FiltrarSegunLista from "./FiltrarSegunLista";
import FiltroPorStock from "./FiltroPorStock";
import OrdenarPorCheckbox from "./OrdernarPorCheckbox";

export default function GrupoInputsRadio({ className }: { className?: string }) {
  return (
    <div
      className={`${className} flex gap-2 items-center 
rounded-md`}
    >
      {/**GRUPO 1 */}
      <Card>
        <FiltrarPorTipo />
      </Card>
      <Card>
        <OrdenarPorCheckbox />
      </Card>
      {/** GRUPO 2 */}
      <Card>
        <FiltroPorStock />
      </Card>
      {/**GRUPO 3 -  */}
      <Card>
        <FiltrarSegunLista />
      </Card>
    </div>
  );
}
