import { useEffect } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import { MercadoPagoService } from "../../services/MercadoPagoService";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";

export default function TokenFetcher() {
  const store = useMercadoPagoStore();
  const {
    token,
    setToken,
    setLoading,
    setError,
    isTokenLoading,
  } = store;

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

    if (mqr === "1" && !yaTieneToken) {
      fetchToken();
    } else if (mqr !== "1") {
      console.log("No autorizado aún (mqr !== 1)");
    }
  }, [token]);

  if (isTokenLoading)
    return <p className="text-sm text-gray-600">Cargando token...</p>;

  if (token) {
    return (
      <Card className="flex flex-col items-center gap-2 text-sm text-green-600">
        <span>Token obtenido correctamente.</span>
        <button
          onClick={fetchToken}
          className="text-blue-600 hover:underline text-xs ml-2 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
        >
          Renovar token
        </button>
      </Card>
    );
  }

  return (
    <p className="text-red-500 text-sm">
      Esperando autorización para continuar...
    </p>
  );
}
