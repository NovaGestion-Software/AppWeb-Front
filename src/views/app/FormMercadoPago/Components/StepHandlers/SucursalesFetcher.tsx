import { useEffect, useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import CrearSucursalForm from "./CrearSucursalForm";
import { MercadoPagoService } from "../../services/MercadoPagoService";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";

export default function SucursalesFetcher() {
  const store = useMercadoPagoStore();
  const { userId, sucursales, setSucursales, setLoadingSucursales, isLoadingSucursales, setError } = store;
  const [retryFetch, setRetryFetch] = useState(false); // Estado para intentar nuevamente la consulta

  useEffect(() => {
    const fetchSucursales = async () => {
      if (!userId) return;

      setLoadingSucursales(true);
      try {
        const data = await MercadoPagoService.obtenerSucursales(userId);
        console.log("Sucursales data:", data);

        if (data && Array.isArray(data.sucursales)) {
          setSucursales(data.sucursales);
        } else {
          console.warn("Respuesta inesperada:", data);
          throw new Error("Respuesta inesperada al consultar sucursales.");
        }
      } catch (error: any) {
        console.error("Error al consultar sucursales:", error);
        setError(error.message || "Error al consultar sucursales");
      } finally {
        setLoadingSucursales(false);
      }
    };

    if (userId && sucursales === null) {
      fetchSucursales();
    }

    if (retryFetch) {
      fetchSucursales();
      setRetryFetch(false); // Resetear el estado después de intentar
    }
  }, [userId, sucursales, setSucursales, setLoadingSucursales, setError, retryFetch]);

  if (isLoadingSucursales) {
    return <p className="text-sm text-gray-600">Consultando sucursales...</p>;
  }

  if (sucursales && sucursales.length > 0) {
    return (
      <Card className="mt-4">
        <p className="text-green-600 text-sm mb-2">Sucursales existentes:</p>
        <div className="space-y-2">
          {sucursales.map((s: any) => (
            <label key={s.id} className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="radio"
                name="sucursal"
                value={s.id}
                checked={store.sucursalSeleccionada?.id === s.id}
                onChange={() => store.setSucursalSeleccionada(s)}
                className="form-radio text-blue-600"
              />
              <span>{s.name}</span>
            </label>
          ))}
        </div>
      </Card>
    );
  }

  if (sucursales && sucursales.length === 0) {
    return (
      <div className="mt-4 text-sm text-yellow-600">
        <p>No se encontraron sucursales.</p>
        <CrearSucursalForm />
        <button
          onClick={() => setRetryFetch(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return null;
}
