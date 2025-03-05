import { Card } from '@tremor/react';

export default function SkeletonCard() {
  return (
    <Card className="w-full max-w-sm mx-auto py-5 px-6">
      <div className=" animate-pulse ">
        <h1 className="w-40 h-2 bg-gray-300 rounded-lg"></h1>
        <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg "></p>
        <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg "></p>
        <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg "></p>
        <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg "></p>
      </div>
    </Card>
  );
}
