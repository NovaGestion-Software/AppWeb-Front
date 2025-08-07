import React, { useState, useEffect } from "react";
import QRPago from "./Payment/PaymentQRDisplay";
import OrderChecker from "./OrderChecker";
import PagoAcreditadoInfo from "./StepHandlers/PagoAcreditadoInfo";
import { MercadoPagoService } from "../services/MercadoPagoService";

type LoadingOverlayProps = {
  paymentMethod?: "online" | "qr" | "pos";
  paymentReference?: string;
  onCancel: () => void;
  qrCode?: string;
  orderId?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  paymentMethod,
  paymentReference,
  onCancel,
  qrCode = "",
  orderId = "",
}) => {
  const [orderData, setOrderData] = useState<any | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Fetch order data every 5 seconds while the payment is pending
  const checkOrderStatus = async () => {
    if (orderId) {
      try {
        const data = await MercadoPagoService.obtenerOrden(orderId);
        setOrderData(data);

        if (data.status_detail === "accredited") {
          setPaymentCompleted(true);
        }
      } catch (error) {
        console.error("Error al verificar el estado de la orden", error);
      }
    }
  };

  useEffect(() => {
    if (orderId) {
      const intervalId = setInterval(() => {
        checkOrderStatus();
      }, 5000); // Poll every 5 seconds

      // Clear interval when payment is completed or modal is closed
      if (paymentCompleted) {
        clearInterval(intervalId);
      }

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [orderId, paymentCompleted]);

return (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in">
      <div className="flex flex-col items-center">
        <div className="space-y-3">
          {/* Si el pago está acreditado, mostrar los detalles del pago en lugar del QR */}
          {paymentCompleted ? (
            <PagoAcreditadoInfo orden={orderData} />
          ) : (
            qrCode && <QRPago qrData={qrCode} />
          )}
        </div>

        {/* Mensaje según tipo de pago */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {paymentMethod === "online" && "Procesando pago con online..."}
          {paymentMethod === "pos" && "Procesando en terminal POS..."}
        </h3>

        <p className="text-gray-600 text-center mb-4">
          {paymentCompleted
            ? "¡Pago completado! Gracias por tu compra."
            : paymentMethod === "online"
            ? "Por favor no cierres esta ventana."
            : paymentMethod === "qr"
            ? "Usa la app de Mercado Pago para escanear el código."
            : "Por favor completa el pago en el terminal."}
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
            {paymentCompleted ? "Cerrar" : "Cancelar"}
          </button>

          {orderId && (
            <OrderChecker
              type="button"
              orderId={orderId}
              onComplete={() => {
                // Aquí actualizas el estado cuando el pago esté acreditado
                setPaymentCompleted(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  </div>
);

};

export default LoadingOverlay;
