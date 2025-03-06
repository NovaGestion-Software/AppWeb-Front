import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { RiStore3Fill } from '@remixicon/react';
import { Button } from '@headlessui/react';

interface Modal {
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
}: Modal) {
  const [showModal, setShowModal] = useState(false);
  const [sucursalesSeleccionadasModal, setSucursalesSeleccionadasModal] = useState<string[]>([]);
  const [sucursalesDisponibles, setSucursalesDisponibles] = useState<string[]>([]);

  useEffect(() => {
    if (sucursales?.length) {
      setSucursalesDisponibles(sucursales);
      setSucursalesSeleccionadasModal([...sucursalesSeleccionadas]);
    }
  }, [sucursales]);

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
      <Button
        onClick={() => setShowModal(true)}
        disabled={!isProcessing}
        className={`w-44 h-9 rounded-md p-1 gap-2 flex flex-row items-center justify-center text-xs 2xl:text-base ${
          isProcessing
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-gray-500 cursor-not-allowed border-none'
        } text-white`}
      >
        <span>Sucursales</span>
        <RiStore3Fill size={20} />
      </Button>

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-6 mx-auto w-[40rem]">
              <div className="grid grid-cols-4 grid-rows-[3rem_auto_auto_auto_auto] gap-1 w-full p-6 rounded-lg shadow-lg relative bg-white outline-none focus:outline-none">
                <div className="col-span-3 flex items-center justify-start p-5 rounded-t">
                  <h3 className="text-3xl font-semibold w-full underline underline-offset-4 decoration-4 decoration-gray-600">
                    Sucursales
                  </h3>
                </div>
                <div className="row-span-1 col-start-4 row-start-5 w-full flex flex-col gap-3 justify-center items-center">
                  <button
                    className="rounded w-32 h-12 b flex items-center justify-center gap-1 p-1 text-xs font-bold border  text-green-800  border-green-800  hover:bg-green-600 hover:text-white cursor-pointer"
                    onClick={handleConfirm}
                  >
                    Confirmar <FaCheck />
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className=" flex items-center justify-center gap-1 p-1 border rounded w-32 h-12 hover:text-white  cursor-pointer font-extrabold text-red-800 text-xs border-red-800 hover:bg-red-800"
                  >
                    Cerrar <ImCross />
                  </button>
                </div>
                <div className="row-span-1 col-start-4 row-start-2 w-full flex flex-col gap-2 items-center justify-center">
                  <Button
                    className="h-8 w-32 rounded-sm text-sm overflow-hidden bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleSelectAll}
                  >
                    Todos
                  </Button>
                  <Button
                    className="h-8 w-32 p-1 rounded-sm text-sm overflow-hidden bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleDeselectAll}
                  >
                    Ninguno
                  </Button>
                </div>
                <div className="col-span-3 row-span-4 col-start-1 row-start-2 w-full h-[30rem] mx-auto p-4 flex flex-row gap-4 mb-4">
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
                              <input
                                type="checkbox"
                                className="w-5 h-5 cursor-pointer"
                                checked={sucursalesSeleccionadasModal.includes(sucursal)}
                                onChange={() => handleCheckboxChange(sucursal)}
                              />
                            </td>
                            <td className="p-2">{sucursal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
