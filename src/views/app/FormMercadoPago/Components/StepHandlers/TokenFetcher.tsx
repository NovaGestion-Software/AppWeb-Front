import { useEffect, useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import { MercadoPagoService } from "../../services/MercadoPagoService";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import TokenManualInput from "./TokenManualInput";

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
      console.log("Respuesta obtenerToken:", response);

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
    return <p className="text-sm text-gray-600">Cargando token...</p>;

  return (
    <Card className="p-4 space-y-3 text-sm">
      {token && userId && (
        <div className="text-green-600">
          <p><strong>Token actual:</strong> {token.slice(0, 32)}...</p>
          <p><strong>User ID:</strong> {userId}</p>
        </div>
      )}

      {!manualMode && token && (
        <button
          onClick={fetchToken}
          className="text-blue-600 hover:underline text-xs bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
        >
          Renovar token automáticamente
        </button>
      )}

      <TokenManualInput
        manualMode={manualMode}
        setManualMode={setManualMode}
      />
    </Card>
  );
}
