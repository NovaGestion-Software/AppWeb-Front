import SkeletonCardCaja from './SkeletonCardCaja';

const renderCardSection = (start: number, end?: number) => {
  const count = end !== undefined ? end - start : start;

  return (
    <div className="flex flex-row flex-wrap gap-2 w-full">
      {new Array(count).fill(null).map((_, id) => (
        <SkeletonCardCaja key={id + start} />
      ))}
    </div>
  );
};

export default function SkeletonCajaComponent() {
  return (
    <div className="flex flex-col gap-4">
      {renderCardSection(0, 6)}
      {renderCardSection(6, 19)}
      {renderCardSection(4)}
    </div>
  );
}
