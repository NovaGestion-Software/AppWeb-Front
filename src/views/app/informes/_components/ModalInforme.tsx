import ActionButton from '@/Components/ui/Buttons/ActionButton';

interface ModalInformeProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function ModalInforme({
  show,
  title,
  onClose,
  onConfirm,
  disabled,
  children,
}: ModalInformeProps) {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden outline-none focus:outline-none">
        <div className="relative w-[40rem] p-6 mx-auto ">
          <div className="relative grid grid-cols-4 grid-rows-[3rem_auto_auto_auto_auto] gap-1 w-full p-6 bg-white rounded-lg shadow-lg outline-none focus:outline-none ">
            <div className="col-span-3 flex items-center justify-start p-5">
              <h3 className="w-full text-3xl font-semibold underline underline-offset-4 decoration-4 decoration-gray-600">
                {title}
              </h3>
            </div>

            {/* Botones de Acción por Defecto: Confirmar y Cerrar */}
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
                disabled={!disabled}
              />
            </div>

            {/* Contenido dinámico */}
            <div className="col-span-3 row-span-4 col-start-1 row-start-2 w-full h-[30rem] mx-auto p-4 flex gap-4 mb-4">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
