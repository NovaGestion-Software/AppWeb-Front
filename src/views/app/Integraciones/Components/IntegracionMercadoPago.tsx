import React, { useEffect, useState } from "react";

import { grabarCodeMercadoPago, obtenerUrlAuthorization } from "@/services/ApiPhpService";
import { useVerificarIntegracionMP } from "../Hooks/useVerificarIntegracionMP";

type EstadoIntegracion = "no_conectado" | "conectando" | "conectado" | "error";

export const IntegracionMercadoPago: React.FC = () => {
  const [estado, setEstado] = useState<EstadoIntegracion>("no_conectado");
  const iniciarIntegracion = async () => {
    setEstado("conectando");

    try {
      const data = await obtenerUrlAuthorization();
      const { client_id, redirect_uri } = data?.data[0];

      const urlAuthorization = `https://auth.mercadopago.com.ar/authorization?client_id=${client_id}&response_type=code&platform_id=mp&redirect_uri=${redirect_uri}`;

      window.open(urlAuthorization, "_blank", "width=600,height=800,scrollbars=yes,resizable=yes");
    } catch (err) {
      console.error("Error al obtener URL de autorización:", err);
      setEstado("error");
    }
  };

  // 🧠 Escuchar mensaje desde ventana emergente
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.origin) return;
      const { code } = event.data || {};
      if (!code) return;

      // Procesar el code
      grabarCodeMercadoPago(code)
        .then((res) => {
          console.log("res", res);
          if (res?.code === 201 && res.message === "grabarMercadoAcceso OK") {
            setEstado("conectado");
          } else {
            setEstado("error");
          }
        })
        .catch((err) => {
          console.error("Error al enviar el código:", err);
          setEstado("error");
        });
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const { estadoIntegracion, cargando } = useVerificarIntegracionMP();
  

  console.log("estado integracion", estadoIntegracion, cargando);

  useEffect(() => {
    if (estadoIntegracion) {
      setEstado("conectado");
    }
  }, [estadoIntegracion]);
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
      case "error":
        return <div className="text-red-600 font-medium">❌ Error en la integración</div>;
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
