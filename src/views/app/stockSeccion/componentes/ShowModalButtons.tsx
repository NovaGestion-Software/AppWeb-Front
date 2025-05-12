import ActionButton from "@/Components/ui/Buttons/ActionButton";
import { Status } from "@/types";
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
    <div
      className={`${className} `}
    >
      <ActionButton text="Depósitos"  onClick={() => setShowDepositos(true)} disabled={status === "idle"} color="blue" size="xs" icon={<FaWarehouse size={15} />} />
      <ActionButton text="Rubros"  onClick={() => setShowRubros(true)} disabled={false} color="blue" size="xs" />
      <ActionButton text="Marcas"  color="blue" disabled={status === "idle"} onClick={() => setShowMarcas(true)} size="xs" />
    </div>
  );
}
