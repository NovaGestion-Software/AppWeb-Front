import { ActionButton } from "@/frontend-resourses/components";
import { IoMdOptions } from "react-icons/io";
import { FaWarehouse } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
interface ShowModalButtonsProps {
  propsShowModal: {
    setShowUniNego: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSucursales: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function ShowButtons({ props, className, estaProcesado }: { props: ShowModalButtonsProps , className?: string, estaProcesado: boolean;}) {
  const { propsShowModal} = props;
  const setShowSucursales = propsShowModal?.setShowSucursales;
  const setShowUniNego = propsShowModal?.setShowUniNego;

  return (
    <div className={`${className} `} >
      <ActionButton text="Sucursales" 
       onClick={() => setShowSucursales(true)}  
       addClassName="h-5  rounded-md text-xxs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm"
       disabled={!estaProcesado} 
       color="blue" icon={<FaWarehouse size={12}  />} />

      <ActionButton text="Uni. Negocio"  
      onClick={() => setShowUniNego(true)} disabled={!estaProcesado} color="blue"  icon={<MdReceiptLong  size={12}  />}
      addClassName="h-5 w-28 v1440:w-28 v1536:w-40  rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

    </div>
  );
}