import { ActionButton } from "@/frontend-resourses/components";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { Status } from "@/frontend-resourses/components/types";
import { FaWarehouse } from "react-icons/fa";

interface ShowModalButtonsProps {
  propsShowModal: {
    setShowRubros: React.Dispatch<React.SetStateAction<boolean>>;
    setShowMarcas: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDepositos: React.Dispatch<React.SetStateAction<boolean>>;
  };
  status?: Status;
}

export default function ShowModalButtons({ props, className }: { props: ShowModalButtonsProps , className: string;}) {
  const { propsShowModal, status} = props;
  const setShowDepositos = propsShowModal?.setShowDepositos;
  const setShowMarcas = propsShowModal?.setShowMarcas;
  const setShowRubros = propsShowModal?.setShowRubros;

  return (
    <Card className={`${className} `}>
      <ActionButton text="Depósitos" 
       onClick={() => setShowDepositos(true)}  
       addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm"
       disabled={status === "idle"} 
       color="blue" icon={<FaWarehouse size={15}  />} />

      <ActionButton text="Rubros"  
      onClick={() => setShowRubros(true)} disabled={false} color="blue"   
      addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton text="Marcas"  color="blue" 
      disabled={status === "idle"} onClick={() => setShowMarcas(true)}  
      addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />
    </Card>
  );
}
