import { useEffect, useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import CrearSucursalForm from "./CrearSucursalForm";
import { MercadoPagoService } from "../../services/MercadoPagoService";
import { EntidadFetcherCard } from "./EntidadFetcherCard";

export default function SucursalesFetcher() {
  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [retryFetch, setRetryFetch] = useState(false);

  const store = useMercadoPagoStore();
  const {
    userId,
    sucursales,
    setSucursales,
    setLoadingSucursales,
    isLoadingSucursales,
    setError,
    sucursalSeleccionada,
    setSucursalSeleccionada,
  } = store;

  useEffect(() => {
    const fetchSucursales = async () => {
      if (!userId) return;

      setLoadingSucursales(true);
      try {
        const data = await MercadoPagoService.obtenerSucursales(userId);
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

    if (userId && sucursales === null) fetchSucursales();
    if (retryFetch) {
      fetchSucursales();
      setRetryFetch(false);
    }
  }, [userId, sucursales, setSucursales, setLoadingSucursales, setError, retryFetch]);

  if (isLoadingSucursales) {
    return <p className="text-sm text-gray-600 mt-4">Consultando sucursales...</p>;
  }

  return (
    <EntidadFetcherCard
      titulo="Sucursales existentes:"
      items={sucursales}
      itemSeleccionado={sucursalSeleccionada}
      onSeleccionarItem={setSucursalSeleccionada}
      mostrarFormulario={mostrarCrear}
      toggleMostrarFormulario={() => setMostrarCrear(!mostrarCrear)}
      FormularioComponente={<CrearSucursalForm />}
      sinResultadosTexto="No se encontraron sucursales."
      onRetry={() => setRetryFetch(true)}
      mostrarRetry={true}
      botonCrearTexto="Crear nueva sucursal"
    />
  );
}
