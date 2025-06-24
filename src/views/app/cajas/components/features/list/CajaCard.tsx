import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { FaCashRegister } from "react-icons/fa";

type InfoItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type CajaCardProps = {
  title: string;
  items: InfoItem[];
  disponibilidad?: string;
  estado: boolean;
};

export default function CajaCard({ title, items, disponibilidad, estado }: CajaCardProps) {
  return (
    <Card
    

      className="flex flex-row w-full h-72 border-2 border-slate-500 pt-4 p-2 pl-5 hover:-translate-y-1 duration-150 hover:shadow-lg hover:shadow-gray-400"
    >
      <div className="grid grid-cols-7 grid-rows-7 gap-4 gap-x-5 px-2 w-full">
        {/* Título */}
        <div className="col-span-7">
          <div className="flex flex-row gap-4 flex-wrap items-center w-full p-2 text-sm 2xl:text-xl">
            <h1 className="font-semibold">{title}</h1>
          </div>
        </div>

        {/* Primeros 4 items */}
        <div className="col-span-3 row-span-4 col-start-1 row-start-2 text-xs 2xl:text-lg pt-2">
          <ul className="flex flex-col gap-1 p-1">
            {items.slice(0, 4).map((item, idx) => (
              <li key={idx} className="font-semibold">
                {item.label} {item.value}
              </li>
            ))}
          </ul>
        </div>

        {/* Restantes items financieros */}
        <div className="col-span-4 row-span-5 2xl:row-span-4 col-start-4 row-start-2 text-xs 2xl:text-lg pt-2">
          <ul className="flex flex-col gap-1 h-44 p-1">
            {items.slice(4).map((item, idx) => (
              <li
                key={idx}
                className="font-semibold flex flex-row justify-between items-center 2xl:items-start gap-1"
              >
                {item.label}
                <span className="text-green-700 text-right p-0 font-extrabold w-full 2xl:w-auto text-base 2xl:text-xl">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disponibilidad */}
        {disponibilidad && (
          <div className="col-span-4 col-start-4 row-start-7">
            <div className="2xl:text-xl text-base font-semibold text-blue-700 -mt-[15px] flex flex-row justify-between 2xl:gap-3 gap-1">
              Disponibilidad: <span className="font-extrabold">{disponibilidad}</span>
            </div>
          </div>
        )}

        {/* Ícono */}
        <div className="col-span-2 col-start-1 row-start-6 row-span-2 pt-[10px]">
          <div
            className={`border h-10 w-10 rounded flex justify-center items-center text-white ${
              estado ? "bg-green-700" : "bg-red-800"
            }`}
          >
            <FaCashRegister className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Card>
  );
}
