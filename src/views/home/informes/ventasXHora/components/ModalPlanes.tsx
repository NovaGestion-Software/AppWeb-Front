import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Checkbox } from '../../../Components/Checkbox';
import { RiBookShelfFill } from '@remixicon/react';
import { Button } from '@headlessui/react';

export default function ModalPlanes() {
  const [showModal, setShowModal] = useState(false);

  const planesFromStore = useSelector((state) => state.informeCobranzas);
  const dispatch = useDispatch();
  // Estado temporal inicial basado en los datos de la store
  const [localPlanes, setLocalPlanes] = useState([]);
  useEffect(() => {
    setLocalPlanes(planesFromStore); // Sincroniza el estado local al cargar
  }, [planesFromStore]);

  // Confirmar cambios
  const handleConfirm = () => {
    localPlanes.forEach((plan) => {
      const planOriginal = sucursalesFromStore.find((p) => p.idsuc === plan.idsuc);
      if (plan.view !== planOriginal.view) {
        dispatch(TOGGLE_VIEW_SUCURSAL({ idsuc: plan.idsuc, view: plan.view }));
      }
    });
    setShowModal(false);
  };
  // Cerrar modal y descartar cambios
  const handleClose = () => {
    setLocalPlanes([...planesFromStore]);
    setShowModal(false);
    console.log('Cambios descartados');
  };

  // Seleccionar todas las sucursales
  const handleSelectAll = () => {
    setLocalPlanes((prevPlanes) =>
      prevPlanes.map((plan) => ({
        ...plan,
        view: true, // Cambia "view" a true
      }))
    );
  };

  // Deseleccionar todas las sucursales
  const handleDeselectAll = () => {
    setLocalPlanes((prevPlanes) =>
      prevPlanes.map((plan) => ({
        ...plan,
        view: false, // Cambia "view" a false
      }))
    );
  };

  // Cambiar el estado de una sucursal individual
  const handleCheckboxChange = (id, value) => {
    const view = value === 'indeterminate' ? false : value;

    setLocalPlanes((prevPlanes) => {
      const updatedPlanes = prevPlanes.map((palnes) =>
        palnes.idsuc === id ? { ...palnes, view } : palnes
      );
      return updatedPlanes;
    });
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        disabled={planesFromStore.length === 0}
        className={` w-44 h-9 rounded-md gap-1 flex flex-row
           items-center justify-center text-xs 2xl:text-base  ${
             planesFromStore.length !== 0
               ? 'bg-blue-500 hover:bg-blue-600'
               : 'bg-gray-500 cursor-not-allowed border-none'
           } text-white`}
      >
        Planes
        <RiBookShelfFill
          size={20} // set custom `width` and `height`
        />
      </Button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none border border-red-800 ">
            <div className="relative  p-6 mx-auto  w-[40rem] ">
              {/*content*/}
              <div
                className=" grid grid-cols-4 grid-rows-[3rem_auto_auto_auto_auto] gap-1 w-full p-6 
                rounded-lg shadow-lg relative 
              bg-white outline-none focus:outline-none  "
              >
                {/*header titulo*/}
                <div
                  className="col-span-3 
                flex items-center justify-start p-5 rounded-t"
                >
                  <h3 className="text-3xl font-semibold w-full underline underline-offset-4 decoration-4 decoration-gray-600 ">
                    Planes Credito
                  </h3>
                </div>

                {/*body*/}

                {/**botones de confirmacion */}
                <div
                  className="row-span-1 col-start-4 row-start-5 w-full
                flex flex-col gap-3 justify-center items-center relative -top-6 "
                >
                  <button
                    className="items-center justify-center border border-green-800 rounded w-32 h-12 hover:bg-green-600 hover:text-white  cursor-pointer
                    flex flex-row gap-1 p-1
                  text-green-800 text-xs font-bold "
                    onClick={handleConfirm}
                  >
                    Confirmar <FaCheck className=" " />
                  </button>
                  <button
                    onClick={handleClose}
                    className="items-center justify-center border  rounded w-32 h-12 hover:text-white flex flex-row gap-1 p-1 cursor-pointer
                    font-extrabold text-red-800  text-xs 
                    border-red-800 hover:bg-red-800 "
                  >
                    Cerrar <ImCross className="" />
                  </button>
                </div>
                {/**botones de check all */}
                <div
                  className="row-span-1 col-start-4 row-start-2 w-full
                flex flex-col gap-2 items-center justify-center  "
                >
                  <Button
                    className="h-8  w-32 rounded-sm text-sm  overflow-hidden  bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleSelectAll}
                  >
                    Todos
                  </Button>
                  <Button
                    className="h-8 w-32  p-1 rounded-sm text-sm  overflow-hidden  bg-blue-500 hover:bg-blue-600 text-white "
                    onClick={handleDeselectAll}
                  >
                    <p className="text-wrap">Ninguno</p>
                  </Button>
                </div>

                {/**tabla */}
                <div
                  className="col-span-3 row-span-4 col-start-1 row-start-2
                w-full h-[30rem] mx-auto p-4 flex flex-row gap-4 mb-4"
                >
                  <Table className="w-[27rem] border-2 ">
                    <TableHead className="w-[26rem]">
                      <TableRow className="bg-gray-200 border-x-6 z-10 border-gray-200 sticky top-0 ">
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell className="">Detalle</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    {localPlanes.map((plan, index) => (
                      <TableBody key={index} className="w-[26rem]">
                        <TableRow className="hover:bg-blue-600 hover:bg-opacity-50 text-black font-semibold  border border-gray-200 ">
                          <TableCell className="p-1 flex justify-center items-center h-12 ">
                            <Checkbox
                              className="w-5 h-5"
                              checked={plan.view}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(plan.idsuc, checked)
                              }
                            />
                          </TableCell>
                          <TableCell className="border border-x-gray-200">
                            {plan.sucursal}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
