import ActionButton from "@/Components/ui/Buttons/ActionButton";
import { useEffect, useRef } from "react";

interface ModalInformeProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  disabled?: boolean;
  disabled2?: boolean;
  children?: React.ReactNode;
  buttons: boolean;
}

export default function ModalInforme({
  show,
  title,
  onClose,
  onConfirm,
  disabled,
  disabled2,
  children,
  buttons,
}: ModalInformeProps) {
  const modalRef = useRef<HTMLDivElement>(null); // Referencia al contenedor del modal

  // Cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !buttons
      ) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose, buttons]);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden outline-none focus:outline-none">
        <div className="relative w-auto p-6 mx-auto " ref={modalRef}>
          <div className="relative grid grid-cols-4 grid-rows-[3rem_auto_auto_auto_auto] gap-1 w-full  p-6 bg-white rounded-lg shadow-lg outline-none focus:outline-none ">
            <div className="col-span-3 flex items-center justify-start p-5">
              <h3 className="w-full text-3xl font-semibold underline underline-offset-4 decoration-4 decoration-gray-600">
                {title}
              </h3>
            </div>

            {/* Botones de Acción por Defecto: Confirmar y Cerrar */}
            {buttons && (
              <div className="row-span-2 col-start-4 row-start-4 flex flex-col justify-center items-center w-full gap-3 mb-5">
                <ActionButton
                  text="Confirmar"
                  onClick={onConfirm || (() => {})}
                  color="greenSoft"
                  className="w-full rounded-md"
                  size="md"
                  disabled={!disabled}
                />
                <ActionButton
                  text="Cerrar"
                  onClick={onClose}
                  color="grayStrong"
                  className="w-full rounded-md"
                  textClassName=""
                  size="md"
                  disabled={!disabled2}
                />
              </div>
            )}

            {/* Contenido dinámico */}
            <div
              className={` w-full h-auto mx-auto p-4 flex gap-4 mb-4 ${
                buttons
                  ? "col-span-3 row-span-4 col-start-1 row-start-2"
                  : "col-span-full  col-start-1"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
