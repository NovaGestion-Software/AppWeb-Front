import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import HerramientasInforme from "../../_components/HerramientasInforme";
import { useIngresosStore } from "../Store/store";
import { ActionButton } from "@/frontend-resourses/components";
import { FaWarehouse } from "react-icons/fa";
import { Status } from "@/frontend-resourses/components/types";
import { MdReceiptLong } from "react-icons/md";

interface BotoneraProps {
  propsShowModal: {
    setShowUniNego: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSucursales: React.Dispatch<React.SetStateAction<boolean>>;
  };
  status?: Status;
}
export default function Botonera({ className, props }: { className?: string; props: BotoneraProps }) {
  const { estaProcesado } = useIngresosStore();
  const { propsShowModal } = props;
  const setShowSucursales = propsShowModal?.setShowSucursales;
  const setShowUniNego = propsShowModal?.setShowUniNego;
  const exampleData: Record<string, any>[] = [
    { id: 1, nombre: "Lucas", edad: 30 },
    { id: 2, nombre: "Sofía", activo: true },
    { id: 3, nombre: "Tomás", notas: [10, 9, 8] },
  ];

  return (
    <Card className={`${className} flex gap-3 `}>
      <ActionButton
        text="Sucursales"
        onClick={() => setShowSucursales(true)}
        addClassName="h-5  rounded-md text-xxs v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm v1920:h-9"
        disabled={!estaProcesado}
        color="blue"
        icon={<FaWarehouse size={12} />}
      />
      <ActionButton
        text="U. Negocio"
        onClick={() => setShowUniNego(true)}
        disabled={!estaProcesado}
        color="blue"
        icon={<MdReceiptLong size={12} />}
        addClassName="h-5 w-[6rem] v1536:w-[9rem]  rounded-md text-xxs  v1440:h-8 v1536:h-8 
        v1536:px-6 v1536:text-sm v1920:h-9"
      />
      <HerramientasInforme disabledAll={!estaProcesado} gapButtons="gap-3" data={exampleData}  estaProcesado={estaProcesado} />
    </Card>
  );
}
