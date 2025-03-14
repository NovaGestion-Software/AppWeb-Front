import { Card } from '@tremor/react';

type CardCajaProps = {
  title: any;
  subtitle: string;
  bg: string;
};

export default function CardCaja({ title, subtitle, bg }: CardCajaProps) {
  return (
    <Card
      className={`w-60 max-w-xs p-3 hover:-translate-y-1 duration-150 2xl:h-28 2xl:w-full ${bg}`}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <h3 className="text-white text-center text-lg sm:text-xl  font-bold mt-1 truncate">
          {title}
        </h3>
        <p className="text-white text-center text-sm sm:text-base  font-semibold mt-3 break-words">
          {subtitle}
        </p>
      </div>
    </Card>
  );
}
