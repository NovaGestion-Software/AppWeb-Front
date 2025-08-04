import { useEffect } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import CrearSucursalForm from "./CrearSucursalForm";

export default function SucursalesFetcher() {
  const store = useMercadoPagoStore();
  const { token, userId, sucursales, setSucursales, setLoadingSucursales,
     isLoadingSucursales, setError } = store;

  useEffect(() => {
    const fetchSucursales = async () => {
      if (!token || !userId) return;

      setLoadingSucursales(true);
      try {
        const res = await fetch(`https://api.mercadopago.com/users/${userId}/stores/search`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Sucursales data:", data);

        if (Array.isArray(data.results)) {
          setSucursales(data.results);
        } else {
          throw new Error("Respuesta inesperada al consultar sucursales.");
        }
      } catch (error: any) {
        setError(error.message || "Error al consultar sucursales");
      }
    };

    // Solo consultamos si no lo hicimos ya
    if (token && userId && sucursales === null) {
      fetchSucursales();
    }
  }, [token, userId, sucursales, setSucursales, setLoadingSucursales, setError]);

  if (isLoadingSucursales) return <p className="text-sm text-gray-600">Consultando sucursales...</p>;

  if (sucursales && sucursales.length > 0) {
    return (
      <div className="mt-4">
        <p className="text-green-600 text-sm">Sucursales existentes:</p>
        <ul className="list-disc ml-5 text-sm">
          {sucursales.map((s: any) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (sucursales && sucursales.length === 0) {
    return (
      <div className="mt-4 text-sm text-yellow-600">
        <p>No se encontraron sucursales.</p>
        <CrearSucursalForm />
      </div>
    );
  }

  return null
}
