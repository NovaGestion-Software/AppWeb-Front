'use client';

import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Checkbox } from '../../../Components/Checkbox';
import { RiStore3Fill } from '@remixicon/react';
import { Button } from '@headlessui/react';

export default function ModalSucursales({
  sucursales,
  onConfirm,
  isProcessing,
  setSucursalesSeleccionadas,
}) {
  const [showModal, setShowModal] = useState(false);
  const [sucursalesSeleccionadasModal, setSucursalesSeleccionadasModal] = useState([]);
  const [sucursalesDisponibles, setSucursalesDisponibles] = useState([]);

  useEffect(() => {
    if (sucursales?.length) {
      setSucursalesDisponibles(sucursales);
      setSucursalesSeleccionadasModal(sucursales);
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
    //console.log(sucursalesSeleccionadasModal)
    setShowModal(false);
  };
  const handleCheckboxChange = (id) => {
    setSucursalesSeleccionadasModal(
      (prevSeleccionadas) =>
        prevSeleccionadas.includes(id)
          ? prevSeleccionadas.filter((suc) => suc !== id) // Quitar si ya estaba
          : [...prevSeleccionadas, id] // Agregar si no estaba
    );
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
                    onClick={() => setShowModal(false)}
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
                  <Table className="w-[27rem] border-2">
                    <TableHead className="w-[26rem]">
                      <TableRow className="bg-gray-200 border-x-6 border-gray-200 sticky top-0">
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell>Detalle</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sucursalesDisponibles.map((sucursal, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-blue-600 hover:bg-opacity-50 text-black font-semibold border border-gray-200"
                        >
                          <TableCell className="p-1 flex justify-center items-center h-12">
                            <Checkbox
                              className="w-5 h-5"
                              checked={sucursalesSeleccionadasModal.includes(sucursal)}
                              onCheckedChange={() => handleCheckboxChange(sucursal)}
                            />
                          </TableCell>
                          <TableCell className="border border-x-gray-200">{sucursal}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
