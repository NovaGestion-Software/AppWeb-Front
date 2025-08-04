import { useEffect } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import { obtenerTokenMP } from "@/services/ApiPhpService";

export default function TokenFetcher() {
  const store = useMercadoPagoStore();
  const { token, setToken, setLoading, setError, isTokenLoading } = store;

  useEffect(() => {
    const mqr = localStorage.getItem("_mqr");
    const yaTieneToken = !!token;

    if (mqr === "1" && !yaTieneToken) {
      const fetchToken = async () => {
        setLoading(true);
        try {
          const response = await obtenerTokenMP();

          console.log("Respuesta obtenerTokenMP:", response);

          if (response?.status === "success") {
            const data = response.data;
            const accessToken = data?.access_token;
            const userId = data?.user_id;

            if (accessToken && userId) {
              setToken(accessToken, userId.toString());
            } else {
              throw new Error("La respuesta no contiene access_token o user_id");
            }
          } else {
            throw new Error(response?.message || "Respuesta inválida del backend");
          }
        } catch (error: any) {
          console.error("Error al obtener token:", error);
          setError(error.message || "Error al obtener token");
        }
      };

      fetchToken();
    } else {
      console.log("No autorizado aún (mqr !== 1)");
    }
  }, [token, setToken, setLoading, setError]);

  if (isTokenLoading) return <p className="text-sm text-gray-600">Cargando token...</p>;
  if (token) return null;

  return <p className="text-red-500 text-sm">Esperando autorización para continuar...</p>;
}
