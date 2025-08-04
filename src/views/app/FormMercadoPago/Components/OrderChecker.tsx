import { useState, useEffect, useRef } from "react";
import axios from "axios";

type Data = {
  status_detail: string;
  paymentStatus: string;
  paymentStatus_detail: string;
};

type OrderStatus = {
  status: string;
  data: Data;
};

type OrderCheckerProps = {
  orderId: string;
  type?: "icon" | "button";
  onComplete?: () => void;
  onClose?: () => void;
  setEstadoCobro?: (estado: string) => void;
};

const OrderChecker = ({
  orderId,
  type = "icon",
  onComplete,
  onClose,
  setEstadoCobro,
}: OrderCheckerProps) => {
  const [orderData, setOrderData] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const isPaymentCompleted =
    orderData?.data?.paymentStatus_detail === "accredited";
  const isPaymentPending = !isPaymentCompleted && !error && orderId;

  useEffect(() => {
    if (isPaymentCompleted) {
      setEstadoCobro?.("accredited");
      const timer = setTimeout(() => {
        onClose?.();
      }, 1500); // 1.5 segundos de delay para que el usuario vea el estado de completado

      return () => clearTimeout(timer);
    }
  }, [isPaymentCompleted, onClose, setEstadoCobro]);

  const checkOrder = async () => {
    if (!orderId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `http://localhost:4000/api/orders/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_PETICIONES}`,
          },
        }
      );

      setOrderData(res.data);

      if (res.data.paymentStatus_detail === "accredited") {
        window.clearInterval(intervalRef.current);
        window.clearTimeout(timeoutRef.current);
        onComplete?.();
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
      console.error("Error al verificar la orden:", error);
    } finally {
      setLoading(false);
    }
  };

  // Configurar el intervalo y timeout
  useEffect(() => {
    if (!orderId) return;

    // Limpiar intervalos anteriores
    // Limpiar anteriores
    window.clearInterval(intervalRef.current);
    window.clearTimeout(timeoutRef.current);

    // Verificar inmediatamente
    checkOrder();

    // Configurar intervalo de 5 segundos
    intervalRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 5);
      checkOrder();
    }, 5000);

    // Configurar timeout de 2 minutos (120 segundos)
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setError("Tiempo de espera agotado");
    }, 120000);

    // Limpieza
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [orderId]);

  // Estilos Tailwind para los estados
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
    <div className="flex items-center gap-2">
      {/* Icono/indicador de estado */}
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

      {/* Versión con botón */}
      {type === "button" && (
        <div className="flex flex-col gap-2">
          <button
            onClick={checkOrder}
            disabled={loading || isPaymentCompleted}
            className={`px-4 py-2  w-44 rounded-md font-medium transition-colors ${
              statusStyles.button
            } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
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

      {/* Debug  */}
      {/* {import.meta.env.DEV && orderData && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <pre>{JSON.stringify(orderData, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default OrderChecker;
