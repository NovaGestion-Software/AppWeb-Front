import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import ModalInforme from '@/views/app/informes/_components/ModalInforme';

// Definir un tipo genérico que permitirá usar cualquier tipo de dato.
interface FiltroModalProps<T> {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  datos: T[]; // Datos originales, ahora de tipo genérico
  itemsDisponibles: T[]; // Lista de ítems disponibles, de tipo genérico
  itemsSeleccionados: T[]; // Lista de ítems seleccionados, de tipo genérico
  setItemsDisponibles: (items: T[]) => void; // Función para actualizar los ítems disponibles
  setItemsSeleccionados: (items: T[]) => void; // Función para actualizar los ítems seleccionados
  title: string; // Título del modal
  renderItem: (item: T) => React.ReactNode; // Función de renderizado de cada ítem
  setStockRenderizado?: (data: any[]) => void;
}

export default function FiltroModal<T>({
  showModal,
  setShowModal,
  datos,
  itemsDisponibles,
  itemsSeleccionados,
  setItemsDisponibles,
  setItemsSeleccionados,
  title,
  renderItem,
}: // setStockRenderizado,
FiltroModalProps<T>) {
  const [itemsSeleccionadosModal, setItemsSeleccionadosModal] = useState<T[]>([]);

  // console.log(itemsDisponibles);
  // console.log(itemsSeleccionados);

  useEffect(() => {
    const datoUnico = Array.from(new Set(datos));

    if (JSON.stringify(datoUnico) !== JSON.stringify(itemsDisponibles)) {
      setItemsDisponibles(datoUnico);
      setItemsSeleccionados(datoUnico);
    }
  }, [datos, setItemsDisponibles, setItemsSeleccionados, itemsDisponibles]);

  useEffect(() => {
    if (showModal) {
      setItemsSeleccionadosModal(
        itemsSeleccionados.length > 0 ? [...itemsSeleccionados] : [...itemsDisponibles]
      );
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal, itemsSeleccionados]);

  const handleSelectAll = () => {
    setItemsSeleccionadosModal(itemsDisponibles);
  };

  const handleDeselectAll = () => {
    setItemsSeleccionadosModal([]);
  };

  const handleCheckboxChange = (id: T) => {
    setItemsSeleccionadosModal((prev) =>
      prev.includes(id) ? prev.filter((suc) => suc !== id) : [...prev, id]
    );
  };

  // console.log(itemsSeleccionadosModal);

  const handleConfirm = () => {
    setItemsSeleccionados(itemsSeleccionadosModal);
    // setStockRenderizado(itemsSeleccionadosModal)
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemsSeleccionados([...itemsSeleccionados]);
  };

  // console.log(itemsSeleccionadosModal);

  return (
    <ModalInforme
      buttons={true}
      show={showModal}
      title={title}
      onClose={handleCloseModal}
      onConfirm={handleConfirm}
      disabled={true}
      disabled2={true}
    >
      <div className="flex flex-col w-full h-[30rem] mx-auto gap-1 ">
        <div className="flex flex-row items-center justify-end h-10 gap-2 ">
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
                        checked={itemsSeleccionadosModal.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                        id={`checkbox-${index}`}
                      />
                    </label>
                  </td>
                  <td className="p-1 cursor-pointer" onClick={() => handleCheckboxChange(item)}>
                    {renderItem(item)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ModalInforme>
  );
}
