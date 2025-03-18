import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import ModalInforme from '@/views/app/informes/_components/ModalInforme';

interface FiltroModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  datos: string[]; // Datos originales para obtener los ítems disponibles
  itemsDisponibles: string[]; // Lista de ítems disponibles
  itemsSeleccionados: string[]; // Lista de ítems seleccionados (debe ser un array)
  setItemsDisponibles: (items: string[]) => void; // Función para actualizar los ítems disponibles
  setItemsSeleccionados: (items: string[]) => void; // Función para actualizar los ítems seleccionados
  title: string; // Título del modal
}

export default function FiltroModal({
  showModal,
  setShowModal,
  datos,
  itemsDisponibles,
  itemsSeleccionados,
  setItemsDisponibles,
  setItemsSeleccionados,
  title,
}: FiltroModalProps) {
  const [itemsSeleccionadasModal, setItemsSeleccionadasModal] = useState<string[]>([]);

  useEffect(() => {
    const datoUnico = Array.from(new Set(datos));

    // Verificar si los datos han cambiado antes de actualizar el estado
    if (JSON.stringify(datoUnico) !== JSON.stringify(itemsDisponibles)) {
      setItemsDisponibles(datoUnico);
      setItemsSeleccionados(datoUnico);
    }
  }, [datos]);

  useEffect(() => {
    if (showModal) {
      setItemsSeleccionadasModal([...itemsSeleccionados]);
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
  }, [showModal, itemsSeleccionados]);

  const handleSelectAll = () => {
    setItemsSeleccionadasModal(itemsDisponibles);
  };

  const handleDeselectAll = () => {
    setItemsSeleccionadasModal([]);
  };

  const handleCheckboxChange = (id: string) => {
    setItemsSeleccionadasModal((prev) =>
      prev.includes(id) ? prev.filter((suc) => suc !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    setItemsSeleccionados(itemsSeleccionadasModal);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    setItemsSeleccionados([...itemsSeleccionados]); // Revertir los cambios y restaurar las sucursales originales
    //  clearMarcasSeleccionadas()
  };

  // console.log(itemsDisponibles);
  return (
    <>
      <ModalInforme
        buttons={true}
        show={showModal}
        title={title}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        disabled={true}
        disabled2={true}
      >
        <div className="flex flex-col w-full h-[30rem] mx-auto  gap-1 ">
          <div className="flex flex-row  items-center justify-end h-10 gap-2  ">
            <ActionButton
              text="Todos"
              onClick={handleSelectAll}
              color="blueSoft"
              className="h-6 w-24 text-xs rounded-lg"
              size="md"
            />
            <ActionButton
              text="Ninguno"
              onClick={handleDeselectAll}
              color="blueSoft"
              className="h-6 w-24 text-xs rounded-lg"
              size="md"
            />
          </div>
          <div className="w-[27rem] h-[25rem] overflow-auto border border-gray-300 rounded-lg">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="p-1 w-10"></th>
                  <th className="p-1 text-left">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {itemsDisponibles.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-600 hover:bg-opacity-50 text-black font-semibold border-b border-gray-200"
                  >
                    <td className="p-2 text-center">
                      <label className="cursor-pointer w-full h-fit flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="w-3 h-3 cursor-pointer"
                          checked={itemsSeleccionadasModal.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                          id={`checkbox-${index}`} // ID único para el checkbox
                        />
                      </label>
                    </td>
                    <td className="p-1 cursor-pointer" onClick={() => handleCheckboxChange(item)}>
                      {item}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ModalInforme>
    </>
  );
}
