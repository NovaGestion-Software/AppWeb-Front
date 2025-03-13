import { BadgeDelta, Card, Divider } from '@tremor/react';
import { DashboardCard } from '@/types';

type CardWithBadgeProps = {
  data: DashboardCard;
};

export default function CardWithBadge({ data }: CardWithBadgeProps) {
  const {
    titulo,
    subtitulo1,
    subtitulo2,
    valortotal,
    valor1,
    valor2,
    unidad,
    unidad1,
    unidad2,
    simbolo,
  } = data;

  return (
    <Card
      className="shadow-none w-full max-w-96 transition-shadow duration-300  hover:shadow-lg hover:shadow-gray-400 py-3 px-5"
      decoration="top"
      decorationColor={simbolo === 1 ? 'green' : simbolo === 2 ? 'yellow' : 'red'}
    >
      <div className="flex flex-col justify-center ">
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-slate-500/80">{titulo}</p>
            <p className="text-3xl font-semibold pt-2">
              {valortotal} {unidad}
            </p>
          </div>

          <BadgeDelta
            className="h-6"
            isIncreasePositive
            deltaType={
              simbolo === 1 ? 'moderateIncrease' : simbolo === 2 ? 'unchanged' : 'moderateDecrease'
            }
            size="xs"
          ></BadgeDelta>
        </div>

        <Divider className="my-2"></Divider>

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">
            {subtitulo1}:{' '}
            <span className="text-amber-500 font-bold">
              {unidad1} {valor1}
            </span>
          </p>

          <p className="text-xs">
            {subtitulo2}: {unidad2} {valor2}
          </p>
        </div>
      </div>
    </Card>
  );
}
