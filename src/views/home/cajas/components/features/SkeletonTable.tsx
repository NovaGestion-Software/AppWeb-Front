export const SkeletonTableCaja = () => {
  return (
    <div className="flex flex-col gap-2 bg-white h-[52rem] w-full shadow-md rounded-md animate-pulse">
      <h3 className="h-8 bg-slate-300 rounded-md w-40"></h3>

      <div className="mt-5 overflow-auto max-h-[42rem] border-2 border-gray-100">
        {/* Encabezados de la tabla */}
        <div className="sticky top-0 bg-white z-10 flex">
          <div className="w-1/3 h-8 bg-slate-300 rounded-md"></div>
          <div className="w-1/3 h-8 bg-slate-300 rounded-md"></div>
          <div className="w-1/3 h-8 bg-slate-300 rounded-md"></div>
        </div>

        {/* Filas de la tabla */}
        <div className="mt-4 space-y-2">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 odd:bg-gray-200 even:bg-white"
            >
              <div className="w-1/3 h-6 bg-slate-200 rounded-md"></div>
              <div className="w-1/3 h-6 bg-slate-200 rounded-md"></div>
              <div className="w-1/3 h-6 bg-slate-200 rounded-md"></div>
            </div>
          ))}
        </div>

        {/* Pie de tabla */}
        <div className="flex justify-between items-center p-2 sticky bottom-0 bg-white z-10">
          <div className="w-1/3 h-6 bg-slate-300 rounded-md"></div>
          <div className="w-1/3 h-6 bg-slate-300 rounded-md"></div>
          <div className="w-1/3 h-6 bg-slate-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonTablaCaja = () => {
  return (
    <div className="flex flex-col gap-2 bg-white h-full  shadow-md rounded-md p-5 ">
      <SkeletonTableCaja />
    </div>
  );
};

export default SkeletonTablaCaja;
