import { ActionButton } from "@/frontend-resourses/components";
import { FcAnswers, FcViewDetails } from "react-icons/fc";
interface ShowModalButtonsProps {
  setShowDetalles: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSinFinanciacion: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShowButtonsTable({ props, className, estaProcesado }: { props: ShowModalButtonsProps; className?: string; estaProcesado: boolean }) {
  const setShowDetalles = props?.setShowDetalles;
  const setShowSinFinanciacion = props?.setShowSinFinanciacion;

  return (
    <div className={`${className} `}>
      <ActionButton
        text="Detalles"
        onClick={() => setShowDetalles(true)}
        addClassName="h-5  rounded-md text-xxs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm"
        disabled={!estaProcesado}
        color="blue"
        icon={<FcViewDetails size={12} />}
      />

      <ActionButton
        text="Sin Financiacion"
        onClick={() => setShowSinFinanciacion(true)}
        disabled={!estaProcesado}
        color="blue"
        icon={<FcAnswers size={12} />}
        addClassName="h-5 w-28 v1440:w-28 v1536:w-fit  rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm"
      />
    </div>
  );
}
