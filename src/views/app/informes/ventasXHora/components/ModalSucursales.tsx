import { useEffect, useState } from 'react';
import { RiStore3Fill } from '@remixicon/react';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import ModalInforme from '../../_components/ModalInforme';

interface ModalSucursalesProps {
  sucursales: string[];
  sucursalesSeleccionadas: string[];
  setSucursalesSeleccionadas: (value: string[]) => void;
  isProcessing: boolean;
}

export default function ModalSucursales({
  sucursales,
  isProcessing,
  sucursalesSeleccionadas,
  setSucursalesSeleccionadas,
}: ModalSucursalesProps) {
  const [showModal, setShowModal] = useState(false);
  const [sucursalesSeleccionadasModal, setSucursalesSeleccionadasModal] = useState<string[]>([]);
  const [sucursalesDisponibles, setSucursalesDisponibles] = useState<string[]>([]);

  useEffect(() => {
    if (sucursales?.length) {
      setSucursalesDisponibles(sucursales);
      setSucursalesSeleccionadasModal([...sucursalesSeleccionadas]);
    }
  }, [sucursales]);

  useEffect(() => {
    if (showModal) {
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
  }, [showModal]); // Se ejecuta cuando showModal cambia

  const handleSelectAll = () => {
    setSucursalesSeleccionadasModal(sucursalesDisponibles); // Selecciona todos los nombres de sucursales
  };

  const handleDeselectAll = () => {
    setSucursalesSeleccionadasModal([]); // Deselecciona todas las sucursales
  };

  const handleConfirm = () => {
    setSucursalesSeleccionadas(sucursalesSeleccionadasModal);
    setShowModal(false);
  };

  const handleCheckboxChange = (id: string) => {
    setSucursalesSeleccionadasModal(
      (prevSeleccionadas) =>
        prevSeleccionadas.includes(id)
          ? prevSeleccionadas.filter((suc) => suc !== id) // Quitar si ya estaba
          : [...prevSeleccionadas, id] // Agregar si no estaba
    );
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    setSucursalesSeleccionadasModal([...sucursalesSeleccionadas]); // Revertir los cambios y restaurar las sucursales originales
  };

  return (
    <>
      <ActionButton
        text="Sucursales"
        icon={<RiStore3Fill size={20} />}
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
          >
            {/* Contenido del Modal */}
            <div className="flex w-full h-[30rem] mx-auto p-4 gap-4 mb-4">
              <div className="w-[27rem] overflow-auto border border-gray-300 rounded-lg">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-200 sticky top-0">
                    <tr>
                      <th className="p-2 w-10"></th>
                      <th className="p-2 text-left">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sucursalesDisponibles.map((sucursal, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-600 hover:bg-opacity-50 text-black font-semibold border-b border-gray-200"
                      >
                        <td className="p-2 text-center">
                          <label className="cursor-pointer w-full h-full flex items-center justify-center">
                            <input
                              type="checkbox"
                              className="w-5 h-5 cursor-pointer"
                              checked={sucursalesSeleccionadasModal.includes(sucursal)}
                              onChange={() => handleCheckboxChange(sucursal)}
                              id={`checkbox-${index}`} // ID único para el checkbox
                            />
                          </label>
                        </td>
                        <td
                          className="p-2 cursor-pointer"
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
              <ActionButton
                text="Todos"
                onClick={handleSelectAll}
                color="blueSoft"
                className="h-8 w-32 text-sm"
                size="md"
              />
              <ActionButton
                text="Ninguno"
                onClick={handleDeselectAll}
                color="blueSoft"
                className="h-8 w-32 text-sm"
                size="md"
              />
            </div>
          </ModalInforme>
        </>
      )}
    </>
  );
}
