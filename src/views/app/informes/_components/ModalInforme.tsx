import ActionButton from '@/Components/ui/Buttons/ActionButton';
import { useEffect, useRef } from 'react';

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

  // Asignar el foco al modal cuando se abre
  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.focus(); // Coloca el foco en el primer input
    }
  }, [show]);

  // Cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && !buttons) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);

      // Escuchar los eventos de teclado cuando el modal está abierto
      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose(); // Cerrar el modal con Escape
        }
      };

      document.addEventListener('keydown', handleKeydown);

      // Limpiar el evento cuando el componente se desmonta o el modal se cierra
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [show, onClose, onConfirm, buttons]);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden outline-none focus:outline-none">
        <div
          className="relative"
          ref={modalRef}
          tabIndex={-1} // Esto hace que el div sea enfocable
        >
          <div className="relative grid grid-cols-3 grid-rows-[3rem_auto_auto_auto_auto] gap-1 p-4 bg-white rounded-lg shadow-lg outline-none focus:outline-none ">
            <div className="col-span-3 flex items-center justify-between px-5">
              <h3 className="w-full text-2xl font-semibold underline underline-offset-4 decoration-4 decoration-gray-600">
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

            {/* Contenido dinámico */}
            <div
              className={`p-2 
                ${buttons ? 'col-span-3 col-start-1 row-start-2' : 'col-span-full  col-start-1'}`}
            >
              <div className="flex ">
                {children}
                <div className="flex items-end mb-10">
                  {buttons && (
                    <div className="flex flex-col gap-3">
                      <ActionButton
                        icon={<img src="/icons/done.png" alt="Confirmar" className="w-6 h-6" />}
                        size="md"
                        color="grayDefault"
                        // className="border-2 border-slate-500 bg-gray-100 rounded-md"
                        onClick={onConfirm || (() => {})}
                        disabled={!disabled}
                      />
                      <ActionButton
                        icon={<img src="/icons/close.png" alt="Confirmar" className="w-6 h-6" />}
                        size="md"
                        className="rounded-md"
                        onClick={onClose}
                        disabled={!disabled2}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
