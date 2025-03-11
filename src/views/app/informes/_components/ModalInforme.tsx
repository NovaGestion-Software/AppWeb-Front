import ActionButton from '@/Components/ui/Buttons/ActionButton';
import { useEffect, useRef } from 'react';

interface ModalInformeProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  buttons: boolean;
}

export default function ModalInforme({
  show,
  title,
  onClose,
  onConfirm,
  disabled,
  children,
  buttons,
}: ModalInformeProps) {
  const modalRef = useRef<HTMLDivElement>(null); // Referencia al contenedor del modal

  // Cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && !buttons) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose, buttons]);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden outline-none focus:outline-none">
        <div className="relative" ref={modalRef}>
          <div className="relative grid grid-cols-3 grid-rows-[3rem_auto_auto_auto_auto] gap-1  p-6 bg-white rounded-lg shadow-lg outline-none focus:outline-none ">
            <div className="col-span-3 flex items-center justify-between p-5 ">
              <h3 className="w-full text-3xl font-semibold underline underline-offset-4 decoration-4 decoration-gray-600">
                {title}
              </h3>

              <ActionButton
                text="X"
                onClick={onClose}
                color="redSoft"
                className="h-8 w-10 rounded border border-slate-900/50"
                textClassName="text-slate-600"
                size="md"
              />
            </div>

            {/* Botones de Acción por Defecto: Confirmar y Cerrar */}
            {buttons && (
              <div className="col-start-3 flex flex-col  w-full gap-3 bg-red-200">
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
                  color="red"
                  className="w-full rounded-md"
                  textClassName=""
                  size="md"
                  disabled={!disabled}
                />
              </div>
            )}

            {/* Contenido dinámico */}
            <div
              className={`flex p-4 gap-4 mb-4 bg-blue-200 
                ${buttons ? 'col-span-3 col-start-1 row-start-2' : 'col-span-full  col-start-1'}`}
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
