import { Card } from '@tremor/react';
import { FaCashRegister } from 'react-icons/fa';

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

export default function CardSucursales({
  estado,
  nombre,
  sucursal,
  numero,
  apertura,
  ultimaVenta,
  efectivo,
  ventas,
  cobranza,
  planP,
  egresos,
  saldo,
}: CardSucursalesProps) {
  return (
    <Card
      decoration="left"
      decorationColor={`${estado ? 'green' : 'red'}`}
      className={`flex flex-row w-full h-72 border-2
         border-slate-500 pt-4 p-2 pl-5 hover:-translate-y-1 duration-150 hover:shadow-lg hover:shadow-gray-400 `}
    >
      <div className="grid grid-cols-7 grid-rows-7 gap-4 gap-x-5 px-2 ">
        <div className="col-span-7 ">
          {' '}
          {/***numero y nombre sucursal y caja */}
          <ul className="flex flex-row gap-4 flex-wrap itemsce  w-full p-2 text-sm 2xl:text-xl  ">
            <li className="font-semibold ">
              Sucursal:{' '}
              <span className="font-extrabold">
                {sucursal} - {nombre}
              </span>
            </li>
            <li className="font-semibold">
              N° Caja: <span className="font-extrabold">{numero}</span>
            </li>
          </ul>
        </div>

        <div className="col-span-3 row-span-4 col-start-1 row-start-2 text-xs 2xl:text-lg pt-2  ">
          {' '}
          {/***apertura y cierre */}
          <ul className=" flex flex-col  gap-1 flex-wrap p-1 ">
            <li className="font-semibold  ">Apertura: {apertura}</li>
            <li className="font-semibold">Cierre: {ultimaVenta}</li>

            <li className="font-semibold">Ult. Vta.: {ultimaVenta}</li>

            <li className="font-semibold">Ult. Cobr.: {ultimaVenta}</li>
          </ul>
        </div>

        <div className="col-span-4 row-span-5 2xl:row-span-4 col-start-4 row-start-2 text-xs 2xl:text-lg pt-2">
          {' '}
          {/***Mov de caja */}
          <ul className="flex flex-col  gap-1  h-44 p-1  ">
            <li className="font-semibold flex flex-row justify-between 2xl:items-start items-center gap-1">
              Ventas:{' '}
              <span className="text-green-700 text-right  p-0 font-extrabold  w-full 2xl:w-auto text-base 2xl:text-xl  ">
                $ {ventas}
              </span>
            </li>
            <li className="font-semibold flex flex-row justify-between items-center 2xl:items-start   gap-1">
              Cobranza de Credito:{' '}
              <span className="text-green-700 text-right  p-0  font-extrabold  w-full 2xl:w-auto text-base 2xl:text-xl">
                $ {cobranza}
              </span>
            </li>
            <li className="font-semibold flex flex-row justify-between items-center 2xl:items-start  gap-3">
              Cobranza de P. Pago:{' '}
              <span className="text-green-700 text-right  p-0  font-extrabold  w-full 2xl:w-auto text-base 2xl:text-xl ">
                $ {planP}
              </span>
            </li>
            <li className="font-semibold flex flex-row justify-between items-center 2xl:items-start  gap-3">
              Efectivo:{' '}
              <span className="text-green-700 text-right  p-0  font-extrabold  w-full 2xl:w-auto text-base 2xl:text-xl">
                $ {efectivo}
              </span>
            </li>
            <li className="font-semibold flex flex-row justify-between items-center 2xl:items-start  gap-3">
              Otros:
              <span className="text-green-700 text-right  p-0  font-extrabold  w-full 2xl:w-auto text-base 2xl:text-xl">
                {' '}
                $ {egresos}
              </span>
            </li>
          </ul>
        </div>

        <div className="col-span-4 col-start-4 row-start-7  ">
          {' '}
          {/***DISPONIBILIDAD */}{' '}
          <div
            className="2xl:text-xl text-base font-semibold text-blue-700 -mt-[15px] 
          flex flex-row justify-between 2xl:gap-3 gap-1"
          >
            Disponibilidad: <span className="font-extrabold"> $ {saldo}</span>
          </div>
        </div>

        <div className="col-span-2 col-start-1 row-start-6 row-span-2 pt-[10px]">
          {/**icono* */}
          <div
            className={` border boder-green-700 h-10 w-10 rounded flex justify-center items-center text-white ${
              estado ? 'bg-green-700 ' : 'bg-red-800'
            }`}
          >
            <FaCashRegister className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Card>
  );
}
