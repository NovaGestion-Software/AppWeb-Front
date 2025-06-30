import { TablaDefault } from "@/frontend-resourses/components";
import ModalBase from "@/frontend-resourses/components/Modales/ModalBase";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Dispatch, SetStateAction } from "react";
import { dataMetodoPago } from "../data";

type MetodoPago = {
    mpago: string;              // Medio de pago, ej: 'Efectivo'
    importe: number;            // Valor numérico, ej: 1376837.35
    importePorcentaje: number;  // Porcentaje, ej: 9.68
  };
  
interface MetodosPagoModalProps {
  showRubrosModal: boolean;
  setShowRubrosModal: Dispatch<SetStateAction<boolean>>;
}
export type Data = {
  rubro: string;
  [key: string]: any;
};



export default function MetodosPagoModal({  showRubrosModal, setShowRubrosModal }: MetodosPagoModalProps) {
  
    const metodosPagoColumns: Array<ExtendedColumn<MetodoPago>> = [
        { key: 'mpago', label: 'Medio de Pago', minWidth: '160', maxWidth: '240' },
        { key: 'importe', label: 'Importe', minWidth: '110', maxWidth: '140' },
        { key: 'importePorcentaje', label: '%', minWidth: '90', maxWidth: '110' },
      ];
     const propsTablaMPago = {
        datosParaTabla: dataMetodoPago,
        objectColumns: metodosPagoColumns,
        objectStyles: {
          columnasNumber: [2,3],
          addCellClass: "max-height: 45px; padding: 4px 8px 4px 8px;",
          widthContainer: "30rem",
          heightContainer: '9rem',
          viewport1536: {
            width: '60rem',
            addCellClass1536px: "max-height: 80px;",
          }
        },
      };
  
        // cerrar modal
  function handleCloseModal() {
    setShowRubrosModal(false);
  }
    return (
    <ModalBase
      show={showRubrosModal}
      title="Resumen Condiciones de Pago"
      onClose={handleCloseModal}
      button={false}
      classModal=" w-auto  2xl:bottom-0 2xl:w-fit 2xl:h-fit"
    >

        <TablaDefault props={propsTablaMPago} />
    </ModalBase>
  );
}
