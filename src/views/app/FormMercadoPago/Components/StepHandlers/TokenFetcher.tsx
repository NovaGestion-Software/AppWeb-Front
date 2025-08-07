import { useEffect, useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import { MercadoPagoService } from "../../services/MercadoPagoService";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import TokenManualInput from "./TokenManualInput";
import { FaSyncAlt } from "react-icons/fa";

export default function TokenFetcher() {
  const store = useMercadoPagoStore();
  const {
    token,
    userId,
    setToken,
    setLoading,
    setError,
    isTokenLoading,
  } = store;

  const [manualMode, setManualMode] = useState(false);

  const fetchToken = async () => {
    setLoading(true);
    try {
      const response = await MercadoPagoService.obtenerToken();
      if (response?.token && response?.user_id) {
        setToken(response.token, response.user_id.toString());
      } else {
        throw new Error("La respuesta no contiene token o user_id");
      }
    } catch (error: any) {
      console.error("Error al obtener token:", error);
      setError(error.message || "Error al obtener token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const mqr = localStorage.getItem("_mqr");
    const yaTieneToken = !!token;

    if (!manualMode && mqr === "1" && !yaTieneToken) {
      fetchToken();
    } else if (!manualMode && mqr !== "1") {
      console.log("No autorizado aún (mqr !== 1)");
    }
  }, [token, manualMode]);

  if (isTokenLoading)
    return <p className="text-sm text-gray-600 mt-4">Cargando token...</p>;

  return (
  <Card
  padding={false}
  className="p-4 space-y-4 text-sm h-full min-h-[260px] 
  max-w-[450px]  min-w-[450px] transition-all duration-300 ease-in-out">
 {token && userId && (
        <div className="text-green-700 space-y-1">
          <p>
            <strong>Token actual:</strong>{" "}
            <span className="break-all">{token.slice(0, 32)}...</span>
          </p>
          <p>
            <strong>User ID:</strong> {userId}
          </p>
        </div>
      )}

      {!manualMode && token && (
        <button
          onClick={fetchToken}
          className="flex items-center gap-2 text-xs bg-blue-100 px-3 py-1 rounded hover:bg-blue-200 text-blue-700 transition"
        >
          <FaSyncAlt className="w-3 h-3" />
          Renovar token 
        </button>
      )}

      <TokenManualInput manualMode={manualMode} setManualMode={setManualMode} />
    </Card>
  );
}
