import { Card } from "@/frontend-resourses/components/Cards/CardBase";

type CardCajaProps = {
  title: any;
  subtitle: string;
  bg: string;
};

export default function CardCaja({ title, subtitle, bg }: CardCajaProps) {
  return (
    <Card
      className={` p-3 hover:-translate-y-1 duration-150 2xl:w-full ${bg}`}
    >
      <div className="flex flex-col w-52 h-24 justify-center items-center ">
        <p className="text-white text-center text-xs  font-semibold  break-words">
          {subtitle}
        </p>
        <h3 className="text-white text-center text-2xl  font-bold  truncate">
          {title}
        </h3>
    
      </div>
    </Card>
  );
}
