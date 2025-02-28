import { BadgeDelta, Card, Divider } from '@tremor/react';

type CardData = {
  titulo: string;
  subtitulo1: string;
  subtitulo2: string;
  valortotal: number;
  valor1: number;
  valor2: number;
  unidad: string;
  unidad1: string;
  unidad2: string;
  simbolo: number;
};

type CardWithBadgeProps = {
  data: CardData;
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

  // console.log(simbolo);

  return (
    <Card
      className="shadow-none transition-shadow duration-300  hover:shadow-lg hover:shadow-gray-400"
      decoration="top"
      decorationColor={simbolo === 1 ? 'green' : simbolo === 2 ? 'yellow' : 'red'}
    >
      <div className="flex flex-col h-24 justify-center">
        <div className="flex justify-between relative">
          <div>
            <p className="text-tremor-default  text-tremor-content">{titulo}</p>
            <p className="text-3xl text-tremor-content-strong font-semibold pt-1">
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

        <div className="relative flex flex-col gap-1 ">
          <p className="text-xs  text-tremor-content-strong font-semibold">
            {subtitulo1}:{' '}
            <span className="font-bold">
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
