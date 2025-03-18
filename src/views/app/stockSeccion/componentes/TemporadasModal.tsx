import { useVentasHoraStore } from "@/store/useVentasHoraStore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalInforme from "../../informes/_components/ModalInforme";
import { useStockPorSeccion } from "@/store/useStockPorSeccion";
import ActionButton from "@/Components/ui/Buttons/ActionButton";

interface TemporadasModalProps {
  showTemporadasModal: boolean;
  setShowTemporadasModal: Dispatch<SetStateAction<boolean>>;
}

export default function TemporadasModal({
  showTemporadasModal,
  setShowTemporadasModal,
}: TemporadasModalProps) {
  const {
  tablaStock,
   temporadasDisponibles,
   temporadasSeleccionadas,
   setTemporadasDisponibles,
   setTemporadasSeleccionadas
  } = useStockPorSeccion();
  
  const [temporadasSeleccionadasModal, setTemporadasSeleccionadasModal] = useState<string[]>([]);
console.log('tempr',temporadasDisponibles)
let temporadas = ['Clasico', 'Anual', 'Verano', 'Invierno'];

useEffect(() => {
  console.log("Tabla stock cambiada:", tablaStock);
  console.log("Temporadas disponibles antes de actualizar:", temporadasDisponibles);
  setTemporadasDisponibles(temporadas);
  setTemporadasSeleccionadas(temporadas);
}, [tablaStock]);

useEffect(() => {
  console.log("Temporadas disponibles después de actualizar:", temporadasDisponibles);
}, [temporadasDisponibles]);

  // console.log("marcas disponibles store", temporadasDisponibles); // Ahora tienes las marcas únicas en el estado
  // console.log("marcas store seleccionadas", temporadasSeleccionadas); // Ahora tienes las marcas únicas en el estado

  useEffect(() => {
    if (showTemporadasModal) {
        setTemporadasSeleccionadasModal([...temporadasSeleccionadas]);
      // Bloquea el scroll del body cuando el modal esté visible
      document.body.style.overflow = "hidden";
    } else {
      // Restaura el scroll del body cuando el modal se cierra
      document.body.style.overflow = "auto";
    }

    // Limpieza para restaurar el estado cuando el componente se desmonte o el modal se cierre
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showTemporadasModal, temporadasSeleccionadas]);

  const handleSelectAll = () => {
    setTemporadasSeleccionadasModal(temporadasDisponibles);
  };

  const handleDeselectAll = () => {
    setTemporadasSeleccionadasModal([]);
  };

  const handleCheckboxChange = (id: string) => {
    setTemporadasSeleccionadasModal((prev) =>
      prev.includes(id) ? prev.filter((suc) => suc !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    setTemporadasSeleccionadas(temporadasSeleccionadasModal);
    setShowTemporadasModal(false);
  };

  const handleCloseModal = () => {
    setShowTemporadasModal(false); // Cerrar el modal
    setTemporadasSeleccionadas([...temporadasSeleccionadas]); // Revertir los cambios y restaurar las sucursales originales
    //  clearMarcasSeleccionadas()
  };
  return (
    <>
      <ModalInforme
        buttons={true}
        show={showTemporadasModal}
        title="Temporadas"
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
          <div className="w-[27rem] overflow-auto border border-gray-300 rounded-lg">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="p-2 w-10"></th>
                  <th className="p-2 text-left">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {temporadasDisponibles.map((temporada, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-600 hover:bg-opacity-50 text-black font-semibold border-b border-gray-200"
                  >
                    <td className="p-2 text-center">
                      <label className="cursor-pointer w-full h-full flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 cursor-pointer"
                          checked={temporadasSeleccionadasModal.includes(temporada)}
                          onChange={() => handleCheckboxChange(temporada)}
                          id={`checkbox-${index}`} // ID único para el checkbox
                        />
                      </label>
                    </td>
                    <td
                      className="p-2 cursor-pointer"
                      onClick={() => handleCheckboxChange(temporada)}
                    >
                      {temporada}
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
