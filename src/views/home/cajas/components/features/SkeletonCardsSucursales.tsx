export const SkeletonCardSucursal = () => {
  return (
    <div className="w-full h-40 border border-slate-500 overflow-hidden rounded-md pt-4 p-3 animate-pulse">
      <div className="flex flex-row ">
        <div className="w-[50rem] h-32 space-y-4">
          {/* Primera fila (Sucursal y N° Caja) */}

          <ul className="flex flex-row gap-4">
            <li className="h-6 bg-slate-300 rounded w-40"></li>
            <li className="h-6 bg-slate-300 rounded w-40"></li>
          </ul>

          {/* Segunda fila (Fecha / Hora Apertura, Ult. Venta, Efectivo, Egresos) */}
          <ul className="flex flex-col-reverse gap-2 p-1">
            <li className="h-4 bg-slate-300 rounded w-60"></li>
            <li className="h-4 bg-slate-300 rounded w-60"></li>
            <li className="h-4 bg-slate-300 rounded w-40"></li>
            <li className="h-4 bg-slate-300 rounded w-40"></li>
          </ul>
        </div>

        {/* Icono de estado */}
        <div className="w-24 h-28 flex flex-row justify-center items-center gap-3">
          <div className="h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCardSucursales = () => {
  return (
    <div className="flex flex-col gap-2 bg-white h-full  shadow-md rounded-md p-5 ">
      <SkeletonCardSucursal />
      <SkeletonCardSucursal />
      <SkeletonCardSucursal />
      <SkeletonCardSucursal />
      <SkeletonCardSucursal />
    </div>
  );
};

export default SkeletonCardSucursales;
