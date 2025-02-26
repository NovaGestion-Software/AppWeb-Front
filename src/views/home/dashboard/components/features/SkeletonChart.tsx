import { Card } from '@tremor/react';

export default function SkeletonChart() {
  return (
    <Card className="mb-5">
      <div role="status" className="w-full h-full p-4 md:p-6 mb-5 overflow-hidden rounded shadow">
        <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5 animate-pulse "></div>
        <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full animate-pulse "></div>
        <div className="flex  items-end mt-4 h-52 animate-pulse ">
          <div className="w-full bg-gray-200 rounded-t-lg h-32"></div>
          <div className="w-full h-44 ms-6 bg-gray-200 rounded-t-lg"></div>
          <div className="w-full h-36 bg-gray-200 rounded-t-lg  ms-6"></div>
          <div className="w-full h-32 ms-6 bg-gray-200 rounded-t-lg"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-32 ms-6"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-44 ms-6"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-32 ms-6"></div>{' '}
          <div className="w-full bg-gray-200 rounded-t-lg h-32 ms-6"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-44 ms-6"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-32 ms-6"></div>{' '}
          <div className="w-full bg-gray-200 rounded-t-lg h-32 ms-6"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-44 ms-6"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-32 ms-6"></div>{' '}
          <div className="w-full bg-gray-200 rounded-t-lg h-44 ms-6"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-32 ms-6"></div>{' '}
          <div className="w-full bg-gray-200 rounded-t-lg h-32 ms-6"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-44 ms-6"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-32 ms-6"></div>
        </div>
      </div>
    </Card>
  );
}
