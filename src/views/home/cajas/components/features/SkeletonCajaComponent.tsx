import SkeletonCardCaja from './SkeletonCard';

export default function SkeletonCajaComponent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap gap-2 w-full mb-10">
        {Array(5)
          //   .fill()
          .map((_, id) => (
            <SkeletonCardCaja key={id} />
          ))}
      </div>
      <div
        className="flex flex-row flex-wrap gap-2 mb-5
        w-full h-full"
      >
        {Array(10)
          //   .fill()
          .map((_, id) => (
            <SkeletonCardCaja key={id} />
          ))}
      </div>
      <div className="flex flex-row flex-wrap gap-2   w-full h-full  ">
        {Array(4)
          //   .fill()
          .map((_, id) => (
            <SkeletonCardCaja key={id} />
          ))}
      </div>
    </div>
  );
}
