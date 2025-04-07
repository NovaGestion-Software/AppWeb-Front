import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useStockPorSeccion } from '../../store/useStockPorSeccion';
import { MarcaModal } from '@/types';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import ModalInforme from '@/views/app/informes/_components/ModalInforme';


interface FiltroMarcaModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function FiltroMarcaModal({ showModal, setShowModal }: FiltroMarcaModalProps) {
  const { marcasDisponibles, marcasSeleccionadas, setMarcasSeleccionadas } = useStockPorSeccion();
  const [marcasSeleccionadasModal, setMarcasSeleccionadasModal] = useState<MarcaModal[]>([]);

  //   console.log(marcasSeleccionadas);
  //   useEffect(() => {
  //     const datoUnico = Array.from(new Set(marcasDisponibles));

  //     if (JSON.stringify(datoUnico) !== JSON.stringify(marcasDisponibles)) {
  //       setMarcasDisponibles(datoUnico);
  //       setMarcasSeleccionadas(datoUnico);
  //     }
  //   }, [marcasDisponibles]);

  //   useEffect(() => {
  //     console.log('marcasSeleccionadas', marcasSeleccionadas);
  //     console.log('marcasSeleccionadasModal', marcasSeleccionadasModal);
  //   }, [marcasSeleccionadas, marcasSeleccionadasModal]);

  useEffect(() => {
    if (showModal) {
      setMarcasSeleccionadasModal([...marcasSeleccionadas]);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleSelectAll = () => {
    setMarcasSeleccionadasModal(marcasDisponibles);
  };

  const handleDeselectAll = () => {
    setMarcasSeleccionadasModal([]);
  };

  const handleCheckboxChange = (marca: MarcaModal) => {
    setMarcasSeleccionadasModal(
      (prev) =>
        prev.some((m) => m.nmarca === marca.nmarca)
          ? prev.filter((m) => m.nmarca !== marca.nmarca) // Si ya está, lo elimina
          : [...prev, marca] // Si no está, lo agrega
    );
  };

  const handleConfirm = () => {
    setMarcasSeleccionadas(marcasSeleccionadasModal);
    setShowModal(false);
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setMarcasSeleccionadas([...marcasSeleccionadas]);
  };

  return (
    <ModalInforme
      buttons={true}
      show={showModal}
      title={'Marcas'}
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
              {marcasDisponibles.map((item: any, index: any) => (
                <tr
                  key={index}
                  className="hover:bg-blue-600 hover:bg-opacity-50 text-black font-semibold border-b border-gray-200"
                >
                  <td className="p-2 text-center">
                    <label className="cursor-pointer w-full h-fit flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="w-3 h-3 cursor-pointer"
                        checked={marcasSeleccionadasModal.some((m) => m.nmarca === item.nmarca)}
                        onChange={() => handleCheckboxChange(item)}
                        id={`checkbox-${index}`}
                      />
                    </label>
                  </td>
                  <td className="p-1 cursor-pointer" onClick={() => handleCheckboxChange(item)}>
                    {item.nmarca}
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
