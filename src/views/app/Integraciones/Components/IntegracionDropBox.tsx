import React, { useState } from "react";

type EstadoIntegracion = "no_conectado" | "conectando" | "conectado";

export const IntegracionDropBox: React.FC = () => {
  const [estado, setEstado] = useState<EstadoIntegracion>("conectado");

  const iniciarIntegracion = () => {
    setEstado("conectando");

    // const popup = window.open(
    //   "/mercado-pago/redirect", // tu ruta real en el frontend
    //   "_blank",
    //   "width=600,height=700"
    // );

    // const listener = (event: MessageEvent) => {
    //   if (event.origin !== window.location.origin) return;
    //   if (event.data?.status === "success") {
    //     setEstado("conectado");
    //   }
    //   window.removeEventListener("message", listener);
    // };

    // window.addEventListener("message", listener);
  };

  const renderEstado = () => {
    switch (estado) {
      case "no_conectado":
        return (
          <button
            onClick={iniciarIntegracion}
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Conectar con DropBox
          </button>
        );
      case "conectando":
        return (
          <div className="text-blue-600 font-medium flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="status"
              aria-label="Cargando"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Conectando...
          </div>
        );
      case "conectado":
        return (
          <div className="text-green-600 font-semibold flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Integración activa con DropBox
          </div>
        );
    }
  };

  return (
    <div className="w-full p-5 bg-white rounded-xl shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">DropBox</h3>
      <p className="text-sm text-gray-500 mb-4">
        Conectá tu cuenta de DropBox para acceder a tus archivos.
      </p>
      {renderEstado()}
    </div>
  );
};
