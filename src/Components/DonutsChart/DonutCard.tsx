import { DonutChart, Legend } from "@tremor/react";
import SKDonut from "./skeleton/SKDonut";

type DonutCardProps = {
  fecha?: string;
  titulo?: string;
  label?: string;
  flexRow?: boolean;
  data: { name: string; valor: number }[];
  categories: string[];
  fetching?: boolean;
  donutClassName?: string;
};

export default function DonutCard({ fecha, titulo, label, data, categories, fetching, flexRow = false, donutClassName = "" }: DonutCardProps) {
  const valueFormatter = (number: number) => `$ ${number.toLocaleString()}`;

  return (
    <div className="h-full noneScroll">
      {fetching ? (
        <SKDonut />
      ) : (
        <>
          {/**titulo */}
          <div
            className="flex  bg-blue-200 text-blue-900 
      font-semibold text-center py-1 text-base 
          justify-center items-start 2xl:items-center   2xl:mb-2  gap-1"
          >
            {titulo && fecha && (
              <>
                <p>{titulo} </p>
                <p className="font-semibold"> {fecha}</p>
              </>
            )}
            {titulo && !fecha && (
              <>
                <p>{titulo} </p>
              </>
            )}
          </div>
          {/**body */}
          <div
            className={`flex ${flexRow ? "flex-row  gap-4 " : "flex-col flex-wrap gap-6 px-4"} 
          items-center my-2  justify-start `}
          >
            <DonutChart
              label={label}
              data={data}
              showLabel={false}
              category="valor"
              index="name"
              variant="donut"
              showAnimation={true}
              valueFormatter={valueFormatter}
              colors={["blue", "cyan", "indigo", "violet", "fuchsia", "red", "green", "yellow"]}
              className={`${donutClassName}`}
            />
            <Legend categories={categories} colors={["blue", "cyan", "indigo", "violet", "fuchsia", "red", "green", "yellow"]} className="" />
          </div>
        </>
      )}
    </div>
  );
}
