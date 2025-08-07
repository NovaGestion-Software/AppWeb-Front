import { useState, useEffect, useRef } from "react";
import { MercadoPagoService } from "../services/MercadoPagoService";

type OrderCheckerProps = {
  orderId: string;
  type?: "icon" | "button";
  onComplete?: () => void;
  setEstadoCobro?: (estado: string) => void;
};

const OrderChecker = ({
  orderId,
  type = "icon",
  onComplete,
  setEstadoCobro,
}: OrderCheckerProps) => {
  const [orderData, setOrderData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPaymentCompleted = orderData?.status_detail === "accredited";
  const isPaymentPending = !isPaymentCompleted && !error && orderId;

  const checkOrder = async () => {
    if (!orderId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await MercadoPagoService.obtenerOrden(orderId);
      setOrderData(data);

      if (data.status_detail === "accredited") {
        setEstadoCobro?.("accredited");

        // Detener el polling
        clearInterval(intervalRef.current!);
        clearTimeout(timeoutRef.current!);

        if (onComplete) {
          onComplete(); // Asegúrate de que onComplete esté disponible
        }
      }
    } catch (err: any) {
      setError(err.message || "Error al verificar la orden");
      console.error("Error al verificar la orden:", err);
    } finally {
      setLoading(false);
    }
  };

  // Configurar intervalo y timeout
  useEffect(() => {
    if (!orderId) return;

    clearInterval(intervalRef.current!);
    clearTimeout(timeoutRef.current!);

    checkOrder();

    intervalRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 5);
      checkOrder();
    }, 5000);

    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current!);
      setError("Tiempo de espera agotado");
    }, 120000); // Timeout de 2 minutos

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, [orderId]);

  const getStatusStyles = () => {
    if (isPaymentCompleted) {
      return {
        icon: "text-green-500",
        text: "Pago completado",
        button: "bg-green-500 hover:bg-green-600 text-white border",
      };
    }
    if (error) {
      return {
        icon: "text-red-500",
        text: "Error en la verificación",
        button: "bg-red-500 hover:bg-red-600 text-white",
      };
    }
    return {
      icon: "text-yellow-500 animate-pulse",
      text: "Pago pendiente",
      button: "bg-yellow-500 hover:bg-yellow-600 text-white",
    };
  };

  const statusStyles = getStatusStyles();

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Indicador de estado */}
      {type === "icon" && (
        <div className="flex items-center gap-2">
          <div
            className={`w-12 h-4 rounded-full border bg-blue-500 ${statusStyles.icon}`}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            {statusStyles.text}
            {isPaymentPending && ` (${timeElapsed}s)`}
          </span>
        </div>
      )}

      {/* Botón si se usa como botón */}
      {type === "button" && (
        <div className="flex flex-col gap-2">
          <button
            onClick={checkOrder}
            disabled={loading || isPaymentCompleted}
            className={`px-4 py-2 w-44 rounded-md font-medium transition-colors ${statusStyles.button} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              "Verificando..."
            ) : isPaymentCompleted ? (
              "✅ Pago completado"
            ) : (
              <span>🔄 Verificar ({timeElapsed}s)</span>
            )}
          </button>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      )}


    </div>
  );
};

export default OrderChecker;
