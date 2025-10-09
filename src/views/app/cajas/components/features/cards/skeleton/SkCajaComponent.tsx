import { Card } from "@/frontend-resourses/components/Cards/CardBase";

function SkCardCaja() {
  return (
    <Card className="h-28 w-full max-w-xs p-3 animate-pulse bg-white">
      <div>
        <div className="h-4 bg-gray-300 rounded-md mt-4 w-3/4 mx-auto"></div>
        <div className="h-3 bg-gray-200 rounded-md mt-8 w-5/6 mx-auto"></div>
      </div>
    </Card>
  );
}

function renderCardSection(start: number, end?: number) {
  const count = end !== undefined ? end - start : start;

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {new Array(count).fill(null).map((_, id) => (
        <SkCardCaja key={id + start} />
      ))}
    </div>
  );
}

export default function SkCajaComponent() {
  return (
    <div className="flex flex-col gap-4">
      {renderCardSection(0, 6)}
      {renderCardSection(6, 19)}
      {renderCardSection(4)}
    </div>
  );
}
