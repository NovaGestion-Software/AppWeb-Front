export default function SKDonut() {
  return (
    <>
      <div className="h-72 w-56 overflow-hidden animate-pulse">
        <div className="flex flex-col gap-1  items-center  my-1 mb-2">
          <div className="w-full h-4 bg-gray-200 rounded mb-1"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col flex-wrap items-center gap-6 justify-start">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="w-28 h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </>
  );
}
