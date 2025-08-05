import { useEffect, useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import { MercadoPagoService } from "../../services/MercadoPagoService";
import CrearCajaForm from "./CrearCajasForm";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";

export default function CajasFetcher() {
  const [mostrarCrearCaja, setMostrarCrearCaja] = useState(false);

  const store = useMercadoPagoStore();
  const { userId, cajas, setCajas, setLoadingCajas, isLoadingCajas, setError, cajaSeleccionada, setCajaSeleccionada, sucursalSeleccionada } = store;

  const normalizarCaja = (caja: any) => {
    return {
      id: caja.id,
      name: caja.name,
      store_id: caja.store_id || caja.external_store_id || "",
      external_id: caja.external_id || "",
      fixed_amount: caja.fixed_amount ?? false,
      qr: caja.qr || null,
      status: caja.status || "",
      site: caja.site || "",
    };
  };

  useEffect(() => {
    const fetchCajas = async () => {
      if (!userId) return;

      setLoadingCajas(true);
      try {
        const data = await MercadoPagoService.obtenerCajas(userId);
        console.log("Cajas data:", data);

        if (Array.isArray(data.results)) {
          const cajasNormalizadas = data.results.map(normalizarCaja);
          setCajas(cajasNormalizadas);
        } else {
          throw new Error("Respuesta inesperada al consultar cajas.");
        }
      } catch (error: any) {
        console.error("Error al consultar cajas:", error);
        setError(error.message || "Error al consultar cajas");
      } finally {
        setLoadingCajas(false);
      }
    };

    if (userId && cajas === null) {
      fetchCajas();
    }
  }, [userId, cajas, setCajas, setLoadingCajas, setError]);

  if (isLoadingCajas) return <p className="text-sm text-gray-600">Consultando cajas...</p>;

  if (cajas && cajas.length > 0) {
    return (
      <Card className="mt-4">
        <p className="text-green-600 text-sm mb-2">Cajas disponibles:</p>
        <div className="space-y-2">
          {cajas
            .filter((caja: any) => caja.store_id === sucursalSeleccionada?.id)
            .map((caja: any) => (
              <label key={caja.id} className="flex items-center space-x-2 text-sm text-gray-700">
                <input type="radio" name="caja" value={caja.id} checked={cajaSeleccionada?.id === caja.id} onChange={() => setCajaSeleccionada(caja)} className="form-radio text-blue-600" />
                <span>{caja.name}</span>
              </label>
            ))}
        </div>

        <div className="mt-4">
          <button onClick={() => setMostrarCrearCaja(!mostrarCrearCaja)} className="text-xs text-blue-600 hover:underline">
            {mostrarCrearCaja ? "Ocultar formulario" : "Crear nueva caja"}
          </button>
          {mostrarCrearCaja && <CrearCajaForm />}
        </div>
      </Card>
    );
  }

  if (cajas && cajas.length === 0) {
    return (
      <div className="mt-4 text-sm text-yellow-600">
        <p>No se encontraron cajas.</p>
        <CrearCajaForm />
      </div>
    );
  }

  return null;
}
