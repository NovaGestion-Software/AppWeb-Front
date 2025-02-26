import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
// import { ClipLoader } from 'react-spinners';

export default function FacturacionModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get('facturacion');
  const show = modal ? true : false;

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="flex flex-col items-center w-full max-w-2xl transform overflow-hidden bg-white text-left text-slate-800 rounded-lg shadow-xl transition-all p-8">
                  <form className="w-full space-y-4">
                    {/* HC */}
                    <div className="flex items-center gap-3 bg-gray-200">
                      <label htmlFor="hc" className="w-16 font-medium">
                        HC <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          id="hc"
                          className="border border-gray-300 rounded px-2 py-1 w-24 focus:ring-2 focus:ring-blue-400"
                          placeholder="12345"
                        />
                        <button
                          type="button"
                          className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600 transition"
                        >
                          🔍
                        </button>
                        <input
                          type="text"
                          id="paciente"
                          className="border border-gray-300 rounded px-2 py-1 flex-grow focus:ring-2 focus:ring-blue-400"
                          placeholder="Nombre del paciente"
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Particular */}
                    <div className="flex flex-col gap-4 mt-10 p-4 max-w-lg border-2 border-slate-400 rounded">
                      {/* Checkbox y Texto de Particular */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="particular" className="h-5 w-5" />
                        <label htmlFor="particular" className="w-44 text-lg">
                          Particular
                        </label>
                      </div>

                      {/* Consulta $ */}
                      <div className="flex gap-4 items-center justify-start">
                        <label htmlFor="consulta" className="w-20 text-right text-sm">
                          Consulta $
                        </label>
                        <input
                          id="consulta"
                          type="number"
                          className="w-32 p-2 border border-gray-300 rounded"
                          placeholder="0"
                        />
                      </div>

                      {/* Otros $ */}
                      <div className="flex gap-4 items-center ">
                        <label htmlFor="otros" className="w-20 text-right text-sm">
                          Otros $
                        </label>
                        <input
                          id="otros"
                          type="number"
                          className="w-32 p-2 border border-gray-300 rounded"
                          placeholder="0"
                        />
                        <input
                          id="descripcion"
                          type="text"
                          className="p-2 border border-gray-300 rounded"
                        />
                      </div>

                      {/* Otro input de texto */}
                      <div className="flex gap-2 items-center"></div>
                    </div>

                    {/* Obra Social */}
                    <div className="flex flex-col gap-4 mt-10 p-4 max-w-lg border-2 border-slate-400 rounded">
                      {/* Checkbox y Texto de Particular */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="particular" className="h-5 w-5" />
                        <label htmlFor="particular" className="w-44 text-lg">
                          Obra Social
                        </label>
                      </div>

                      {/* Nombre */}
                      <div className="flex gap-4 items-center ">
                        <label htmlFor="obraSocial" className="w-20 text-right text-sm">
                          Nombre
                        </label>
                        <input
                          id="obraSocial"
                          type="number"
                          className="w-80 p-2 border border-gray-300 rounded"
                        />
                      </div>

                      {/* Plus */}
                      <div className="flex gap-4 items-center ">
                        <label htmlFor="plus" className="w-20 text-right text-sm"></label>
                        <input
                          id="plus"
                          type="number"
                          className="w-80 p-2 border border-gray-300 rounded"
                        />
                      </div>

                      {/* Coseguro $ */}
                      <div className="flex gap-4 items-center justify-start">
                        <label htmlFor="consulta" className="w-20 text-right text-sm">
                          Coseguro $
                        </label>
                        <input
                          id="consulta"
                          type="number"
                          className="w-32 p-2 border border-gray-300 rounded"
                          placeholder="0"
                        />
                      </div>

                      {/* Otros $ */}
                      <div className="flex gap-4 items-center ">
                        <label htmlFor="otros" className="w-20 text-right text-sm">
                          Otros $
                        </label>
                        <input
                          id="otros"
                          type="number"
                          className="w-32 p-2 border border-gray-300 rounded"
                          placeholder="0"
                        />
                        <input
                          id="descripcion"
                          type="text"
                          className="p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    {/* CheckBox*/}
                    <div className="flex flex-col gap-4">
                      {/* Primer Checkbox: Cargar Factura */}
                      <div className="flex gap-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          Cargar Factura
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Número de factura"
                            className="p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="number"
                            placeholder="Monto"
                            className="p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div>

                      {/* Segundo Checkbox: Dejar Factura Pendiente */}
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          Dejar Factura Pendiente
                        </label>
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-4 mt-10">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        <span>💾</span> Guardar
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                        onClick={() => navigate('/turnos')}
                      >
                        <span>❌</span> Cancelar
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
