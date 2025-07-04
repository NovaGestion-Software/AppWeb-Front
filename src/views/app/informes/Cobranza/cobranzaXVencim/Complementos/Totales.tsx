import { Card } from "@/frontend-resourses/components/Cards/CardBase";

export interface TotalesItem {
  titulo: string;
  icono: string | JSX.Element;
  valor: number;
  mostrarPorcentaje?: boolean;
  porcentaje?: number;
}

export interface TotalesCobranzaProps {
  principales?: TotalesItem[];
  extras?: TotalesItem[];
  className?: string;
}

const TotalesItemBox = ({ titulo, icono, valor, mostrarPorcentaje = false, porcentaje }: TotalesItem) => {
  return (
    <div
      className="flex gap-4 col-span-1 overflow-x-auto noneScroll items-center
     border-gray-300 border rounded-md py-2 px-4 "
    >
      <span className="scale-150">{icono}</span>
      <div className="flex flex-col font-semibold">
        <span>{titulo}</span>
        <span className="tabular-nums text-lg font-roboto overflow-x-auto w-full flex flex-row items-center gap-1 justify-start">
          ${valor.toLocaleString()}
          {mostrarPorcentaje && porcentaje !== undefined && <span className="text-gray-600 text-sm">({porcentaje.toFixed(2)}%)</span>}
        </span>
      </div>
    </div>
  );
};

export default function Totales({ principales, extras, className = "" }: TotalesCobranzaProps) {
  return (
    <Card
      padding={false}
      className={`${className}  w-full noneScroll overflow-auto 
      pt-0 
    mx-auto `}
    >
      {/* Título */}
      <div
        className="bg-blue-200 text-blue-900 
      font-semibold text-xs text-center py-0.5  v1440:text-sm"
      >
        🧾 Totales
      </div>

      {/* Principales */}
      {principales && (
        <div className="grid grid-cols-2 gap-4 p-1 v1440:p-4 v1440:pt-3">
          {principales?.map((item, index) => (
            <TotalesItemBox key={index} {...item} />
          ))}
        </div>
      )}

      {/* Extras */}
      {extras && (
        <div className=" grid grid-cols-2 gap-1 px-2 pt-1 v1440:gap-2  v1440:px-4   ">
          {extras?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 col-span-full overflow-x-auto noneScroll items-center border-gray-300  border rounded-md py-1  pl-2  v1440:pl-4 v1440:py-2">
              
              {/**Texto e icono */}
              <div className=" col-span-3 v1536:col-span-3 flex gap-0 w-full justify-start text-xs items-center 
              font-semibold v1440:gap-2 ">
                <span className="w-6 ">{item.icono}</span>
                <span className="w-fit px-1 pt-0 text-[0.7rem] ">{item.titulo}</span>
              </div>

              {/** Valor */}
              <span className="col-span-2 v1536:col-span-2 tabular-nums font-semibold text-xs font-roboto overflow-x-auto w-full flex flex-row items-center gap-0 justify-start  noneScroll">
                $ {item.valor.toLocaleString()}
                {item.mostrarPorcentaje && item.porcentaje !== undefined && <span className="text-gray-600 text-xs">({item.porcentaje.toFixed(2)}%)</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
