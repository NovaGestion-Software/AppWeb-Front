import { DonutChart, Legend } from '@tremor/react';

type DonutCardProps = {
  fecha: string;
  titulo: string;
  total: string;
  data: { name: string; valor: number }[];
  categories: string[];
  fetching: boolean;
};

export default function DonutCard({
  fecha,
  titulo,
  total,
  data,
  categories,
  fetching,
}: DonutCardProps) {
  const valueFormatter = (number: number) => `$ ${number.toLocaleString()}`;

  return (
    <div className="h-full ">
      {fetching ? (
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
      ) : (
        <>
          <div className="flex justify-center items-start 2xl:items-center  2xl:my-1 2xl:mb-2  gap-1">
            {titulo && fecha ? (
              <>
                <p>{titulo} </p>
                <p className="font-semibold"> {fecha}</p>
              </>
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-col flex-wrap items-center gap-6  justify-start">
            <DonutChart
              label={total}
              data={data}
              category="valor"
              index="name"
              valueFormatter={valueFormatter}
              colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia', 'red', 'green', 'yellow']}
              className=""
            />
            <Legend
              categories={categories}
              colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia', 'red', 'green', 'yellow']}
              className=""
            />
          </div>
        </>
      )}
    </div>
  );
}
