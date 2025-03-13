import { useEffect, useRef, useState } from 'react';
import { useVentasHoraStore } from '@/store/useVentasHoraStore';
import { RiStore3Fill } from '@remixicon/react';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import ModalInforme from '../../_components/ModalInforme';
import showAlert from '@/utils/showAlert';

interface ModalSucursalesProps {
  isProcessing: boolean;
}

export default function ModalSucursales({ isProcessing }: ModalSucursalesProps) {
  const { sucursalesSeleccionadas, sucursalesDisponibles, setSucursalesSeleccionadas } =
    useVentasHoraStore();
  const [showModal, setShowModal] = useState(false);
  const [sucursalesSeleccionadasModal, setSucursalesSeleccionadasModal] = useState<string[]>([]);
  const firstCheckboxRef = useRef<HTMLInputElement | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (showModal) {
      setSucursalesSeleccionadasModal([...sucursalesSeleccionadas]);
      // Bloquea el scroll del body cuando el modal esté visible
      document.body.style.overflow = 'hidden';
    } else {
      // Restaura el scroll del body cuando el modal se cierra
      document.body.style.overflow = 'auto';
    }

    // Limpieza para restaurar el estado cuando el componente se desmonte o el modal se cierre
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal && firstCheckboxRef.current) {
      firstCheckboxRef.current.focus();
    }
  }, [showModal]);

  // Efecto para manejar el enfoque cuando se cambia el índice
  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < sucursalesDisponibles.length) {
      const checkbox = document.getElementById(`checkbox-${focusedIndex}`);
      if (checkbox) {
        (checkbox as HTMLInputElement).focus();
      }
    }
  }, [focusedIndex, sucursalesDisponibles]);

  // Manejo de las teclas de flecha hacia arriba y hacia abajo
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Si presionamos la flecha hacia abajo
    if (e.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, sucursalesDisponibles.length - 1));
    }
    // Si presionamos la flecha hacia arriba
    else if (e.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
    // Si presionamos la tecla Enter
    else if (e.key === 'Enter') {
      // Seleccionamos o deseleccionamos el checkbox del índice enfocado
      handleCheckboxChange(sucursalesDisponibles[focusedIndex]);
    }
  };

  const handleSelectAll = () => {
    setSucursalesSeleccionadasModal(sucursalesDisponibles);
  };

  const handleDeselectAll = () => {
    setSucursalesSeleccionadasModal([]);
  };

  const handleCheckboxChange = (id: string) => {
    setSucursalesSeleccionadasModal((prev) =>
      prev.includes(id) ? prev.filter((suc) => suc !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    if (sucursalesSeleccionadasModal.length === 0) {
      showAlert({
        text: 'Debe seleccionar al menos una sucursal para continuar.',
        icon: 'warning',
        confirmButtonText: 'OK',
        showConfirmButton: true,
        timer: 2000,
      });
    } else {
      setSucursalesSeleccionadas(sucursalesSeleccionadasModal);
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    setSucursalesSeleccionadas([...sucursalesSeleccionadas]); // Revertir los cambios y restaurar las sucursales originales
  };

  const buttons = [
    { text: 'Todos', onClick: handleSelectAll },
    { text: 'Ninguno', onClick: handleDeselectAll },
  ];

  return (
    <>
      <ActionButton
        text="Sucursales"
        icon={<RiStore3Fill size={20} />}
        size="xs"
        className="2xl:h-11 2xl:text-sm rounded-md"
        onClick={() => setShowModal(true)}
        disabled={!isProcessing}
        color={'blue'}
      />

      {showModal && (
        <>
          <ModalInforme
            show={showModal}
            title="Sucursales"
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
            disabled={isProcessing}
            buttons={true}
          >
            {/* Contenido del Modal */}
            <div
              className="flex h-[29.3rem] mx-auto p-4 gap-4 mb-4"
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              <div className="w-[25rem] overflow-auto border border-gray-300 rounded-lg">
                <table className="w-full border-collapse text-sm">
                  {' '}
                  <thead className="bg-gray-200 sticky top-0 text-sm">
                    {' '}
                    <tr>
                      <th className="p-1 w-10"></th>
                      <th className="p-1 text-left">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sucursalesDisponibles.map((sucursal, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-blue-600 hover:bg-opacity-50 text-black font-semibold border-b border-gray-200  ${
                          index === focusedIndex ? 'focus-within:bg-blue-600/50' : ''
                        }`}
                      >
                        <td className={`p-1 text-center`}>
                          <label className="cursor-pointer w-full h-full flex items-center justify-center">
                            <input
                              id={`checkbox-${index}`}
                              ref={index === 0 ? firstCheckboxRef : null}
                              type="checkbox"
                              className="w-3 h-3 cursor-pointer"
                              checked={sucursalesSeleccionadasModal.includes(sucursal)}
                              onChange={() => handleCheckboxChange(sucursal)}
                            />
                          </label>
                        </td>
                        <td
                          className="p-1 cursor-pointer"
                          onClick={() => handleCheckboxChange(sucursal)}
                        >
                          {sucursal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Botones "Todos" y "Ninguno" */}
            <div className="flex flex-col items-center justify-start h-20 gap-2 mt-5">
              {buttons.map(({ text, onClick }) => (
                <ActionButton
                  key={text}
                  textShortcut={
                    <div className="flex">
                      <span className="underline">{text[0]}</span>
                      <span>{text.slice(1)}</span>
                    </div>
                  }
                  onClick={onClick}
                  color="blueSoft"
                  className="h-8 w-32 text-sm"
                  size="md"
                />
              ))}
            </div>
          </ModalInforme>
        </>
      )}
    </>
  );
}
