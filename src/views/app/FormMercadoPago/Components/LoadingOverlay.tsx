import React from "react";
import QRPago from "./Payment/PaymentQRDisplay";
import OrderChecker from "./OrderChecker";

type LoadingOverlayProps = {
  paymentMethod?: "online" | "qr" | "pos";
  paymentReference?: string;
  qrData?: string;
  onCancel: () => void;
  qrCode?: string;
  orderId?: string;
};

// tengo este modal para mostrar que esta esperando el pago.
// si es con el qr en pantalla en el momento del pago tiene que cerrarse.
// mientras se muestra el qr tiene que haber un mensaje visual de que esta a la espera
// y cambiar cuando llegue el pago, y luego cerrar el modal.
// si es un pago online, y se abre una nueva pestaña, el modal tiene que mostrar el loader y el mensaje.
// Atras de esto tiene que haber una peticion constate para comprobar el estado de la operacion.
//

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  paymentMethod,
  paymentReference,
  onCancel,
  qrCode = "",
  orderId = "",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="space-y-3">
            {qrCode && <QRPago qrData={qrCode} />}
          </div>
          {/* Mensaje según tipo de pago */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {paymentMethod === "online" && "Procesando pago con online..."}
            {paymentMethod === "pos" && "Procesando en terminal POS..."}
          </h3>

          <p className="text-gray-600 text-center mb-4">
            {paymentMethod === "online" && "Por favor no cierres esta ventana."}
            {paymentMethod === "qr" &&
              "Usa la app de Mercado Pago para escanear el código."}
            {paymentMethod === "pos" &&
              "Por favor completa el pago en el terminal."}
          </p>

          {/* Referencia del pago */}
          {paymentReference && (
            <div className="bg-gray-100 px-3 py-2 rounded-md mb-4 w-full text-center">
              <p className="text-sm font-medium text-gray-700">Referencia:</p>
              <p className="text-xs font-mono text-gray-600 break-all">
                {paymentReference}
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
            >
              Cancelar
            </button>

            {orderId && (
              <OrderChecker
                type="button"
                orderId={orderId}
                onClose={onCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
