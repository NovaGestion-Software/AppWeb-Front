import { ActionButton } from "@/frontend-resourses/components";
import { Status } from "@/frontend-resourses/components/types";
import { BsPerson } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
interface ShowModalButtonsProps {
  propsShowModal: {
    setShowPlanes: React.Dispatch<React.SetStateAction<boolean>>;
    setShowClientes: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSucursales: React.Dispatch<React.SetStateAction<boolean>>;
  };
  status?: Status;
}

export default function ShowModalButtons({ props, className, estaProcesado }: { props: ShowModalButtonsProps , className?: string, estaProcesado: boolean;}) {
  const { propsShowModal} = props;
  const setShowSucursales = propsShowModal?.setShowSucursales;
  const setShowClientes = propsShowModal?.setShowClientes;
  const setShowPlanes = propsShowModal?.setShowPlanes;

  return (
    <div className={`${className} `} >
      <ActionButton text="Sucursales" 
       onClick={() => setShowSucursales(true)}  
       addClassName="h-5  rounded-md text-xxs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm"
       disabled={!estaProcesado} 
       color="blue" icon={<FaWarehouse size={12}  />} />

      <ActionButton text="Planes"  
      onClick={() => setShowPlanes(true)} disabled={!estaProcesado} color="blue"  icon={<MdReceiptLong  size={12}  />}
      addClassName="h-5  rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />

      <ActionButton text="Clientes"  color="blue" 
      disabled={!estaProcesado} onClick={() => setShowClientes(true)}    icon={<BsPerson size={12}  />}
      addClassName="h-5 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm" />
    </div>
  );
}