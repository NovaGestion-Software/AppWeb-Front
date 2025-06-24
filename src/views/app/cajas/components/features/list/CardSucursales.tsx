import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { BsPersonVcardFill } from "react-icons/bs";
import { FaCashRegister, FaMoneyBillWave, FaRegCreditCard } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { TbClockDollar, TbClockPlay, TbClockStop, TbClockX } from "react-icons/tb";

type CardSucursalesProps = {
  estado: boolean; // Se refiere a si la fecha_c es null
  nombre: string; // Nombre de la sucursal
  sucursal: string; // Nombre de la sucursal, parece repetido respecto a "nombre"
  numero: number; // Número de la caja
  apertura: string; // Fecha de apertura de la caja
  ultimaVenta: string; // Última venta registrada
  efectivo: string; // Monto de efectivo calculado
  ventas: string; // Total de ventas calculadas
  cobranza: string; // Total de cobranza calculada
  planP: string; // Total del plan PP calculado
  egresos: string; // Egresos o retiros de la caja
  saldo: string; // Saldo disponible calculado
};

export default function CardSucursales({ estado, numero, apertura, ultimaVenta, efectivo, ventas, cobranza, planP, egresos, saldo }: CardSucursalesProps) {
  const itemClass = `font-semibold flex flex-row justify-between items-center gap-1`;
  const valorClass = `text-green-700  proportional-nums text-right  p-0  font-bold  w-full  text-base `;
  const labelClass = `w-full`;
  const iconClass = `text-green-600 w-4 h-4`;

  const labelClassContainer = `space-x-1 flex items-center w-full`;

  return (
    <Card
      className={`flex flex-row w-[21rem] h-72 border-2
         border-slate-500 hover:cursor-pointer  
         hover:-translate-y-1 duration-150 hover:shadow-lg hover:shadow-gray-400 `}
    >
      <div className="flex flex-col w-full space-y-3    ">
          {/***numero de caja */}
          <div className="flex flex-row gap-1  w-full p-2 text-sm  ">
             <span className="font-semibold"> N° Caja: </span>
             <span className="font-extrabold">{numero}</span>
          </div>

        <div className="col-span-full row-span-auto col-start-1  text-xs  pt-2 ">
          {/***apertura y cierre */}
          <ul className=" flex flex-col space-y-1 text-gray-500 font-semibold">
            <li className="flex justify-between items-center">
              <div className={`${labelClassContainer}`}>
                <TbClockPlay />
                <span>Apertura:</span>
              </div>{" "}
              <span className="text-black">{apertura.split(" ")[1]}hs.</span>
            </li>
            <li className="flex justify-between">
              <div className={`${labelClassContainer}`}>
                <TbClockX />
                <span>Cierre:</span>
              </div>
              <span className="text-black"> {ultimaVenta}</span>
            </li>

            <li className="flex justify-between">
              <div className={`${labelClassContainer}`}>
                <TbClockStop />
                <span> Ult. Vta.: </span>
              </div>
              <span className="text-black">{ultimaVenta}</span>
            </li>

            <li className="flex justify-between">
              <div className={`${labelClassContainer}`}>
                <TbClockDollar />
                <span> Ult. Cobr.:</span>
              </div>
              <span className="text-black">{ultimaVenta}</span>
            </li>
          </ul>
        </div>

        <div className="">
          {" "}
          {/***Mov de caja */}
          <ul className="flex flex-col space-y-1 text-xs ">
            <li className={`${itemClass}`}>
              <div className={`${labelClassContainer}`}>
                <MdOutlinePointOfSale className={`${iconClass}`} />
                <span className={`${labelClass}`}>Ventas:</span>
              </div>
              <span className={`${valorClass}`}>$ {ventas}</span>
            </li>
            <li className={`${itemClass}`}>
              <div className={`${labelClassContainer}`}>
                <FaRegCreditCard className={`${iconClass}`} />
                <span className={`${labelClass}`}>Cobranza de Credito:</span>
              </div>
              <span className={`${valorClass}`}>$ {cobranza}</span>
            </li>
            <li className={`${itemClass}`}>
              <div className={`${labelClassContainer}`}>
                <BsPersonVcardFill className={`${iconClass}`} />
                <span className={`${labelClass}`}>Cobranza de P. Pago:</span>
              </div>
              <span className={`${valorClass}`}>$ {planP}</span>
            </li>
            <li className={`${itemClass}`}>
              <div className={`${labelClassContainer}`}>
                <FaMoneyBillWave className={`${iconClass}`} />
                <span className={`${labelClass}`}>Efectivo:</span>
              </div>
              <span className={`${valorClass}`}>$ {efectivo}</span>
            </li>
            <li className={`${itemClass}`}>
              <div className={`${labelClassContainer}`}>
                <AiFillDollarCircle className={`${iconClass}`} />
                <span className={`${labelClass}`}>Otros:</span>
              </div>

              <span className={`${valorClass}`}> $ {egresos}</span>
            </li>
          </ul>
        </div>

        <div className="col-span-4 col-start-4 row-start-7  ">
          {" "}
          {/***DISPONIBILIDAD */}{" "}
          <div className=" font-semibold text-blue-700  flex justify-between items-center px-2">
            <span> Disponibilidad: </span>
            <span className="font-extrabold"> $ {saldo}</span>
          </div>
        </div>

        <div className="col-span-2 col-start-1 row-start-6 row-span-2 pt-[10px]">
          {/**icono* */}
          <div className={` border boder-green-700 h-10 w-10 rounded flex justify-center items-center text-white ${estado ? "bg-green-700 " : "bg-red-800"}`}>
            <FaCashRegister className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Card>
  );
}
