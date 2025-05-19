
export interface TotalesItem {
  titulo: string;
  icono: string;
  valor: number;
  mostrarPorcentaje?: boolean;
  porcentaje?: number;
}

export interface TotalesCobranzaProps {
  principales: TotalesItem[];
  extras?: TotalesItem[];
  className?: string;
}

const TotalesItemBox = ({ titulo, icono, valor, mostrarPorcentaje = false, porcentaje }: TotalesItem) => {
  return (
    <div className="flex gap-4 col-span-1 overflow-x-auto noneScroll items-center border-gray-300 border rounded-md py-2 px-4 ">
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
    <div
      className={`${className} h-full w-full noneScroll overflow-auto 
    mx-auto rounded-xl shadow-md  shadow-gray-600  bg-white `}
    >
      {/* Título */}
      <div className="bg-blue-200 text-blue-900 
      font-semibold text-center py-1  text-base">🧾 Totales</div>

      {/* Principales */}
      <div className="grid grid-cols-2 gap-4 p-4 pt-3">
        {principales.map((item, index) => (
          <TotalesItemBox key={index} {...item} />
        ))}
      </div>

      {/* Extras */}
      {extras && (
        <div className=" grid grid-cols-2 gap-2 px-4 pt-0">
          {extras?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between gap-2 col-span-full overflow-x-auto noneScroll items-center border-gray-300 border rounded-md py-2 pl-4 "
            >
              <div className="flex gap-4 w-full justify-start items-center font-semibold ">
                <span className="">{item.icono}</span>
                <span className="w-full px-1 pt-0">{item.titulo}</span>
              </div>
              <span className="tabular-nums font-semibold text-lg font-roboto
               overflow-x-auto w-full flex flex-row items-center gap-1 justify-start  noneScroll">
                $ {item.valor.toLocaleString()}
                {item.mostrarPorcentaje && item.porcentaje !== undefined && <span className="text-gray-600 text-sm">({item.porcentaje.toFixed(2)}%)</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
