import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import ModalInforme from '@/views/app/informes/_components/ModalInforme';
import CheckboxInput from '@/Components/ui/Inputs/Checkbox';
import showAlert from '@/utils/showAlert';

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
  disabled?: boolean; // Propiedad opcional para deshabilitar el modal
  disabled2?: boolean; // Propiedad opcional para deshabilitar el modal
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
  disabled,
  disabled2,
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

  const handleCheckboxChange = (item: T) => {
    // Si el ítem YA está seleccionado y es el ÚLTIMO, no hagas nada
    if (
      itemsSeleccionadosModal.includes(item) && 
      itemsSeleccionadosModal.length === 1
    ) {
      return; // Evita desmarcar el último
    }
  
    // Si el ítem está seleccionado, desmárcalo; si no, agrégalo
    const nuevosSeleccionados = itemsSeleccionadosModal.includes(item)
      ? itemsSeleccionadosModal.filter((i) => i !== item) // Desmarca
      : [...itemsSeleccionadosModal, item]; // Marca
  
    setItemsSeleccionadosModal(nuevosSeleccionados);
  };

  // console.log(itemsSeleccionadosModal);
  const handleConfirm = async () => {
    if (itemsSeleccionadosModal.length === 0) {
      const result = await showAlert({
        title: 'Error',
        text: 'Debe seleccionar al menos un elemento.',
        icon: 'error', // Usa 'error', 'warning', o 'info' según prefieras
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        // Opcional: Ocultar el botón de cancelar si no es relevante
        showCancelButton: false,
      });
      return; // Detiene la ejecución si no hay ítems seleccionados
    }
  
    // Si pasa la validación, procede con la acción
    setItemsSeleccionados(itemsSeleccionadosModal);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemsSeleccionados([...itemsSeleccionados]);
  };

  return (
    <ModalInforme
      buttons={true}
      show={showModal}
      title={title}
      onClose={handleCloseModal}
      onConfirm={handleConfirm}
      disabled={disabled}
      disabled2={disabled2}
    >
      <div className="flex flex-col w-fit p-2 h-[30rem] mx-auto gap-1 ">
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
                    <CheckboxInput onChange={() => handleCheckboxChange(item)}     
                        checked={itemsSeleccionadosModal.includes(item)}  disabled={itemsSeleccionadosModal.length === 1 && itemsSeleccionadosModal.includes(item)}
  
                        
                       />
              
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
