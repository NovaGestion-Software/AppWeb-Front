import { Card } from '@tremor/react';

export default function SkCardCaja() {
  return (
    <Card className="h-28 w-full max-w-xs p-3 animate-pulse bg-white">
      <div>
        <div className="h-4 bg-gray-300 rounded-md mt-4 w-3/4 mx-auto"></div>
        <div className="h-3 bg-gray-200 rounded-md mt-8 w-5/6 mx-auto"></div>
      </div>
    </Card>
  );
}
