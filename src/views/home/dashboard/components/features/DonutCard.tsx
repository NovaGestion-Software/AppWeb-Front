import { Card, DonutChart, Legend } from '@tremor/react';

const valueFormatter = function (number: any) {
  return '$ ' + new Intl.NumberFormat('us').format(number).toString();
};

type DonutCardProps = {
  fecha: string;
  titulo: string;
  total: string;
  data: { name: string; valor: number }[];
  categories: string[];
  loading: boolean;
};

export default function DonutCard({
  fecha,
  titulo,
  total,
  data,
  categories,
  loading,
}: DonutCardProps) {
  console.log(fecha, titulo, total, data, categories, loading);

  const data1 = [
    { name: 'Efectivo', valor: 500 },
    { name: 'Billeteras', valor: 300 },
    { name: 'Transferencias', valor: 200 },
    { name: 'Débito', valor: 100 },
  ];

  const categories1 = data.map((item) => item.name);

  const colors = ['blue', 'cyan', 'indigo', 'violet'];

  const valueFormatter = (number: number) => `$ ${number.toLocaleString()}`;

  return (
    <div className="h-full ">
      {loading ? (
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
          <div className="flex flex-row  gap-1 justify-center items-start 2xl:items-center  2xl:my-1 2xl:mb-2">
            {titulo && fecha ? (
              <>
                <p>{titulo} </p>
                <p className="font-semibold"> {fecha}</p>
              </>
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-col flex-wrap items-center gap-6  justify-start ">
            {/* <DonutChart
              label={total}
              data={data}
              category="valor"
              index="name"
              valueFormatter={valueFormatter}
              colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia', 'red', 'green', 'yellow']}
              className=" z-20"
            />
            <Legend
              categories={categories}
              colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia', 'red', 'green', 'yellow']}
              className="z-10 2xl:flex hidden "
            /> */}
            <DonutChart
              label="Total"
              data={data1}
              category="valor"
              index="name"
              valueFormatter={valueFormatter}
              colors={colors}
              className="w-60 h-60"
            />
            <Legend categories={categories1} colors={colors} className="flex" />
          </div>
        </>
      )}
    </div>
  );
}
