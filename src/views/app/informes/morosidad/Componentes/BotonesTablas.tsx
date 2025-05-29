import { ActionButton } from "@/frontend-resourses/components";

export const BotonesTabla = ({ estaProcesado, className }: { estaProcesado: boolean, className?: string }) => {
  const handleAll = () => {
    console.log("click all");
  };
  const handleNothing = () => {
    console.log("click nothing");
  };

  return (
    <div className={`${className} flex justify-end gap-2 bg-white rounded-lg `}>
      <ActionButton onClick={handleAll} color="blue" addClassName="h-4 text-[0.3rem] rounded-sm"  text="Todos" disabled={!estaProcesado} />
      <ActionButton onClick={handleNothing} color="blue" addClassName="h-4 text-[0.3rem] rounded-sm" text="Ninguno" disabled={!estaProcesado} />
    </div>
  );
};
