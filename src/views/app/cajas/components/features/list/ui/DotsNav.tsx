type Props = {
  sucursalId: number;
  count: number;
  activeIndex: Record<number, number>;
  scrollToIndex: (id: number, idx: number) => void;
};

export default function DotsNav({ sucursalId, count, activeIndex, scrollToIndex }: Props) {
  if (count <= 1) return null;
  return (
    <div className="flex justify-center mt-2 gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          aria-label={`Ir a la caja ${index + 1}`}
          onClick={() => scrollToIndex(sucursalId, index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === activeIndex[sucursalId] ? "bg-blue-600 scale-125" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
