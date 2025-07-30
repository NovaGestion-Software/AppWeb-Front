import React, { useState } from "react";

import { obtenerUrlAuthorization } from "@/services/ApiPhpService";

type EstadoIntegracion = "no_conectado" | "conectando" | "conectado";

export const IntegracionMercadoPago: React.FC = () => {
  const [estado, setEstado] = useState<EstadoIntegracion>("no_conectado");

 const iniciarIntegracion = async () => {
  setEstado("conectando");

  try {
    const data = await obtenerUrlAuthorization();
    const { client_id, redirect_uri } = data?.data[0];

    const urlAuthorization = `https://auth.mercadopago.com.ar/authorization?client_id=${client_id}&response_type=code&platform_id=mp&redirect_uri=${redirect_uri}`;

    // Abre en una nueva pestaña del navegador
    window.open(urlAuthorization, "_blank");
  } catch (err) {
    console.error("Error al obtener URL de autorización:", err);
  }
};


  const renderEstado = () => {
    switch (estado) {
      case "no_conectado":
        return (
          <button onClick={iniciarIntegracion} className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            Conectar con Mercado Pago
          </button>
        );
      case "conectando":
        return (
          <div className="text-blue-600 font-medium flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-label="Cargando">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Conectando...
          </div>
        );
      case "conectado":
        return (
          <div className="text-green-600 font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Integración activa con Mercado Pago
          </div>
        );
    }
  };

  return (
    <div className="w-full p-5 bg-white rounded-xl shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">Mercado Pago</h3>
      <p className="text-sm text-gray-500 mb-4">Conectá tu cuenta de Mercado Pago para procesar pagos.</p>
      {renderEstado()}
    </div>
  );
};
