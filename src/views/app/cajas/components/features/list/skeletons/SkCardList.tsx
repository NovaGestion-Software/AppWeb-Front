export const SkCardList = () => {
  return (
    <div className="w-full h-40 border border-slate-500 overflow-hidden rounded-md pt-4 p-3 animate-pulse">
      <div className="flex justify-around">
        <div className="w-full space-y-4">
          {/* Primera fila (Sucursal y N° Caja) */}

          <ul className="flex flex-col gap-4">
            <li className="max-w-sm h-6 bg-slate-300 rounded "></li>
            {/* <li className="max-w-sm h-6 bg-slate-300 rounded "></li> */}
          </ul>

          {/* Segunda fila (Fecha / Hora Apertura, Ult. Venta, Efectivo, Egresos) */}
          <ul className="flex flex-col-reverse gap-2 p-1">
            <li className="h-4 bg-slate-300 rounded w-60"></li>
            <li className="h-4 bg-slate-300 rounded w-60"></li>
            <li className="w-40 h-4 bg-slate-300 rounded "></li>
            <li className="w-40 h-4 bg-slate-300 rounded "></li>
          </ul>
        </div>

        {/* Icono de estado */}
        <div className="w-24 h-28 flex justify-center items-center gap-3 mr-20">
          <div className="h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
};
