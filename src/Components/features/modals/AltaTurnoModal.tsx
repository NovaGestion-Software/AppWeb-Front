import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
// import { ClipLoader } from 'react-spinners';

export default function AltaTurnoModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get('altaTurno');
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
                    <div className="flex items-center gap-3">
                      <label htmlFor="hc" className="w-44 text-right font-medium">
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

                    {/* Observaciones */}
                    <div className="flex items-start gap-3">
                      <label htmlFor="observaciones" className="w-44 text-right font-medium">
                        Observaciones
                      </label>
                      <textarea
                        id="observaciones"
                        className="border border-gray-300 rounded px-2 py-1 w-full h-32 focus:ring-2 focus:ring-blue-400"
                        placeholder="Escribe las observaciones aquí..."
                      />
                    </div>

                    {/* Celular */}
                    <div className="flex items-center gap-3 w-full">
                      <label htmlFor="celular" className="w-44 text-right font-medium">
                        Celular
                      </label>
                      <div className="flex gap-2 items-center w-full">
                        <input
                          type="text"
                          id="codigo-area"
                          className="border border-gray-300 rounded px-2 py-1 w-16 focus:ring-2 focus:ring-blue-400"
                          placeholder="Área"
                        />
                        <p className="text-center">15</p>
                        <input
                          type="text"
                          id="numero"
                          className="border border-gray-300 rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
                          placeholder="Número del celular"
                        />
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-4 mt-10">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        <img src="/img/icons/save.png" alt="Guardar" className="w-7 h-7 mr-2" />
                        Guardar
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
