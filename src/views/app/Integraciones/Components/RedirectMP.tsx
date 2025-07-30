import { grabarCodeMercadoPago } from "@/services/ApiPhpService";
import React, { useEffect, useState } from "react";


type Estado = "cargando" | "pendiente" | "completado" | "error" | "errorNoCode";

export const RedirectMercadoPago: React.FC = () => {
  const [estado, setEstado] = useState<Estado>("completado");
  const [codigo, setCodigo] = useState<String>("");
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  //const endpointPolling = "/api/mercado-pago/estado-integracion";



useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    setEstado("errorNoCode");
    return;
  }

  setEstado("pendiente");
  setCodigo(code);

  // Enviar el código al backend usando la función con apiPhp
  grabarCodeMercadoPago(code)
    .then((res) => {
      if (res?.estado === "ok") {
        setEstado("completado");
        console.log('res',res)
        const countdownSeconds = 5;
        setSecondsLeft(countdownSeconds);

        const countdownInterval = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev !== null) {
              if (prev <= 1) {
                clearInterval(countdownInterval);
                window.close(); // cerrar al llegar a 0
                return null;
              }
              return prev - 1;
            }
            return null;
          });
        }, 1000);
      } else {
        setEstado("error");
        console.log('res',res)
      }
    })
    .catch((err) => {
      console.error("Error al enviar el código:", err);
      setEstado("error");
    });
}, []);


  const renderContenido = () => {
    switch (estado) {
      case "cargando":
        return <MensajeConSpinner texto="Obteniendo datos de autorización..." color="gray" />;

      case "pendiente":
        return <MensajeConSpinner texto={`Procesando tu autorización con Mercado Pago con ${codigo}. No cierres esta ventana.`} color="blue" />;

      case "completado":
        return (
          <div className="flex flex-col items-center gap-4 text-center text-green-700">
            <SuccessIcon />
            <p className="text-base font-medium">¡Tu cuenta fue conectada exitosamente!</p>
            {secondsLeft !== null && <p className="text-sm text-gray-500 mt-2">Esta ventana se cerrará automáticamente en {secondsLeft} segundos...</p>}
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center gap-3 text-center text-red-600">
            <ErrorIcon />
            <p className="text-base font-medium">Hubo un problema al procesar tu conexión.</p>
            <p className="text-sm text-gray-500">Verificá tu enlace o intentá nuevamente.</p>
          </div>
        );

      case "errorNoCode":
        return (
          <div className="flex flex-col items-center gap-3 text-center text-red-600">
            <ErrorIcon />
            <p className="text-base font-medium">Hubo un problema al procesar tu codigo.</p>
            <p className="text-sm text-gray-500">Verificá tu enlace o intentá nuevamente.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Conectando Mercado Pago</h2>
        {renderContenido()}
      </div>
    </div>
  );
};

// Componentes auxiliares reutilizables

const MensajeConSpinner = ({ texto, color }: { texto: string; color: "gray" | "blue" }) => (
  <div className={`flex flex-col items-center gap-4 text-center text-${color}-700`}>
    <Spinner color={color} />
    <p className="text-base">{texto}</p>
  </div>
);

const Spinner = ({ color = "gray" }: { color?: "gray" | "blue" }) => (
  <svg className={`animate-spin h-6 w-6 text-${color}-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-label="Cargando">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
  </svg>
);

const SuccessIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
